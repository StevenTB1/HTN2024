import Footer from "@/app/components/common/Footer";
import Header from "@/app/components/common/Header";
import ChallengeTabs from "@/app/components/dashboard/ChallengeTabs";
import CreateChallengeForm from "@/app/components/dashboard/CreateChallengeForm";

export default function Challenges(){
    return(
        <>
            <Header></Header>
            <ChallengeTabs/>
            <CreateChallengeForm/>
            <Footer></Footer>
        </>
    )
}