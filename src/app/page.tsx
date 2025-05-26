import BgWrapper from "@/components/Layout/BgWrapper";
import Home from "@/components/Home/Home";


export default function HomePage() {
  return (
    <BgWrapper>
      <div className="flex flex-col items-center justify-center h-full">
        <Home />
      </div>
    </BgWrapper>
  );
}