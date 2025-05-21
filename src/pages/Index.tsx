
import { Provider } from 'react-redux';
import { store } from '../store/store';
import TaxHarvestingDashboard from "../components/TaxHarvestingDashboard";

const Index = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-background">
        <TaxHarvestingDashboard />
      </div>
    </Provider>
  );
};

export default Index;
