import { useState, useEffect } from "react";
import Joyride from "react-joyride";
import { Menu, Dropdown, Avatar } from "antd";
import { UserOutlined, PoweroffOutlined, ManOutlined, WomanOutlined } from "@ant-design/icons";
import "../styles/home.css";
import { useSelector } from "react-redux";
import InvestorList from "./Investor";

const Homepage = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hello! How can I assist you?", sender: "bot" }]);
  const [userInput, setUserInput] = useState("");
  const [runTour, setRunTour] = useState(false);
  const [userGender, setUserGender] = useState("male");
  const privateKey = useSelector((state) => state.privateKey.privateKey);

  useEffect(() => {
    setTimeout(() => {
      setRunTour(true);
    }, 500);
  }, []);


  const [showProfile, setShowProfile] = useState(false);


  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { text: userInput, sender: "user" }];
    setMessages(newMessages);
    setUserInput("");

    try {
      console.log(privateKey)
      const response = await fetch("http://localhost:5000/faqHandler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${privateKey}`,
        },
        body: JSON.stringify({ user_query: userInput }),
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setMessages([...newMessages, { text: data.response, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([...newMessages, { text: "Sorry, something went wrong.", sender: "bot" }]);
    }
  };


  const generateBotResponse = (input) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes("hello")) return "Hi! How can I help?";
    if (lowerInput.includes("help")) return "Sure! What do you need help with?";
    return "I'm not sure about that. Can you clarify?";
  };

  const steps = [
    { target: ".navigation-bar", content: "This is the navigation bar.", disableBeacon: true },
    { target: ".homeleft", content: "This is the left section.", disableBeacon: true },
    { target: ".homecenter", content: "This is the main content area.", disableBeacon: true },
    { target: ".homeright", content: "This is the right section.", disableBeacon: true },
    { target: ".chatbot-button", content: "Click here to open the chatbot!", disableBeacon: true },
  ];

  

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <a href="#">Profile</a>
      </Menu.Item>
      <Menu.Item key="2" icon={<PoweroffOutlined />}>
        <a href="/">Logout</a>
      </Menu.Item>
    </Menu>
  );


  // left-container

  const [marketData, setMarketData] = useState([
    
        {
            "market_type": "Equity",
            "region": "United States",
            "primary_exchanges": "NASDAQ, NYSE, AMEX, BATS",
            "local_open": "09:30",
            "local_close": "16:15",
            "current_status": "closed",
            "notes": ""
        },
        {
            "market_type": "Equity",
            "region": "Canada",
            "primary_exchanges": "Toronto, Toronto Ventures",
            "local_open": "09:30",
            "local_close": "16:00",
            "current_status": "closed",
            "notes": ""
        },
        {
            "market_type": "Equity",
            "region": "United Kingdom",
            "primary_exchanges": "London",
            "local_open": "08:00",
            "local_close": "16:30",
            "current_status": "closed",
            "notes": ""
        },
        {
            "market_type": "Equity",
            "region": "Germany",
            "primary_exchanges": "XETRA, Berlin, Frankfurt, Munich, Stuttgart",
            "local_open": "08:00",
            "local_close": "20:00",
            "current_status": "closed",
            "notes": ""
        },
        {
            "market_type": "Equity",
            "region": "France",
            "primary_exchanges": "Paris",
            "local_open": "09:00",
            "local_close": "17:30",
            "current_status": "closed",
            "notes": ""
        },
        {
            "market_type": "Equity",
            "region": "Spain",
            "primary_exchanges": "Barcelona, Madrid",
            "local_open": "09:00",
            "local_close": "17:30",
            "current_status": "closed",
            "notes": ""
        },
        {
            "market_type": "Equity",
            "region": "Portugal",
            "primary_exchanges": "Lisbon",
            "local_open": "08:00",
            "local_close": "16:30",
            "current_status": "closed",
            "notes": ""
        },
        {
            "market_type": "Equity",
            "region": "Japan",
            "primary_exchanges": "Tokyo",
            "local_open": "09:00",
            "local_close": "15:00",
            "current_status": "closed",
            "notes": "Noon trading break from 11:30 to 12:30 local time"
        },
        {
            "market_type": "Equity",
            "region": "India",
            "primary_exchanges": "NSE, BSE",
            "local_open": "09:15",
            "local_close": "15:30",
            "current_status": "closed",
            "notes": ""
        },
        {
            "market_type": "Equity",
            "region": "Mainland China",
            "primary_exchanges": "Shanghai, Shenzhen",
            "local_open": "09:30",
            "local_close": "15:00",
            "current_status": "closed",
            "notes": "Noon trading break from 11:30 to 13:00 local time"
        },
        {
            "market_type": "Equity",
            "region": "Hong Kong",
            "primary_exchanges": "Hong Kong",
            "local_open": "09:30",
            "local_close": "16:00",
            "current_status": "closed",
            "notes": "Noon trading break from 12:00 to 13:00 local time"
        },
        {
            "market_type": "Equity",
            "region": "Brazil",
            "primary_exchanges": "Sao Paolo",
            "local_open": "10:00",
            "local_close": "17:30",
            "current_status": "closed",
            "notes": ""
        },
        {
            "market_type": "Equity",
            "region": "Mexico",
            "primary_exchanges": "Mexico",
            "local_open": "08:30",
            "local_close": "15:00",
            "current_status": "closed",
            "notes": ""
        },
        {
            "market_type": "Equity",
            "region": "South Africa",
            "primary_exchanges": "Johannesburg",
            "local_open": "09:00",
            "local_close": "17:00",
            "current_status": "closed",
            "notes": ""
        },
        {
            "market_type": "Forex",
            "region": "Global",
            "primary_exchanges": "Global",
            "local_open": "00:00",
            "local_close": "23:59",
            "current_status": "closed",
            "notes": "The forex market is open 24 hours a day, EXCEPT between 16:00 EST on Friday and 17:00 EST on Sunday"
        },
        {
            "market_type": "Cryptocurrency",
            "region": "Global",
            "primary_exchanges": "Global",
            "local_open": "00:00",
            "local_close": "23:59",
            "current_status": "open",
            "notes": "The cryptocurrency market is open 24 hours a day"
        }

  ]);





  return (
    <>
      <Joyride
        steps={steps}
        run={runTour}
        continuous={true}
        scrollToFirstStep={true}
        showProgress={true}
        showSkipButton={true}
        disableOverlayClose={true}
        callback={(data) => {
          if (data.status === "finished" || data.status === "skipped") {
            setRunTour(false);
          }
        }}
      />

      <div className="navigation-bar">
        <div className="hometopic">
          <h1>FlowFi</h1>
          <h1>FlowFi</h1>
        </div>

        <a href="/homepage">Home</a>
        <a href="/platform">Platform</a>
        <a href="/dashboard">Dashboard</a>
        <a href="/insights">Insights</a>

        <Dropdown trigger={["click"]}>
          <div className="profile-icon" onClick={(e) => e.preventDefault()}>
            <Avatar
              icon={userGender === "male" ? <ManOutlined /> : <WomanOutlined />}
              style={{ backgroundColor: "#87d068", cursor: "pointer" }}
            />
          </div>
        </Dropdown>
      </div>
      {
        showProfile && (
          <div className="profile-popup-overlay" onClick={() => setShowProfile(false)}>
            <div className="profile-popup">
              <button className="close-btn" onClick={() => setShowProfile(false)}>✖</button>
              <h2>User Profile</h2>
              <p>Name: John Doe</p>
            </div>
          </div>
        )
      }

      <div className="home-container">
      <div className="homeleft">
        <h2> Globle Markets</h2>
        <div className="market-data-container">
          {marketData.map((item, index) => (
            <div key={index} className="market-data-item">
              <p><strong>Market Type:</strong> {item.market_type}</p>
              <p><strong>Region:</strong> {item.region}</p>
              <p><strong>Primary Exchange:</strong> {item.primary_exchanges}</p>
            </div>
          ))}
        </div>
      </div>

        <div className="homecenter">
          <InvestorList/>
        </div>
        <div className="homeright">Right Content</div>
      </div>




      <button className="chatbot-button" onClick={() => setChatOpen(!chatOpen)}>
        <i className="fa fa-comments" aria-hidden="true" title="chat bot"></i>
      </button>

      {chatOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <span>Chatbot</span>
            <button onClick={() => setChatOpen(false)}>✖</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender === "user" ? "user-msg" : "bot-msg"}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input-container">
            <input
              type="text"
              placeholder="Type a message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Homepage;
