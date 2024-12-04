import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Items from "./components/Items";
import Team from "./components/Team";
import Info from "./components/Info";

function App() {
  const setOptionList = [
    
  ];
  const [selectedItem, setSelectedItem] = useState("");

  const [category, setCategory] = useState("default");
  const [categoryList, setCategoryList] = useState([
    "Beverages",
    "Snacks",
    "Sweets and Desserts",
    "Meat and Poultry",
    "Seafood",
  ]);









  return (
    <>
      <Navbar
        category={category}
        setCategory={setCategory}
        categoryList={categoryList}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        setOptionList={setOptionList}
      />
      <Items selectedItem={selectedItem}></Items>
      <Info />
      <Team />
    </>
  );
}

export default App;
