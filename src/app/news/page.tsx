import Image from "next/image";
import blot from "@/assets/BLOTT.png";
import Link from "next/link";
import NewsMain from "@/Components/News/NewsMain";

export default function HomePage() {
  return (
    <div className=" h-full">
      <Link href='/' className="flex items-center justify-center w-full p-[16px] md:p-[24x]">
        <Image src={blot} alt="Blott logo" className="" />
      </Link>
      <NewsMain />
    </div>
  );
}
