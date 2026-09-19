import type { ReactNode } from "react"
import clsx from "clsx";

type HeroSectionProps = {
  headerTitle: string;
  title: string;
  description?: string;
  backgroundImage: string;
  children?: ReactNode;
  className?: string;
}

function HeroSection({
  headerTitle,
  title,
  description,
  backgroundImage,
  children,
  className,
}: HeroSectionProps) {
  return (
    <section className={clsx(
      `relative bg-surface 
      max-w-5xl mx-auto rounded-2xl bg-cover 
      bg-center overflow-hidden`,
      className ? className : 'min-h-screen'
    )}
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
    >
      <div className="absolute inset-0 bg-black/60"/>

       <div className={clsx(
        "relative z-10 flex  items-center px-6 sm:px-10 lg:px-20",
        className ? className : 'min-h-[80vh]'
       )}>
        <div className={clsx(
          "  max-w-2xl text-text flex flex-col items-start justify-between",
          className || 'min-h-[60vh]'
        )}>
          <p className="mb-8 text-sm font-semibold uppercase tracking-[0.25em] text-text ">
            {headerTitle}
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl text-secondary">
            {title}
            <br />
          </h1>

          <p className=" max-w-xl text-lg leading-relaxed  text-text/80">
           {description}
          </p>

          {children}
        </div>
       </div>
      
    </section>
  )
}

export default HeroSection;