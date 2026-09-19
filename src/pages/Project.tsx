
import HeroSection from "../components/section/HeroSection";
import plotGraphImage from "../assets/project.jpg";

function PlotGraph() {
  return (
    <HeroSection
      headerTitle="PlotSci"
      title="Plot Your Science"
      description="Create accurate calibration curves, analyse your data, and visualise scientific results with ease."
      backgroundImage={plotGraphImage}
      className="min-h-[40vh] py-6"
    >
    </HeroSection>
  );
}

export default PlotGraph;
