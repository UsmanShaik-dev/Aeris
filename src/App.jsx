import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Destinations from "./pages/Destinations";
import Journey from "./pages/Journey";
import DestinationDetail from "./pages/DestinationDetail";

function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/explore" element={<Explore />} />

        <Route path="/destinations" element={<Destinations />} />

        <Route path="/destinations/:slug" element={<DestinationDetail />} />

        <Route path="/journey" element={<Journey />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterApp;
