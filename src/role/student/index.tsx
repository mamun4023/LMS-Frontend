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
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store";
import { logoutUser } from "../../store/slices/authSlice";
import { fetchBooks, fetchBorrowedBooks, renewBookThunk, returnBookThunk } from "../../store/slices/bookSlice";
import type { FavouriteBook } from "../../store/slices/favouriteSlice";
import {
  fetchFavourites,
  removeFavouriteThunk,
} from "../../store/slices/favouriteSlice";

// interface BorrowedBook {
//   id: string;
//   title: string;
//   author: string;
//   dueDate: string;
//   status: "on-time" | "due-soon" | "overdue";
//   coverColor: string;
// }

interface ReservedBook {
  id: number;
  title: string;
  author: string;
  availableDate: string;
  position: number;
}

interface Notification {
  id: number;
  type: "due" | "overdue";
  // message: string;
  // time: string;
  title: string;
  days?: number;
  time: "twoHoursAgo" | "oneDayAgo" | "twoDaysAgo";
}

// Book cover with Open Library → Google Books → placeholder fallback
const FavCover: React.FC<{ isbn: string; title: string }> = ({ isbn, title }) => {
  const [src, setSrc] = useState(`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`);
  const [stage, setStage] = useState(0);

  const handleError = () => {
    if (stage === 0) {
      setSrc(`https://books.google.com/books/content?vid=ISBN${isbn}&printsec=frontcover&img=1&zoom=1`);
      setStage(1);
    } else {
      setStage(2);
    }
  };

  if (stage === 2) {
    return (
      <div className="w-full h-full bg-linear-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-3">
        <Book className="w-8 h-8 text-white opacity-50 mb-1" />
        <p className="text-white text-xs text-center line-clamp-3 opacity-80">{title}</p>
      </div>
    );
  }

  return (
    <img src={src} alt={title} className="w-full h-full object-cover" onError={handleError} />
  );
};
const StudentDashboard: React.FC = () => {
 
  // const navigate = useNavigate();
  const {profile}=useSelector((state:RootState)=>state.user);

  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<
    "overview" | "borrowed" | "history" | "favorites"
  >("overview");
  const [showNotifications, setShowNotifications] = useState(false);
const [search, setSearch] = useState("");

  const { borrowedBooks } = useSelector((state: RootState) => state.books);
    const activeBorrowCount = borrowedBooks.filter((b) => !b.returned).length;
const hasReachedLimit = activeBorrowCount >= 5;
const { user } = useSelector((state: RootState) => state.auth);
const getBookStatus = (dueDate: string) => {
  const today = new Date();
  const due = new Date(dueDate);

  if (due < today) return "overdue";

  const diff = due.getTime() - today.getTime();
  if (diff < 3 * 24 * 60 * 60 * 1000) return "due-soon";

  return "on-time";
};



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
    name: profile?.name ?? t("student.defaultName", "Student"),
    id: t("student.demoStudent.id"),
    email: profile?.email ?? "",
    memberSince: t("student.demoStudent.memberSince"),
  };

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

useEffect(() => {
  if (!user) return;

  dispatch(fetchBorrowedBooks(user.uid));

  const interval = setInterval(() => {
    dispatch(fetchBorrowedBooks(user.uid));
  }, 30000); // every 30 sec

  return () => clearInterval(interval);
}, [dispatch, user]);

const handleLogout = async () => {
  await dispatch(logoutUser());
  navigate("/signin");
};

const { favourites } = useSelector((state: RootState) => state.favourites);

