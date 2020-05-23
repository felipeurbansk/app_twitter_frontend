import React from "react";
import { BoxLoading, TransverseLoading } from "react-loadingg";

import "./style.css";

export default function Loading({ visible }) {
  return (
    <div className={`content-loading ${visible ? "visible" : "invisible"}`}>
      <div className="loading">
        <TransverseLoading />
      </div>
    </div>
  );
}
