import { CircleUser } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface ProfileForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const ProfileUpdate: React.FC = () => {
  const [form, setForm] = useState<ProfileForm>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Profile Updated:", form);
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-5 text-center">
          {t("profile.updateProfile")}
        </h2>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center mb-6">
          <CircleUser className="w-24 h-24 rounded-full object-cover mb-3" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">{t("Full Name")}</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder={t("profile.enterYourName")}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">{t("Email")}</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">{t("Phone")}</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="+8801XXXXXXXXX"
            />
          </div>

          <hr className="my-4" />

          <h3 className="text-lg font-semibold">{t("Change Password")}</h3>

          <div>
            <label className="block mb-1 font-medium">
              {t("profile.newPassword")}
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="******"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              {t("profile.confirmPassword")}
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="******"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg mt-3 font-medium hover:bg-blue-700 transition"
          >
            {t("profile.updateProfile")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
