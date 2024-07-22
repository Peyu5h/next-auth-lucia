import React, { FC } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  placeholder?: string;
  showPass?: boolean;
  setShowPass?: (show: boolean) => void;
  className?: string; // Add this line to include `className`
}

const InputField: FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  showPass,
  setShowPass,
  className, // Add this line to destructure `className`
}) => {
  return (
    <div className={`form-group flex flex-col ${className}`}>
      {' '}
      {/* Use the className */}
      <label
        htmlFor={id}
        className="text-light-text dark:text-dark-text mb-2 ml-1 text-sm font-medium"
      >
        {label}
      </label>
      <div className="relative">
        <input
          className="dark:bg-dark-input bg-light-input dark:bg-dark-input text-light-text dark:text-dark-text placeholder:text-light-placeholder dark:placeholder:text-dark-placeholder w-full rounded-lg bg-input px-4 py-3 text-sm outline-none placeholder:font-light"
          id={id}
          name={id}
          type={setShowPass ? (showPass ? 'text' : 'password') : 'text'}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required
        />
        {id === 'password' && showPass !== undefined && setShowPass && (
          <div className="text-light-icon dark:text-dark-icon absolute right-5 top-3 text-lg">
            {showPass ? (
              <FaRegEye
                onClick={() => setShowPass(false)}
                className="cursor-pointer"
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => setShowPass(true)}
                className="cursor-pointer"
              />
            )}
          </div>
        )}
      </div>
      {touched && error && (
        <div className="ml-1 mt-1 text-xs text-destructive dark:text-destructive">
          {error}
        </div>
      )}
    </div>
  );
};

export default InputField;
