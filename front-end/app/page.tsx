"use client"

import Head from 'next/head'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const Home: React.FC = () =>
   {
  const router = useRouter();

  const handleLogin = () => {
    // Redirect to your Flask login endpoint
    window.location.href = 'http://localhost:5000/login'
  }
  return (
    <>
      <Head>
        <title>SaveSquad - Home</title>
        <meta name="description" content="Welcome to SaveSquad" />
      </Head>
      <Header></Header>
            <section className="w-full h-[85vh] py-12 md:py-24 lg:py-32 pb-[0]">
                <div className="pt-[0] mt-[0]">
                    <h1 className="text-3xl pt-[0] mt-[0] font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-center">
                    Welcome to SaveSquad
                    </h1>
                    <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 text-center pt-[10px]">
                    Create savings challenges, compete with friends, and earn rewards!
                    </p>
                </div>
                <div className="flex justify-center mt-4 pt-[20px] pb-[0px]">
                    <Button onClick={handleLogin}>
                        Sign Up
                    </Button>
                    <Button onClick={handleLogin} style={{marginLeft:"20px"}}>
                        Login
                    </Button>
                </div>
                <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/money-savings-illustration-download-in-svg-png-gif-file-formats--saving-locker-earnings-safe-box-coin-collecting-business-investment-pack-finance-illustrations-4528713.png?f=webp"
                alt="Animated graphic"
                className="mx-auto block pt-[0px]"
                width="23%"
            />
            </section>
      <Footer></Footer>
    </>
  )
}

export default Home
