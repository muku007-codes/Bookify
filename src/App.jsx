import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Register from "./pages/Register";
import LoginPage from "./pages/Login";
import MyNavbar from "./components/Navbar";
import List from "./pages/List";
import Home from "./pages/Home";
import BookDetails from "./pages/Details";
import ViewOrders from "./pages/ViewOrders";
import ViewOrderDetail from "./pages/ViewOrderDetail";



function App() {
  return (
    <div>
      <MyNavbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book/list" element={<List />} />
        <Route path="/book/view/:bookId" element={<BookDetails />} />
        <Route path="/book/orders" element={<ViewOrders />} />
        <Route path="/book/orders/:bookId" element={<ViewOrderDetail />} />
      </Routes>
    </div>
  );
}

export default App;
