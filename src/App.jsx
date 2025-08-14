import { useState } from "react";
import "./index.css";
import Header from "./components/Header.jsx";
import Content from "./components/Content.jsx";
import Footer from "./components/Footer.jsx";
import { NewsCategoryProvider } from "./components/NewsCategoryContext.jsx";

function App() {
  return (
    <>
      <Header />
      <NewsCategoryProvider>
        <Content />
      </NewsCategoryProvider>
      <Footer />
    </>
  );
}

export default App;