// fetch on mount — add inside existing useEffect or add separately
useEffect(() => {
  if (user) dispatch(fetchFavourites(user.uid));
}, [dispatch, user]);


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

 
const notifications = borrowedBooks
  .filter((b) => !b.returned)
  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
  .flatMap((book, index): Notification[] => {
    const status = getBookStatus(book.dueDate);
    const now = new Date();
    const due = new Date(book.dueDate);

    if (status === "overdue") {
      const overdueHours = Math.floor(
        (now.getTime() - due.getTime()) / (1000 * 60 * 60)
      );
      const time: Notification["time"] =
        overdueHours < 24 ? "twoHoursAgo" : overdueHours < 48 ? "oneDayAgo" : "twoDaysAgo";

      return [{ id: index, type: "overdue", title: book.title, time }];
    }

  if (status === "due-soon") {
  const diffMs = due.getTime() - now.getTime();
  
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24)); // ✅ for UI display

  const time: Notification["time"] =
    diffHours < 24 ? "twoHoursAgo" :
    diffHours < 48 ? "oneDayAgo" :
    "twoDaysAgo";

  return [{ id: index + 1000, type: "due", title: book.title, days: diffDays, time }];
}

    return [];
  }
).slice(0,5);


  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-time":
        return "bg-green-500/10 text-green-500";
      case "due-soon":
        return "bg-yellow-500/10 text-yellow-500";
      case "overdue":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-muted text-text-secondary";
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
    <div className="min-h-screen bg-background ">
      {/* Header */}
      <header className="bg-surface shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Book className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-text-primary">
                  {t("dashboard.libraryPortal")}
                </h1>
                <p className="text-xs text-text-secondary">
                  {t("dashboard.studentDashboard")}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-text-secondary hover:bg-surface/70 rounded-lg transition"
                >
                  <Bell className="w-6 h-6" />
                  {notifications.some(n => n?.type === "overdue") && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-surface rounded-lg shadow-xl border border-border py-2">
                    <div className="px-4 py-2 border-b border-border">
                      <h3 className="font-semibold text-text-primary">
                        {t("dashboard.notifications")}
                      </h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 && (
                          <p className="text-center text-text-secondary py-4">
                          No notifications 🎉
                        </p>
                      )}
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                              onClick={() => {
                              setShowNotifications(false);  // close dropdown
                              setActiveTab("borrowed");     // jump to borrowed tab
                            }}
                          className="px-4 py-3 hover:bg-surface/70 cursor-pointer border-b border-border"
                        >
                          <p className="text-sm text-text-primary">
                            {/* {notif.message} */}
                            {t(`student.notifications.${notif.type}`, {
                              title: notif.title,
                              days:
                                typeof notif.days === "number"
                                  ? formatNumber(notif.days)
                                  : undefined,
                            })}
                          </p>
                          <p className="text-xs text-text-secondary mt-1">
                            {/* {notif.time} */}
                            {t(`student.time.${notif.time}`)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3 pl-4 border-l border-border">
                <div className="text-right">
                  <p className="text-sm font-medium text-text-primary">
                    {studentInfo.name}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-text-secondary hover:bg-surface/70 rounded-lg transition"
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
          <h2 className="text-3xl font-bold text-text-primary mb-2">
            {t("student.welcomeBack")} {studentInfo.name.split(" ")[0]}!
          </h2>
          <p className="text-text-secondary">
            {t("student.dashboardSubtitle")}
          </p>
        </div>

        {/* Stats Cards */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
  {/* Borrowed */}
  <div className="bg-surface p-6 rounded-xl shadow-sm border border-border">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-text-secondary mb-1">
          {t("student.borrowed")}
        </p>
        <p className="text-3xl font-bold text-text-primary">
          {new Intl.NumberFormat(i18n.language).format(activeBorrowCount)}
          <span className="text-sm font-normal text-text-secondary"> / 5</span>
        </p>
        {hasReachedLimit && (
          <p className="text-xs text-yellow-500 mt-1 font-medium">Limit reached</p>
        )}
      </div>
      <BookOpen className={`w-12 h-12 opacity-20 ${hasReachedLimit ? "text-yellow-500" : "text-blue-600"}`} />
    </div>
  </div>

  {/* Reserved */}
  <div className="bg-surface p-6 rounded-xl shadow-sm border border-border">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-text-secondary mb-1">
          {t("student.reserved")}
        </p>
        <p className="text-3xl font-bold text-text-primary">
          {new Intl.NumberFormat(i18n.language).format(reservedBooks.length)}
        </p>
      </div>
      <Calendar className="w-12 h-12 text-green-600 opacity-20" />
    </div>
  </div>

  {/* Overdue */}
  <div className="bg-surface p-6 rounded-xl shadow-sm border border-border">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-text-secondary mb-1">
          {t("dashboard.overdue")}
        </p>
        <p className="text-3xl font-bold text-red-600">
          {borrowedBooks
            .filter((b) => !b.returned)
            .filter((b) => getBookStatus(b.dueDate) === "overdue").length}
        </p>
      </div>
      <AlertCircle className="w-12 h-12 text-red-600 opacity-20" />
    </div>
  </div>

  {/* Favorites */}
  <div className="bg-surface p-6 rounded-xl shadow-sm border border-border">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-text-secondary mb-1">
          {t("student.favorites")}
        </p>
        <p className="text-3xl font-bold text-text-primary">
          {new Intl.NumberFormat(i18n.language).format(favourites.length)}
        </p>
      </div>
      <Heart className="w-12 h-12 text-pink-600 opacity-20" />
    </div>
  </div>
</div>  {/* ← closing grid div was missing */}

        {/* Tabs */}
        <div className="bg-surface rounded-xl shadow-sm border border-border mb-8">
          <div className="border-b border-border">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition ${
                  activeTab === "overview"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-text-secondary hover:text-text-primary"
                }`}
              >
                {t("dashboard.overview")}
              </button>
              <button
                onClick={() => setActiveTab("borrowed")}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition ${
                  activeTab === "borrowed"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-text-secondary hover:text-text-primary"
                }`}
              >
                {t("student.borrowedBooks")}
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition ${
                  activeTab === "history"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-text-secondary hover:text-text-primary"
                }`}
              >
                {t("student.history")}
              </button>
              <button
                onClick={() => setActiveTab("favorites")}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition ${
                  activeTab === "favorites"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-text-secondary hover:text-text-primary"
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
                  <h3 className="text-lg font-semibold text-text-primary mb-4">
                    {t("student.currentlyBorrowed")}
                  </h3>
                  <div className="space-y-3">
                    {borrowedBooks
                          .filter((b) => !b.returned)
                          .filter((b) =>
                            b.title.toLowerCase().includes(search.toLowerCase())
                          ).length  === 0 && (
                        <p className="text-text-secondary text-center py-8">No borrowed books yet 📚</p>
                      )}
                    {borrowedBooks
                    .filter((b)=> !b.returned)
                    .filter((b) =>
                      b.title.toLowerCase().includes(search.toLowerCase())
                    ).map((book) => (
                      
                      <div
                        key={book.id}
                        className="flex items-center justify-between p-4 bg-surface rounded-lg hover:bg-surface/70 transition"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                           className="w-12 h-16 bg-blue-500 rounded flex items-center justify-center"
                          >
                            <Book className="w-6 h-6 text-white opacity-50" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-text-primary">
                              {book.title}
                            </h4>
                            <p className="text-sm text-text-secondary">
                              {book.author}
                            </p>
                            <p className="text-xs text-text-secondary mt-1">
                              {t("student.due")} {formatDate(book.dueDate)}
                            </p>
                          </div>
                        </div>
                       <div className="flex items-center space-x-3">
                      {(() => {
                        const status = getBookStatus(book.dueDate);
                        return (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                            {getStatusText(status)}
                          </span>
                        );
                      })()}
                      
            <button
  disabled={getBookStatus(book.dueDate) === "overdue"}  // 👈 add this
  onClick={() => {
    const status = getBookStatus(book.dueDate);
    if (status === "overdue") {
      alert("Cannot renew an overdue book. Please return it first.");
      return;
    }
    dispatch(renewBookThunk(book.id))
      .unwrap()
      .then(() => {
        if (user) dispatch(fetchBorrowedBooks(user.uid));
      })
      .catch(() => alert("Renewal failed"));
  }}
  className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
    getBookStatus(book.dueDate) === "overdue"
      ? "text-text-secondary cursor-not-allowed opacity-40"  // 👈 greyed out
      : "text-blue-600 hover:bg-primary/10"
  }`}
