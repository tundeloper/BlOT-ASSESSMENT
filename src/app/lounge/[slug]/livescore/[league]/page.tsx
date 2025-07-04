import LeagueScores from '@/components/Lounge/Livescore/League/LeagueScores'
import FeedWrapper from '@/components/Layout/FeedWrapper'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "League Scores | SportLaze",
    description: "League Scores | SportLaze",
  };

export default function LeagueScoresPage() {
    return (
        <FeedWrapper>
            <LeagueScores />
        </FeedWrapper>
    )
}