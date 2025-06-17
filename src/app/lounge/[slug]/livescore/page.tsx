import ScorePage from '@/components/Lounge/Livescore/ScorePage'
import FeedWrapper from '@/components/Layout/FeedWrapper'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Livescore | SportLaze",
    description: "Livescore | SportLaze",
  };

export default function LivescorePage() {
    return (
        <FeedWrapper>
            <ScorePage />
        </FeedWrapper>
    )
}