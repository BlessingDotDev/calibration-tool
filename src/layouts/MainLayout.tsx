import { Outlet } from "react-router-dom"
import Header from "../components/layout/header/header"
import Footer from "../components/layout/footer/Footer"

function MainLayout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
      
      <Footer />
    </>
  )
}

export default MainLayout