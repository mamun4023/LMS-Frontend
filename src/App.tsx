import {
  Book,
  Calendar,
  Clock,
  Mail,
  MapPin,
  Phone,
  Search,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text } from "./components/common/Text";
import Header from "./components/unique/Header";
import { HEADINGS } from "./constants/headings";
interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
}

const LibraryHomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const featuredBooks: Book[] = [
    {
      id: 1,
      title: t("featuredBooks.theMidnightLibrary"),
      author: t("featuredBooks.mattHaig"),
      cover: "/book/the_midnight_library.jpg",
    },
    {
      id: 2,
      title: t("featuredBooks.atomicHabits"),
      author: t("featuredBooks.jamesClear"),
      cover: "/book/atomic_habits.jpg",
    },
    {
      id: 3,
      title: t("featuredBooks.projectHailMary"),
      author: t("featuredBooks.andyWeir"),
      cover: "/book/project_hail_mary.jpg",
    },
    {
      id: 4,
      title: t("featuredBooks.theSilentPatient"),
      author: t("featuredBooks.alexMichaelides"),
      cover: "/book/the_silent_patient.jpg",
    },
  ];

  const quickLinks = [
    {
      icon: Book,
      title: t("quickActions.browseCatalog"),
      desc: t("quickActions.exploreCollection"),
    },
    {
      icon: Calendar,
      title: t("quickActions.bookStudyRoom"),
      desc: t("quickActions.reserveSpace"),
    },
    {
      icon: Users,
      title: t("quickActions.eventsPrograms"),
      desc: t("quickActions.joinCommunity"),
    },
    {
      icon: Clock,
      title: t("quickActions.hoursLocation"),
      desc: t("quickActions.visitToday"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            <Text>{HEADINGS.DISCOVER_YOUR_NEXT_ADVENTURE}</Text>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            <Text>
              {
                HEADINGS.ACCESS_THOUSANDS_OF_BOOKS_DIGITAL_RESOURCES_AND_COMMUNITY_PROGRAMS
              }
            </Text>
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t("search.placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg shadow-lg"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              {t("search.searchButton")}
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {quickLinks.map((link, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer group"
            >
              <link.icon className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 transition" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {link.title}
              </h3>
              <p className="text-gray-600">{link.desc}</p>
            </div>
          ))}
        </div>

        {/* Featured Books */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            {t("student.featuredThisWeek")}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <div key={book.id} className="group cursor-pointer">
                <div
                  className="aspect-[2/3] rounded-lg mb-3 flex items-end justify-center  shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition"
                  style={{ backgroundColor: book.cover }}
                >
                  <img src={book.cover} alt={book.cover} />
                  <Book className="w-16 h-16 text-white opacity-50" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {book.title}
                </h4>
                <p className="text-sm text-gray-600">{book.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Announcement Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-16">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                {t("student.summerReadingProgram")}
              </h3>
              <p className="text-blue-100">
                {t("student.summerReadingProgramDescription")}
              </p>
            </div>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
              {t("quickActions.learnMore")}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">
                {t("footer.visitUs")}
              </h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>{t("footer.address")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{t("footer.hours")}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">
                {t("footer.contact")}
              </h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>{t("footer.phone")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>{t("footer.email")}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">
                {" "}
                {t("footer.quickLinks")}
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition">
                    {t("navigation.myAccount")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    {t("navigation.digitalResources")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    {t("navigation.libraryCard")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    {t("navigation.supportUs")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {t("footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LibraryHomePage;
