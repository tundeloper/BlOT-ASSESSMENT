interface Livescore {
    id: number;
    date: string;
    status: string;
    elapsed: number;
    league: League;
    teams: {
        home: Team;
        away: Team;
    },
    goals: {
        home: number;
        away: number;
    },
    score: {
        halftime: {
            home: number;
            away: number;
        },
        fulltime: {
            home: number | null;
            away: number | null;
        },
        extratime: {
            home: number | null;
            away: number | null;
        },
        penalty: {
            home: number | null;
            away: number | null;
        }
    },
    venue: {
        id: number;
        name: string;
        city: string;
    }
}

interface League {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
}

interface Team {
    id: number;
    name: string;
    logo: string;
}