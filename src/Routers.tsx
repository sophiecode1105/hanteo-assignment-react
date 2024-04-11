import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Main from "./page/Main/Main";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";

const Routers = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/chart" />} />
        <Route path="/chart" element={<Main />} />
        <Route path="/whook" element={<Main />} />
        <Route path="/event" element={<Main />} />
        <Route path="/news" element={<Main />} />
        <Route path="/store" element={<Main />} />
        <Route path="/charge" element={<Main />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Routers;
