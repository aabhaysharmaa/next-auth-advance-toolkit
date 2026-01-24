import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ['latin'],
  weight: ["600"]
})

const Home = () => {
  return (
    <main className='flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,#38bdf8,#075985)]'>
      <div className="space-y-4 flex flex-col items-center
      ">
        <h1 className={cn("text-6xl  text-white font-bold drop-shadow-md", font.className)}>🔐Auth</h1>
        <p className="text-white text-xl">A Advance Authentication System</p>
        <div className="">
          <LoginButton mode="modal" asChild >
            <Button variant="secondary" className="font-semibold" size="lg">SignIn</Button>
          </LoginButton>
        </div>
      </div>

    </main>
  )
}

export default Home
