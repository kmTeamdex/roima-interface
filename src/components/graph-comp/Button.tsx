import React, { ReactNode } from "react";

export const Btn = (props: {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) => (
  <button disabled={props.disabled} onClick={props.onClick}>
    {props.children}
  </button>
);
