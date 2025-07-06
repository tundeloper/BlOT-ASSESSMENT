
import FeedWrapper from "@/components/Layout/FeedWrapper";
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
          <div>wkw</div>
        </ FeedWrapper>
    </ProtectedRoute>
  );
}
