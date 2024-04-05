import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chart from "./page/Chart/Chart";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
