import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainSceneProvider } from "./context/MainSceneContext";
import Configurator from "./pages/Configurator";
import theme from "./theme/theme";
import ErrorPopup from "./components/ErrorPopup";

function App() {
  return (
    <MainSceneProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Configurator />} />
          </Routes>
        </Router>
        <ErrorPopup />
      </ThemeProvider>
    </MainSceneProvider>
  );
}

export default App;
