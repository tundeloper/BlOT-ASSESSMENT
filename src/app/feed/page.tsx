import FeedMain from "@/components/Feed/FeedMain";
import FeedWrapper from "@/components/Layout/FeedWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feed | SportLaze",
  description: "Feed | SportLaze",
};


export default function FeedPage() {
  return (
    <FeedWrapper>
      <FeedMain />
    </FeedWrapper>
  );
}