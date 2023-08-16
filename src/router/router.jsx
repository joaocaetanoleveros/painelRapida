import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home/home";
import ScrollToTop from "../utils/scrollToTop";
import Navbar from "../components/Navbar/navbar";
import Glpi from "../pages/Glpi/glpi";
import Pedidos from "../pages/Pedidos/pedidos";


export default function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/glpi" element={<Glpi />} />
        <Route path="/pedidos" element={<Pedidos />} />
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
