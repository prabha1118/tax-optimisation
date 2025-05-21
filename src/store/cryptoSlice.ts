import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  rate: number;
  totalValue: number;
  shortTerm: {
    value: number;
    amount: number;
  };
  longTerm: {
    value: number;
    amount: number;
  };
  selected: boolean;
}

interface HarvestingData {
  shortTerm: {
    profits: number;
    losses: number;
    capitalGains: number;
  };
  longTerm: {
    profits: number;
    losses: number;
    capitalGains: number;
  };
  afterHarvesting: {
    shortTerm: {
      profits: number;
      losses: number;
      capitalGains: number;
    };
    longTerm: {
      profits: number;
      losses: number;
      capitalGains: number;
    };
  };
  potentialSavings: number;
}

interface CryptoState {
  assets: CryptoAsset[];
  showAll: boolean;
  harvestingData: HarvestingData;
  infoExpanded: boolean;
}

const initialState: CryptoState = {
  assets: [
    {
      id: '1',
      name: 'Bitcoin',
      symbol: 'BTC',
      amount: 0.63776,
      rate: 55320.15,
      totalValue: 55320.15,
      shortTerm: {
        value: -1200,
        amount: 0.338,
      },
      longTerm: {
        value: 2400,
        amount: 0.300,
      },
      selected: false,
    },
    {
      id: '2',
      name: 'Ethereum',
      symbol: 'ETH',
      amount: 5.6736,
      rate: 1620.15,
      totalValue: 9324.21,
      shortTerm: {
        value: 55320.15,
        amount: 2.332,
      },
      longTerm: {
        value: 8239.29,
        amount: 3.245,
      },
      selected: true,
    },
    {
      id: '3',
      name: 'Tether',
      symbol: 'USDT',
      amount: 3096.54,
      rate: 1.15,
      totalValue: 3142.21,
      shortTerm: {
        value: -1200,
        amount: 2011.23,
      },
      longTerm: {
        value: 2400,
        amount: 902.47,
      },
      selected: false,
    },
    {
      id: '4',
      name: 'Polygon',
      symbol: 'MATIC',
      amount: 2210,
      rate: 2.31,
      totalValue: 4672.12,
      shortTerm: {
        value: -1200,
        amount: 802,
      },
      longTerm: {
        value: 2400,
        amount: 1402,
      },
      selected: false,
    },
    {
      id: '5',
      name: 'Ethereum',
      symbol: 'ETH',
      amount: 5.6736,
      rate: 1620.15,
      totalValue: 9324.21,
      shortTerm: {
        value: 55320.15,
        amount: 2.332,
      },
      longTerm: {
        value: 8239.29,
        amount: 3.245,
      },
      selected: false,
    },
    {
      id: '6',
      name: 'Tether',
      symbol: 'USDT',
      amount: 3096.54,
      rate: 1.15,
      totalValue: 3142.21,
      shortTerm: {
        value: -1200,
        amount: 2011.23,
      },
      longTerm: {
        value: 2400,
        amount: 902.47,
      },
      selected: false,
    },
  ],
  showAll: false,
  harvestingData: {
    shortTerm: {
      profits: 1540,
      losses: -743,
      capitalGains: 787,
    },
    longTerm: {
      profits: 1200,
      losses: -650,
      capitalGains: 550,
    },
    afterHarvesting: {
      shortTerm: {
        profits: 1540,
        losses: -2343,
        capitalGains: -987,
      },
      longTerm: {
        profits: 1200,
        losses: -3650,
        capitalGains: -2450,
      },
    },
    potentialSavings: 862,
  },
  infoExpanded: false,
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    toggleShowAll: (state) => {
      state.showAll = !state.showAll;
    },
    toggleAssetSelection: (state, action: PayloadAction<string>) => {
      const asset = state.assets.find(a => a.id === action.payload);
      if (asset) {
        asset.selected = !asset.selected;
      }
    },
    toggleInfoExpanded: (state) => {
      state.infoExpanded = !state.infoExpanded;
    },
  },
});

export const { toggleShowAll, toggleAssetSelection, toggleInfoExpanded } = cryptoSlice.actions;

export default cryptoSlice.reducer;
