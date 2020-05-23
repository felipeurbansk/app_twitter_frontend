import React from "react";
import { BoxLoading } from "react-loadingg";

import "./style.css";

export default function Loading({ visible }) {
  return (
    <div className={`content-loading ${visible ? "visible" : "invisible"}`}>
      <div className="loading">
        <BoxLoading />
      </div>
    </div>
  );
}
