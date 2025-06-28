import LazeAI from "@/components/LazeAI/LazeAI";
import FeedWrapper from "@/components/Layout/FeedWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "LazeAI | SportLaze",
    description: "LazeAI | SportLaze",
};


export default function LazePage() {
    return (
        <FeedWrapper>
            <LazeAI />
        </FeedWrapper>
    );
}