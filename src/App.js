import React from "react";
import "./App.css";
import ProductForm from "./components/ProductForm/ProductForm";
import Calculator from "./components/Calculator/Calculator";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ProductForm />
        {/* <Calculator /> */}
      </header>
    </div>
  );
}

export default App;
