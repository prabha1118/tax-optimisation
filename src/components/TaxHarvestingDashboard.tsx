
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toggleInfoExpanded, toggleShowAll } from '../store/cryptoSlice';
import { ChevronUp, ChevronDown, Info } from 'lucide-react';
import HoldingsTable from './HoldingsTable';
import HarvestingSummary from './HarvestingSummary';
import InfoPanel from './InfoPanel';

const TaxHarvestingDashboard = () => {
  const dispatch = useDispatch();
  const { infoExpanded } = useSelector((state: RootState) => state.crypto);

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <header className="flex items-center py-6">
        <h1 className="text-info-blue text-2xl font-bold">KoinZ</h1>
      </header>
      
      <main className="space-y-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold">Tax Harvesting</h2>
          <a href="#" className="text-info-blue text-sm hover:underline">How it works?</a>
        </div>
        
        <div className="relative bg-card rounded-lg p-4 border border-border">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => dispatch(toggleInfoExpanded())}
          >
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center mr-2">
              <Info className="w-5 h-5 text-info-blue" />
            </div>
            <div className="text-sm text-muted-foreground">
              Tax loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.
            </div>
            <div className="ml-auto">
              {infoExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </div>
          
          {infoExpanded && <InfoPanel />}
        </div>
        
        <HarvestingSummary />
        
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-xl font-semibold mb-4">Holdings</h3>
          <HoldingsTable />
          
          <div className="mt-4">
            <button 
              className="text-info-blue hover:underline"
              onClick={() => dispatch(toggleShowAll())}
            >
              View all
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaxHarvestingDashboard;
