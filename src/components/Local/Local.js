import React from "react";

import { useState, useEffect } from "react";
import { Card, Button } from "antd";
import axios from "axios";

import "./Local.css";

const { Meta } = Card;
function Local() {
  const newsoption = [
    { num: 1, cat: "Apple" },
    { num: 2, cat: "Tesla" },
    { num: 3, cat: "Top business headlines in the US right now" },
    { num: 4, cat: "Top headlines from TechCrunch right now" },
    { num: 5, cat: "the Wall Street Journal in the last 6 months" },
  ];

  const [news, setNews] = useState([]);
  const APIs = [
    "https://newsapi.org/v2/everything?q=apple&from=2022-03-06&to=2022-03-06&sortBy=popularity&apiKey=970fd8846b2645ea907f177e3594716f",
    "https://newsapi.org/v2/everything?q=tesla&from=2022-02-07&sortBy=publishedAt&apiKey=970fd8846b2645ea907f177e3594716f",
    "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=970fd8846b2645ea907f177e3594716f",
    "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=970fd8846b2645ea907f177e3594716f",
    "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=970fd8846b2645ea907f177e3594716f",
  ];
  useEffect(() => {
    const loadNews = async () => {
      const response = await axios.get(APIs[newsoption[selects || 0].num]);
      setNews(response.data.articles);
    };
    loadNews();
  }, []);

  // let res = 1;
  const [selects, setSelects] = useState();

  function change(e) {
    const loadNews = async () => {
      const response = await axios.get(APIs[newsoption[e || 0].num]);
      setNews(response.data.articles);
    };
    loadNews();
  }
  return (
    <div className="Apps">
          
      <div className="App">
        <button class="btn6" onClick={() => window.location.reload(false)}>
          Refresh
        </button>

        <h1 className="Heading">Select News</h1>

        <div className="custom-select">
          <select
            value={selects}
            onChange={(e) => {
              setSelects(e.target.value);
              change(e.target.value);
            }}
          >
            <option value="0">Apple News</option>
            <option value="1">Tesla News</option>
            <option value="2">
              Top business headlines in the US right now
            </option>
            <option value="3">Top headlines from TechCrunch right now</option>
            <option value="4">
              the Wall Street Journal in the last 6 months
            </option>
          </select>
        </div>
      </div>
      <h1 className="Heading">{newsoption[selects || 0].cat}</h1>
      <div className="Newscards">
        {news &&
          news.map((item, index) => {
            return (
              <Card
                key={index}
                hoverable
                style={{ width: "30%", margin: "auto" }}
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                cover={<img alt="image" src={item.urlToImage} />}   
              >
                <Meta title={item.title} description={item.content} />
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <Button type="primary" style={{ marginTop: "10px" }}>
                    Read More
                  </Button>
                </a>
              </Card>
            );
          })}
      </div>
    </div>
  );
}

export default Local;
