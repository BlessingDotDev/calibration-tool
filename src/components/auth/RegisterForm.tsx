import { useState } from "react";
import {  registerSchema, type RegisterFormData} from "../../schemas/auth.schema"
import Button from "../ui/Button"
import { Eye, EyeOff } from "lucide-react" 

function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password:"",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({})

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} =  e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = registerSchema.safeParse(formData)

    if (!result.success) {
          const fieldErrors: Partial<
            Record<keyof RegisterFormData, string>
          > = {};
    
          result.error.issues.forEach((issue) => {
            const field = issue.path[0] as keyof RegisterFormData;
    
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
    setShowPassword((prev) => !prev)
  }
  
  return (
    <form 
      onSubmit={handleSubmit}
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
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="John doe"
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 pr-12 outline-none transition focus:border-secondary"
        />
            {errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name}
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
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="johndoe@gmail.com"
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 pr-12 outline-none transition focus:border-secondary"
        />
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
            type={showPassword ? "text": "password"}
            value={formData.password}
            onChange={handleChange}
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
            {errors.password}
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
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
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
            {errors.confirmPassword}
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