import { Book, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MENUS } from "../../constants/menus";
import type { AppDispatch, RootState } from "../../store";
import { logoutUser } from "../../store/slices/authSlice";
import { Text } from "../common/Text";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./themToggler";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const { user } = useSelector((state: RootState) => state.auth);
  const { profile } = useSelector((state: RootState) => state.user);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const navClass = (path: string) =>
    `transition ${
      isActive(path)
        ? "text-primary font-medium"
        : "text-text-secondary hover:text-primary"
    }`;

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/signin");
  };

  // Dashboard route based on role
  const dashboardRoute =
    profile?.role === "admin"
      ? "/admin"
      : profile?.role === "librarian"
      ? "/librarian"
      : "/student";

  return (
    <header className="bg-surface border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Book className="w-8 h-8 text-primary" />
            <Link to="/" className="text-2xl font-bold text-text-primary">
              {t("hero.libraryName")}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className={navClass("/")}>
              <Text>{MENUS.HOME}</Text>
            </Link>
            <Link to="/services" className={navClass("/services")}>
              <Text>{MENUS.SERVICES}</Text>
            </Link>
            <Link to="/events" className={navClass("/events")}>
              <Text>{MENUS.EVENTS}</Text>
            </Link>
            <Link to="/about" className={navClass("/about")}>
              <Text>{MENUS.ABOUT}</Text>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />

            {user ? (
              // ✅ Logged in — show name + role + dashboard link + logout
              <div className="flex items-center gap-3 pl-3 border-l border-border">
                <Link
                  to={dashboardRoute}
                  className="text-right hover:opacity-80 transition"
                >
                  <p className="text-sm font-semibold text-text-primary leading-tight">
                    {profile?.name ?? user.email}
                  </p>
                  {profile?.role && (
                    <p className="text-xs text-text-secondary capitalize">
                      {profile.role}
                    </p>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              // ✅ Not logged in — show login button
              <Link to="/signin" className="btn-primary">
                <Text>{MENUS.LOGIN}</Text>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;