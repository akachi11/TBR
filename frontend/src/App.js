import React, { useState } from "react";
import "./App.css";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register.tsx";

function App() {

  return (
    <div className="min-h-screen bg-zinc-900 relative">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
