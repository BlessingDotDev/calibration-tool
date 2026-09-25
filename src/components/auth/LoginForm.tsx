import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"
import { loginSchema, type LoginFormData } from "../../schemas/auth.schema";
import Button from "../ui/Button"

function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginFormData, string>>
  >({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<
        Record<keyof LoginFormData, string>
      > = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof LoginFormData;

        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    console.log("Valid login data:", result.data);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  }

  const handleClick = () => {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="outline-none w-full rounded-xl border border-border bg-surface 
          px-4 py-3  transition focus:border-secondary"
        >
        </input>
        
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium"
        >
          Password
        </label>

        <div className="relative">
          <input
            id="password"
            name="password"
            type={ showPassword ? "text" : "password" }
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 outline-none transition focus:border-secondary"
          />

          <button
            type="button"
            onClick={handleClick}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 opacity-70 hover:opacity-100"
          >
            { showPassword ? (
              <EyeOff size={20}/> 
            ) : (
              <Eye size={20}/>
            )}
          </button>
        </div>

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-secondary px-4 py-3 font-medium transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>

       <div className="flex justify-end">
        <button
          type="button"
          className="text-sm text-secondary transition hover:opacity-80"
        >
          Forgot password?
        </button>
      </div>

      <div className="text-center text-sm">
        <span className="opacity-70">
          Don't have an account?{" "}
        </span>

        <Button
          variant="navLink"
          to="/register"
          type="button"
        >
          Create an account
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;