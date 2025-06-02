import { Box, useColorMode, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Articles from "./Pages/Articles";
import JavaScript from "./Pages/JavaScript";
import ReactPage from "./Pages/ReactPage";
import Tools from "./Pages/Tools";
import Creator from "./Pages/Creator";
import Footer from "./components/Footer";
import TechnologyRoadmap from "./Pages/TechnologyRoadmap";

// Custom theme for consistent styling
const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "light" ? "whitesmoke" : "gray.900",
      },
    }),
  },
});

const App = () => {
  const { colorMode } = useColorMode();

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar />
        <Box
          pt="80px"
          minHeight="100vh"
          bg={colorMode === "light" ? "white" : "gray.800"}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/javascript" element={<JavaScript />} />
            <Route path="/react" element={<ReactPage />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/roadmap" element={<TechnologyRoadmap />} />
            <Route path="/creator" element={<Creator />} />
          </Routes>
          <Footer />
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;