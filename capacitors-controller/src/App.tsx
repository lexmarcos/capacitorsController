import React from "react";
import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import "./styles/core.css";

function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <Router>
          <Routes>
            <Route path="/dashboard/:id" element={<Dashboard />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </Container>
    </div>
  );
}

export default App;
