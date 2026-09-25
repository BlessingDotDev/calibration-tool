import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <main className="min-h-screen bg-surface flex items-center justify-center px-4">
      <Outlet />
    </main>
  );
}

export default AuthLayout;