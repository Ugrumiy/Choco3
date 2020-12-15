import React from "react";
import { colorNameMap, paperColors, sizes, type } from "../const";

export default () => {
  const roseColors = Object.keys(colorNameMap).sort();
  const powerset = (xs) =>
    xs.reduceRight((a, x) => [...a, ...a.map((y) => [x, ...y])], [[]]);

  const roseColorCombinations = powerset(roseColors)
    .filter((arr) => arr.length && arr.length <= 3)
    .map((arr) => arr.join(""))
    .sort();

  const paperAndSizeCombinations = sizes
    .reduce(
      (acc, val) => [
        ...acc,
        ...paperColors.map((color) => `${type}${val}-${color}`)
      ],
      []
    )
    .sort();

  const allCombos = paperAndSizeCombinations.reduce(
    (acc, val) => [
      ...acc,
      ...roseColorCombinations.map((roseColor) => `${val}-${roseColor}`)
    ],
    []
  );

  return (
    <div>
      <table
        style={{ maxWidth: "500px" }}
        className="mx-auto table table-bordered mt-3"
      >
        <tbody>
          <tr>
            <th scope="row">Типы</th>
            <td>{type}</td>
          </tr>
          <tr>
            <th scope="row">Размеры</th>
            {sizes.map((size) => (
              <td key={size}>{size}</td>
            ))}
          </tr>
          <tr>
            <th scope="row">Цвета роз</th>
            {roseColors.map((color) => (
              <td key={color}>{color}</td>
            ))}
          </tr>
          <tr>
            <th scope="row">Цвета бумаги</th>
            {paperColors.map((color) => (
              <td key={color}>{color}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <p
        className="text-left"
        style={{
          padding: "0 20px"
        }}
      >
        {allCombos.join(" ")}
      </p>
    </div>
  );
};
