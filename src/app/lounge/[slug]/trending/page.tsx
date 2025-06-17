import LoungeTrend from '@/components/Lounge/Trending/LoungeTrend'
import FeedWrapper from '@/components/Layout/FeedWrapper'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Trending | SportLaze",
    description: "Trending | SportLaze",
  };

export default function TrendingPage() {
    return (
        <FeedWrapper>
            <LoungeTrend />
        </FeedWrapper>
    )
}