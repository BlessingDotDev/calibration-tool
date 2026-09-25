import { Outlet } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function AuthLayout() {
  return (
    <main className=" relative min-h-screen flex items-center justify-center px-4">
      <button 
        title="Go Back"
        className="absolute left-2 top-5"
        onClick={() => {window.history.back()}}
      >
  
        <ArrowLeft size={24} strokeWidth={1.5}/>
      </button>

      <Outlet />
    </main>
  );
}

export default AuthLayout;