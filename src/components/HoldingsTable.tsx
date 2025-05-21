import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { toggleAssetSelection, toggleShowAll, fetchCryptoAssets } from '../store/cryptoSlice';
import { CircleDollarSign } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const HoldingsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { assets, showAll, loading, error } = useSelector((state: RootState) => state.crypto);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    dispatch(fetchCryptoAssets());
  }, [dispatch]);

  // Display only first 3 items unless showAll is true
  const displayedAssets = showAll ? assets : assets.slice(0, 3);
  
  const getCryptoIcon = (coin: string, logo: string) => {
    if (logo.includes('DefaultCoin')) {
      return <CircleDollarSign className="w-6 h-6 text-gray-500" />;
    }
    return <img src={logo} alt={coin} className="w-6 h-6 rounded-full" />;
  };
  
  const formatValue = (value: number) => {
    return Math.abs(value).toLocaleString();
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="overflow-x-auto w-full max-w-[100vw] -mx-4 md:mx-0 px-4">
      <table className="w-full min-w-[800px]">
        <thead>
          <tr className="border-b border-muted">
            <th className="text-left py-3 w-8">
              <input type="checkbox" className="w-4 h-4" />
            </th>
            <th className="text-left py-3 font-medium text-md">Asset</th>
            <th className="text-right py-3 font-medium text-md">
              <div>Holdings</div>
              <div className="text-xs text-muted-foreground">Current Market Rate</div>
            </th>
            <th className="text-right py-3 font-medium text-md">Total Current Value</th>
            <th className="text-right py-3 font-medium text-md">Short-term</th>
            <th className="text-right py-3 font-medium text-md">Long-Term</th>
            <th className="text-right py-3 font-medium text-md">Amount to Sell</th>
          </tr>
        </thead>
        <tbody>
          {displayedAssets.map((asset) => (
            <tr key={asset.coin} className="border-b border-muted">
              <td className="py-4">
                <input 
                  type="checkbox" 
                  className="w-4 h-4" 
                  checked={asset.selected}
                  onChange={() => dispatch(toggleAssetSelection(asset.coin))}
                />
              </td>
              <td className="py-4">
                <div className="flex items-center">
                  {getCryptoIcon(asset.coin, asset.logo)}
                  <div className="ml-2">
                    <div className="font-medium">{asset.coinName}</div>
                    <div className="text-xs text-muted-foreground">{asset.coin}</div>
                  </div>
                </div>
              </td>
              <td className="text-right py-4">
                <div>{asset.totalHolding.toFixed(8)} {asset.coin}</div>
                <div className="text-xs text-muted-foreground">$ {asset.currentPrice.toFixed(2)}/{asset.coin}</div>
              </td>
              <td className="text-right py-4 font-medium">
                $ {(asset.totalHolding * asset.currentPrice).toLocaleString()}
              </td>
              <td className="text-right py-4">
                <div className={`font-medium ${asset.stcg.gain < 0 ? 'text-negative' : 'text-positive'}`}>
                  {asset.stcg.gain < 0 ? '-' : '+'}${formatValue(asset.stcg.gain)}
                </div>
                <div className="text-xs text-muted-foreground">{asset.stcg.balance.toFixed(8)} {asset.coin}</div>
              </td>
              <td className="text-right py-4">
                <div className={`font-medium ${asset.ltcg.gain < 0 ? 'text-negative' : 'text-positive'}`}>
                  {asset.ltcg.gain < 0 ? '-' : '+'}${formatValue(asset.ltcg.gain)}
                </div>
                <div className="text-xs text-muted-foreground">{asset.ltcg.balance.toFixed(8)} {asset.coin}</div>
              </td>
              <td className="text-right py-4 font-medium">
                {asset.selected ? `${asset.totalHolding.toFixed(8)} ${asset.coin}` : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HoldingsTable;
