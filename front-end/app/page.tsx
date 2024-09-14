import Head from 'next/head'
import Header from './components/common/Header'
import Footer from './components/common/Footer'

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>SaveSquad - Home</title>
        <meta name="description" content="Welcome to SaveSquad" />
      </Head>
      <Header />

      <Footer />
    </>
  )
}

export default Home
