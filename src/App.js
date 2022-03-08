import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home";
import SatellitePage from "./Pages/Satellite";
import Layout from "./Components/Layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/satellite" element={<SatellitePage />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
