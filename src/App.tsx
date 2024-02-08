import { useState } from "react";
import "./App.scss";
import SortableList from "./components/SortableList";

function App() {
  const [items, setItems] = useState([
    { uid: "62cb30", name: "Item 1", description: "Description 1" },
    { uid: "0867d4", name: "Item 2", description: "Description 2" },
    { uid: "4706b3", name: "Item 3", description: "Description 3" },
    { uid: "6781ff", name: "Item 4", description: "Description 4" },
    { uid: "9be289", name: "Item 5", description: "Description 5" },
    { uid: "3ye1f2", name: "Item 6", description: "Description 6" },
    { uid: "1be2ds", name: "Item 7", description: "Description 7" },
    { uid: "7be2as", name: "Item 8", description: "Description 8" },
    { uid: "52wfd9", name: "Item 9", description: "Description 9" },
    { uid: "2wbd5a", name: "Item 10", description: "Description 10" },
  ]);

  const itemIds: string[] = items
    .map((item) => item.uid)
    .filter((id): id is string => id !== undefined);

  return (
    <main>
      <h1>Proof of Concept: Revised yearplanning</h1>
      <div
        style={{ display: "flex", alignItems: "center", position: "relative" }}
      >
        <button className="nav-button left">&#10140;</button>
        <ul
          style={{
            display: "flex",
            gap: "1rem",
            listStyle: "none",
            width: "50vw",
            margin: "0 auto",
            overflow: "auto",
            padding: "0 0 1rem 0",
          }}
        >
          <SortableList items={items} itemIds={itemIds} onDragEnd={setItems} />
        </ul>
        <button className="nav-button right">&#10140;</button>
      </div>
    </main>
  );
}

export default App;
