import React from "react";

export const Header = ({ titulo }) => {
  return (
    <nav>
      <div className="nav-wrapper light-blue darken-2">
        <a href="#!" className="brand-logo">{titulo}</a>
      </div>
    </nav>
  );
};
