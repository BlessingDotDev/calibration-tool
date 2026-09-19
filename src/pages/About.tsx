
import HeroSection from "../components/section/HeroSection";
import aboutImage from "../assets/about.jpg";
import Button from "../components/ui/Button";

function About() {
  return (
    <HeroSection
      headerTitle="About PlotSci"
      title="Science Made Simpler"
      description="PlotSci is designed to make scientific data analysis and calibration curve plotting simple, clear, and accessible."
      backgroundImage={aboutImage}
    >
      <Button variant="secondary">
        Learn More
      </Button>
    </HeroSection>
  );
}

export default About;
