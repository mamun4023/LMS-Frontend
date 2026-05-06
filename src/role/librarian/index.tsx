
import {
  AlertCircle,
  Book,
  CheckCircle,
  Edit,
  LogOut,
  Plus,
  Search,
  Trash2,
  TrendingUp,
  Users,
  X
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store";
import { logoutUser } from "../../store/slices/authSlice";
import { addBook, editBook, fetchBooks, removeBook } from "../../store/slices/bookSlice";
import { fetchUsers } from "../../store/slices/userListSlice";

// Types
interface BookItem {
  id?: string;
  title: string;
  author: string;
  isbn: string;
  copies: number;
  cover?:string;
}

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  booksCheckedOut: number;
  joinDate: string;
}

interface Checkout {
  id: number;
  bookTitle: string;
  memberName: string;
  checkoutDate: string;
  dueDate: string;
  status: "active" | "overdue";
}

interface StatCardProps {
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  title: string;
  value: number;
  color: string;
}

type TabType = "overview" | "books" | "members" | "checkouts";
type ModalType = "addBook" | "";

interface Stats {
  totalBooks: number;
  availableBooks: number;
  checkedOutBooks: number;
  totalMembers: number;
  overdueBooks: number;
}

  const StatCard: React.FC<StatCardProps> = ({
    icon: Icon,
    title,
    value,
    color,
  }) => (
    <div
      className="bg-surface rounded-lg shadow p-6 border-l-4"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-text-secondary text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <Icon className="w-12 h-12 opacity-20" style={{ color }} />
      </div>
    </div>
  );
const LibrarianDashboard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { t, i18n } = useTranslation();

  const formatNumber = (value: number) =>
    new Intl.NumberFormat(i18n.language).format(value);

  const isBangla = i18n.language?.toLowerCase().startsWith("bn");

  const formatCheckoutStatus = (status: Checkout["status"]) => {
    if (!isBangla) return status;
    return status === "active" ? "সক্রিয়" : "বিলম্বিত";
  };
  
  // Books
  const { books } = useSelector((state: RootState) => state.books);

  useEffect(() => {
  dispatch(fetchBooks());
}, [dispatch]);


const { users } = useSelector((state: RootState) => state.usersList);

const members = users.filter((u) => u.role === "student");

useEffect(() => {
  dispatch(fetchUsers());
}, [dispatch]);

  const [checkouts, setCheckouts] = useState<Checkout[]>([
    {
      id: 1,
      bookTitle: t("dashboard.loanRecords.record1.bookTitle"),
      memberName: t("dashboard.loanRecords.record1.memberName"),
      checkoutDate: t("dashboard.loanRecords.record1.checkoutDate"),
      dueDate: t("dashboard.loanRecords.record1.dueDate"),
      status: "active",
    },
    {
      id: 2,
      bookTitle: t("dashboard.loanRecords.record2.bookTitle"),
      memberName: t("dashboard.loanRecords.record2.memberName"),
      checkoutDate: t("dashboard.loanRecords.record2.checkoutDate"),
      dueDate: t("dashboard.loanRecords.record2.dueDate"),
      status: "overdue",
    },
  ]);

 const [formData, setFormData] = useState<Partial<BookItem>>({});


