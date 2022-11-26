import React from "react";
import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import "./styles/core.css";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
