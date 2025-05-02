import { Box, useColorMode } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Articles from "./Pages/Articles";
import JavaScript from "./Pages/JavaScript";
import ReactPage from "./Pages/ReactPage";
import Tools from "./Pages/Tools";
import Creator from "./Pages/Creator";
import Footer from "./components/Footer";



const App = () => {
  const { colorMode } = useColorMode(); // Chakra UI ka hook for dark/light mode

  return (
    <Router>
      <Navbar />
      <Box
        pt="80px"
        minHeight="100vh"
        bg={colorMode === "light" ? "whitesmoke" : "linear-gradient(135deg, #0a0a0a, #1a1a1a)"}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/javascript" element={<JavaScript />} />
          <Route path="/react" element={<ReactPage />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/creator" element={<Creator />} />
        </Routes>
      <Footer/>
      </Box>
    </Router>
     
      
  );
};

export default App;
