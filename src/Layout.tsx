import type { ReactNode  } from "react"
import Header from "./components/layout/header/header"

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
    </>
  )
}

export default Layout