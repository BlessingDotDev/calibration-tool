import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../ui/Button"
import { loginSchema, type LoginFormData } from "../../schemas/auth.schema";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const [showPassword, setShowPassword] = useState(false)

  function onSubmit(data: LoginFormData) {
    console.log("Valid login data", data)
  }

  const handleClick = () => {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          autoComplete="email"
          placeholder="you@example.com"
          className="outline-none w-full rounded-xl border border-border bg-surface 
          px-4 py-3  transition focus:border-secondary"
        />
        
        
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
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
            type={ showPassword ? "text" : "password" }
            {...register("password")}
            placeholder="Enter your password"
            autoComplete="current-password"
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
            {errors.password.message}
          </p>
        )}
      </div>  

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full cursor-pointer"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>

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