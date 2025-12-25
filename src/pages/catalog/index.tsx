import { BookOpen, Filter, Search, Star } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/unique/Header";
import i18n from "../../i18n";

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  year: number;
  isbn: string;
  available: boolean;
  rating: number;
  cover: string;
}

const LibraryCatalog: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [availableOnly, setAvailableOnly] = useState(false);

  const books: Book[] = [
    {
      id: 1,
      title: t("bookTitles.theGreatGatsby"),
      author: t("bookTitles.fScottFitzgerald"),
      category: t("bookTitles.fiction"),
      year: 1925,
      isbn: t("bookTitles.isbnGreatGatsby"),
      available: true,
      rating: 4.5,
      cover:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    },
    {
      id: 2,
      title: t("bookTitles.toKillAMockingbird"),
      author: t("bookTitles.harperLee"),
      category: t("bookTitles.fiction"),
      year: 1960,
      isbn: t("bookTitles.isbnMockingbird"),
      available: false,
      rating: 4.8,
      cover:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
    },
    {
      id: 3,
      title: t("bookTitles.nineteenEightyFour"),
      author: t("bookTitles.georgeOrwell"),
      category: t("bookTitles.scienceFiction"),
      year: 1949,
      isbn: t("bookTitles.isbn1984"),
      available: true,
      rating: 4.7,
      cover:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    },
    {
      id: 4,
      title: t("bookTitles.prideAndPrejudice"),
      author: t("bookTitles.janeAusten"),
      category: t("bookTitles.romance"),
      year: 1813,
      isbn: t("bookTitles.isbnPride"),
      available: true,
      rating: 4.6,
      cover:
        "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=300&h=400&fit=crop",
    },
    {
      id: 5,
      title: t("bookTitles.theCatcherInTheRye"),
      author: t("bookTitles.jdSalinger"),
      category: t("bookTitles.fiction"),
      year: 1951,
      isbn: t("bookTitles.isbnCatcher"),
      available: false,
      rating: 4.2,
      cover:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&h=400&fit=crop",
    },
    {
      id: 6,
      title: t("bookTitles.theHobbit"),
      author: t("bookTitles.jrrTolkien"),
      category: t("bookTitles.fantasy"),
      year: 1937,
      isbn: t("bookTitles.isbnHobbit"),
      available: true,
      rating: 4.9,
      cover:
        "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=300&h=400&fit=crop",
    },
  ];

  const categories = [
    "all",
    ...Array.from(new Set(books.map((book) => book.category))),
  ];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || book.category === selectedCategory;
    const matchesAvailability = !availableOnly || book.available;

    return matchesSearch && matchesCategory && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t("search.searchByTitleOrAuthor")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all"
                      ? t("events.all")
                      : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700 whitespace-nowrap">
                {t("catalog.availableOnly")}
              </span>
            </label>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {t("catalog.showing")}{" "}
            <span className="font-semibold">{filteredBooks.length}</span>{" "}
            {t("catalog.of")}{" "}
            <span className="font-semibold">{books.length}</span>{" "}
            {t("catalog.books")}
          </p>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 bg-gray-200">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                    book.available
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {book.available
                    ? t("catalog.available")
                    : t("catalog.checkedout")}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-gray-600 mb-2">{book.author}</p>

                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(book.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    {new Intl.NumberFormat(i18n.language).format(book.rating)}
                  </span>
                </div>

                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <p>
                    <span className="font-medium">{t("common.category")}:</span>{" "}
                    {book.category}
                  </p>
                  <p>
                    <span className="font-medium">{t("catalog.year")}:</span>{" "}
                    {new Intl.NumberFormat(i18n.language).format(book.year)}
                  </p>
                  <p>
                    <span className="font-medium">{t("catalog.isbn")}</span>{" "}
                    {book.isbn}
                  </p>
                </div>

                <button
                  disabled={!book.available}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                    book.available
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {book.available
                    ? t("catalog.borrowBook")
                    : t("catalog.notAvailable")}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {t("catalog.noBooksFound")}
            </h3>
            <p className="text-gray-500">{t("catalog.tryAdjustingSearch")}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default LibraryCatalog;
