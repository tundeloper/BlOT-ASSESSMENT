import Prediction from '@/components/Lounge/Prediction/Prediction'
import FeedWrapper from '@/components/Layout/FeedWrapper'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Sport Prediction | SportLaze",
    description: "Sport Prediction | SportLaze",
  };

export default function PredictionPage() {
    return (
        <FeedWrapper>
            <Prediction />
        </FeedWrapper>
    )
}