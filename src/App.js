// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "../src/components/Home";
import Coins from "../src/components/Coins";
import Exchanges from "../src/components/Exchanges";
import CoinDetails from "../src/components/CoinDetails";
import Footer from "./components/Footer";
import MarketCap from "./components/MarketCap";
import NewsFeed from "./components/NewsFeed";

function App() {
  return (
    <BrowserRouter>
      <Header />
      {/* <NewsFeed /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/marketcap" element={<MarketCap />} />

        <Route path="/newsfeed" element={<NewsFeed />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
