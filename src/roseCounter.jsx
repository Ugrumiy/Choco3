import React, { useState } from "react";
import * as CSV from "csv-string";
import { getTotalColors } from "./utils";
import { colorNameMap, orderDataTypes } from "./const";

export default () => {
  let fileReader;
  const [data, setData] = useState(null);
  const [type, setType] = useState(orderDataTypes[0].id);

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    if (file) {
      fileReader.readAsText(file);
    }
  };

  const handleFileRead = (e) => {
    const content = fileReader.result;
    let arr = CSV.parse(content);
    arr = arr.slice(1, arr.length);
    setData(getTotalColors(arr));
    e.target.value = null;
  };

  return (
    <div>
      <h5 className="mt-4">Агатин калькулятор</h5>
      <div className="mx-auto mt-2">
        <label htmlFor="file" className="btn btn-primary">
          {data ? "Загрузи еще" : "Загрузи файл"}
        </label>
        <input
          style={{
            position: "absolute",
            left: "-999px"
          }}
          type="file"
          id="file"
          accept=".csv"
          onChange={(e) => handleFileChosen(e.target.files[0])}
        />
      </div>

      {data && (
        <table
          style={{ maxWidth: "500px" }}
          className="mx-auto table table-bordered mt-3"
        >
          <tbody>
            {Object.keys(data.details).map((color) => (
              <tr key={color}>
                <th
                  scope="row"
                  style={{
                    textAlign: "left"
                  }}
                >
                  {colorNameMap[color].name}
                </th>
                <td>
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      backgroundColor: colorNameMap[color].color,
                      border: "1px solid #dee2e6",
                      margin: "0 auto"
                    }}
                  />
                </td>
                <td>{data.details[color]} шт.</td>
              </tr>
            ))}
            <tr>
              <th
                scope="row"
                style={{
                  textAlign: "left"
                }}
              >
                Всего Роз:
              </th>
              <td />
              <td>{data.totalRoses} шт.</td>
            </tr>
            <tr>
              <th
                scope="row"
                style={{
                  textAlign: "left"
                }}
              >
                Всего заказов:
              </th>
              <td />
              <td>{data.totalOrders} шт.</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};