const handleLogout = async () => {
  await dispatch(logoutUser());
  navigate("/signin");
};


  const stats: Stats = {
    totalBooks: books.length,
    availableBooks: books.filter((b) => b.copies > 0).length,
    checkedOutBooks: books.filter((b) => b.copies === 0).length,
    totalMembers: members.length,
    overdueBooks: checkouts.filter((c) => c.status === "overdue").length,
  };

  const openModal = (
  type: ModalType,
  data: Partial<BookItem> = {}
): void => {
    setModalType(type);
    setFormData(data);
    setShowModal(true);
  };

  const closeModal = (): void => {
  setShowModal(false);
  setFormData({});
  setModalType("");
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
  e.preventDefault();

  if (modalType === "addBook") {
    if (formData.id) {
      // ✅ UPDATE
      dispatch(
        editBook({
          id: formData.id,
          data: {
            title: formData.title || "",
            author: formData.author || "",
            isbn: formData.isbn || "",
            copies: formData.copies || 0,
            cover: formData.cover || "",
},
        })
      );
    } else {
      // ✅ CREATE
     dispatch(
  addBook({
    title: formData.title || "",
    author: formData.author || "",
    isbn: formData.isbn || "",
    copies: formData.copies || 0,
    cover: formData.cover || "",
  })
);
    }
  }

  closeModal();
};




  return (
    <div className="min-h-screen bg-background">
       {/* Header */}
  <header className="bg-surface border-b border-border">
    <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">
          {t("auth.libraryManagementSystem")}
        </h1>
        <p className="text-text-secondary mt-1">
          {t("dashboard.librarianDashboard")}
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="p-2 text-text-secondary hover:bg-surface/70 rounded-lg transition flex items-center gap-2"
      >
        <LogOut className="w-5 h-5" />
        <span>{t("dashboard.logout")}</span>
      </button>
    </div>
  </header>

      {/* Navigation Tabs */}
      <div className="bg-surface shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {(["overview", "books", "members", "checkouts"] as TabType[]).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-text-secondary hover:text-text-primary hover:border-border"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={Book}
                title={t("dashboard.totalBooks")}
                value={stats.totalBooks}
                color="#4F46E5"
              />
              <StatCard
                icon={CheckCircle}
                title={t("catalog.available")}
                value={stats.availableBooks}
                color="#10B981"
              />
              <StatCard
                icon={Users}
                title={t("dashboard.totalMembers")}
                value={stats.totalMembers}
                color="#8B5CF6"
              />
              <StatCard
                icon={AlertCircle}
                title={t("dashboard.overdue")}
                value={stats.overdueBooks}
                color="#EF4444"
              />
            </div>

            <div className="bg-surface rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                {t("dashboard.recentActivity")}
              </h3>
              <div className="space-y-3">
                {checkouts.slice(0, 5).map((checkout) => (
                  <div
                    key={checkout.id}
                    className="flex items-center justify-between p-3 bg-surface rounded"
                  >
                    <div>
                      <p className="font-medium">{checkout.bookTitle}</p>
                      <p className="text-sm text-text-secondary">
                        {t("dashboard.checkedOutBy")} {checkout.memberName}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        checkout.status === "overdue"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {formatCheckoutStatus(checkout.status)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Books Tab */}
        {activeTab === "books" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                <input
                  type="text"
                  placeholder={t("search.searchbooks")}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => openModal("addBook")}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                <Plus className="w-5 h-5 mr-2" />
                {t("dashboard.addBook")}
              </button>
            </div>

            <div className="bg-surface rounded-lg shadow overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-surface">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      {t("catalog.title")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      {t("catalog.author")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      {t("catalog.isbn2")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      {t("catalog.status")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      {t("catalog.actions")}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-surface divide-y divide-border">
                  {books
                    .filter(
                      (book) =>
                        book.title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        book.author
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                    )
                    .map((book) => (
                      <tr key={book.id}>
                       <td className="px-6 py-4 font-medium max-w-xs truncate">
                          {book.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                          {book.author}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                          {book.isbn}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          book.copies > 0
                            ? "bg-green-500/10 text-green-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {book.copies > 0 ? t("catalog.available") : t("catalog.checkedout")}
                                    </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-3">

                        <button
                          onClick={() => openModal("addBook", book)}
                          className="p-2 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition"
                        >
                          <Edit className="w-5 h-5" />
                        </button>

                        <button
                          onClick={() => {
                          if (!book.id) return;

                          const confirmDelete = confirm("Delete this book?");
                          if (!confirmDelete) return;

                          dispatch(removeBook(book.id));
                        }}
                          className="p-2 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 transition"
                        >
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
        )}

        {/* Members Tab */}
        {activeTab === "members" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                <input
                 type="text"
                placeholder={t("search.searchMembers")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <button
               onClick={() => alert("Only admin can add users")}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                <Plus className="w-5 h-5 mr-2" />
                {t("dashboard.addMember")}
              </button>
            </div>

            <div className="bg-surface rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-surface">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      {t("profile.name")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      {t("profile.email")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      {t("profile.phone")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      {t("dashboard.booksOut")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      {t("dashboard.joinDate")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      {t("catalog.actions")}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-surface divide-y divide-border">
                  {members
                    .filter((m) =>
                      m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      m.email?.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((member) => (
                    <tr key={member.id}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        {member.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                        {member.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                        { "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                        0
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                        {"-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="text-gray-400 text-sm">
                          {t("dashboard.viewOnly")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Checkouts Tab */}
        {activeTab === "checkouts" && (
          <div className="bg-surface rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-lg font-semibold">
                {t("dashboard.activeCheckouts")}
              </h3>
            </div>
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-surface">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    {t("dashboard.book")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    {t("dashboard.member")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    {t("dashboard.checkoutDate")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    {t("dashboard.dueDate")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    {t("catalog.status")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    {t("catalog.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-surface divide-y divide-border">
                {checkouts.map((checkout) => (
                  <tr key={checkout.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {checkout.bookTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                      {checkout.memberName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                      {checkout.checkoutDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                      {checkout.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          checkout.status === "overdue"
                            ? "bg-red-500/10 text-red-500"
                            : "bg-green-500/10 text-green-500"
                        }`}
                      >
                        {formatCheckoutStatus(checkout.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-primary hover:text-primary/80 font-medium text-sm">
                        {t("dashboard.returnBook")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
               {modalType === "addBook"
                ? formData.id
                  ? "Edit Book"
                  : "Add New Book"
                : ""}
              </h3>
              <button
                onClick={closeModal}
                className="text-text-secondary hover:text-text-primary"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {modalType === "addBook" ? (
                <>
                  <input
                  type="text"
                  placeholder={t("student.bookTitle")}
                 value={formData.title || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                  required
/>
                  <input
                    type="text"
                    placeholder="Author"
                    value={formData.author || ""}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    required
                  />
                  <input
                    type="text"
                    placeholder={t("catalog.isbn2")}
                    value={formData.isbn || ""}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                    onChange={(e) =>
                      setFormData({ ...formData, isbn: e.target.value })
                    }
                    required
                  />

                  <input
                  type="number"
                  placeholder="Copies"
                  value={formData.copies || 0}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                  onChange={(e) =>
                    setFormData({ ...formData, copies: Number(e.target.value) })
                  }
                  required
                />
                <input
                type="text"
                placeholder="Cover Image URL"
                value={formData.cover || ""}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                onChange={(e) =>
                  setFormData({ ...formData, cover: e.target.value })
                }
              />
                 
                </>
              ) : null}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-surface/70"
                >
                  {t("student.cancel")}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  {formData.id ? "Update" : t("student.add")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibrarianDashboard;
