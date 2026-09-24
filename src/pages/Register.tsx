import RegisterForm from "../components/auth/RegisterForm";

function Register() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Welcome to Plotsci
          </h1>

          <p className="mt-2 text-sm opacity-70">
            Sign up and experince the full potential of PlotSci
          </p>
        </div>

        <RegisterForm />
      </div>
    </main>
  );
}

export default Register;