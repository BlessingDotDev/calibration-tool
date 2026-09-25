import { Outlet } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../components/ui/Button";

function AuthLayout() {
  return (
    <main className=" relative min-h-screen flex items-center justify-center px-4">
      <button 
        title="Go Back"
        className="absolute left-2 top-5"
      >
        <Button  variant="navLink" to="/">
          <ArrowLeft size={24} strokeWidth={1.5}/>
        </Button>
      </button>

      <Outlet />
    </main>
  );
}

export default AuthLayout;