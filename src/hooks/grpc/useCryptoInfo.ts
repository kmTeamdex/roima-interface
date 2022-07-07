import { Token } from '@roimaswap/sdk';
import { useEffect, useState } from 'react';

// import { GetCryptoInfoRequest, GetCryptoInfoResponse } from '../../services/proto/CryptoInfo_pb';
// import useClient from './client';
import useWrappedTokenKeyword from './useWrappedTokenKeyword';
import { formatResult } from '../../coingecko/formatresult';
import { TokenData } from '../../coingecko/formatresult';

export default function useCryptoInfo(token?: Token) {
  const [cryptoInfo, setCryptoInfo] = useState<TokenData | null>();
  // const { cryptoInfoClient } = useClient();
  const keyword = useWrappedTokenKeyword(token);

  useEffect(() => {
    async function fetch() {
      if (!keyword) return;
      // const request = new GetCryptoInfoRequest();
      // request.setKeyword(keyword);

      try {
        const response = await formatResult(token);
        setCryptoInfo(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetch();
  }, [token]);

  return cryptoInfo;
}
