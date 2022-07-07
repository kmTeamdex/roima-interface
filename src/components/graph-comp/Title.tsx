import dayjs from "dayjs";
import React from "react";
import { numberToString } from "../../utils/strings";
import { ChangeSince24H } from "../../Model/coin";
import { Period } from "../../Model/graph";

const COLORS = {
  POSITIVE: "rgb(0, 158, 115)",
  NEGATIVE: "rgb(236, 77, 61)",
  ACTIVE: "rgb(120, 150, 224)",
};



export const Title = (props: {
  name: string;
  price: number;
  img: string;
  symbol: string;
  dailyChange: number;
  unix?: number;
  period?: Period;
  active?: boolean
}) => {
  const { name, price, symbol, dailyChange, unix, period, active, img } = props
  const { POSITIVE, NEGATIVE } = ChangeSince24H
  const change = dailyChange >= 0 ? POSITIVE : NEGATIVE;
  const color = change && COLORS[change];

  const price24HoursAgo = price + dailyChange;
  const dailyChangeDivision = Math.abs(dailyChange / price24HoursAgo);
  const dailyChangePercent = Math.round(dailyChangeDivision * 10000) / 100;
    
  return (
    <div
      className="flex-wrap"
      style={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="flex-wrap" style={{ alignItems: "center" }}>
        <img
          src={img}
          alt={name}
          style={{ padding: "2px" }}
          width="33x"
          height="33px"
        ></img>
  
        <h3>
          {symbol} ${numberToString(price)}
        </h3>
      </div>
        <div style={{ textAlign: "right" }}>
        {!active && (
          <span style={{ color }}>
            {change === ChangeSince24H.POSITIVE ? "+" : "-"}
            {dailyChangePercent}%
          </span>
        )}
        {active && unix && period && (
          <span>{dayjs(unix).format(period.scrubFormat)}</span>
        )}
      </div>
      
    </div>
  )
  





}