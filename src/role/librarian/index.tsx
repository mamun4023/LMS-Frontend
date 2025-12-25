import {
  AlertCircle,
  Book,
  CheckCircle,
  Edit,
  Plus,
  Search,
  Trash2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// Types
interface BookItem {
  id: number;
  title: string;
  author: string;
  isbn: string;
  status: "available" | "checked-out";
  category: string;
}

interface Member {
  id: number;
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
type ModalType = "addBook" | "addMember" | "";

interface Stats {
  totalBooks: number;
  availableBooks: number;
  checkedOutBooks: number;
  totalMembers: number;
  overdueBooks: number;
}

const LibrarianDashboard: React.FC = () => {
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
  const [books, setBooks] = useState<BookItem[]>([
    {
      id: 1,
      title: t("bookTitles.toKillAMockingbird"),
      author: t("bookTitles.harperLee"),
      isbn: t("bookTitles.isbnMockingbird"),
      status: "available",
      category: t("bookTitles.fiction"),
    },
    {
      id: 2,
      title: t("bookTitles.nineteenEightyFour"),
      author: t("bookTitles.georgeOrwell"),
      isbn: t("bookTitles.isbn1984"),
      status: "checked-out",
      category: t("bookTitles.fiction"),
    },
    {
      id: 3,
      title: t("bookTitles.theGreatGatsby"),
      author: t("bookTitles.theGreatGatsby"),
      isbn: t("bookTitles.isbnGreatGatsby"),
      status: "available",
      category: t("bookTitles.fiction"),
    },
    {
      id: 4,
      title: t("bookTitles.sapiens"),
      author: t("bookTitles.yuvalNoahHarari"),
      isbn: t("bookTitles.sapiensisbn"),
      status: "checked-out",
      category: t("bookTitles.nonFiction"),
    },
  ]);

  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      name: t("dashboard.userList.librarians.john"),
      email: t("dashboard.userList.librarians.johnEmail"),
      phone: t("dashboard.userList.librarians.johnPhone"),
      booksCheckedOut: 2,
      joinDate: t("dashboard.userList.librarians.johnJoinDate"),
    },
    {
      id: 2,
      name: t("dashboard.userList.librarians.jane"),
      email: t("dashboard.userList.librarians.janeEmail"),
      phone: t("dashboard.userList.librarians.janePhone"),
      booksCheckedOut: 1,
      joinDate: t("dashboard.userList.librarians.janeJoinDate"),
    },
    {
      id: 3,
      name: t("dashboard.userList.librarians.bob"),
      email: t("dashboard.userList.librarians.bobEmail"),
      phone: t("dashboard.userList.librarians.bobPhone"),
      booksCheckedOut: 0,
      joinDate: t("dashboard.userList.librarians.bobJoinDate"),
    },
  ]);

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

  const [formData, setFormData] = useState<Partial<BookItem | Member>>({});

  const stats: Stats = {
    totalBooks: books.length,
    availableBooks: books.filter((b) => b.status === "available").length,
    checkedOutBooks: books.filter((b) => b.status === "checked-out").length,
    totalMembers: members.length,
    overdueBooks: checkouts.filter((c) => c.status === "overdue").length,
  };

  const openModal = (
    type: ModalType,
    data: Partial<BookItem | Member> = {}
  ): void => {
    setModalType(type);
    setFormData(data);
    setShowModal(true);
  };

  const closeModal = (): void => {
    setShowModal(false);
    setFormData({});
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (modalType === "addBook") {
      const newBook: BookItem = {
        ...(formData as Omit<BookItem, "id" | "status">),
        id: Date.now(),
        status: "available",
      } as BookItem;
      setBooks([...books, newBook]);
    } else if (modalType === "addMember") {
      const newMember: Member = {
        ...(formData as Omit<Member, "id" | "booksCheckedOut" | "joinDate">),
        id: Date.now(),
        booksCheckedOut: 0,
        joinDate: new Date().toISOString().split("T")[0],
      } as Member;
      setMembers([...members, newMember]);
    }
    closeModal();
  };

  const deleteBook = (id: number): void => {
    setBooks(books.filter((b) => b.id !== id));
  };

  const deleteMember = (id: number): void => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const StatCard: React.FC<StatCardProps> = ({
    icon: Icon,
    title,
    value,
    color,
  }) => (
    <div
      className="bg-white rounded-lg shadow p-6 border-l-4"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <Icon className="w-12 h-12 opacity-20" style={{ color }} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">
            {t("auth.libraryManagementSystem")}
          </h1>
          <p className="text-indigo-100 mt-1">
            {t("dashboard.librarianDashboard")}
          </p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {(["overview", "books", "members", "checkouts"] as TabType[]).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
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

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
                {t("dashboard.recentActivity")}
              </h3>
              <div className="space-y-3">
                {checkouts.slice(0, 5).map((checkout) => (
                  <div
                    key={checkout.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded"
                  >
                    <div>
                      <p className="font-medium">{checkout.bookTitle}</p>
                      <p className="text-sm text-gray-500">
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t("search.searchbooks")}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => openModal("addBook")}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                {t("dashboard.addBook")}
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
                      {t("common.category")}
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
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          {book.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {book.author}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {book.isbn}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {book.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              book.status === "available"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {book.status === "available"
                              ? t("catalog.available")
                              : t("catalog.checkedout")}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteBook(book.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t("search.searchMembers")}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => openModal("addMember")}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                {t("dashboard.addMember")}
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
                      {t("profile.phone")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t("dashboard.booksOut")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t("dashboard.joinDate")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t("catalog.actions")}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {members.map((member) => (
                    <tr key={member.id}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        {member.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {member.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {member.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {formatNumber(member.booksCheckedOut)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {member.joinDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteMember(member.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">
                {t("dashboard.activeCheckouts")}
              </h3>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("dashboard.book")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("dashboard.member")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("dashboard.checkoutDate")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("dashboard.dueDate")}
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
                {checkouts.map((checkout) => (
                  <tr key={checkout.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {checkout.bookTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {checkout.memberName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {checkout.checkoutDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {checkout.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          checkout.status === "overdue"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {formatCheckoutStatus(checkout.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-indigo-600 hover:text-indigo-900 font-medium text-sm">
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
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {modalType === "addBook" ? "Add New Book" : "Add New Member"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              {modalType === "addBook" ? (
                <>
                  <input
                    type="text"
                    placeholder={t("student.bookTitle")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                  <input
                    type="text"
                    placeholder="Author"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    required
                  />
                  <input
                    type="text"
                    placeholder={t("catalog.isbn2")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) =>
                      setFormData({ ...formData, isbn: e.target.value })
                    }
                    required
                  />
                  <input
                    type="text"
                    placeholder={t("common.category")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                  />
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder={t("profile.memberName")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                  <input
                    type="email"
                    placeholder={t("profile.email")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                  <input
                    type="tel"
                    placeholder={t("profile.phone")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </>
              )}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  {t("student.cancel")}
                </button>
                <button
                  type="button"
                  onClick={(e: any) => handleSubmit(e)}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  {t("student.add")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibrarianDashboard;
