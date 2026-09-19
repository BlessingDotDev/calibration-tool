
import HeroSection from "../components/section/HeroSection"
import logo from "../assets/hero.jpg"
import Button from "../components/ui/Button"

function About() {
  return (
    <HeroSection 
      headerTitle="About PlotSci"
      title="Calibration Tool"
      description="PlotSci is a Professional Calibration tool for assistance to 
      professional analyst and science students"
      backgroundImage={logo}
    >
      <Button variant="secondary">
        Start a Project
      </Button>
    </HeroSection >
  )
}

export default About;