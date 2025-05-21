import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface CryptoAsset {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: {
    balance: number;
    gain: number;
  };
  ltcg: {
    balance: number;
    gain: number;
  };
  selected?: boolean;
}

interface HarvestingData {
  capitalGains: {
    stcg: {
      profits: number;
      losses: number;
    };
    ltcg: {
      profits: number;
      losses: number;
    };
  };
  selectedGains: {
    stcg: {
      profits: number;
      losses: number;
    };
    ltcg: {
      profits: number;
      losses: number;
    };
  };
}

interface CryptoState {
  assets: CryptoAsset[];
  showAll: boolean;
  harvestingData: HarvestingData;
  infoExpanded: boolean;
  loading: boolean;
  error: string | null;
  harvestingLoading: boolean;
  harvestingError: string | null;
}

const initialState: CryptoState = {
  assets: [],
  showAll: false,
  harvestingData: {
    capitalGains: {
      stcg: {
        profits: 0,
        losses: 0,
      },
      ltcg: {
        profits: 0,
        losses: 0,
      },
    },
    selectedGains: {
      stcg: {
        profits: 0,
        losses: 0,
      },
      ltcg: {
        profits: 0,
        losses: 0,
      },
    },
  },
  infoExpanded: false,
  loading: false,
  error: null,
  harvestingLoading: false,
  harvestingError: null,
};

// Helper function to update selected gains
const updateSelectedGains = (state: CryptoState) => {
  const selectedGains = {
    stcg: { profits: 0, losses: 0 },
    ltcg: { profits: 0, losses: 0 }
  };

  state.assets.forEach(asset => {
    if (asset.selected) {
      // Update STCG
      if (asset.stcg.gain > 0) {
        selectedGains.stcg.profits += asset.stcg.gain;
      } else {
        selectedGains.stcg.losses += Math.abs(asset.stcg.gain);
      }

      // Update LTCG
      if (asset.ltcg.gain > 0) {
        selectedGains.ltcg.profits += asset.ltcg.gain;
      } else {
        selectedGains.ltcg.losses += Math.abs(asset.ltcg.gain);
      }
    }
  });

  state.harvestingData.selectedGains = selectedGains;
};

// Async thunks
export const fetchCryptoAssets = createAsyncThunk(
  'crypto/fetchAssets',
  async () => {
    const response = await fetch('https://a809d681-a6da-4575-8324-189fb28c6572.mock.pstmn.io/holdings');
    if (!response.ok) {
      throw new Error('Failed to fetch crypto assets');
    }
    return response.json();
  }
);

export const fetchHarvestingData = createAsyncThunk(
  'crypto/fetchHarvestingData',
  async () => {
    try {
      const response = await fetch('https://a809d681-a6da-4575-8324-189fb28c6572.mock.pstmn.io/capital-gains');
      if (!response.ok) {
        throw new Error('Failed to fetch harvesting data');
      }
      
      const rawText = await response.text();
      console.log('Raw API Response:', rawText);
      
      try {
        const data = JSON.parse(rawText);
        console.log('Parsed Harvesting Data:', data);
        
        if (!data.capitalGains || !data.capitalGains.stcg || !data.capitalGains.ltcg) {
          throw new Error('Invalid data structure received from API');
        }
        
        return {
          capitalGains: {
            stcg: {
              profits: Number(data.capitalGains.stcg.profits) || 0,
              losses: Number(data.capitalGains.stcg.losses) || 0
            },
            ltcg: {
              profits: Number(data.capitalGains.ltcg.profits) || 0,
              losses: Number(data.capitalGains.ltcg.losses) || 0
            }
          },
          selectedGains: {
            stcg: { profits: 0, losses: 0 },
            ltcg: { profits: 0, losses: 0 }
          }
        };
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error('Invalid JSON response from server');
      }
    } catch (error) {
      console.error('Error fetching harvesting data:', error);
      throw error;
    }
  }
);

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    toggleShowAll: (state) => {
      state.showAll = !state.showAll;
    },
    toggleAssetSelection: (state, action: PayloadAction<string>) => {
      const asset = state.assets.find(a => a.coin === action.payload);
      if (asset) {
        asset.selected = !asset.selected;
        updateSelectedGains(state);
      }
    },
    toggleInfoExpanded: (state) => {
      state.infoExpanded = !state.infoExpanded;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.assets = action.payload.map((asset: CryptoAsset) => ({
          ...asset,
          selected: false
        }));
      })
      .addCase(fetchCryptoAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch crypto assets';
      })
      .addCase(fetchHarvestingData.pending, (state) => {
        state.harvestingLoading = true;
        state.harvestingError = null;
      })
      .addCase(fetchHarvestingData.fulfilled, (state, action) => {
        state.harvestingLoading = false;
        state.harvestingData = {
          ...action.payload,
          selectedGains: {
            stcg: { profits: 0, losses: 0 },
            ltcg: { profits: 0, losses: 0 }
          }
        };
      })
      .addCase(fetchHarvestingData.rejected, (state, action) => {
        state.harvestingLoading = false;
        state.harvestingError = action.error.message || 'Failed to fetch harvesting data';
      });
  },
});

export const { toggleShowAll, toggleAssetSelection, toggleInfoExpanded } = cryptoSlice.actions;

export default cryptoSlice.reducer;
