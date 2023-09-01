import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home/home";
import ScrollToTop from "../utils/scrollToTop";
import Navbar from "../components/Navbar/navbar";
import Glpi from "../pages/Glpi/glpi";
import Pedidos from "../pages/Pedidos/pedidos";
import Login from "../pages/Login/login";
import WebArt from "../pages/WebArt/webart_v2";
import Profiz from "../pages/Profiz/profiz";

export default function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/glpi" element={<Glpi />} />
        <Route path="/comprouChegou" element={<Pedidos />} />
        <Route path="/webart" element={<WebArt />} />
        <Route path="/profiz" element={<Profiz />} />
        {/* <Route path='/login' element={<Login/>} /> */}
        {/* <Route path="/login" element={<Login />} />
      <Route path="/*" element={<NotFound/>}/> 
      <Route path="/novoLVI"  element={<CountDown/>}/>
      <Route
        exact
        path="/"
        element={<Layout />}
      >
        <Route index path="/" element={<Home />} />
        <Route path="/*" element={<Outlet />} />
        <Route path="/docmetas" element={<DocMetas />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/reportTickets" element={<RelatorioTickets />} />
      </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
