import React from "react";

export default ({ children, style, className = "" }) => (
  <table
    style={style}
    className={`mx-auto table table-bordered mt-3 ${className}`}
  >
    <tbody>{children}</tbody>
  </table>
);
