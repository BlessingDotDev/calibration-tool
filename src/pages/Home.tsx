import Header from '../components/layout/header/header';
import HeroSection from "../components/section/HeroSection"
import logo from "../assets/hero.jpg"
import Button from "../components/ui/Button"

function Home() {
  return (
    <>
    <Header />
      <main>
        <HeroSection 
          headerTitle="Plot Science"
          title="Graphing The Sceince"
          description="We create modern digital experiences for businesses,
            professionals, and growing brands."
          backgroundImage={logo}
        >
          <Button variant="secondary">
            Start a Project
          </Button>
        </HeroSection >
      </main>
    </>
  )
}

export default Home;