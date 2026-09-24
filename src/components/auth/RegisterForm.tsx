import { useState } from "react";
import {  registerSchema, type RegisterFormData} from "../../schemas/auth.schema"

function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password:"",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({})

  const [isSubmitting, setIsSubmitting] = useState(false)

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
        <input 
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 pr-12 outline-none transition focus:border-secondary"
        />
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
        <input 
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm password"
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 pr-12 outline-none transition focus:border-secondary"
        />
            {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <button 
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-secondary px-4 py-3 font-medium transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Signing up.." : "Sign up"}
      </button>
    </form>
  )
}

export default RegisterForm;