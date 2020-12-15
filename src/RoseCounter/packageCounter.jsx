import React from "react";
import { paperColorsMap, packageNamesMap } from "../const";
import Table from "../Components/Table";
import Td from "../Components/Td";
import Tr from "../Components/Tr";
import TdColor from "../Components/TdColor";

export default ({ data }) => (
  <Table className="table__package" style={{ maxWidth: "700px" }}>
    {Object.keys(data.packagingDetails).sort().map((type) => (
      <Tr key={type}>
        <Td width="200px">{packageNamesMap[type]}</Td>
        <Td>
          <Table>
            {Object.keys(data.packagingDetails[type])
              .sort()
              .map((color) => (
                <Tr key={color}>
                  <Td width="150px">{paperColorsMap[color] ? paperColorsMap[color].name : "Нет цвета"}</Td>

                  {paperColorsMap[color] ? (
                    <TdColor width="70px" height="100%" color={paperColorsMap[color].color} />
                  ) : (
                    <Td width="70px">&nbsp;</Td>
                  )}
                  <Td>
                    <div>{data.packagingDetails[type][color]}</div>
                  </Td>
                </Tr>
              ))}
          </Table>
        </Td>
      </Tr>
    ))}
  </Table>
);
