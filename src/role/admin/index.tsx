/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  AlertCircle,
  BarChart3,
  BookOpen,
  CheckCircle,
  Clock,
  Edit,
  Eye,
  LogOut,
  Plus,
  Search,
  Settings,
  Trash2,
  UserCog,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import i18n from "../../i18n";
import { addActivity, fetchRecentActivities, type Activity } from "../../services/activity.service";
import type { Book } from "../../services/book.service";
import type { AppDispatch, RootState } from "../../store";
import { logoutUser } from "../../store/slices/authSlice";
import {
  addBook,
  editBook,
  fetchBooks,
  removeBook,
} from "../../store/slices/bookSlice";
import { deleteUserThunk, fetchUsers, updateUserRoleThunk } from "../../store/slices/userListSlice";
interface Stats {
  totalBooks: number;
  totalUsers: number;
  activeLoans: number;
  overdueBooks: number;
  librarians: number;
  students: number;
}


// interface Librarian {
//   id: number;
//   name: string;
//   email: string;
//   status: string;
//   booksManaged: number;
// }

// interface Student {
//   id: number;
//   name: string;
//   email: string;
//   booksLoaned: number;
//   overdue: number;
//   status: string;
// }

interface User{
  id: string;
  name:string;
  email:string;
  role: "admin" | "librarian" | "student";
}


type TabType = "overview" | "books" | "librarians" | "students" | "settings";

export default function AdminDashboard() {
  const dispatch=useDispatch<AppDispatch>();
  const {books,loading,error}= useSelector((state:RootState)=>state.books);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [success,setSuccess]=useState("");
  const [showModal, setShowModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
const [selectedUser, setSelectedUser] = useState<User | null>(null);
const [editRole, setEditRole] = useState<"admin" | "librarian" | "student">("student");
const [selectedUserId, setSelectedUserId] = useState("");
const [targetRole, setTargetRole] = useState<"librarian" | "student">("librarian");
const [editingBook, setEditingBook] = useState<Book | null>(null);
const { users } = useSelector((state: RootState) => state.usersList);
const { profile } = useSelector((state: RootState) => state.user);
const selectableUsers = users.filter(
  (u) => u.role !== targetRole
);
const [form, setForm] = useState({
  title: "",
  author: "",
  isbn: "",
  copies: 0,
  cover: "",
});
  const { t } = useTranslation();
  const [stats,setStats]=useState<Stats> ({
    totalBooks: 0,
    totalUsers: 0,
    activeLoans: 0,
    overdueBooks: 0,
    librarians: 0,
    students: 0,
  });
  const [settings, setSettings] = useState({
  libraryName: "",
  maxBooksPerStudent: 0,
  loanDuration: 0,
  finePerDay: 0,
});


//   for debug
//   useEffect(() => {
//   console.log("USERS:", users);
// }, [users]);


  useEffect(()=>{
    dispatch(fetchBooks())
    dispatch(fetchUsers())
  },[dispatch]);

  useEffect(() => {
  const fetchSettings = async () => {
    const ref = doc(db, "settings", "system");
    const snap = await getDoc(ref);

    if (snap.exists()) {
      setSettings(snap.data() as any);
    }
  };

  fetchSettings();
}, []);

  useEffect(() => {
     const librarians = users.filter((u) => u.role === "librarian").length;
  const students = users.filter((u) => u.role === "student").length;
  setStats({
    totalBooks: books.length,
    totalUsers: users.length,
    librarians,
    students,
    activeLoans: 0,
    overdueBooks: 0,
  });
}, [books,users]);

// ADD state inside AdminDashboard component (near other useState calls):
const [activities, setActivities] = useState<Activity[]>([]);

// ADD useEffect (alongside the other useEffects):
useEffect(() => {
  fetchRecentActivities(10).then(setActivities);
}, []);

  const recentActivity=activities;



  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "info":
        return <Clock className="w-5 h-5 text-primary" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };


const navigate = useNavigate();

const handleLogout = async () => {
  await dispatch(logoutUser());
  navigate("/signin");
};

const openAddModal = () => {
  setEditingBook(null);
  setForm({ title: "", author: "", isbn: "", copies: 0, cover: "" });
  setShowModal(true);
};

const openEditModal = (book: any) => {
  setEditingBook(book);
  setForm({
    title: book.title || "",
    author: book.author || "",
    isbn: book.isbn || "",
    copies: book.copies || 0,
    cover: book.cover || "", 
  });
  setShowModal(true);
};

const handleSave = async () => {
  if (!form.title.trim()) {
    alert("Title is required");
    return;
  }

  if (!form.author.trim()) {
    alert("Author is required");
    return;
  }

  if (!form.isbn.trim()) {
    alert("ISBN is required");
    return;
  }

  if (form.copies < 0) {
    alert("Copies cannot be negative");
    return;
  }

  try {
  if (editingBook) {
    await dispatch(editBook({ id: editingBook.id!, data: form }));
    await addActivity(
  "Book Updated",
  `${form.title} updated`,
  "info",
  profile?.email || "Unknown"
);

const updated = await fetchRecentActivities(10);
setActivities(updated);
    setSuccess("Book updated");
  } else {
    await dispatch(addBook(form));
    await addActivity(
  "Book Added",
  `${form.title} added`,
  "success",
  profile?.email || "Unknown"
);

  const updated = await fetchRecentActivities(10);
setActivities(updated);
    setSuccess("Book added");
  }


  setTimeout(() => setSuccess(""), 2000);
  setShowModal(false);

  setForm({
    title: "",
    author: "",
    isbn: "",
    copies: 0,
    cover:"",
  });

} catch {
  alert("Operation failed");
}
};

const handleDelete = async (id: string, title: string) => {
  if (!confirm("Are you sure?")) return;

  await dispatch(removeBook(id));

  await addActivity(
    "Book Deleted",
    `${title} deleted`,
    "warning",
    profile?.email || "Unknown"
  );

  const updated = await fetchRecentActivities(10);
  setActivities(updated);
};

const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  setSettings({
    ...settings,
    [name]: name === "libraryName" ? value : Number(value),
  });
};

