import React, { useState } from "react";
import * as CSV from "csv-string";
import { getTotalColors } from "./utils";
import { orderDataTypes } from "../const";
import RoseCounter from "./roseCounter";
import PackageCounter from "./packageCounter";

export default () => {
  let fileReader;
  const [data, setData] = useState(null);
  const [orderType, setOrderType] = useState(orderDataTypes[0].id);

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    if (file) {
      fileReader.readAsText(file);
    }
  };

  const handleFileRead = (e) => {
    const content = fileReader.result;
    let arr = CSV.parse(content).filter(row => !row.every(item => item === ""));
    // arr = arr.slice(1, arr.length);
    setData(getTotalColors(arr));
    e.target.value = null;
  };

  return (
    <div>
      <h5 className="mt-4">Калькулятор заказов</h5>
      <div className="mx-auto mt-2">
        <label htmlFor="file" className="btn btn-warning">
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
        {data && (
          <div className="tabs mt-1">
            <ul className="nav nav-pills nav-fill">
              {orderDataTypes.map((type) => (
                <li className="nav-item" key={type.id}>
                  <div
                    className={`nav-link ${orderType === type.id ? "active" : ""}`}
                    href="#"
                    onClick={() => {
                      setOrderType(type.id);
                    }}
                  >
                    {type.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {data && orderType === orderDataTypes[0].id && <RoseCounter data={data} />}
        {data && orderType === orderDataTypes[1].id && <PackageCounter data={data} />}
      </div>
    </div>
  );
};
