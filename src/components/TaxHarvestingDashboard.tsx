
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toggleInfoExpanded, toggleShowAll } from '../store/cryptoSlice';
import { ChevronUp, ChevronDown, Info, Menu } from 'lucide-react';
import HoldingsTable from './HoldingsTable';
import HarvestingSummary from './HarvestingSummary';
import InfoPanel from './InfoPanel';
import HowItWorks from './HowItWorks';
import { useIsMobile } from '../hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const TaxHarvestingDashboard = () => {
  const dispatch = useDispatch();
  const { infoExpanded } = useSelector((state: RootState) => state.crypto);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 max-w-7xl">
        <header className="flex items-center justify-between py-6">
          <h1 className="text-info-blue text-2xl font-bold">KoinX</h1>
          {isMobile && (
            <Sheet>
              <SheetTrigger className="p-2">
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw]">
                <div className="py-6 flex flex-col gap-4">
                  <a href="#" className="text-info-blue hover:underline">Dashboard</a>
                  <a href="#" className="text-info-blue hover:underline">Portfolio</a>
                  <a href="#" className="text-info-blue hover:underline">Transactions</a>
                  <a href="#" className="text-info-blue hover:underline">Settings</a>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </header>
        
        <main className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
            <h1 className="text-xl font-semibold mb-1 sm:mb-0">Tax Harvesting</h1>
            <HowItWorks />
          </div>
          
          <div className="relative bg-slate-900 rounded-lg p-4 border border-blue700 ring-1 ring-blue-700">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => dispatch(toggleInfoExpanded())}
            >
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center mr-2">
                <Info className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-md text-white">
                Important Notes & Disclaimers
              </div>
              <div className="ml-auto">
                {infoExpanded ? <ChevronUp className="w-5 h-5 text-blue-300" /> : <ChevronDown className="w-5 h-5 text-blue-300" />} {/* Adjusted chevron color */}
              </div>
            </div>

            {infoExpanded && <InfoPanel />}
          </div>
          
          <HarvestingSummary />
          
          <div className="bg-card rounded-lg p-4 sm:p-6 border border-border">
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
    </div>
  );
};

export default TaxHarvestingDashboard;
