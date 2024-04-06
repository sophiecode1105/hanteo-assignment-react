import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chart from "./page/Chart/Chart";
import Whook from "./page/Whook/Whook";
import Event from "./page/Event/Event";
import News from "./page/News/News";
import Store from "./page/Store/Store";
import Charge from "./page/Charge/Charge";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";

const Routers = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/chart" element={<Chart />} />
        <Route path="/whook" element={<Whook />} />
        <Route path="/event" element={<Event />} />
        <Route path="/news" element={<News />} />
        <Route path="/store" element={<Store />} />
        <Route path="/charge" element={<Charge />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Routers;
