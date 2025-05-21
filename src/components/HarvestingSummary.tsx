
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const HarvestingSummary = () => {
  const { harvestingData } = useSelector((state: RootState) => state.crypto);
  
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
          <div className="text-right text-sm">$ {harvestingData.shortTerm.profits.toLocaleString()}</div>
          <div className="text-right text-sm">$ {harvestingData.longTerm.profits.toLocaleString()}</div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="text-sm">Losses</div>
          <div className="text-right text-sm">- $ {Math.abs(harvestingData.shortTerm.losses).toLocaleString()}</div>
          <div className="text-right text-sm">- $ {Math.abs(harvestingData.longTerm.losses).toLocaleString()}</div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-sm">Net Capital Gains</div>
          <div className="text-right text-sm">$ {harvestingData.shortTerm.capitalGains.toLocaleString()}</div>
          <div className="text-right text-sm">$ {harvestingData.longTerm.capitalGains.toLocaleString()}</div>
        </div>
        
        <div className="flex items-center justify-between py-2 border-t border-border">
          <div className="text-base font-semibold">Realised Capital Gains:</div>
          <div className="text-xl font-bold">
            ${(harvestingData.shortTerm.capitalGains + harvestingData.longTerm.capitalGains).toLocaleString()}
          </div>
        </div>
      </div>
      
      {/* After Harvesting */}
      <div className="bg-harvesting-blue/90 text-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">After Harvesting</h3>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div></div>
          <div className="text-sm text-right font-medium">Short-term</div>
          <div className="text-sm text-right font-medium">Long-term</div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="text-sm">Profits</div>
          <div className="text-right text-sm">$ {harvestingData.afterHarvesting.shortTerm.profits.toLocaleString()}</div>
          <div className="text-right text-sm">$ {harvestingData.afterHarvesting.longTerm.profits.toLocaleString()}</div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="text-sm">Losses</div>
          <div className="text-right text-sm">- $ {Math.abs(harvestingData.afterHarvesting.shortTerm.losses).toLocaleString()}</div>
          <div className="text-right text-sm">- $ {Math.abs(harvestingData.afterHarvesting.longTerm.losses).toLocaleString()}</div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-sm">Net Capital Gains</div>
          <div className="text-right text-sm">- $ {Math.abs(harvestingData.afterHarvesting.shortTerm.capitalGains).toLocaleString()}</div>
          <div className="text-right text-sm">- $ {Math.abs(harvestingData.afterHarvesting.longTerm.capitalGains).toLocaleString()}</div>
        </div>
        
        <div className="flex items-center justify-between py-2 border-t border-white/20">
          <div className="text-base font-semibold">Effective Capital Gains:</div>
          <div className="text-xl font-bold">
            - ${Math.abs(harvestingData.afterHarvesting.shortTerm.capitalGains + harvestingData.afterHarvesting.longTerm.capitalGains).toLocaleString()}
          </div>
        </div>
        
        <div className="flex items-center mt-4 text-sm bg-white/20 p-3 rounded-md">
          <span className="mr-2">🎉</span>
          <span>You are going to save upto $ {harvestingData.potentialSavings.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default HarvestingSummary;
