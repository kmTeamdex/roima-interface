import { SupportedChainId } from "@roimaswap/sdk";

export const NETWORK_LABELS: {
  [chainId in SupportedChainId | number]: string;
} = {
  [SupportedChainId.MAINNET]: "Mainnet",
  [SupportedChainId.RINKEBY]: "Rinkeby",
  [SupportedChainId.ROPSTEN]: "Ropsten",
  [SupportedChainId.GÖRLI]: "Görli",
  [SupportedChainId.KOVAN]: "Kovan",
  [SupportedChainId.SMART_CHAIN]: "Smartchain",
  [SupportedChainId.MUMBAI]: "Mumbai",
  [97]: "Bsc Testnet",
};

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.ROPSTEN,
  SupportedChainId.RINKEBY,
  SupportedChainId.GÖRLI,
  SupportedChainId.KOVAN,
  SupportedChainId.SMART_CHAIN,
  SupportedChainId.MUMBAI,
  97,
];
