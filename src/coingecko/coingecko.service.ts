import { SUPPORTED_FIAT } from "../constants/currency.js";

import { PriceService } from "./api/price.service";
import { coingeckoClient } from "./coingecko.client";

export const getNativeAssetId = (chainId: string): string => {
  const mapping = {
    "1": "ethereum",
    "5": "ethereum",
    "56": "binancecoin",
  };

  return mapping[chainId] || "ethereum";
};

export const getPlatformId = (chainId: string): string => {
  const mapping = {
    "1": "ethereum",
    "5": "ethereum",
    "56": "binance-smart-chain",
  };

  return mapping[chainId] || "ethereum";
};

export class CoingeckoService {
  supportedFiat: string;
  prices: PriceService;

  constructor(
    public readonly client = coingeckoClient,
    priceServiceClass = PriceService,
  ) {
    this.supportedFiat = SUPPORTED_FIAT.join(",");
    this.prices = new priceServiceClass(this);
  }
}

export const coingeckoService = new CoingeckoService();
