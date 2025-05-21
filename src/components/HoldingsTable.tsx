
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toggleAssetSelection, toggleShowAll } from '../store/cryptoSlice';
import { Bitcoin, CircleDollarSign } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const HoldingsTable = () => {
  const dispatch = useDispatch();
  const { assets, showAll } = useSelector((state: RootState) => state.crypto);
  const isMobile = useIsMobile();
  
  // Display only first 3 items unless showAll is true
  const displayedAssets = showAll ? assets : assets.slice(0, 3);
  
  const getCryptoIcon = (symbol: string) => {
    switch (symbol) {
      case 'BTC':
        return <Bitcoin className="w-6 h-6 text-amber-500" />;
      case 'ETH':
        return <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">E</div>;
      case 'USDT':
        return <CircleDollarSign className="w-6 h-6 text-green-500" />;
      case 'MATIC':
        return <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">M</div>;
      default:
        return <CircleDollarSign className="w-6 h-6 text-gray-500" />;
    }
  };
  
  const formatValue = (value: number) => {
    return Math.abs(value).toLocaleString();
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-muted">
            {!isMobile && (
              <th className="text-left py-3 w-8">
                <input type="checkbox" className="w-4 h-4" />
              </th>
            )}
            <th className="text-left py-3 font-medium text-sm">Asset</th>
            <th className="text-right py-3 font-medium text-sm">
              <div>Holdings</div>
              <div className="text-xs text-muted-foreground">Current Market Rate</div>
            </th>
            {!isMobile && (
              <>
                <th className="text-right py-3 font-medium text-sm">Total Current Value</th>
                <th className="text-right py-3 font-medium text-sm">Short-term</th>
                <th className="text-right py-3 font-medium text-sm">Long-Term</th>
                <th className="text-right py-3 font-medium text-sm">Amount to Sell</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {displayedAssets.map((asset) => (
            <tr key={asset.id} className="border-b border-muted">
              {!isMobile && (
                <td className="py-4">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4" 
                    checked={asset.selected}
                    onChange={() => dispatch(toggleAssetSelection(asset.id))}
                  />
                </td>
              )}
              <td className="py-4">
                <div className="flex items-center">
                  {getCryptoIcon(asset.symbol)}
                  <div className="ml-2">
                    <div className="font-medium">{asset.name}</div>
                    <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                  </div>
                </div>
              </td>
              <td className="text-right py-4">
                <div>{asset.amount.toFixed(asset.symbol === 'BTC' || asset.symbol === 'ETH' ? 4 : 2)} {asset.symbol}</div>
                <div className="text-xs text-muted-foreground">$ {asset.rate.toFixed(2)}/{asset.symbol}</div>
              </td>
              {!isMobile && (
                <>
                  <td className="text-right py-4 font-medium">
                    $ {asset.totalValue.toLocaleString()}
                  </td>
                  <td className="text-right py-4">
                    <div className={`font-medium ${asset.shortTerm.value < 0 ? 'text-negative' : 'text-positive'}`}>
                      {asset.shortTerm.value < 0 ? '-' : ''}${formatValue(asset.shortTerm.value)}
                    </div>
                    <div className="text-xs text-muted-foreground">{asset.shortTerm.amount.toFixed(3)} {asset.symbol}</div>
                  </td>
                  <td className="text-right py-4">
                    <div className={`font-medium ${asset.longTerm.value < 0 ? 'text-negative' : 'text-positive'}`}>
                      {asset.longTerm.value < 0 ? '-' : '+'}${formatValue(asset.longTerm.value)}
                    </div>
                    <div className="text-xs text-muted-foreground">{asset.longTerm.amount.toFixed(3)} {asset.symbol}</div>
                  </td>
                  <td className="text-right py-4 font-medium">
                    {asset.selected ? `${asset.amount.toFixed(4)} ${asset.symbol}` : '-'}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HoldingsTable;
