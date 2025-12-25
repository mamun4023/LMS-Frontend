import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function OtpVerifyPage() {
  const { t } = useTranslation();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>(Array(4).fill(null));

  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    console.log("OTP Verified:", code);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {t("auth.verifyOTP")}
        </h2>

        <p className="text-center mb-4 text-gray-600">
          {t("auth.enterOTPCode")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  if (el) {
                    inputsRef.current[index] = el;
                  }
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-14 h-14 text-center text-xl border rounded-xl focus:ring"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            {t("auth.verify")}
          </button>
        </form>
      </div>
    </div>
  );
}
