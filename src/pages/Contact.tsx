
import HeroSection from "../components/section/HeroSection";
import ContactSection from "../components/section/ContactSection";
import HelpSection from "../components/section/HelpSection";

import contactImage from "../assets/contact.jpg";

import Button from "../components/ui/Button";

function Contact() {
  return (
    <>
      <HeroSection
        headerTitle="Get In Touch"
        title="Let's Talk Science"
        description="Have a question, suggestion, or need help with PlotSci? We'd love to hear from you."
        backgroundImage={contactImage}
      >
        <Button variant="secondary">
          Contact Us
        </Button>
      </HeroSection>

      <ContactSection />

      <HelpSection />
    </>
  );
}

export default Contact;
