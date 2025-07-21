import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Home from "./components/Home";
import Footer from "./components/footer";
import About from "./components/about";
import Notice from "./components/notice";
import Learning from "./components/learning";
import Department from "./components/department";
import Contact from "./components/contact";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/department" element={<Department />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
