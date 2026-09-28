
import HeroSection from "../components/section/HeroSection";
import ContactSection from "../components/section/ContactSection";
import HelpSection from "../components/section/HelpSection";

import contactImage from "../assets/contact.jpg";

import Button from "../components/ui/Button";
import PageTransition from "../components/animation/PageTransition";

function Contact() {
  return (
    <>
      <title>Contact Us</title>

      <PageTransition>
        <HeroSection
          headerTitle="Get In Touch"
          title="Let's Talk Science"
          description="Have a question, suggestion, or need help with PlotSci? We'd love to hear from you."
          backgroundImage={contactImage}
        >
          <a href="#contact">
            <Button variant="secondary">
              Contact Us
            </Button>
          </a>
          
        </HeroSection>

        <ContactSection />

        <HelpSection />
      </PageTransition>
    </>
  );
}

export default Contact;
