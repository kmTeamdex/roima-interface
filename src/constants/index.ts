import { JSBI, Percent } from '@roimaswap/sdk';
import { Period } from '../Model/graph';

export const NetworkContextName = 'NETWORK';

export const ZERO_PERCENT = new Percent('0');
export const ONE_HUNDRED_PERCENT = new Percent('1');

export const DEFAULT_ADD_LIQUIDITY_SLIPPAGE_TOLERANCE = new Percent(50, 10_000);
export const DEFAULT_REMOVE_LIQUIDITY_SLIPPAGE_TOLERANCE = new Percent(5, 100);

export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000));

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000));
export const BIPS_BASE = JSBI.BigInt(10000);
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE); // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE); // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE); // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE); // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE); // 15%

export const PERIODS: Period[] = [
  {
    value: '1',
    days: 1,
    title: '1d',
    step: { multiplier: 6, unit: 'h', max: 3 },
    labelFormat: 'HH:mm',
    scrubFormat: 'HH:mm D MMM',
  },
  {
    value: '7',
    days: 7,
    title: '1w',
    step: { multiplier: 2, unit: 'd', max: 3 },
    labelFormat: 'D MMM',
    scrubFormat: 'HH:mm D MMM',
  },
  {
    value: '30',
    days: 30,
    title: '1m',
    step: { multiplier: 1, unit: 'w', max: 3 },
    labelFormat: 'D MMM',
    scrubFormat: 'HH:mm D MMM',
  },
  {
    value: '90',
    days: 90,
    title: '3m',
    step: { multiplier: 3, unit: 'w', max: 3 },
    labelFormat: 'D MMM',
    scrubFormat: 'HH:mm D MMM',
  },
  {
    value: '365',
    days: 365,
    title: '1y',
    step: { multiplier: 3, unit: 'M', max: 3 },
    labelFormat: "MMM 'YY",
    scrubFormat: 'D MMM YYYY',
  },
  {
    value: 'max',
    title: 'All',
    step: { multiplier: 1, unit: 'y', max: 7 },
    labelFormat: "'YY",
    scrubFormat: 'D MMM YYYY',
  },
];
