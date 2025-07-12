import { formatTime } from "@/utils/timestap";
import Image from "next/image";

const NewsList: React.FC<{ news: News }> = ({ news }) => {
  return (
    <article
      onClick={() => window.open(news.url, '_blank')}
      className="bg-transparent gap-2 md:gap-0 flex md:flex-col cursor-pointer overflow-hidden shadow-lg p-2 hover:bg-[#2A283E] transition-shadow duration-300"
    >
      {news.image && (
        <Image
          width={285}
          height={2}
          src={news.image}
          alt="Blott logo"
          className="w-[100px] md:w-full md:h-48 object-cover"
        />
      )}
      <div className="p-1">
        <div className=" flex items-center justify-between text-sm text-gray-400">
          <span>{news.source.toLocaleUpperCase()}</span>
          <span>{formatTime(news.datetime)}</span>
        </div>
        <h2 className="text-white text-[20px] font-semibold leading-snug">
          {news.headline}
        </h2>
      </div>
    </article>
  );
};

export default NewsList;
