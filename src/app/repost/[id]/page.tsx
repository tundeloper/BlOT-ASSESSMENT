import FeedWrapper from "@/components/Layout/FeedWrapper";
import RepostMain from "@/components/CreateRepost/RepostMain";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Repost | SportLaze",
    description: "Repost | SportLaze",
};

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return (
        <FeedWrapper>
            <RepostMain postID={id} />
        </FeedWrapper>
    );
}
