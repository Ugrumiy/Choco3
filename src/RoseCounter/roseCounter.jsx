import React from "react";
import { colorNameMap } from "../const";
import Table from "../Components/Table";
import Th from "../Components/Th";
import Td from "../Components/Td";
import Tr from "../Components/Tr";
import TdColor from "../Components/TdColor";

export default ({ data }) => (
  <Table style={{ maxWidth: "500px" }}>
    {Object.keys(data.roseDetails).map((color) => (
      <Tr key={color}>
        <Th>{colorNameMap[color].name}</Th>
        <TdColor color={colorNameMap[color].color} />
        <Td>{data.roseDetails[color]} шт.</Td>
      </Tr>
    ))}
    <Tr>
      <Th>Всего Роз:</Th>
      <Td />
      <Td>{data.totalRoses} шт.</Td>
    </Tr>
    <Tr>
      <Th>Всего заказов:</Th>
      <Td />
      <Td>{data.totalOrders} шт.</Td>
    </Tr>
  </Table>
);
