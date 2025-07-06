import Contributors from "../Lounge/Contributors"
import JoinLounge from "../Lounge/JoinLounge"
import LoungeNav from "../Lounge/LoungeNav"
import Stats from "../Lounge/Prediction/Stats"
import Summary from "../Lounge/Prediction/Summary"
import TopPredictors from "../Lounge/Prediction/TopPredictors"

const MainChallenge = () => {
    return <div className='flex gap-4 px-4 md:px-8 py-4 md:py-6 bg-[#F9FAFB] md:bg-[#E4E6EC] dark:bg-[#1E1E1E] w-[100%]'>
            <div className='hidden md:flex flex-col gap-4 w-[22%] h-[86vh] overflow-y-auto scrollbar-hide'>
                <JoinLounge />
                <LoungeNav />
                <Contributors />
            </div>
            <div className='flex flex-col gap-4 w-[100%] md:w-[56%] h-[86vh]'>
                <div>sjs</div>
            </div>
            <div className='hidden md:flex flex-col gap-4 w-[22%] h-[86vh] overflow-y-auto scrollbar-hide'>
                <TopPredictors />   
                <Stats />
                <Summary />
            </div>
        </div>
}

export default MainChallenge