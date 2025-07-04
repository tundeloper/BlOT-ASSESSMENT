import News from '@/components/Lounge/News/News'
import FeedWrapper from '@/components/Layout/FeedWrapper'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Sport News | SportLaze",
    description: "Sport News | SportLaze",
  };

export default function NewsPage() {
    return (
        <FeedWrapper>
            <News />
        </FeedWrapper>
    )
}