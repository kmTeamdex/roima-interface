import React, { useEffect, useState } from 'react';
import { Token } from '@roimaswap/sdk';
import { formatResult, formatMarketData } from '../../../coingecko/formatresult';
import { numberToString } from '../../../utils/strings';
import { CoinInfo } from '../../../Model/coin';
import { CanvasPoint, HistoricalData, Period } from '../../../Model/graph';
import { LoadingSpinner } from '../../../components/graph-comp/LoadingSpinner';
import { TokenData } from '../../../coingecko/formatresult';
import { Title } from '../../../components/graph-comp/Title';
import { PERIODS } from '../../../constants';
import { Btn } from '../../../components/graph-comp/Button';
import { Graph } from '../../../components/graph-comp/Graph';

export const NewChart = (props: {
  token: Token | undefined;
  graphWidth: number;
  graphHeight: number;
  period: Period;
  margin: number;
}) => {
  const [info, setInfo] = useState<TokenData | null>();
  const [historicalData, setHistoricalData] = useState<HistoricalData>();
  const [error, setError] = useState<Error>();
  const [activeValue, setActiveValue] = useState<CanvasPoint>();

  const { token, graphWidth, graphHeight, margin, period } = props;

  /**
   * Fetch and set coin data on load and whenever `period` changes
   */
  useEffect(() => {
    setHistoricalData(undefined);
    setActiveValue(undefined);
    const abortController = new AbortController();
    const signal = abortController.signal;
    Promise.all([formatResult(token), formatMarketData(token, period.value, signal)])
      .then(([info, values]) => {
        setHistoricalData({ period, values });
        setInfo(info);
      })
      .catch((e) => {
        if (e.name !== 'AbortError') {
          setError(e);
        }
      });

    /**
     * Abort pending fetch requests during cleanup
     */
    return () => {
      abortController.abort();
      setError(undefined);
    };
  }, [token, period]);

  if (!info || error) {
    return (
      <div className="center-content">
        {error ? <p className="p16">Sorry, an error occurred fetching data for {token?.name}.</p> : <LoadingSpinner />}
      </div>
    );
  }
  const currentPrice = info.price;
  const dailyChange = info.pricechange24h_in_currency;
  const image = info.image;
  const name = token?.name ?? '';
  const symbol = token?.symbol ?? '';

  return (
    <div style={{ margin: '1px' }}>
      <Title
        name={name}
        symbol={symbol}
        img={image}
        price={activeValue ? activeValue.price : currentPrice}
        unix={activeValue ? activeValue.unix : undefined}
        period={period}
        dailyChange={dailyChange}
        active={Boolean(activeValue)}
      />
      <div className="center-content">
        <Graph
          symbol={symbol}
          values={historicalData?.values}
          period={historicalData?.period}
          width={graphWidth}
          height={graphHeight}
          activeValue={activeValue}
          setActiveValue={setActiveValue}
        />
      </div>
    </div>
  );
};

//  <div style={{ margin: margin + "px" }}>
//       <Title
//         name={name}
//         symbol={symbol}
//         image={image}
//         price={activeValue ? activeValue.price : currentPrice}
//         unix={activeValue ? activeValue.unix : undefined}
//         period={period}
//         dailyChange={dailyChange}
//         active={Boolean(activeValue)}
//             />
//         </div>
