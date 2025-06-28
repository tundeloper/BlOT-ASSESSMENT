import Channels from '@/components/Lounge/Channels/Channels'
import FeedWrapper from '@/components/Layout/FeedWrapper'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Channels | SportLaze",
    description: "Channels | SportLaze",
  };

export default function ChannelsPage() {
    return (
        <FeedWrapper>
            <Channels />
        </FeedWrapper>
    )
}