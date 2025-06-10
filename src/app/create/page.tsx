import CreatePost from "@/components/Create";
import FeedWrapper from "@/components/Layout/FeedWrapper";
import ProtectedRoute from "@/components/protectedRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create | SportLaze",
  description: "Create post | SportLaze",
};

export default function FeedPage() {
  return (
    <ProtectedRoute>
      <FeedWrapper>
        <CreatePost />
      </FeedWrapper>
    </ProtectedRoute>
  );
}
