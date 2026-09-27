import { useState } from "react";
import { Eye, EyeOff } from "lucide-react" 

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../ui/Button"
import {  registerSchema, type RegisterFormData} from "../../schemas/auth.schema"

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const [showPassword, setShowPassword] = useState(false)

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const {name, value} =  e.target;

  //   setFormData((previousData) => ({
  //     ...previousData,
  //     [name]: value
  //   }))
  // }

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const result = registerSchema.safeParse(formData)

  //   if (!result.success) {
  //         const fieldErrors: Partial<
  //           Record<keyof RegisterFormData, string>
  //         > = {};
    
  //         result.error.issues.forEach((issue) => {
  //           const field = issue.path[0] as keyof RegisterFormData;
    
  //           fieldErrors[field] = issue.message;
  //         });
    
  //         setErrors(fieldErrors);
  //         return;
  //       }
    
  //       setErrors({});
  //       setIsSubmitting(true);
    
  //       console.log("Valid login data:", result.data);
    
  //       setTimeout(() => {
  //         setIsSubmitting(false);
  //       }, 1000);
  // }

  const handleClick = () => {
    setShowPassword((prev) => !prev)
  }

  function onSubmit (data: RegisterFormData) {
    console.log("your log in data", data)
  }
  
  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium"
        >
          Full Name
        </label>
        <input 
          id="name"
          type="text"
          {...register("name")}
          placeholder="John doe"
          autoComplete="name"
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 pr-12 outline-none transition focus:border-secondary"
        />
            {errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

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
          placeholder="johndoe@gmail.com"
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 pr-12 outline-none transition focus:border-secondary"
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
            type={showPassword ? "text": "password"}
            {...register("password")}
            placeholder="Enter password"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 pr-12 outline-none transition focus:border-secondary"
          />

          <button 
            type="button"
            onClick={handleClick}
            title={showPassword ? "Hide Password" : "Show Password"}
            className="absolute top-1/2 right-3 -translate-y-1/2"
          >
          {showPassword ? (
            <EyeOff size={18}/> 
          ) : ( 
            <Eye size={18} /> 
          )}
          </button>
        </div>

            {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-medium"
        >
          Confirm password
        </label>

        <div className="relative">
          <input 
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            {...register("confirmPassword")}
            autoComplete="password"
            placeholder="Confirm password"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 pr-12 outline-none transition focus:border-secondary"
          />

          <button 
              type="button"
              onClick={handleClick}
              title={showPassword ? "Hide Password" : "Show Password"}
              className="absolute top-1/2 right-3 -translate-y-1/2"
            >
            {showPassword ? (
              <EyeOff size={18}/> 
            ) : ( 
              <Eye size={18} /> 
            )}
            </button>
        </div>

            {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button 
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Signing up.." : "Sign up"}
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
          Already have an account?{" "}
        </span>

        <Button
          variant="navLink"
          to="/login"
          type="button"
        >
          Sign in
        </Button>
      </div>
    </form>
  )
}

export default RegisterForm;