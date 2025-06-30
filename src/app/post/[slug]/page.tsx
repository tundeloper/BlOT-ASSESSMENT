import FeedWrapper from "@/components/Layout/FeedWrapper";
import PostDetail from "@/components/PostDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "post details | SportLaze",
  description: "post details | SportLaze",
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <FeedWrapper>
      <PostDetail id={slug} />
    </FeedWrapper>
  );
}
