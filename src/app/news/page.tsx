import Image from "next/image";
import blot from "@/assets/BLOTT.png";
import News from "@/Components/News/News";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className=" h-full">
      <Link href='/' className="flex items-center justify-center w-full p-[16px] md:p-[24x]">
        <Image src={blot} alt="Blott logo" className="" />
      </Link>
      <News />
    </div>
  );
}
