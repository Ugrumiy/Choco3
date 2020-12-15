import React from "react";

export default ({ children }) => (
  <th
    scope="row"
    style={{
      textAlign: "left"
    }}
  >
    {children}
  </th>
);
