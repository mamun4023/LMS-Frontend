/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertCircle,
  BookOpen,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { registerUser } from "../../services/auth.service";
import { createUserProfile, resolveRoleForEmail } from "../../services/user.service";
import { formValidator } from "../../validator/formValidator";

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  general?: string;
}

export default function Register() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const registerDataValidation = () => {
    const isValidName = formValidator("name", formData.name).isValid;
    const isValidEmail = formValidator("email", formData.email).isValid;
    const isValidPhone = formValidator("phoneNumber", formData.phone).isValid;
    const isValidPassword = formValidator(
      "password",
      formData.password
    ).isValid;

    if (isValidName) {
      setErrors((prev) => ({
        ...prev,
        name: formValidator("name", formData.name).message,
      }));
      return false;
    }
    if (isValidEmail) {
      setErrors((prev) => ({
        ...prev,
        email: formValidator("email", formData.email).message,
      }));
      return false;
    }
    if (isValidPhone) {
      setErrors((prev) => ({
        ...prev,
        phone: formValidator("phoneNumber", formData.phone).message,
      }));
      return false;
    }
    if (isValidPassword) {
      setErrors((prev) => ({
        ...prev,
        password: formValidator("password", formData.password).message,
      }));
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    
    if (!registerDataValidation()) {
      return;
    }
    setIsSubmitting(true);
    setErrors({});

    try{
      const role = resolveRoleForEmail(formData.email);

      // Firebase Auth Signup
      const userCredential = await registerUser(
        formData.email,
        formData.password
      );

      await createUserProfile(userCredential.user.uid, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role,
      });

      // Show success message
      setErrors({ general: "Registration successful! You can now sign in." });
      setFormData({ name: "", email: "", phone: "", password: "" });
    }catch(error: any){
      setErrors({ general: error.message || "Registration failed. Please try again." });
  } finally {
    setIsSubmitting(false);
  }
  };



  return (
    <div className="min-h-screen bg-background  flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary p-4 rounded-full">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            {t("auth.libraryManagementSystem")}
          </h1>
          <p className="text-text-secondary">{t("auth.signInToAccount")}</p>
        </div>

        {/* Login Card */}
        <div className="bg-surface rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            {/* General Error/Success Message */}
            {errors.general && (
              <div className={`rounded-lg p-4 flex items-start space-x-3 ${
                errors.general.includes("successful")
                  ? "bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800"
              }`}>
                <AlertCircle className={`w-5 h-5 mt-0.5 shrink-0 ${
                  errors.general.includes("successful")
                    ? "text-green-500"
                    : "text-red-500"
                }`} />
                <p className={`text-sm ${
                  errors.general.includes("successful")
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}>{errors.general}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                {t("profile.name")}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }));
                    setErrors((prev) => ({
                      ...prev,
                      name: formValidator("name", e.target.value).message,
                    }));
                  }}
                  placeholder={t("profile.mrJohnDoe")}
                  className={`input-field pl-10  ${
                    errors.name ? "border-red-500" : "border-border"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                {t("auth.emailAddress")}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                    setErrors((prev) => ({
                      ...prev,
                      email: formValidator("email", e.target.value).message,
                    }));
                  }}
                  placeholder={t("auth.emailPlaceholder")}
                  className={`input-field pl-10  ${
                    errors.email ? "border-red-500" : "border-border"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                {t("profile.phoneNumber")}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }));
                    setErrors((prev) => ({
                      ...prev,
                      phone: formValidator("phoneNumber", e.target.value)
                        .message,
                    }));
                  }}
                  placeholder="01712345678"
                  className={`input-field pl-10  ${
                    errors.phone ? "border-red-500" : "border-border"
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                {t("auth.password")}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                    setErrors((prev) => ({
                      ...prev,
                      password: formValidator("password", e.target.value)
                        .message,
                    }));
                  }}
                  placeholder="••••••••"
                  className={`input-field pl-10  ${
                    errors.password ? "border-red-500" : "border-border"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:opacity-80"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full btn-primary py-3 "
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t("auth.signingIn")}
                </span>
              ) : (
                t("auth.signUp")
              )}
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary">
              {t("auth.dontHaveAccount")}{" "}
              <Link
                to="/signin"
                className="text-primary hover:opacity-80 font-medium"
              >
                {t("auth.signIn")}
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-text-secondary mt-8">
          {t("auth.authCopyright")}
        </p>
      </div>
    </div>
  );
}
