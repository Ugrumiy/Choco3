import React from "react";

export default ({ color, ...rest }) => (
  <td {...rest}>
    <div
      style={{
        width: "25px",
        height: "25px",
        backgroundColor: color,
        border: "1px solid #dee2e6",
        margin: "0 auto"
      }}
    />
  </td>
);
