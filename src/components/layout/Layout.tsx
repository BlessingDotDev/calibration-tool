import type { ReactNode  } from "react"
import Header from "./header/header"
import Footer from "./footer/Footer"

type LayoutProps = {
  children: ReactNode
}

function Layout({children}: LayoutProps) {
  return (
    <>
      <Header />

      <main>
        {children}
      </main>

      <Footer />
    </>
  )
}

export default Layout