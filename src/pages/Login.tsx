import LoginForm from "../components/auth/LoginForm";

function Login() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Welcome back
          </h1>

          <p className="mt-2 text-sm opacity-70">
            Sign in to continue to PlotSci
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}

export default Login;