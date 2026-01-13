import React, { useState } from "react";
import { formValidator } from "../../validator/formValidator";

interface FormData {
  oldPassword: string;
  newPassword: string;
}

interface FormErrors {
  oldPassword?: string;
  newPassword?: string;
}

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState<FormData>({
    oldPassword: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const isValidOldPassword = formValidator(
      "password",
      formData.oldPassword
    ).isValid;
    const isValidNewPassword = formValidator(
      "password",
      formData.newPassword
    ).isValid;

    if (isValidOldPassword) {
      setErrors((prev) => ({
        ...prev,
        oldPassword: formValidator("password", formData.oldPassword).message,
      }));
      return false;
    }
    if (isValidNewPassword) {
      setErrors((prev) => ({
        ...prev,
        newPassword: formValidator("password", formData.newPassword).message,
      }));
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center  p-4">
      <div className="bg-surface shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-text-primary text-center mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-text-primary">
              New Password
            </label>
            <input
              type="password"
              name="Old Password"
              value={formData.oldPassword}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  oldPassword: e.target.value,
                }));
                setErrors((prev) => ({
                  ...prev,
                  oldPassword: formValidator("password", e.target.value)
                    .message,
                }));
              }}
              placeholder="••••••••"
              required
              className="w-full border p-3 rounded-xl focus:ring"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-text-primary">
              Confirm Password
            </label>
            <input
              type="password"
              name="New Password"
              value={formData.newPassword}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }));
                setErrors((prev) => ({
                  ...prev,
                  newPassword: formValidator("password", e.target.value)
                    .message,
                }));
              }}
              placeholder="••••••••"
              required
              className="w-full border p-3 rounded-xl focus:ring"
            />
          </div>

          <button
            type="submit"
            className="w-full btn-primary py-3 hover:opacity-90 rounded-xl"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
