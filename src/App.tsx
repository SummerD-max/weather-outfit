import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./ui/Layout";
import HomePage from "./pages/HomePage";
import WardrobePage from "./pages/WardrobePage";
import SettingsPage from "./pages/SettingsPage";
import Login from "./features/authentication/Login";
import ProtectedRoute from "./ui/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="wardrobe" element={<WardrobePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>

      <Toaster />
    </>
  );
}

export default App;
