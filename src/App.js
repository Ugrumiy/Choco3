import React, { useState } from "react";
import "./styles.scss";
import RoseCounter from "./RoseCounter";
import SkuGenerator from "./skuGenerator";
import { appSections } from "./const";

export default function App() {
  const [activeSection, setActiveSection] = useState(appSections[0].id);

  return (
    <div className="App">
      <div className="tabs mt-1">
        <ul className="nav nav-fill">
          {appSections.map((section) => (
            <li className="nav-item" key={section.id}>
              <a
                className="nav-link"
                href="#"
                onClick={() => {
                  setActiveSection(section.id);
                }}
              >
                {section.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {activeSection === appSections[0].id ? <RoseCounter /> : <SkuGenerator />}
    </div>
  );
}
