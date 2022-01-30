import React from "react";
import Moment from "react-moment";
import "./Card.css";

const NewsCard = ({ news }) => {

  return (
    <div className="container">
      <div className="card">
        <div className="card__header">
          <img
            src={news?.imageurl}
            alt={news?.categories}
            width="600"
          />
        </div>
        <div className="card__body">
          <span className="tag tag-blue">{news?.categories}</span>
          <a href={news.url} target=" _blank">
            <h4>{news?.title}</h4>
          </a>
          <p>{news?.body}</p>
        </div>
        <div className="card__footer">
          <div className="user">
            <div className="user__info">
              <h5>{news?.source_info?.name}</h5>
              <small>
                <Moment format="MM/DD/YYYY hh:mm">
                  {news?.published_on * 1000}
                </Moment>{" "}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
