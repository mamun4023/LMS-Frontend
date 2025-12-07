import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface TextProps {
  children: ReactNode;
}

export const Text = ({ children }: TextProps) => {
  const { t } = useTranslation();

  // If children is string → use it as translation key
  const key = typeof children === "string" ? children : "";

  return <>{t(key)}</>;
};
