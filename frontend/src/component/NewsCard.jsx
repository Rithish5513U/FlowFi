import React, { useState } from "react";
import "../styles/NewsGrid.css";
import OverviewPage from "./Overview";
import { Avatar, Dropdown } from "antd";
import { ManOutlined, WomanOutlined } from "@ant-design/icons";

const articles = [
  {
    author: "Leah Feiger, Louise Matsakis, Jake Lahut",
    description:
      "Business leaders are paying as much as $5,000,000 to meet one-on-one with the president at his Florida compound...",
    title: "People Are Paying Millions to Dine With Donald Trump at Mar-a-Lago",
    url: "https://www.wired.com/story/people-paying-millions-donald-trump-mar-a-lago/",
    urlToImage:
      "https://media.wired.com/photos/67c7052b740da90b2e8bbbde/191:100/w_1280,c_limit/GettyImages-2062120626%20(1).jpg",
  },
  {
    author: "John Doe",
    description:
      "Tech industry is booming with AI advancements, leading to innovations in multiple sectors.",
    title: "How AI is Revolutionizing the Tech Industry",
    url: "https://www.example.com/ai-revolution",
    urlToImage:
      "https://media.wired.com/photos/67c7052b740da90b2e8bbbde/191:100/w_1280,c_limit/GettyImages-2062120626%20(1).jpg",
  },
  {
    author: "Jane Smith",
    description:
      "The future of blockchain technology and how it will impact various industries.",
    title: "Blockchain: The Next Big Revolution",
    url: "https://www.example.com/blockchain-future",
    urlToImage:
      "https://media.wired.com/photos/67c7052b740da90b2e8bbbde/191:100/w_1280,c_limit/GettyImages-2062120626%20(1).jpg",
  },
];

const NewsCard = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [userGender, setUserGender] = useState("male");

  return (
    <>
      {/* Navigation Bar */}
      <div className="navigation-bar">
        <div className="hometopic">
          <h1>SalesVista AI</h1>
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


      <div className="news-container">
        <div className="news-scroll">
          {articles.map((article, index) => (
            <div className="news-card" key={index} onClick={() => setSelectedArticle(article)}>
              <img src={article.urlToImage} alt={article.title} className="news-image" />
              <div className="news-content">
                <h3 className="news-title">{article.title}</h3>
                <p className="news-author">{article.author}</p>
                <p className="news-description">
                  {article.description.length > 120
                    ? `${article.description.substring(0, 120)}...`
                    : article.description}
                </p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>

        {selectedArticle && (
          <OverviewPage article={selectedArticle} onClose={() => setSelectedArticle(null)} />
        )}
      </div>
    </>
  );
};

export default NewsCard;
