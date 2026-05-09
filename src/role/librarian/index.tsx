/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  collection,
  doc,
  increment,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where
} from "firebase/firestore";
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
import { db } from "../../firebase/firebase";
import type { AppDispatch, RootState } from "../../store";
import { logoutUser } from "../../store/slices/authSlice";
import { addBook, editBook, fetchBooks, removeBook } from "../../store/slices/bookSlice";
import { fetchSettings } from "../../store/slices/settingsSlice";
import { fetchUsers } from "../../store/slices/userListSlice";
import { calculateFine } from "../../utils/fine";
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
  status: "active" | "overdue" | "returned";
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

type TabType =
  | "overview"
  | "books"
  | "members"
  | "checkouts"
  | "fines";
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

  const [fines, setFines] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { t, i18n } = useTranslation();
const { settings } = useSelector((state: RootState) => state.settings);
 const totalFineAmount = fines.reduce(
  (sum, fine) =>
    sum +
    calculateFine({
      dueDate: fine.dueDate,
      returned: fine.returned,
      finePerDay: settings?.finePerDay || 1,
    }),
  0
);
  const formatNumber = (value: number) =>
    new Intl.NumberFormat(i18n.language).format(value);

  const isBangla = i18n.language?.toLowerCase().startsWith("bn");

const formatCheckoutStatus = (status: Checkout["status"]) => {
  if (!isBangla) return status;
  if (status === "active") return "সক্রিয়";
  if (status === "overdue") return "বিলম্বিত";
  return "ফেরত";
};
  const getCheckoutStatus = (checkout: any) => {
  if (checkout.returned) return "returned";

  const due = new Date(checkout.dueDate);
  const now = new Date();

  return due < now ? "overdue" : "active";
};
  
  // Books
  const { books } = useSelector((state: RootState) => state.books);

useEffect(() => {
  dispatch(fetchBooks());
  dispatch(fetchSettings());
}, [dispatch]);


const { users } = useSelector((state: RootState) => state.usersList);

const members = users.filter((u) => u.role === "student");

useEffect(() => {
  dispatch(fetchUsers());
}, [dispatch]);

  
const [checkouts, setCheckouts] = useState<any[]>([]);
 const [formData, setFormData] = useState<Partial<BookItem>>({});


const handleLogout = async () => {
  await dispatch(logoutUser());
  navigate("/signin");
};


  const stats: Stats = {
    totalBooks: books.length,
    availableBooks: books.filter((b) => b.copies > 0).length,
    checkedOutBooks: checkouts.filter((c) => !c.returned).length,
    totalMembers: members.length,
    overdueBooks: checkouts.filter(
  (c) => getCheckoutStatus(c) === "overdue"
).length,
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

useEffect(() => {
  const q = query(
    collection(db, "borrowedBooks"),
    where("returned", "==", false)
  );

  const unsub = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const overdueBooks = data.filter((book: any) => {
      const due = new Date(book.dueDate);
      const now = new Date();

      return due < now;
    });

    setFines(overdueBooks);
  });

  return () => unsub();
}, []);

const markFinePaid = async (borrowId: string) => {
  try {
    const ref = doc(db, "borrowedBooks", borrowId);

    await updateDoc(ref, {
      finePaid: true,
      paidAt: new Date().toISOString(),
    });

  } catch (err) {
    console.error(err);
    alert("Failed to mark fine as paid");
  }
};

useEffect(() => {
  const q = query(
    collection(db, "borrowedBooks"),
    orderBy("borrowedAt", "desc")
  );

  const unsub = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setCheckouts(data as any[]);
  });

  return () => unsub();
}, []);

const returnBookByLibrarian = async (
  borrowId: string,
  bookId: string
) => {
  try {
    // update borrow
    const borrowRef = doc(db, "borrowedBooks", borrowId);

    await updateDoc(borrowRef, {
      returned: true,
      returnedAt: new Date().toISOString(),
    });

    // increase copies
    const bookRef = doc(db, "books", bookId);

    await updateDoc(bookRef, {
      copies: increment(1),
    });

  } catch (err) {
    console.error(err);
    alert("Failed to return book");
  }
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
            {(["overview", "books", "members", "checkouts", "fines"] as TabType[]).map(
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

              <StatCard
              icon={AlertCircle}
              title="Unpaid Fines"
              value={totalFineAmount}
              color="#F59E0B"
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
                      <p className="font-medium">{checkout.title}</p>
                      <p className="text-sm text-text-secondary">
                        {t("dashboard.checkedOutBy")} {users.find((u) => u.id === checkout.userId)?.name || checkout.userId}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                          getCheckoutStatus(checkout) === "overdue"
                            ? "bg-red-100 text-red-700"
                            : getCheckoutStatus(checkout) === "returned"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-green-100 text-green-700"
                        }`}
                    >
                      {formatCheckoutStatus(
                            getCheckoutStatus(checkout) as Checkout["status"]
                          )}
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
                      {checkout.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                      {users.find((u) => u.id === checkout.userId)?.name || checkout.userId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                      {new Date(checkout.borrowedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                      {new Date(checkout.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                       className={`px-2 py-1 rounded-full text-xs font-medium ${
                        getCheckoutStatus(checkout) === "overdue"
                          ? "bg-red-500/10 text-red-500"
                          : getCheckoutStatus(checkout) === "returned"
                          ? "bg-gray-500/10 text-gray-500"
                          : "bg-green-500/10 text-green-500"
                      }`}
                      >
                        {formatCheckoutStatus(
                          getCheckoutStatus(checkout) as Checkout["status"]
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        disabled={checkout.returned}
                        onClick={() =>
                          returnBookByLibrarian(
                            checkout.id,
                            checkout.bookId
                          )
                        }
                        className={`font-medium text-sm ${
                          checkout.returned
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-primary hover:text-primary/80"
                        }`}
                      >
                        {checkout.returned ? "Returned" : t("dashboard.returnBook")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Fines Tab */}
{activeTab === "fines" && (
  <div className="bg-surface rounded-lg shadow overflow-hidden">
    
    <div className="px-6 py-4 border-b border-border">
      <h3 className="text-lg font-semibold">
        Fine Management
      </h3>
    </div>

    {fines.length === 0 ? (
      <p className="p-6 text-text-secondary">
        No fines found 🎉
      </p>
    ) : (
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-surface">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase">
              Student
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase">
              Book
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase">
              Fine
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase">
              Status
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          {fines.map((fine) => (
            <tr key={fine.id}>

              <td className="px-6 py-4">
               {users.find((u) => u.id === fine.userId)?.name || fine.userId}
              </td>

              <td className="px-6 py-4">
                {fine.title}
              </td>

              <td className="px-6 py-4 font-semibold text-red-500">
                    ৳{calculateFine({
                      dueDate: fine.dueDate,
                      returned: fine.returned,
                      finePerDay: settings?.finePerDay || 1,
                    })}
                  </td>

              <td className="px-6 py-4">
                {fine.finePaid ? (
                  <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs">
                    Paid
                  </span>
                ) : (
                  <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-500 text-xs">
                    Unpaid
                  </span>
                )}
              </td>

              <td className="px-6 py-4">

                {!fine.finePaid && (
                  <button
                    onClick={() => markFinePaid(fine.id)}
                    className="px-3 py-1 rounded-lg bg-primary text-white hover:bg-primary/90 text-sm"
                  >
                    Mark Paid
                  </button>
                )}

              </td>

            </tr>
          ))}
        </tbody>
      </table>
    )}
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
