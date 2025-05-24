import AuthCard from "@/components/auth/card";
import ThemeToggleButton from "@/components/ThemeToggle";
// import BorderLink from "@/components/ui/borderedLink";
import CustomLink from "@/components/ui/gradientLink";
import Link from "next/link";

export default function HomePage() {
  return (
    <AuthCard>
        <ThemeToggleButton />
       <h2 className="text-gray-800 dark:text-white font-semibold text-lg mb-6">
          Experience Sports Like Never Before
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4 mb-4">
         <CustomLink href="/home"className="px-4 py-2 rounded-md bg-primary text-white hover:bg-gradient-to-b hover:from-[#463a85] hover:to-[#9a1b39] text-sm font-medium transition">
          Get Started
         </CustomLink>
       
          <Link
            href="/auth/login"
            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 text-sm font-medium transition"
          >
            Login
          </Link>
        </div> 
    </AuthCard>
  );
}