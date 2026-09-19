import hero from "../../assets/hero.jpg"
import Button from "../ui/Button"


function Hero() {
  return (
    <section className="relative min-h-screen bg-surface 
      max-w-5xl mx-auto rounded-2xl bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${hero})`
      }}
    >
      <div className="absolute inset-0 bg-black/60"/>

       <div className="relative z-10 flex min-h-[80vh] items-center px-6 sm:px-10 lg:px-20">
        <div className=" min-h-[60vh] max-w-2xl text-text flex flex-col items-start justify-between">
          <p className="mb-8 text-sm font-semibold uppercase tracking-[0.25em] text-text ">
            Plot Science
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl text-secondary">
            Graphing The Sceince
            <br />
          </h1>

          <p className=" max-w-xl text-lg leading-relaxed  text-text/60">
            We create modern digital experiences for businesses,
            professionals, and growing brands.
          </p>

          <Button variant="secondary">
            Start a Project
          </Button>
        </div>
       </div>
      
    </section>
  )
}

export default Hero;