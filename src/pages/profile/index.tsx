/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteUser, updatePassword } from "firebase/auth";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import type { RootState } from "../../store";

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
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
 
  const { t } = useTranslation();
  const { profile } = useSelector((state: RootState) => state.user);

  // Prefill from Firestore/Redux
  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        email: profile.email || "",
        phone: (profile as any).phone || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [profile]);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
 
    if (form.password && form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
 
    if (!auth.currentUser?.uid) {
  setError("User not found");
  return;
}
 
    setSaving(true);
 
    try {
     await updateDoc(
  doc(db, "users", auth.currentUser.uid),
  {
    name: form.name,
    phone: form.phone,
  }
);
 
      if (form.password && auth.currentUser) {
        await updatePassword(auth.currentUser, form.password);
      }
 
      setSuccess("Profile updated successfully!");
      setForm((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      if (err?.code === "auth/requires-recent-login") {
        setError("Please sign out and sign in again to change your password.");
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
  if (!profile || !auth.currentUser) return;

  // Admin cannot delete account
  if ((profile as any).role === "admin") {
    setError("Admin account cannot be deleted.");
    return;
  }

  const confirmDelete = window.confirm(
    "Are you sure you want to delete your account?"
  );

  if (!confirmDelete) return;

  setSaving(true);

  try {
    // Delete Firestore user document
   await deleteDoc(
  doc(db, "users", auth.currentUser.uid)
);

    // Delete Firebase Auth account
    await deleteUser(auth.currentUser);

    navigate("/");
  } catch (err: any) {
    if (err?.code === "auth/requires-recent-login") {
      setError("Please sign in again before deleting your account.");
    } else {
      setError("Failed to delete account.");
    }
  }
  finally{
    setSaving(false);
  }
};
 

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-5">
      <div className="bg-surface rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-text-primary mb-5 text-center">
          {t("profile.updateProfile")}
        </h2>

{success && (
  <div
    className="
      mb-4 rounded-lg px-4 py-3
      bg-green-100 text-green-700
      border border-green-300
    "
  >
    {success}
  </div>
)}

{error && (
  <div
    className="
      mb-4 rounded-lg px-4 py-3
      bg-red-100 text-red-700
      border border-red-300
    "
  >
    {error}
  </div>
)}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-text-primary">
              {t("Full Name")}
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2 bg-background text-text-primary
                border border-border placeholder:text-text-secondary
                focus:outline-none focus:ring-2 focus:ring-primary"
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
              // onChange={handleChange}
              disabled
              className="w-full rounded-lg px-3 py-2 bg-background text-text-primary
                border border-border placeholder:text-text-secondary
                focus:outline-none focus:ring-2 focus:ring-primary"
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
              className="w-full rounded-lg px-3 py-2 bg-background text-text-primary
                border border-border placeholder:text-text-secondary
                focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="+8801XXXXXXXXX"
            />
          </div>

          

          <hr className="my-4 border-border" />

          <h3 className="text-lg font-semibold text-text-primary">
            {t("Change Password")}
          </h3>

          <div>
            <label className="block mb-1 text-sm font-medium text-text-primary">
              {t("profile.newPassword")}
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2 bg-background text-text-primary
                border border-border placeholder:text-text-secondary
                focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="******"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-text-primary">
              {t("profile.confirmPassword")}
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2 bg-background text-text-primary
                border border-border placeholder:text-text-secondary
                focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="******"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="
              w-full btn-primary py-3 rounded-lg mt-3
              hover:opacity-90 disabled:opacity-50
            "
          >
            {saving ? "Saving..." : t("profile.updateProfile")}
          </button>

          {(profile as any)?.role !== "admin" && (
                <button
                type="button"
                onClick={handleDeleteAccount}
                className="
                  w-full py-3 rounded-lg mt-3
                  bg-red-600 text-white
                  hover:bg-red-700 transition-colors
                  disabled:opacity-50
                "
                disabled={saving}
              >
                Delete Account
              </button>
            )}
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
