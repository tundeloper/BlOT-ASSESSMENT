"use client";
import { fetchMarketNews } from "@/api/base";
import axios from "axios";
import { useEffect, useState } from "react";
import NewsList from "./NewsList";

const NewsMain: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        setloading(true);
        fetchMarketNews().then(setNews);
        setloading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            setError("Something went wrong. Please try again later.");
          } else {
            setError("Something went wrong. Please try again later.");
          }
            setError("Something went wrong. Please try again later.");

        }
        setloading(false);
      }
    })();
  }, []);
  return (
    <div className="p-[10px] md:px-[24px]">
      <div className="text-[24px] md:text-[48px] font font-bold text-[#ffffff]">
        News
      </div>
      {loading && (
          <div className="flex justify-center items-center text-2xl text-[#ffffff]">
            Loading...
          </div>
        )}
        {error.length > 0 && (
          <div className="flex justify-center items-center text-[#ffffff]">
            {error}
          </div>
        )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {news.map((news, i) => (
          <NewsList key={i} news={news} />
        ))}
      </div>
    </div>
  );
};

export default NewsMain;
