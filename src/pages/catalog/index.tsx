 
import { AlertCircle, BookOpen, Heart, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/unique/Header";
import i18n from "../../i18n";
import type { AppDispatch, RootState } from "../../store";
import { borrowBookThunk, fetchBooks, fetchBorrowedBooks } from "../../store/slices/bookSlice";
import {
  addFavouriteThunk,
  fetchFavourites,
  removeFavouriteThunk,
} from "../../store/slices/favouriteSlice";
// type Book = {
//   id: string;
//   title: string;
//   author: string;
//   isbn: string;      
//   copies: number;
//   cover?: string;    
// };

const LibraryCatalog: React.FC = () => {
  const { borrowedBooks } = useSelector((state: RootState) => state.books);
  const activeBorrowCount = borrowedBooks.filter((b) => !b.returned).length;
  const [recentlyFaved, setRecentlyFaved] = useState<string | null>(null);
const hasReachedLimit = activeBorrowCount >= 5;
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
const { user } = useSelector((state: RootState) => state.auth);
const { books } = useSelector((state: RootState) => state.books);

useEffect(() => {
  dispatch(fetchBooks());
  if(user){
    dispatch(fetchBorrowedBooks(user.uid));
  }
}, [dispatch,user]);

const { favourites } = useSelector((state: RootState) => state.favourites);

useEffect(() => {
  if (user) dispatch(fetchFavourites(user.uid));
}, [dispatch, user]);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = true;
    const matchesAvailability = !availableOnly || book.copies > 0;

    return matchesSearch && matchesCategory && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-background bg-linear-to-br from-background to-surface">
      {/* Header */}
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-surface rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
              <input
                type="text"
                placeholder={t("search.searchByTitleOrAuthor")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>



            {/* Availability Toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="w-4 h-4 text-primary rounded  focus:ring-primary"
              />
              <span className="text-text-secondary">
                {t("catalog.availableOnly")}
              </span>
            </label>
          </div>
        </div>

                   {hasReachedLimit && (
  <div className="mb-6 flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 rounded-lg px-4 py-3 text-sm font-medium">
    <AlertCircle className="w-5 h-5 shrink-0" />
    You've reached the 5-book borrow limit. Please return a book before borrowing another.
  </div>
)}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-text-secondary">
            {t("catalog.showing")}{" "}
            <span className="font-semibold">{filteredBooks.length}</span>{" "}
            {t("catalog.of")}{" "}
            <span className="font-semibold">{books.length}</span>{" "}
            {t("catalog.books")}
          </p>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredBooks.map((book) => {
    const isBorrowed = borrowedBooks.some(
      (b) => b.bookId === book.id && !b.returned
    );
    return (
      <div
        key={book.id}
        className="bg-surface rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative h-64 bg-gray-200 overflow-hidden">
          {/* ✅ Flash label */}
{recentlyFaved === book.id && (
  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">
    ❤️ Added to favourites
  </div>
)}
  {book.cover ? (
  <img
      src={book.cover}
      alt={book.title}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center text-gray-500">
      No Image
    </div>
  )}

  <div
    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
      book.copies > 0
        ? "bg-green-500 text-white"
        : "bg-red-500 text-white"
    }`}
  >
    {book.copies > 0
      ? t("catalog.available")
      : t("catalog.checkedout")}
  </div>
  {/*  Heart button */}
  {(() => {
  const fav = favourites.find((f) => f.bookId === book.id);
  const isFav = !!fav;
  return (
    <button
     onClick={() => {
  if (!user) return;
  if (fav) {
    dispatch(removeFavouriteThunk(fav.id));
  } else {
    dispatch(addFavouriteThunk({
      userId: user.uid,
      book: {
        bookId: book.id ,
        title: book.title ,
        author: book.author ,
        isbn: book.isbn ,
        cover: book.cover ,
      },
    }));
    // ✅ show "Added!" label for 1.5s
    setRecentlyFaved(book.id);
    setTimeout(() => setRecentlyFaved(null), 1500);
  }
}}
      className={`absolute top-3 left-3 p-1.5 rounded-full transition-all duration-200 ${
        isFav
          ? "bg-red-500/80 hover:bg-red-600/80 scale-110"  // ✅ red bg when favourited
          : "bg-black/40 hover:bg-black/60"
      }`}
    >
      <Heart
        className={`w-4 h-4 transition-all duration-200 ${
          isFav
            ? "fill-white text-white scale-110"   // ✅ filled white on red bg
            : "text-white"                         // outline on dark bg
        }`}
      />
    </button>
  );
})()}
</div>

        <div className="p-5">
          <h3 className="text-xl font-bold text-text-primary mb-1 line-clamp-1">
            {book.title}
          </h3>
          <p className="text-text-secondary mb-2">{book.author}</p>

          <div className="space-y-1 text-sm text-text-secondary mb-4">
            <p>
              <span className="font-medium">{t("catalog.isbn")}:</span>{" "}
              {book.isbn}
            </p>
            <p>
              <span className="font-medium">{t("catalog.copies")}:</span>{" "}
              {new Intl.NumberFormat(i18n.language).format(book.copies)}
            </p>
          </div>

       <button
  disabled={book.copies <= 0 || isBorrowed || hasReachedLimit}
  onClick={() => {
    if (!user || book.copies <= 0 || isBorrowed || hasReachedLimit) return;
    dispatch(borrowBookThunk({ userId: user.uid, book }))
      .unwrap()
      .then(() => {
        dispatch(fetchBooks());
        dispatch(fetchBorrowedBooks(user.uid));
      });
  }}
  className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
    isBorrowed
      ? "bg-yellow-400 text-white cursor-not-allowed"
      : hasReachedLimit
      ? "bg-border text-text-secondary cursor-not-allowed"
      : book.copies > 0
      ? "btn-primary"
      : "bg-border text-text-secondary cursor-not-allowed"
  }`}
>
  {isBorrowed
    ? "Already Borrowed"
    : hasReachedLimit
    ? "Borrow Limit Reached"
    : book.copies > 0
    ? "Borrow Book"
    : "Not Available"}
</button>
        </div>
      </div>
    );
  })}
</div>

        {/* No Results */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              {t("catalog.noBooksFound")}
            </h3>
            <p className="text-text-secondary">
              {t("catalog.tryAdjustingSearch")}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default LibraryCatalog;
