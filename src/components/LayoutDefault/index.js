import React, { memo } from "react";
import { ReactComponent as ReactLogo } from "../../assets/images/icon.svg";
import CardUser from "../../components/CardUser";

function LayoutDefault({ children, user }) {
  return (
    <div className="content">
      <section className="section-left sidebar">
        <ReactLogo className="icon" />
        <CardUser user={user} />
      </section>
      {children}
    </div>
  );
}

export default memo(LayoutDefault);
