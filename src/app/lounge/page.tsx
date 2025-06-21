import FeedWrapper from "@/components/Layout/FeedWrapper";
import Lounges from "@/components/Lounge";
import ProtectedRoute from "@/components/protectedRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create | SportLaze",
  description: "Create post | SportLaze",
};

export default function Lounge() {
  return (
    <ProtectedRoute>
      <FeedWrapper>
        <Lounges/>
      </FeedWrapper>
    </ProtectedRoute>
  );
}
