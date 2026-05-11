  import {
    Book,
    Clock,
    Mail,
    MapPin,
    Phone,
    Search
  } from "lucide-react";
  import React, { useState } from "react";
  import { useTranslation } from "react-i18next";
  import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
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

    // const quickLinks = [
    //   {
    //     icon: Calendar,
    //     title: t("quickActions.bookStudyRoom"),
    //     desc: t("quickActions.reserveSpace"),
    //   },
    //   {
    //     icon: Users,
    //     title: t("quickActions.eventsPrograms"),
    //     desc: t("quickActions.joinCommunity"),
    //   },
    //   {
    //     icon: Clock,
    //     title: t("quickActions.hoursLocation"),
    //     desc: t("quickActions.visitToday"),
    //   },
    // ];
    

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-text-primary mb-4">
              <Text>{HEADINGS.DISCOVER_YOUR_NEXT_ADVENTURE}</Text>
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
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
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
              <input
                type="text"
                placeholder={t("search.placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-12 pr-4 text-lg shadow-sm"
              />
              <button className="btn-primary absolute right-2 top-1/2 transform -translate-y-1/2 ">
                {t("search.searchButton")}
              </button>
            </div>
          </div>

          {/* Quick Links */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {quickLinks.map((link, index) => (
              <div
                key={index}
                className="bg-surface p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer group"
              >
                <link.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {link.title}
                </h3>
                <p className="text-text-secondary">{link.desc}</p>
              </div>
            ))}
          </div> */}

          {/* Featured Books */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-text-primary mb-8">
              {t("student.featuredThisWeek")}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredBooks.map((book) => (
                <div key={book.id} className="group cursor-pointer">
                  <div
                    className="aspect-2/3 bg-surface rounded-lg mb-3 flex items-end justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition"
                    // style={{ backgroundColor: book.cover }}
                  >
                    <img src={book.cover} alt={book.title} />
                    <Book className="w-16 h-16 text-white opacity-50" />
                  </div>
                  <h4 className="font-semibold text-text-primary mb-1">
                    {book.title}
                  </h4>
                  <p className="text-sm text-text-secondary">{book.author}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Announcement Banner */}
          {/* <div className="bg-primary rounded-xl p-8 text-white mb-16">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  {t("student.summerReadingProgram")}
                </h3>
                <p className="opacity-90">
                  {t("student.summerReadingProgramDescription")}
                </p>
              </div>
              <button className="bg-surface text-primary px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
                {t("quickActions.learnMore")}
              </button>
            </div>
          </div> */}

          {/* Membership CTA */}
          <div className="mt-12 bg-primary  rounded-xl shadow-xl p-8 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">
              {t("membership.becomeMember")}
            </h3>
            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              {t("membership.becomeMemberDescription")}
            </p>
            <button onClick={() => navigate("/signup")} className="py-3 px-8 bg-surface text-primary rounded-lg hover:bg-white/90 transition-colors font-bold text-lg">
              {t("membership.signUpNow")}
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-surface border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-text-primary mb-4">
                  {t("footer.visitUs")}
                </h4>
                <div className="space-y-3 text-text-secondary">
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
                <h4 className="text-lg font-semibold text-text-primary mb-4">
                  {t("footer.contact")}
                </h4>
                <div className="space-y-3 text-text-secondary">
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
                <h4 className="text-lg font-semibold text-text-primary mb-4">
                  {" "}
                  {t("footer.quickLinks")}
                </h4>
                <ul className="space-y-2 text-text-secondary">
                  <li>
                    <a href="#" className="hover:text-text-primary transition">
                      {t("navigation.myAccount")}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-text-primary transition">
                      {t("navigation.digitalResources")}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-text-primary transition">
                      {t("navigation.libraryCard")}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-text-primary transition">
                      {t("navigation.supportUs")}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border mt-8 pt-8 text-center text-text-secondary">
              <p>&copy; {t("footer.copyright")}</p>
            </div>
          </div>
        </footer>
      </div>
    );
  };

  export default LibraryHomePage;
