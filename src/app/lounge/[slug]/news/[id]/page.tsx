import NewsDetail from '@/components/Lounge/News/NewsDetails/NewsDetail'
import FeedWrapper from '@/components/Layout/FeedWrapper'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Sport News | SportLaze",
    description: "Sport News | SportLaze",
  };

export default function NewsDetailPage() {
    return (
        <FeedWrapper>
            <NewsDetail />
        </FeedWrapper>
    )
}