>
  {t("student.renew")}
</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reserved Books */}
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-4">
                    {t("student.reservedBooks")}
                  </h3>
                  <div className="space-y-3">
                    {reservedBooks.map((book) => (
                      <div
                        key={book.id}
                        className="flex items-center justify-between p-4 bg-surface rounded-lg"
                      >
                        <div>
                          <h4 className="font-semibold text-text-primary">
                            {book.title}
                          </h4>
                          <p className="text-sm text-text-secondary">
                            {book.author}
                          </p>
                          <p className="text-xs text-text-secondary mt-1">
                            {t("student.availableOn")}{" "}
                            {formatDate(book.availableDate)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-text-primary">
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
                  <h3 className="text-lg font-semibold text-text-primary">
                    {t("student.allBorrowedBooks")}
                  </h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={t("search.searchbooks")}
                      className="input-field pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  {borrowedBooks.filter((b)=>!b.returned).filter((b) =>
                  b.title.toLowerCase().includes(search.toLowerCase())
                ).length === 0 && (
                  <p className="text-text-secondary text-center py-8">No borrowed books yet 📚</p>
                )}
                  {borrowedBooks
                      .filter((b) => !b.returned)
                      .filter((b) =>
                        b.title.toLowerCase().includes(search.toLowerCase())
                      ).map((book) => (
                    <div
                      key={book.id}
                      className="flex items-center justify-between p-4 bg-surface rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className="w-12 h-16 bg-blue-500 rounded flex items-center justify-center"
                        >
                          <Book className="w-6 h-6 text-white opacity-50" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-text-primary">
                            {book.title}
                          </h4>
                          <p className="text-sm text-text-secondary">
                            {book.author}
                          </p>
                          <p className="text-xs text-text-secondary mt-1">
                            {t("student.due")} {formatDate(book.dueDate)} 
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                   
                                        {(() => {
                        const status = getBookStatus(book.dueDate);
                        return (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                            {getStatusText(status)}
                          </span>
                        );
                      })()}
                        <button
                        disabled={book.returned}
                    onClick={() => {
                      dispatch(
                        returnBookThunk({
                          borrowId: book.id,
                          bookId: book.bookId,
                        })
                      )
                      .unwrap()
                      .then(() => {
                        if (user) {
                          dispatch(fetchBorrowedBooks(user.uid));
                        }
                        dispatch(fetchBooks()); // 🔥 update catalog
                      })
                      .catch(()=> alert("Return failed"))
                    }}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 rounded-lg transition"
                  >
                    {book.returned ? "Returned" : "Return"}
                  </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}


{activeTab === "history" && (
  <div>
    <h3 className="text-lg font-semibold text-text-primary mb-4">
      {t("student.borrowingHistory")}
    </h3>

    {borrowedBooks.filter((b) => b.returned).length === 0 && (
      <p className="text-text-secondary text-center py-8">
        No borrowing history yet 📚
      </p>
    )}

    <div className="space-y-3">
      {borrowedBooks
        .filter((b) => b.returned)
        .map((book) => (
          <div
            key={book.id}
            className="flex items-center justify-between p-4 bg-surface rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-16 bg-green-500 rounded flex items-center justify-center">
                <Book className="w-6 h-6 text-white opacity-50" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary">
                  {book.title}
                </h4>
                <p className="text-sm text-text-secondary">{book.author}</p>
                <p className="text-xs text-text-secondary mt-1">
                  {book.borrowedAt
                    ? `${t("student.borrowed")}: ${formatDate(book.borrowedAt)} → `
                    : ""}
                  {t("student.due")}: {formatDate(book.dueDate)}
                </p>
              </div>
            </div>
            <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
          </div>
        ))}
    </div>
  </div>
)}

           {activeTab === "favorites" && (
  <div>
    <h3 className="text-lg font-semibold text-text-primary mb-4">
      {t("student.myFavoriteBooks")}
    </h3>

    {favourites.length === 0 && (
      <div className="text-center py-12">
        <Heart className="w-12 h-12 text-text-secondary mx-auto mb-3 opacity-30" />
        <p className="text-text-secondary">No favourites yet — heart a book from the catalog ❤️</p>
      </div>
    )}

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {favourites.map((fav: FavouriteBook) => (
        <div key={fav.id} className="group relative">
          {/* Cover */}
          <div className="relative aspect-2/3 rounded-lg overflow-hidden shadow-md mb-2">
            <FavCover isbn={fav.isbn} title={fav.title} />

            {/* Remove heart on hover */}
            <button
              onClick={() => dispatch(removeFavouriteThunk(fav.id))}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition"
            >
              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
            </button>
          </div>

          <h4 className="font-semibold text-text-primary text-sm line-clamp-2 leading-tight">
            {fav.title}
          </h4>
          <p className="text-xs text-text-secondary mt-0.5">{fav.author}</p>
        </div>
      ))}
    </div>
  </div>
)}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button onClick={() => navigate("/catalog")} className="bg-surface p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition text-left">
            <Search className="w-10 h-10 text-blue-600 mb-3" />
            <h3 className="font-semibold text-text-primary mb-2">
              {t("quickActions.browseCatalog")}
            </h3>
            <p className="text-sm text-text-secondary">
              {t("catalog.searchAndDiscover")}
            </p>
          </button>

          <button className="bg-surface p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition text-left">
            <Calendar className="w-10 h-10 text-green-600 mb-3" />
            <h3 className="font-semibold text-text-primary mb-2">
              {t("student.bookStudyRoom")}
            </h3>
            <p className="text-sm text-text-secondary">
              {t("student.reserveSpaceForStudying")}
            </p>
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="bg-surface p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition text-left"
          >
            <User className="w-10 h-10 text-purple-600 mb-3" />
            <h3 className="font-semibold text-text-primary mb-2">
              {t("profile.myProfile")}
            </h3>
            <p className="text-sm text-text-secondary">
              {t("profile.updateAccountSettings")}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
