import { format, fromUnixTime } from 'date-fns';
import { Dictionary, mapKeys, mapValues, maxBy, minBy, pickBy, toPairs } from 'lodash';
import { coingeckoService } from 'src/coingecko/coingecko.service.js';
/**
 *
 * @param inputAsset The address of the input asset
 * @param outputAsset The address of the output asset
 * @param nativeAsset The address of the native asset on the network
 * @param wrappedNativeAsset The address of the wrapped native asset on the network
 * @param days The number of days to pull historical data for
 * @param inverse Swaps the pricing calc to be output/input rather than input/output
 */
async function getPairPriceData(
  inputAsset: string,
  outputAsset: string,
  nativeAsset: string,
  wrappedNativeAsset: string,
  days: number,
  inverse?: boolean,
) {
  let _inputAsset = inputAsset === nativeAsset ? wrappedNativeAsset : inputAsset;
  let _outputAsset = outputAsset === nativeAsset ? wrappedNativeAsset : outputAsset;
  if (inverse) {
    [_inputAsset, _outputAsset] = [_outputAsset, _inputAsset];
  }
  const aggregateBy = days === 1 ? 'hour' : 'day';
  const getInputAssetData = coingeckoService.prices.getTokensHistorical([_inputAsset], days, 1, aggregateBy);
  const getOutputAssetData = coingeckoService.prices.getTokensHistorical([_outputAsset], days, 1, aggregateBy);
  const [inputAssetData, outputAssetData] = await Promise.all([getInputAssetData, getOutputAssetData]);
  const calculatedPricing = mapValues(inputAssetData, (value, timestamp) => {
    if (!outputAssetData[timestamp]) return null;
    return (1 / value[0]) * outputAssetData[timestamp][0];
  });
  const calculatedPricingNoNulls = pickBy(calculatedPricing) as Dictionary<number>;
  const formatTimestamps = mapKeys(calculatedPricingNoNulls, (_, timestamp: any) =>
    format(fromUnixTime(timestamp / 1000), 'yyyy/MM/dd HH:mm'),
  );
  return toPairs(formatTimestamps);
}

const chartTimespans = [
  {
    option: '1d',
    value: 1,
  },
  {
    option: '1w',
    value: 7,
  },
  {
    option: '1m',
    value: 30,
  },
  {
    option: '1y',
    value: 365,
  },
  {
    option: 'All',
    value: 4000,
  },
];
type Props = {
  isModal?: boolean;
  onCloseModal?: () => void;
  toggleModal: () => void;
};
