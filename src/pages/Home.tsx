import HeroSection from "../components/section/HeroSection"
import logo from "../assets/home.jpg"
import Button from "../components/ui/Button"
import PageTransition from "../components/animation/PageTransition"

function Home() {
  return (
    <PageTransition>
      <HeroSection 
        headerTitle="Plot Science"
        title="Graphing The Sceince"
        description="We create modern digital experiences for businesses,
          professionals, and growing brands."
        backgroundImage={logo}
      >
        <Button variant="secondary" to="/plot`">
          Start a Project
        </Button>
      </HeroSection >
    </PageTransition>
  )
}

export default Home;