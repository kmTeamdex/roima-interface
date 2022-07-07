import { getContractInfo, getTokenInfo, getContractMarketData, getMarketData } from './fetch';
import { Token } from '@roimaswap/sdk';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { CoinHistory } from '../Model/coin';
import { HistoricalValue } from '../Model/graph';

dayjs.extend(utc);
const utcCurrentTime = dayjs();
const utcOneDayBack = utcCurrentTime
  //   .subtract(1, "day")
  //   .startOf("minute")
  .unix();
// dayjs.extend(weekOfYear);

function toKeyword(token: string | undefined): string | undefined {
  if (!token) return undefined;
  let keyword = token.toLowerCase();
  keyword = keyword.split(' ').join('-');
  return keyword;
}
const demoReult: FormatResult = {
  value: 0,
  growth: 0,
  ranking: 0,
  timestamp: utcOneDayBack,
};

const emptyResult: AsObject = {
  respList: [{ ...demoReult }],
};

export async function coinMetrics(m: string, token?: Token): Promise<AsObject> {
  if (!token) return emptyResult;
  const abortController = new AbortController();
  const { signal } = abortController;
  let coinInfo = await getContractInfo(token.address, signal);
  if (coinInfo) {
    if (coinInfo?.error) {
      let keyword = toKeyword(token?.name);
      if (keyword) {
        coinInfo = await getTokenInfo(keyword, signal);
      }
    }
    const getData = formatResultFromData(m, coinInfo);
    const mainData: AsObject = {
      respList: [{ ...getData }],
    };
    return mainData;
  }
  abortController.abort();
  return emptyResult;
}

function rndAbt(min, max) {
  return Math.ceil(Math.random() * (max - min + 1) + min);
}

function rndFloat(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function rndInt(min, max) {
  return Math.floor(rndFloat(min, max));
}

const formatResultFromData = (m: string, data: any) => {
  if (!data || data?.error) return demoReult;
  let result = {} as FormatResult;
  // console.log('mmm', m);
  result.value = rndInt(1, 10000000000);
  result.growth = rndInt(-100, 150);
  result.ranking = rndInt(1, 20);
  result.timestamp = utcOneDayBack;

  return result;
};

export interface AsObject {
  respList: FormatResult[];
}

export interface FormatResult {
  timestamp: number;
  value: number;
  growth: number;
  ranking: number;
}

export const formatMarketData = async (
  token?: Token,
  period?: string,
  signal?: AbortSignal,
): Promise<HistoricalValue[]> => {
  if (!token) return [];
  if (!period) period = '1d';
  if (!signal) signal = new AbortController().signal;

  let marketData = await getContractMarketData(token.address, period, signal);
  var market: HistoricalValue;
  if (marketData) {
    if (marketData?.error) {
      let keyword = toKeyword(token?.name);
      if (keyword) {
        marketData = await getMarketData(keyword, period, signal);
      }
    }
    const { prices }: CoinHistory = marketData;
    return prices.map(([unix, price]) => ({ unix, price })) as HistoricalValue[];
  } else {
    return [];
  }
};

export const formatResult = async (token?: Token) => {
  if (!token) return;
  const abortController = new AbortController();
  const { signal } = abortController;
  let contractInfo = await getContractInfo(token.address, signal);
  if (contractInfo) {
    if (contractInfo?.error) {
      let keyword = toKeyword(token?.name);
      if (keyword) {
        contractInfo = await getTokenInfo(keyword, signal);
        // console.log(tokenInfo);
      }
    }
    abortController.abort();
    var data = {} as TokenData;
    data.coinname = contractInfo?.name;
    data.image = contractInfo?.image?.small ?? '';
    data.rank = contractInfo?.coingecko_rank ?? 0;
    data.description = contractInfo?.description?.en ?? 'Could not find coin with the given id';
    data.price = contractInfo?.market_data?.current_price?.usd ?? 0;
    data.pricechange24h = contractInfo?.market_data?.price_change_percentage_24h ?? 0;
    data.pricechange24h_in_currency = contractInfo?.market_data?.price_change_24h_in_currency?.usd ?? 0;
    data.maketcap = contractInfo?.market_data?.market_cap?.usd ?? 0;
    data.maketcapchange24h = contractInfo?.market_data?.market_cap_change_percentage_24h_in_currency?.usd ?? 0;
    data.volume = contractInfo?.market_data?.total_volume?.usd ?? 0;
    data.circulatingsupply = contractInfo?.market_data?.circulating_supply ?? 0;
    data.totalsupply = contractInfo?.market_data?.total_supply ?? 0;

    return data;
  } else {
    abortController.abort();
    return null;
  }
};

export interface MarketData {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}

export interface TokenData {
  coinname: string;
  image: string;
  rank: number;
  description: string;
  price: number;
  pricechange24h: number;
  pricechange24h_in_currency: number;
  maketcap: number;
  maketcapchange24h: number;
  volume: number;
  circulatingsupply: number;
  totalsupply: number;
}
