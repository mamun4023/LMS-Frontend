import {
  AlertCircle,
  BarChart3,
  BookOpen,
  CheckCircle,
  Clock,
  Edit,
  Eye,
  Plus,
  Search,
  Settings,
  Trash2,
  UserCog,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

interface Stats {
  totalBooks: number;
  totalUsers: number;
  activeLoans: number;
  overdueBooks: number;
  librarians: number;
  students: number;
}

interface Activity {
  id: number;
  action: string;
  user: string;
  time: string;
  type: "success" | "info" | "warning" | "error";
}

interface Librarian {
  id: number;
  name: string;
  email: string;
  status: string;
  booksManaged: number;
}

interface Student {
  id: number;
  name: string;
  email: string;
  booksLoaned: number;
  overdue: number;
  status: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  copies: number;
  available: number;
}

type TabType = "overview" | "books" | "librarians" | "students" | "settings";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { t } = useTranslation();
  const stats: Stats = {
    totalBooks: 1247,
    totalUsers: 356,
    activeLoans: 89,
    overdueBooks: 12,
    librarians: 8,
    students: 348,
  };

  const recentActivity: Activity[] = [
    {
      id: 1,
      action: t("dashboard.recentActivityItems.newBook"),
      user: t("dashboard.recentActivityItems.sarah"),
      time: t("dashboard.recentActivityItems.time2h"),
      type: "success",
    },
    {
      id: 2,
      action: t("dashboard.recentActivityItems.newUser"),
      user: t("dashboard.recentActivityItems.john"),
      time: t("dashboard.recentActivityItems.time3h"),
      type: "info",
    },
    {
      id: 3,
      action: t("dashboard.recentActivityItems.overdueAlert"),
      user: t("dashboard.recentActivityItems.janeSmith"),
      time: t("dashboard.recentActivityItems.time5h"),
      type: "warning",
    },
    {
      id: 4,
      action: t("dashboard.recentActivityItems.bookReturned"),
      user: t("dashboard.recentActivityItems.mike"),
      time: t("dashboard.recentActivityItems.time1d"),
      type: "success",
    },
  ];

  const librarians: Librarian[] = [
    {
      id: 1,
      name: t("dashboard.userList.librarians.sarah"),
      email: t("dashboard.userList.librarians.sarahEmail"),
      status: "Active",
      booksManaged: 234,
    },
    {
      id: 2,
      name: t("dashboard.userList.librarians.michael"),
      email: t("dashboard.userList.librarians.michaelEmail"),
      status: "Active",
      booksManaged: 198,
    },
    {
      id: 3,
      name: t("dashboard.userList.librarians.emma"),
      email: t("dashboard.userList.librarians.emmaEmail"),
      status: "Active",
      booksManaged: 267,
    },
  ];

  const students: Student[] = [
    {
      id: 1,
      name: t("dashboard.userList.students.john"),
      email: t("dashboard.userList.students.johnEmail"),
      booksLoaned: 3,
      overdue: 0,
      status: "Active",
    },
    {
      id: 2,
      name: t("dashboard.userList.students.jane"),
      email: t("dashboard.userList.students.janeEmail"),
      booksLoaned: 2,
      overdue: 1,
      status: "Active",
    },
    {
      id: 3,
      name: t("dashboard.userList.students.bob"),
      email: t("dashboard.userList.students.bobEmail"),
      booksLoaned: 5,
      overdue: 0,
      status: "Active",
    },
  ];

  const books: Book[] = [
    {
      id: 1,
      title: t("dashboard.bookData.gatsby.title"),
      author: t("dashboard.bookData.gatsby.author"),
      isbn: t("dashboard.bookData.gatsby.isbn"),
      copies: 5,
      available: 2,
    },
    {
      id: 2,
      title: t("dashboard.bookData.orwell.title"),
      author: t("dashboard.bookData.orwell.author"),
      isbn: t("dashboard.bookData.orwell.isbn"),
      copies: 4,
      available: 1,
    },
    {
      id: 3,
      title: t("dashboard.bookData.mockingbird.title"),
      author: t("dashboard.bookData.mockingbird.author"),
      isbn: t("dashboard.bookData.mockingbird.isbn"),
      copies: 6,
      available: 3,
    },
  ];

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "info":
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                {t("dashboard.totalBooks")}
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {new Intl.NumberFormat(i18n.language).format(stats.totalBooks)}
              </p>
            </div>
            <BookOpen className="w-12 h-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                {t("dashboard.totalUsers")}
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {new Intl.NumberFormat(i18n.language).format(stats.totalUsers)}
                {/* {stats.totalUsers} */}
              </p>
            </div>
            <Users className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                {t("dashboard.activeLoans")}
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {/* {stats.activeLoans} */}
                {new Intl.NumberFormat(i18n.language).format(stats.activeLoans)}
              </p>
            </div>
            <BarChart3 className="w-12 h-12 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                {t("dashboard.overdueBooks")}
              </p>
              <p className="text-3xl font-bold text-red-600">
                {/* {stats.overdueBooks} */}
                {new Intl.NumberFormat(i18n.language).format(
                  stats.overdueBooks
                )}
              </p>
            </div>
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                {t("dashboard.librarians")}
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {/* {stats.librarians} */}
                {new Intl.NumberFormat(i18n.language).format(stats.librarians)}
              </p>
            </div>
            <UserCog className="w-12 h-12 text-indigo-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{t("dashboard.students")}</p>
              <p className="text-3xl font-bold text-gray-900">
                {/* {stats.students} */}
                {new Intl.NumberFormat(i18n.language).format(stats.students)}
              </p>
            </div>
            <Users className="w-12 h-12 text-teal-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {t("dashboard.recentActivity")}
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center space-x-3">
                  {getActivityIcon(activity.type)}
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.user}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderBooks = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={t("search.searchbooks")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="ml-4 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          {t("catalog.addBook")}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("catalog.title")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("catalog.author")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("catalog.isbn2")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("catalog.copies")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("catalog.available")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("catalog.actions")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {book.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {book.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {book.isbn}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {/* {book.copies} */}
                  {new Intl.NumberFormat(i18n.language).format(book.copies)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      book.available > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {/* {book.available} */}
                    {new Intl.NumberFormat(i18n.language).format(
                      book.available
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderLibrarians = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={t("dashboard.searchLibrarian")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="ml-4 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          {t("dashboard.addLibrarian")}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("profile.name")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("profile.email")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("dashboard.booksManaged")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("catalog.status")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("catalog.actions")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {librarians.map((librarian) => (
              <tr key={librarian.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {librarian.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {librarian.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {/* {librarian.booksManaged} */}
                  {new Intl.NumberFormat(i18n.language).format(
                    librarian.booksManaged
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {librarian.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={t("dashboard.searchStudent")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="ml-4 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          {t("dashboard.addStudent")}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("profile.name")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("profile.email")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("dashboard.booksLoaned")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("dashboard.overdue")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("catalog.status")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("catalog.actions")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {/* {student.booksLoaned} */}
                  {new Intl.NumberFormat(i18n.language).format(
                    student.booksLoaned
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      student.overdue > 0
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {/* {student.overdue} */}
                    {new Intl.NumberFormat(i18n.language).format(
                      student.overdue
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {t("settings.systemSettings")}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("settings.libraryName")}
            </label>
            <input
              type="text"
              defaultValue="Central Library"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("settings.maxBooksPerStudent")}
            </label>
            <input
              type="number"
              defaultValue="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("settings.loanDuration")}
            </label>
            <input
              type="number"
              defaultValue="14"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("settings.finePerDay")}
            </label>
            <input
              type="number"
              defaultValue="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            {t("settings.saveSettings")}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                {t("dashboard.adminDashboard")}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {t("dashboard.adminUser")}
              </span>
              <button className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                {t("dashboard.logout")}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <nav className="flex space-x-1 p-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "overview"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              {t("dashboard.overview")}
            </button>
            <button
              onClick={() => setActiveTab("books")}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "books"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              {t("dashboard.books")}
            </button>
            <button
              onClick={() => setActiveTab("librarians")}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "librarians"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <UserCog className="w-5 h-5 mr-2" />
              {t("dashboard.librarians")}
            </button>
            <button
              onClick={() => setActiveTab("students")}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "students"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Users className="w-5 h-5 mr-2" />
              {t("dashboard.students")}
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "settings"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Settings className="w-5 h-5 mr-2" />
              {t("dashboard.settings")}
            </button>
          </nav>
        </div>

        {/* Content Area */}
        {activeTab === "overview" && renderOverview()}
        {activeTab === "books" && renderBooks()}
        {activeTab === "librarians" && renderLibrarians()}
        {activeTab === "students" && renderStudents()}
        {activeTab === "settings" && renderSettings()}
      </div>
    </div>
  );
}
