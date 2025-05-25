import AuthCard from "@/components/auth/card";
import ThemeToggleButton from "@/components/ThemeToggle";
import GradientButton from "@/components/ui/gradientButton";
// import BorderLink from "@/components/ui/borderedLink";
import Link from "next/link";

export default function HomePage() {
  return (
    <AuthCard>
        <ThemeToggleButton />
       <h2 className="text-gray-800 dark:text-white font-semibold text-lg mb-6">
          Experience Sports Like Never Before
        </h2>

       <div className="flex gap-3">
               <GradientButton
                //  onClick={handleNext}
                 className="bg-primary font-semibold flex-1 text-white px-4 py-2 rounde transition"
               >
                 Next
               </GradientButton>
               <Link
               href='/auth/login'
                //  onClick={handleSkip}
                 className="bg-gray-200 font-semibold flex-1 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
               >
                 Skip
               </Link>
             </div>
    </AuthCard>
  );
}