import { AlertCircle, BookOpen, Mail } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { formValidator } from "../../validator/formValidator";

interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
  general?: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });
  const { t } = useTranslation();

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateForm = () => {
    const isValidEmail = formValidator("email", formData.email).isValid;

    if (isValidEmail) {
      setErrors((prev) => ({
        ...prev,
        email: formValidator("email", formData.email).message,
      }));
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    setErrors({});

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Login successful!");
    } catch (error) {
      // setErrors({ general: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-4 rounded-full">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("auth.libraryManagementSystem")}
          </h1>
          <p className="text-gray-600">{t("auth.verifyEmail")}</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            {/* General Error Message */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{errors.general}</p>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("auth.emailAddress")}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.email ? "border-red-500" : "border-gray-300"
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

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
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
                  {t("auth.sending")}
                </span>
              ) : (
                t("auth.submit")
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t("auth.failedToSend")}{" "}
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                {t("auth.sendAgain")}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          {t("auth.authCopyright")}
        </p>
      </div>
    </div>
  );
}
