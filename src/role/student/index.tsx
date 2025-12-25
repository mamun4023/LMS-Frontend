import {
  AlertCircle,
  Bell,
  Book,
  BookOpen,
  Calendar,
  CheckCircle,
  Heart,
  LogOut,
  Search,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface BorrowedBook {
  id: number;
  title: string;
  author: string;
  dueDate: string;
  status: "on-time" | "due-soon" | "overdue";
  coverColor: string;
}

interface ReservedBook {
  id: number;
  title: string;
  author: string;
  availableDate: string;
  position: number;
}

interface Notification {
  id: number;
  type: "due" | "available" | "overdue" | "info";
  // message: string;
  // time: string;
  title: string;
  days?: number;
  time: "twoHoursAgo" | "oneDayAgo" | "twoDaysAgo";
}

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<
    "overview" | "borrowed" | "history" | "favorites"
  >("overview");
  const [showNotifications, setShowNotifications] = useState(false);

  const formatNumber = (value: number) =>
    new Intl.NumberFormat(i18n.language).format(value);

  const formatDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat(i18n.language, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };
  const studentInfo = {
    name: t("student.demoStudent.name"),
    id: t("student.demoStudent.id"),
    email: t("student.demoStudent.email"),
    memberSince: t("student.demoStudent.memberSince"),
  };

  const borrowedBooks: BorrowedBook[] = [
    {
      id: 1,
      title: t("student.demoBooks.borrowed.introductionToAlgorithms.title"),
      author: t("student.demoBooks.borrowed.introductionToAlgorithms.author"),
      dueDate: "2024-12-05",
      status: "due-soon",
      coverColor: "#3B82F6",
    },
    {
      id: 2,
      title: t("student.demoBooks.borrowed.cleanCode.title"),
      author: t("student.demoBooks.borrowed.cleanCode.author"),
      dueDate: "2024-12-15",
      status: "on-time",
      coverColor: "#10B981",
    },
    {
      id: 3,
      title: t("student.demoBooks.borrowed.designPatterns.title"),
      author: t("student.demoBooks.borrowed.designPatterns.author"),
      dueDate: "2024-11-28",
      status: "overdue",
      coverColor: "#EF4444",
    },
  ];

  const reservedBooks: ReservedBook[] = [
    {
      id: 1,
      title: t("student.demoBooks.reserved.thePragmaticProgrammer.title"),
      author: t("student.demoBooks.reserved.thePragmaticProgrammer.author"),
      availableDate: "2024-12-10",
      position: 2,
    },
    {
      id: 2,
      title: t("student.demoBooks.reserved.youDontKnowJS.title"),
      author: t("student.demoBooks.reserved.youDontKnowJS.author"),
      availableDate: "2024-12-08",
      position: 1,
    },
  ];

  const notifications: Notification[] = [
    {
      id: 1,
      type: "overdue",
      // message: "Design Patterns is overdue. Please return soon.",
      // time: "2 hours ago",
      title: borrowedBooks[2].title,
      time: "twoHoursAgo",
    },
    {
      id: 2,
      type: "due",
      // message: "Introduction to Algorithms is due in 3 days",
      // time: "1 day ago",
      title: borrowedBooks[0].title,
      days: 3,
      time: "oneDayAgo",
    },
    {
      id: 3,
      type: "available",
      // message: "You Don't Know JS will be available soon",
      // time: "2 days ago",
      title: borrowedBooks[0].title,
      time: "twoDaysAgo",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-time":
        return "bg-green-100 text-green-800";
      case "due-soon":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "on-time":
        return t("student.status.onTime");
      case "due-soon":
        return t("student.status.dueSoon");
      case "overdue":
        return t("student.status.overdue");
      default:
        return t("student.status.unknown");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Book className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {t("dashboard.libraryPortal")}
                </h1>
                <p className="text-xs text-gray-500">
                  {t("dashboard.studentDashboard")}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  <Bell className="w-6 h-6" />
                  {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">
                        {t("dashboard.notifications")}
                      </h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                        >
                          <p className="text-sm text-gray-900">
                            {/* {notif.message} */}
                            {t(`student.notifications.${notif.type}`, {
                              title: notif.title,
                              days:
                                typeof notif.days === "number"
                                  ? formatNumber(notif.days)
                                  : undefined,
                            })}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {/* {notif.time} */}
                            {t(`student.time.${notif.time}`)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {studentInfo.name}
                  </p>
                  <p className="text-xs text-gray-500">{studentInfo.id}</p>
                </div>
                <button
                  onClick={() => navigate("/signin")}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t("student.welcomeBack")} {studentInfo.name.split(" ")[0]}!
          </h2>
          <p className="text-gray-600">{t("student.dashboardSubtitle")}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {t("student.borrowed")}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {new Intl.NumberFormat(i18n.language).format(
                    borrowedBooks.length
                  )}
                </p>
              </div>
              <BookOpen className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {t("student.reserved")}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {new Intl.NumberFormat(i18n.language).format(
                    reservedBooks.length
                  )}
                </p>
              </div>
              <Calendar className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {t("dashboard.overdue")}
                </p>
                <p className="text-3xl font-bold text-red-600">
                  {t("student.one")}
                </p>
              </div>
              <AlertCircle className="w-12 h-12 text-red-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {t("student.favorites")}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {t("student.twelve")}
                </p>
              </div>
              <Heart className="w-12 h-12 text-pink-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition ${
                  activeTab === "overview"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {t("dashboard.overview")}
              </button>
              <button
                onClick={() => setActiveTab("borrowed")}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition ${
                  activeTab === "borrowed"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {t("student.borrowedBooks")}
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition ${
                  activeTab === "history"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {t("student.history")}
              </button>
              <button
                onClick={() => setActiveTab("favorites")}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition ${
                  activeTab === "favorites"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {t("student.favorites")}
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Currently Borrowed */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t("student.currentlyBorrowed")}
                  </h3>
                  <div className="space-y-3">
                    {borrowedBooks.map((book) => (
                      <div
                        key={book.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className="w-12 h-16 rounded flex items-center justify-center"
                            style={{ backgroundColor: book.coverColor }}
                          >
                            <Book className="w-6 h-6 text-white opacity-50" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {book.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {book.author}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {t("student.due")} {formatDate(book.dueDate)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              book.status
                            )}`}
                          >
                            {getStatusText(book.status)}
                          </span>
                          <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition">
                            {t("student.renew")}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reserved Books */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t("student.reservedBooks")}
                  </h3>
                  <div className="space-y-3">
                    {reservedBooks.map((book) => (
                      <div
                        key={book.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {book.title}
                          </h4>
                          <p className="text-sm text-gray-600">{book.author}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {t("student.availableOn")}{" "}
                            {formatDate(book.availableDate)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {t("student.position")}
                            {formatNumber(book.position)}
                          </p>
                          <button className="mt-2 text-sm text-red-600 hover:text-red-700">
                            {t("student.cancel")}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "borrowed" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t("student.allBorrowedBooks")}
                  </h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder={t("search.searchbooks")}
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  {borrowedBooks.map((book) => (
                    <div
                      key={book.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className="w-12 h-16 rounded flex items-center justify-center"
                          style={{ backgroundColor: book.coverColor }}
                        >
                          <Book className="w-6 h-6 text-white opacity-50" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {book.title}
                          </h4>
                          <p className="text-sm text-gray-600">{book.author}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {t("student.due")} {book.dueDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            book.status
                          )}`}
                        >
                          {getStatusText(book.status)}
                        </span>
                        <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition">
                          {t("student.renew")}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "history" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t("student.borrowingHistory")}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {t("bookTitles.theArtOfComputerProgramming")}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {t("bookTitles.donaldKnuth")}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {t("student.borrowedReturned")}
                      </p>
                    </div>
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {t("bookTitles.databaseSystemConcepts")}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {t("bookTitles.silberschatzEtAl")}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {t("student.borrowedReturned2")}
                      </p>
                    </div>
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "favorites" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t("student.myFavoriteBooks")}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="group cursor-pointer">
                      <div className="aspect-[2/3] bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-3 flex items-end justify-center p-4 shadow-md group-hover:shadow-xl transition">
                        <Book className="w-12 h-12 text-white opacity-50" />
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {t("student.bookTitle")} {i}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {t("student.authorName")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition text-left">
            <Search className="w-10 h-10 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">
              {t("quickActions.browseCatalog")}
            </h3>
            <p className="text-sm text-gray-600">
              {t("catalog.searchAndDiscover")}
            </p>
          </button>

          <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition text-left">
            <Calendar className="w-10 h-10 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">
              {t("student.bookStudyRoom")}
            </h3>
            <p className="text-sm text-gray-600">
              {t("student.reserveSpaceForStudying")}
            </p>
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition text-left"
          >
            <User className="w-10 h-10 text-purple-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">
              {t("profile.myProfile")}
            </h3>
            <p className="text-sm text-gray-600">
              {t("profile.updateAccountSettings")}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
