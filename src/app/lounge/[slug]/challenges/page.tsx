
import FeedWrapper from "@/components/Layout/FeedWrapper";
import LeaguePage from "@/components/Lounge/League";
import ProtectedRoute from "@/components/protectedRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create | SportLaze",
  description: "Create post | SportLaze",
};

export default function League() {
  return (
    <ProtectedRoute>
        <FeedWrapper>
            <LeaguePage />
        </ FeedWrapper>
    </ProtectedRoute>
  );
}