const handleSaveSettings = async () => {
  try {
    await setDoc(doc(db, "settings", "system"), settings);
    await addActivity(
      "Settings Updated",
      "System settings changed",
      "info",
      profile?.email || "Unknown"
    );

    const updated = await fetchRecentActivities(10);
    setActivities(updated);
    setSuccess("Settings saved");
    setTimeout(() => setSuccess(""), 2000);
  } catch {
    alert("Failed to save settings");
  }
};
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-surface rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">
                {t("dashboard.totalBooks")}
              </p>
              <p className="text-3xl font-bold text-text-primary">
                {new Intl.NumberFormat(i18n.language).format(stats.totalBooks)}
              </p>
            </div>
            <BookOpen className="w-12 h-12 text-primary" />
          </div>
        </div>

        <div className="bg-surface rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">
                {t("dashboard.totalUsers")}
              </p>
              <p className="text-3xl font-bold text-text-primary">
                {new Intl.NumberFormat(i18n.language).format(stats.totalUsers)}
                {/* {stats.totalUsers} */}
              </p>
            </div>
            <Users className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <div className="bg-surface rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">
                {t("dashboard.activeLoans")}
              </p>
              <p className="text-3xl font-bold text-text-primary">
                {/* {stats.activeLoans} */}
                {new Intl.NumberFormat(i18n.language).format(stats.activeLoans)}
              </p>
            </div>
            <BarChart3 className="w-12 h-12 text-purple-500" />
          </div>
        </div>

        <div className="bg-surface rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">
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

        <div className="bg-surface rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">
                {t("dashboard.librarians")}
              </p>
              <p className="text-3xl font-bold text-text-primary">
                {/* {stats.librarians} */}
                {new Intl.NumberFormat(i18n.language).format(stats.librarians)}
              </p>
            </div>
            <UserCog className="w-12 h-12 text-primary" />
          </div>
        </div>

        <div className="bg-surface rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">
                {t("dashboard.students")}
              </p>
              <p className="text-3xl font-bold text-text-primary">
                {/* {stats.students} */}
                {new Intl.NumberFormat(i18n.language).format(stats.students)}
              </p>
            </div>
            <Users className="w-12 h-12 text-teal-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-surface rounded-lg shadow">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">
            {t("dashboard.recentActivity")}
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div className="flex items-center space-x-3">
                  {getActivityIcon(activity.type)}
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {activity.action}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {activity.message}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {activity.user}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-text-secondary">
                  {activity.createdAt?.toDate?.().toLocaleString() || "Now"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );


