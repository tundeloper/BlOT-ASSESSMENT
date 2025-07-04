import Details from '@/components/Lounge/Livescore/Details/Details'
import FeedWrapper from '@/components/Layout/FeedWrapper'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Match Details | SportLaze",
    description: "Match Details | SportLaze",
  };

export default function DetailsPage() {
    return (
        <FeedWrapper>
            <Details />
        </FeedWrapper>
    )
}