import Image from "next/image";
import React from "react";
import football from "@/assets/football_dummy.png";
import LoungeGrid from "./LoungList";
import { Share, Users } from "lucide-react";

// interface Lounge {
//   id: number;
//   title: string;
//   imageUrl: string;
//   members: number;
// }

// const lounges: Lounge[] = [
//   {
//     id: 1,
//     title: "Basket Ball",
//     imageUrl: "/images/basketball.jpg",
//     members: 8.9,
//   },
//   { id: 2, title: "Football", imageUrl: "/images/football.jpg", members: 8.8 },
//   { id: 3, title: "The NFL", imageUrl: "/images/nfl.jpg", members: 9.1 },
//   { id: 4, title: "Tennis", imageUrl: "/images/tennis.jpg", members: 9.0 },
//   { id: 5, title: "Golf", imageUrl: "/images/golf.jpg", members: 8.5 },
//   { id: 6, title: "Boxing", imageUrl: "/images/boxing.jpg", members: 8.7 },
// ];

const Lounges: React.FC = () => {
  return (
    <div className={`w-full bg-contain `}>
      {/* Header with background image and overlay */}
      <div
        className={`relative w-full h-[25vh] md:h-[65vh] bg-cover bg-center  ${
          ""
          // darkMode ? "gradient-mask-dark" : "gradient-mask"
        }`}
        style={{
          backgroundImage: `
      linear-gradient(to bottom, #14141414, #14141414, #ffffffc8, #f5f5f5d3),
      url('https://populous.com/uploads/2018/01/Tottenham-Hotspur-Stadium_1-1-1200x675-c-center.jpg')
    `,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#00000000] via-[#ffffff00] to-[#ffffff]" />
        <div className="absolute hidden inset-0 md:flex flex-col items-center justify-center px-4">
          <h2 className="text-4xl sm:text-[39px] font-medium text-[#FFFFFF] text-center">
            Discover Lounges
          </h2>
          <p className="mt-2 text-[20px] font-medium text-[#FFFFFF] text-center max-w-[600px]">
            Join communities built around your favorite sports. Talk, share, and
            stay updated with fans like you.
          </p>
        </div>

        {/* Decorative oval at top center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full opacity-50 blur-3xl" />
      </div>

      {/* Lounges Section */}
      <div className="mx-auto px-[16px] md:px-[64px] py-[16px]">
        <h3 className="md:text-[31px] font-semibold text-[#1E1E1E] mb-6">
          Top Lounges
        </h3>
        <div className="flex flex-col md:flex-rowitems-start justify-center-center gap-3 md:gap-6 w-full">
          
          {/* first row */}
          <div className="flex flex-col-reverse md:flex-row items-start justify-center gap-3 md:gap-6 overflow-x-auto scrollbar-hide w-full">

          <div className="flex flex-row md:flex-col items-start gap-3 md:gap-6 w-full">
          {/* first colum and first row */}
          <div className="relative rounded-sm overflow-hidden w-full shadow-lg bg-[#fffff] ">
          <div className="relative row-start-1 h-[200px] md:h-[300px] w-full">
            <Image width={300} height={300} src={football} alt="Basket Ball" className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="row-start-2 p-4 flex flex-col justify-end">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-gray-700">
                <Users className="w-5 h-5" />
                <span>8.9k</span>
              </div>
              <button className="p-4 bg-[#E4E6EC] cursor-pointer hover:bg-[#2D439B] text-[#fffff] rounded-full transition" aria-label="Join lounge">
                <Share className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer rotate-90 " />
              </button>
            </div>
            <h4 className="text-lg font-semibold text-gray-900">Basket Ball</h4>
          </div>
        </div>
        
        {/* first colum and second row */}
        <div className="relative rounded-sm overflow-hidden w-full shadow-lg bg-white ">
          <div className="relative row-start-1 h-[200px] md:h-[500px] w-full">
            <Image width={300} height={300} src={football} alt="Basket Ball" className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="row-start-2 p-4 flex flex-col justify-end">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-gray-700">
                <Users className="w-5 h-5" />
                <span>8.9k</span>
              </div>
              <button className="p-4 bg-[#E4E6EC] cursor-pointer hover:bg-[#2D439B] text-white rounded-full  transition" aria-label="Join lounge">
                <Share className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer rotate-90 " />
              </button>
            </div>
            <h4 className="text-lg font-semibold text-gray-900">Tennis</h4>
          </div>
        </div>
        </div>
        
        <div className="flex flex-row md:flex-col items-start gap-3 md:gap-6 w-full">
          {/* second colum and first row */}
        <div className="relative rounded-sm overflow-hidden w-full shadow-lg bg-white ">
          <div className="relative row-start-1 h-[200px] md:h-[500px] w-full">
            <Image width={300} height={300} src={football} alt="Basket Ball" className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="row-start-2 p-4 flex flex-col justify-end">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-gray-700">
                <Users className="w-5 h-5" />
                <span>8.9k</span>
              </div>
              <button className="p-4 bg-[#E4E6EC] cursor-pointer hover:bg-[#2D439B] text-white rounded-full  transition" aria-label="Join lounge">
                <Share className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer rotate-90 " />
              </button>
            </div>
            <h4 className="text-lg font-semibold text-gray-900">The NFL</h4>
          </div>
        </div>

        {/* second colum and second row */}
        <div className="relative rounded-sm overflow-hidden w-full shadow-lg bg-white ">
          <div className="relative row-start-1 h-[200px] md:h-[300px] w-full">
            <Image width={300} height={300} src={football} alt="Basket Ball" className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="row-start-2 p-4 flex flex-col justify-end">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-gray-700">
                <Users className="w-5 h-5" />
                <span>8.9k</span>
              </div>
              <button className="p-4 bg-[#E4E6EC] cursor-pointer hover:bg-[#2D439B] text-white rounded-full  transition" aria-label="Join lounge">
                <Share className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer rotate-90 " />
              </button>
            </div>
            <h4 className="text-lg font-semibold text-gray-900">Golf</h4>
          </div>
        </div>
        </div>

        <div className="flex flex-row md:flex-col items-start gap-3 md:gap-6 w-full">
          {/* third colum and first row */} 
        <div className="relative rounded-sm overflow-hidden w-full shadow-lg bg-white ">
          <div className="relative row-start-1 h-[200px] md:h-[300px] w-full">
            <Image width={300} height={300} src={football} alt="Basket Ball" className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="row-start-2 p-4 flex flex-col justify-end">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-gray-700">
                <Users className="w-5 h-5" />
                <span>8.9k</span>
              </div>
              <button className="p-4 bg-[#E4E6EC] cursor-pointer hover:bg-[#2D439B] text-white rounded-full  transition" aria-label="Join lounge">
                <Share className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer rotate-90 " />
              </button>
            </div>
            <h4 className="text-lg font-semibold text-gray-900">Football</h4>
          </div>
        </div>

        <div className="relative rounded-sm overflow-hidden w-full shadow-lg bg-white ">
          <div className="relative row-start-1 h-[200px] md:h-[500px] w-full">
            <Image width={300} height={300} src={football} alt="Basket Ball" className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="row-start-2 p-4 flex flex-col justify-end">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-gray-700">
                <Users className="w-5 h-5" />
                <span>8.9k</span>
              </div>
              <button className="p-4 bg-[#E4E6EC] cursor-pointer hover:bg-[#2D439B] text-white rounded-full  transition" aria-label="Join lounge">
                <Share className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer rotate-90 " />
              </button>
            </div>
            <h4 className="text-lg font-semibold text-gray-900">Boxing</h4>
          </div>
        </div>
        </div>
        {/* end  */}
        </div>
        </div>
      </div>

      {/* Lounges Section End */}
      <div className="mx-auto px-[16px] md:px-[64px] py-[16px] md:py-[64px]  rounded-lg shadow-lg">
        <LoungeGrid />
      </div>
    </div>
  );
};

export default Lounges;
