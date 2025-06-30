import FeedWrapper from "@/components/Layout/FeedWrapper";
import PostDetail from "@/components/PostDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "post details | SportLaze",
  description: "post details | SportLaze",
};

interface PostPageProps {
  params: {
    slug: string;
  };
}


export default function FeedPage({params}: PostPageProps) {
    const { slug } = params;
  return (
    <FeedWrapper>
      <PostDetail id={slug} />
    </FeedWrapper>
  );
}