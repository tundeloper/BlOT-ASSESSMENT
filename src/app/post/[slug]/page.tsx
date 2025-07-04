import { getPost } from "@/api/feed";
import FeedWrapper from "@/components/Layout/FeedWrapper";
import PostDetail from "@/components/PostDetail";

import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(+slug);
  return {
    title: post.data?.name || 'Post Details | SportLaze',
    description: post.data?.content || 'Post Details | SportLaze', 
  };
}

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
