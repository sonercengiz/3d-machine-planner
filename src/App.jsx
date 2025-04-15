import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainSceneProvider } from "./context/MainSceneContext";
import theme from "./theme/theme";
import ErrorPopup from "./components/ErrorPopup";
import FactoryPage from "./pages/FactoryPage";

function App() {
  return (
    <MainSceneProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<FactoryPage />} />
          </Routes>
        </Router>
        <ErrorPopup />
      </ThemeProvider>
    </MainSceneProvider>
  );
}

export default App;
