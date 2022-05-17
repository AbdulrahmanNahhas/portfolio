import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import './App.css';
import { keepTheme } from './utils/Themes/theme.js';
import { useEffect } from "react";
import About from "./pages/About/About";

function App() {
  
  useEffect(() => {
    keepTheme();
  })

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
