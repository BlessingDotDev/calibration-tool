import type { ChangeEvent } from "react";

interface FormInputProps {
  id: string;
  label: string;
  name: string;
  type?: "text" | "email" | "password";
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

function FormInput({
  id,
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
}: FormInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-xl border border-border bg-surface px-4 py-3 outline-none transition focus:border-secondary disabled:cursor-not-allowed disabled:opacity-50"
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormInput;
