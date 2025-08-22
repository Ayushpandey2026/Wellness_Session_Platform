import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MySessions from "./pages/MySessions";
import SessionEditor from "./pages/SessionEditor";
import ProtectedRoute from "./components/ProtectedRoute";
import { Box } from "@chakra-ui/react";

export default function App() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Box maxW="960px" mx="auto" px={4} py={6}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-sessions"
            element={
              <ProtectedRoute>
                <MySessions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor"
            element={
              <ProtectedRoute>
                <SessionEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor/:id"
            element={
              <ProtectedRoute>
                <SessionEditor />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Box>
    </Box>
  );
}
