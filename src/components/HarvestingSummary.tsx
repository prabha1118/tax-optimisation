import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchHarvestingData } from '../store/cryptoSlice';

const HarvestingSummary = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { harvestingData, harvestingLoading, harvestingError } = useSelector((state: RootState) => state.crypto);
  
  useEffect(() => {
    dispatch(fetchHarvestingData());
  }, [dispatch]);

  if (harvestingLoading) {
    return <div className="text-center py-4">Loading harvesting data...</div>;
  }

  if (harvestingError) {
    return <div className="text-center py-4 text-red-500">{harvestingError}</div>;
  }

  const { stcg, ltcg } = harvestingData.capitalGains;
  const { stcg: selectedStcg, ltcg: selectedLtcg } = harvestingData.selectedGains;
  
  // Calculate total capital gains for pre-harvesting
  const totalCapitalGains = (stcg.profits - stcg.losses) + (ltcg.profits - ltcg.losses);
  
  // Calculate adjusted values for after harvesting
  const adjustedStcgProfits = stcg.profits + selectedStcg.profits;
  const adjustedStcgLosses = stcg.losses + selectedStcg.losses;
  const adjustedLtcgProfits = ltcg.profits + selectedLtcg.profits;
  const adjustedLtcgLosses = ltcg.losses + selectedLtcg.losses;
  
  // Calculate total adjusted capital gains
  const adjustedTotalCapitalGains = 
    (adjustedStcgProfits - adjustedStcgLosses) + 
    (adjustedLtcgProfits - adjustedLtcgLosses);
  
  // Calculate potential savings (original gains minus adjusted gains)
  const potentialSavings = totalCapitalGains - adjustedTotalCapitalGains;
  const showSavings = totalCapitalGains > adjustedTotalCapitalGains;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pre Harvesting */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold mb-4">Pre Harvesting</h3>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div></div>
          <div className="text-sm text-right font-medium">Short-term</div>
          <div className="text-sm text-right font-medium">Long-term</div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="text-sm">Profits</div>
          <div className="text-right text-sm">$ {stcg.profits.toLocaleString()}</div>
          <div className="text-right text-sm">$ {ltcg.profits.toLocaleString()}</div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="text-sm">Losses</div>
          <div className="text-right text-sm">- $ {Math.abs(stcg.losses).toLocaleString()}</div>
          <div className="text-right text-sm">- $ {Math.abs(ltcg.losses).toLocaleString()}</div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-sm">Net Capital Gains</div>
          <div className="text-right text-sm">$ {(stcg.profits - stcg.losses).toLocaleString()}</div>
          <div className="text-right text-sm">$ {(ltcg.profits - ltcg.losses).toLocaleString()}</div>
        </div>
        
        <div className="flex items-center justify-between py-2 border-t border-border">
          <div className="text-base font-semibold">Realised Capital Gains:</div>
          <div className="text-xl font-bold">
            ${totalCapitalGains.toLocaleString()}
          </div>
        </div>
      </div>
      
      {/* After Harvesting */}
      <div className="bg-harvesting-blue text-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">After Harvesting</h3>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div></div>
          <div className="text-sm text-right font-medium">Short-term</div>
          <div className="text-sm text-right font-medium">Long-term</div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="text-sm">Profits</div>
          <div className="text-right text-sm">$ {adjustedStcgProfits.toLocaleString()}</div>
          <div className="text-right text-sm">$ {adjustedLtcgProfits.toLocaleString()}</div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="text-sm">Losses</div>
          <div className="text-right text-sm">- $ {Math.abs(adjustedStcgLosses).toLocaleString()}</div>
          <div className="text-right text-sm">- $ {Math.abs(adjustedLtcgLosses).toLocaleString()}</div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-sm">Net Capital Gains</div>
          <div className="text-right text-sm">$ {(adjustedStcgProfits - adjustedStcgLosses).toLocaleString()}</div>
          <div className="text-right text-sm">$ {(adjustedLtcgProfits - adjustedLtcgLosses).toLocaleString()}</div>
        </div>
        
        <div className="flex items-center justify-between py-2 border-t border-white/20">
          <div className="text-base font-semibold">Effective Capital Gains:</div>
          <div className="text-xl font-bold">
            ${adjustedTotalCapitalGains.toLocaleString()}
          </div>
        </div>
        
        {showSavings && (
          <div className="flex items-center mt-4 text-m bg-white/20 p-3 rounded-md">
            <span className="mr-2">🎉</span>
            <span>You are going to save $ {potentialSavings.toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HarvestingSummary;
