
import HeroSection from "../components/section/HeroSection";
import plotGraphImage from "../assets/project.jpg";
import Button from "../components/ui/Button";

function PlotGraph() {
  return (
    <HeroSection
      headerTitle="PlotSci"
      title="Plot Your Science"
      description="Create accurate calibration curves, analyse your data, and visualise scientific results with ease."
      backgroundImage={plotGraphImage}
    >
      <Button variant="secondary">
        Start Plotting
      </Button>
    </HeroSection>
  );
}

export default PlotGraph;
