
import FeedWrapper from "@/components/Layout/FeedWrapper";
import ChallengesPage from "@/components/Lounge/Challenges/Main";
import ProtectedRoute from "@/components/protectedRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create | SportLaze",
  description: "Create post | SportLaze",
};

export default function Page() {
  return (
    <ProtectedRoute>
        <FeedWrapper>
          <ChallengesPage />
        </ FeedWrapper>
    </ProtectedRoute>
  );
}
