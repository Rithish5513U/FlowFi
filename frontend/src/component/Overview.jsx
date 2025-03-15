import React from "react";
import '../styles/Overview.css';
import { Link } from "react-router-dom";

const OverviewPage = ({ article, onClose }) => {
  return (
    <div className="overlay">
      <div className="overview-container">
        <div className="overview-header">
          <span className="publish-date">Date</span>
          <span className="author">{article.author}</span>
        </div>

        <div className="overview-image">
          <Link to={article.url} target="_blank" rel="noopener noreferrer">
            <img src={article.urlToImage} alt="Overview" />
          </Link>
        </div>

        <div className="overview-description">
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Learn More</a>
        </div>

        <button className="close-btn" onClick={onClose}>✖</button>
      </div>
    </div>
  );
};

export default OverviewPage;