const renderBooks = () => {
  //  Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-text-secondary">Loading books...</p>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const filteredBooks = books.filter((book) =>
  (book.title + book.author + book.isbn).toLowerCase().includes(searchTerm.toLowerCase())
);
  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
          <input
            type="text"
            placeholder={t("search.searchbooks")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
        onClick={openAddModal}
        className="ml-4 flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90">
          <Plus className="w-5 h-5 mr-2" />
          {t("catalog.addBook")}
        </button>
      </div>

        {success && (
  <div className="bg-green-100 text-green-700 px-4 py-2 rounded">
    {success}
  </div>
)}
      {/* Table */}
      <div className="bg-surface rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-surface">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase">
                {t("catalog.title")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase">
                {t("catalog.author")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase">
                {t("catalog.isbn2")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase">
                {t("catalog.copies")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase">
                {t("catalog.actions")}
              </th>
            </tr>
          </thead>

          <tbody className="bg-surface divide-y divide-border">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <tr key={book.id} className="hover:bg-surface">
                  
                  <td className="px-6 py-4 text-sm font-medium text-text-primary">
                    {book.title}
                  </td>

                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {book.author}
                  </td>

                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {book.isbn}
                  </td>

                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {new Intl.NumberFormat(i18n.language).format(book.copies)}
                  </td>

                  {/*  FIXED STATUS */}
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        book.copies > 0
                          ? "bg-green-500/10 text-green-500"
                          : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {book.copies > 0 ? "Available" : "Out of stock"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-2">
                      <button className="text-primary hover:opacity-80">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                      onClick={()=>openEditModal(book)}
                      className="text-green-600 hover:opacity-80">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                      onClick={()=>handleDelete(book.id!, book.title)}
                      className="text-red-600 hover:opacity-80">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              //  EMPTY STATE
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-text-secondary"
                >
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

    
  );
};
const realLibrarians: User[] = users
  .filter((u: User) => u.role === "librarian")
  .filter((u: User) =>
    (u.name + u.email).toLowerCase().includes(searchTerm.toLowerCase())
  );
  const renderLibrarians = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
          <input
            type="text"
            placeholder={t("dashboard.searchLibrarian")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
  onClick={() => {
        setTargetRole("librarian");
  setShowUserModal(true);
  }}
  className="ml-4 flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90"
>
  <Plus className="w-5 h-5 mr-2" />
  {t("dashboard.addLibrarian")}
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
                {t("dashboard.booksManaged")}
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
  {realLibrarians.length > 0 ? (
    realLibrarians.map((librarian) => (
      <tr key={librarian.id} className="hover:bg-surface">
        <td className="px-6 py-4 text-sm font-medium text-text-primary">
          {librarian.name}
        </td>

        <td className="px-6 py-4 text-sm text-text-secondary">
          {librarian.email}
        </td>

        <td className="px-6 py-4 text-sm text-text-secondary">
          0
        </td>

        <td className="px-6 py-4">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
            Active
          </span>
        </td>

        <td className="px-6 py-4 text-sm">
          <div className="flex space-x-2">
            
            {/* VIEW */}
            <button className="text-primary hover:opacity-80">
              <Eye className="w-5 h-5" />
            </button>

            {/* UPDATE ROLE */}
            <button
              onClick={() => {
  setSelectedUser(librarian);
  setEditRole(librarian.role);
  setEditUserModal(true);
}}
              className="text-green-600 hover:opacity-80"
            >
              <Edit className="w-5 h-5" />
            </button>

            {/* DELETE (DEMOTE) */}
            <button
              onClick={async () => {                       // ← add async
                if (!confirm("Remove librarian role?")) return;

                await dispatch(updateUserRoleThunk({       // ← add await
                  uid: librarian.id,
                  role: "student",
                }));

                setSuccess("Librarian removed");
                setTimeout(() => setSuccess(""), 2000);
                await addActivity(
                  "Librarian Removed",
                  `${librarian.email} demoted to student`,
                  "warning",
                  profile?.email || "Unknown"
                );
                const updated = await fetchRecentActivities(10);
                setActivities(updated);
              }}
              className="text-red-600 hover:opacity-80"
            >
              <Trash2 className="w-5 h-5" />
            </button>

          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={5} className="text-center py-6 text-text-secondary">
        No librarians found
      </td>
    </tr>
  )}
</tbody>

{success && (
  <div className="bg-green-100 text-green-700 px-4 py-2 rounded">
    {success}
  </div>
)}
        </table>
      </div>
    </div>
  );

  const realStudents: User[] = users
  .filter((u: User) => u.role === "student")
  .filter((u: User) =>
    (u.name + u.email).toLowerCase().includes(searchTerm.toLowerCase())
  );

const renderStudents = () => (
  <div className="space-y-6">

    {/* TOP BAR */}
    <div className="flex justify-between items-center">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
        <input
          type="text"
          placeholder={t("dashboard.searchStudent")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg"
        />
      </div>

      {/* ADD STUDENT */}
      <button
       onClick={() => {
  setTargetRole("student");
  setShowUserModal(true);
}}
        className="ml-4 flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90"
      >
        <Plus className="w-5 h-5 mr-2" />
        {t("dashboard.addStudent")}
      </button>
    </div>

    {/* SUCCESS MESSAGE */}
    {success && (
      <div className="bg-green-100 text-green-700 px-4 py-2 rounded">
        {success}
      </div>
    )}

    {/* TABLE */}
    <div className="bg-surface rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-border">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs text-text-secondary uppercase">
              {t("profile.name")}
            </th>
            <th className="px-6 py-3 text-left text-xs text-text-secondary uppercase">
              {t("profile.email")}
            </th>
            <th className="px-6 py-3 text-left text-xs text-text-secondary uppercase">
              {t("catalog.status")}
            </th>
            <th className="px-6 py-3 text-left text-xs text-text-secondary uppercase">
              {t("catalog.actions")}
            </th>
          </tr>
        </thead>

        <tbody>
          {realStudents.length > 0 ? (
            realStudents.map((student) => (
              <tr key={student.id} className="hover:bg-surface">
                
                {/* NAME */}
                <td className="px-6 py-4 text-sm font-medium text-text-primary">
                  {student.name}
                </td>

                {/* EMAIL */}
                <td className="px-6 py-4 text-sm text-text-secondary">
                  {student.email}
                </td>

                {/* STATUS */}
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500">
                    Active
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-4">
                  <div className="flex space-x-2">

                    {/* VIEW */}
                    <button className="text-primary hover:opacity-80">
                      <Eye className="w-5 h-5" />
                    </button>

                    {/* UPDATE ROLE */}
                    <button
                      onClick={() => {
                setSelectedUser(student);
                setEditRole(student.role);
                setEditUserModal(true);
}}
                      className="text-green-600 hover:opacity-80"
                    >
                      <Edit className="w-5 h-5" />
                    </button>

                    {/* DELETE STUDENT (demote/remove logic) */}
                    <button
                      onClick={() => {
                        if (!confirm("Delete student?")) return;

                        dispatch(deleteUserThunk(student.id))
                        .unwrap()
                        .then(async () => {                        // ← add async
                          dispatch(fetchUsers());
                          setSuccess("Student deleted");
                          setTimeout(() => setSuccess(""), 2000);
                          await addActivity(
                            "Student Deleted",
                            `${student.email} removed`,
                            "warning",
                            profile?.email || "Unknown"
                          );
                          const updated = await fetchRecentActivities(10);
                          setActivities(updated);
                        })
                        .catch(() => alert("Delete failed"));
                      }}
                      className="text-red-600 hover:opacity-80"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-6 text-text-secondary">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

  const renderSettings = () => (
    <div className="space-y-6">
      {success && (
  <div className="bg-green-100 text-green-700 px-4 py-2 rounded">
    {success}
  </div>
)}
      <div className="bg-surface rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          {t("settings.systemSettings")}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t("settings.libraryName")}
            </label>
            <input
               name="libraryName"
  value={settings.libraryName}
  onChange={handleSettingsChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t("settings.maxBooksPerStudent")}
            </label>
            <input
               type="number"
  name="maxBooksPerStudent"
  value={settings.maxBooksPerStudent}
  onChange={handleSettingsChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t("settings.loanDuration")}
            </label>
            <input
             type="number"
  name="loanDuration"
  value={settings.loanDuration}
  onChange={handleSettingsChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t("settings.finePerDay")}
            </label>
            <input
               type="number"
  name="finePerDay"
  value={settings.finePerDay}
  onChange={handleSettingsChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button  onClick={handleSaveSettings} className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90">
            {t("settings.saveSettings")}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-text-primary">
                {t("dashboard.adminDashboard")}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-text-secondary">
                {t("dashboard.adminUser")}
              </span>
           <button
  onClick={handleLogout}
  className="p-2 text-text-secondary hover:bg-surface/70 rounded-lg transition"
>
  <LogOut className="w-5 h-5" />
</button>

            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-surface rounded-lg shadow mb-6">
          <nav className="flex space-x-1 p-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "overview"
                  ? "bg-primary text-white"
                  : "text-text-secondary hover:bg-surface/70"
              }`}
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              {t("dashboard.overview")}
            </button>
            <button
              onClick={() => setActiveTab("books")}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "books"
                  ? "bg-primary text-white"
                  : "text-text-secondary hover:bg-surface/70"
              }`}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              {t("dashboard.books")}
            </button>
            <button
              onClick={() => setActiveTab("librarians")}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "librarians"
                  ? "bg-primary text-white"
                  : "text-text-secondary hover:bg-surface/70"
              }`}
            >
              <UserCog className="w-5 h-5 mr-2" />
              {t("dashboard.librarians")}
            </button>
            <button
              onClick={() => setActiveTab("students")}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "students"
                  ? "bg-primary text-white"
                  : "text-text-secondary hover:bg-surface/70"
              }`}
            >
              <Users className="w-5 h-5 mr-2" />
              {t("dashboard.students")}
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "settings"
                  ? "bg-primary text-white"
                  : "text-text-secondary hover:bg-surface/70"
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
      {/* ✅ ADD MODAL HERE */}
{showModal && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    
    <div className="bg-surface w-full max-w-md rounded-2xl shadow-xl p-6 space-y-5 border border-border">
      
      {/* Title */}
      <h2 className="text-xl font-semibold text-text-primary text-center">
        {editingBook ? "Edit Book" : "Add Book"}
      </h2>

      {/* Title */}
      <div>
        <label className="text-sm text-text-secondary">Title</label>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary outline-none"
        />
      </div>

      {/* Author */}
      <div>
        <label className="text-sm text-text-secondary">Author</label>
        <input
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary outline-none"
        />
      </div>

      {/* ISBN */}
      <div>
        <label className="text-sm text-text-secondary">ISBN</label>
        <input
          value={form.isbn}
          onChange={(e) => setForm({ ...form, isbn: e.target.value })}
          className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary outline-none"
        />
      </div>

      {/* Copies */}
      <div>
        <label className="text-sm text-text-secondary">Copies</label>
        <input
          type="number"
          value={form.copies}
          onChange={(e) =>
            setForm({ ...form, copies: Number(e.target.value) })
          }
          className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary outline-none"
        />
      </div>

      {/* cover */}
      <div>
      <label className="text-sm text-text-secondary">Cover Image URL</label>
      <input
        value={form.cover}
        onChange={(e) => setForm({ ...form, cover: e.target.value })}
        className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary outline-none"
      />
      {form.cover && (
  <div className="flex justify-center mt-2">
    <img
      src={form.cover}
      alt="Preview"
      className="w-24 h-32 object-cover rounded shadow"
    />
  </div>
)}
    </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-3">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 rounded-lg border border-border text-text-secondary hover:bg-background transition"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          disabled={!form.title || !form.author || !form.isbn}
          className="px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 disabled:opacity-50"
        >
          {editingBook ? "Update" : "Save"}
        </button>
      </div>
    </div>
  </div>
)}

{/* USER ROLE MODAL */}
{showUserModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-surface w-full max-w-md rounded-2xl shadow-xl p-6 space-y-5 border border-border">

      <h2 className="text-xl font-semibold text-center text-text-primary">
        {targetRole === "librarian" ? "Add Librarian" : "Add Student"}
      </h2>

      {/* SELECT USER */}
      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-background border border-border"
      >
        <option value="">Select User</option>
        {selectableUsers.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} ({user.email})
          </option>
        ))}
      </select>

      {/* BUTTONS */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowUserModal(false)}
          className="px-4 py-2 border border-border rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            if (!selectedUserId) {
              alert("Select a user");
              return;
            }

            dispatch(updateUserRoleThunk({
              uid: selectedUserId,
              role: targetRole,
            }))
              .unwrap()
              .then(async() => {
                dispatch(fetchUsers());
                setShowUserModal(false);
                setSelectedUserId("");
                setSuccess(
                  targetRole === "librarian"
                    ? "Librarian added"
                    : "Student added"
                );
                setTimeout(() => setSuccess(""), 2000);
                const selected = users.find((u) => u.id === selectedUserId);

                  await addActivity(
                    targetRole === "librarian"
                      ? "Librarian Added"
                      : "Student Added",

                    `${selected?.email} assigned as ${targetRole}`,

                    "success",

                    profile?.email || "Unknown"
                  );

                  const updated = await fetchRecentActivities(10);
                  setActivities(updated);
              });
          }}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Save
        </button>
      </div>

    </div>
  </div>
)}

{/* EDIT ROLE MODAL */}
{editUserModal && selectedUser && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-surface w-full max-w-md rounded-2xl shadow-xl p-6 space-y-5 border border-border">

      <h2 className="text-xl font-semibold text-center">
        Update Role
      </h2>

      <p className="text-sm text-text-secondary text-center">
        {selectedUser.name} ({selectedUser.email})
      </p>

      {/* ROLE SELECT */}
      <select
        value={editRole}
        onChange={(e) =>
          setEditRole(e.target.value as "admin" | "librarian" | "student")
        }
        className="w-full px-3 py-2 rounded-lg bg-background border border-border"
      >
        <option value="admin">Admin</option>
        <option value="librarian">Librarian</option>
        <option value="student">Student</option>
      </select>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setEditUserModal(false)}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            dispatch(updateUserRoleThunk({
              uid: selectedUser.id,
              role: editRole,
            }))
              .unwrap()
              .then(async () => {                          // ← add async
              dispatch(fetchUsers());
              setEditUserModal(false);
              setSuccess("Role updated");
              setTimeout(() => setSuccess(""), 2000);
              await addActivity(
                "Role Updated",
                `${selectedUser?.email} changed to ${editRole}`,
                "info",
                profile?.email || "Unknown"
              );
              const updated = await fetchRecentActivities(10);
              setActivities(updated);
            })
          }}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Save
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  );
}
