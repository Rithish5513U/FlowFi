import React, { useState } from "react";
import "../styles/Platform.css";
import { Avatar, Dropdown, Modal, Input, Button } from "antd";
import { ManOutlined, WomanOutlined, UserOutlined } from "@ant-design/icons";

const wishlistStocks = [
  { name: "NFLX", total: "$7,250", profitLoss: "+$350" },
  { name: "MSFT", total: "$14,700", profitLoss: "-$500" },
  { name: "AMZN", total: "$18,900", profitLoss: "+$1,250" },
];

const portfolioStocks = [
  { name: "AAPL", total: "$14,500", profitLoss: "+$700" },
  { name: "GOOGL", total: "$14,000", profitLoss: "-$300" },
  { name: "TSLA", total: "$5,600", profitLoss: "+$200" },
  { name: "NVDA", total: "$12,800", profitLoss: "+$1,100" },
  { name: "META", total: "$9,450", profitLoss: "-$150" },
  { name: "AMD", total: "$7,200", profitLoss: "+$500" },
  { name: "NFLX", total: "$10,300", profitLoss: "-$250" },
  { name: "MSFT", total: "$18,900", profitLoss: "+$1,750" },
  { name: "AMZN", total: "$21,500", profitLoss: "-$600" },
  { name: "BA", total: "$5,200", profitLoss: "+$300" },
];

const Platform = () => {
  const [userGender, setUserGender] = useState("male");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [modalType, setModalType] = useState(""); // 'buy' or 'sell'
  const [userBalance, setUserBalance] = useState(50000); // User's currency balance
  const [ownedStocks, setOwnedStocks] = useState([
    { name: "AAPL", quantity: 5 },
    { name: "TSLA", quantity: 2 },
  ]); // Example stocks owned

  // Handle Wishlist Click (Buy)
  const handleWishlistClick = (stock) => {
    setSelectedStock(stock);
    setQuantity(1);
    setModalType("buy");
    setModalVisible(true);
  };

  // Handle Portfolio Click (Sell)
  const handlePortfolioClick = (stock) => {
    setSelectedStock(stock);
    setQuantity(1);
    setModalType("sell");
    setModalVisible(true);
  };

  // Handle Buy / Sell
  const handleAction = () => {
    if (modalType === "buy") {
      alert(`Bought ${quantity} shares of ${selectedStock.name}`);
      setUserBalance(userBalance - 1000 * quantity); // Example price deduction
      setOwnedStocks((prevStocks) => {
        const existingStock = prevStocks.find((s) => s.name === selectedStock.name);
        if (existingStock) {
          return prevStocks.map((s) =>
            s.name === selectedStock.name ? { ...s, quantity: s.quantity + parseInt(quantity) } : s
          );
        }
        return [...prevStocks, { name: selectedStock.name, quantity: parseInt(quantity) }];
      });
    } else {
      alert(`Sold ${quantity} shares of ${selectedStock.name}`);
      setUserBalance(userBalance + 1000 * quantity); // Example price addition
      setOwnedStocks((prevStocks) =>
        prevStocks
          .map((s) =>
            s.name === selectedStock.name
              ? { ...s, quantity: s.quantity - parseInt(quantity) }
              : s
          )
          .filter((s) => s.quantity > 0)
      );
    }
    setModalVisible(false);
  };

  return (
    <>
      {/* Navigation Bar */}
      <div className="navigation-bar">
        <div className="hometopic">
          <h1>FlowFi</h1>
        </div>
        <a href="/homepage">Home</a>
        <a href="/platform">Platform</a>
        <a href="/dashboard">Dashboard</a>
        <a href="/insights">Insights</a>

        <Dropdown
          menu={{ items: [{ key: "1", icon: <UserOutlined />, label: <a href="#">Profile</a> }] }}
          trigger={["click"]}
        >
          <div className="profile-icon" onClick={(e) => e.preventDefault()}>
            <Avatar icon={userGender === "male" ? <ManOutlined /> : <WomanOutlined />} />
          </div>
        </Dropdown>
      </div>

      {/* Main Dashboard Layout */}
      <div className="platform">
        {/* Left Panel - Wishlist */}
        <div className="left-panel">
          <h3>Wishlist</h3>
          <ul className="wishlist">
            {wishlistStocks.map((stock, index) => (
              <li key={index} onClick={() => handleWishlistClick(stock)}>
                <p className="wishlist-btn">{index + 1}. {stock.name}</p>
              </li>
            ))}
          </ul>

          {/* New Section: User Balance & Owned Stocks */}
          <div className="user-assets">
            <h3>Current Holdings</h3>
            <p><strong>Balance:</strong> ${userBalance.toLocaleString()}</p>
            <h4>Stocks Owned:</h4>
            <ul className="owned-stocks">
              {ownedStocks.length > 0 ? (
                ownedStocks.map((stock, index) => (
                  <li key={index}>
                    {stock.name} - {stock.quantity} shares
                  </li>
                ))
              ) : (
                <p>No stocks owned</p>
              )}
            </ul>
          </div>
        </div>

        {/* Middle Panel - Portfolio */}
        <div className="middle-panel">
          <h2>Portfolio Overview</h2>
          <div className="portfolio-container">
            {portfolioStocks.map((stock, index) => (
              <div
                key={index}
                className="portfolio-item"
                onClick={() => handlePortfolioClick(stock)}
              >
                <p className="stock-name">{stock.name}</p>
                <p className="stock-total">{stock.total}</p>
                <p className={stock.profitLoss.includes("+") ? "profit" : "loss"}>
                  {stock.profitLoss}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wishlist & Portfolio Popups */}
      <Modal
        title={modalType === "buy" ? "Buy Stock" : "Sell Stock"}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Input
            key="quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="quantity-input"
          />,
          <Button key="action" type="primary" onClick={handleAction} className="modal-btn">
            {modalType === "buy" ? "Buy" : "Sell"}
          </Button>,
        ]}
      >
        {selectedStock && (
          <div>
            <p><strong>Stock:</strong> {selectedStock.name}</p>
            <p><strong>Total Value:</strong> {selectedStock.total}</p>
            <p className={selectedStock.profitLoss.includes("+") ? "profit" : "loss"}>
              <strong>Profit/Loss:</strong> {selectedStock.profitLoss}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Platform;
