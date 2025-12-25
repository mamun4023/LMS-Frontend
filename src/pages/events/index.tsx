import {
  Calendar,
  ChevronRight,
  Clock,
  Filter,
  Heart,
  MapPin,
  Share2,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/unique/Header";
import i18n from "../../i18n";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  capacity: number;
  registered: number;
  image: string;
  featured: boolean;
}

const LibraryEvents: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<number[]>([]);
  const { t } = useTranslation();

  const events: Event[] = [
    {
      id: 1,
      title: t("events.authorMeetGreet"),
      description: t("events.authorMeetGreetDescription"),
      date: "2025-12-05",
      time: t("events.authorMeetGreetTime"),
      location: t("events.authorMeetGreetLocation"),
      category: t("events.authorMeetGreetCategory"),
      capacity: 100,
      registered: 67,
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=500&fit=crop",
      featured: true,
    },
    {
      id: 2,
      title: t("events.childrenStoryTime"),
      description: t("events.childrenStoryTimeDescription"),
      date: "2025-12-07",
      time: t("events.childrenStoryTimeTime"),
      location: t("events.childrenStoryTimeLocation"),
      category: t("events.childrenStoryTimeCategory"),
      capacity: 30,
      registered: 22,
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop",
      featured: false,
    },
    {
      id: 3,
      title: t("events.digitalWorkshop"),
      description: t("events.digitalWorkshopDescription"),
      date: "2025-12-10",
      time: t("events.digitalWorkshopTime"),
      location: t("services.computerLab"),
      category: t("events.digitalWorkshopCategory"),
      capacity: 20,
      registered: 15,
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop",
      featured: false,
    },
    {
      id: 4,
      title: t("events.bookclublit"),
      description: t("events.bookclubdesc"),
      date: "2025-12-12",
      time: t("events.bookclubnightime"),
      location: t("events.bookclublocation"),
      category: t("events.bookclubcategory"),
      capacity: 25,
      registered: 18,
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=500&fit=crop",
      featured: true,
    },
    {
      id: 5,
      title: t("events.teenGamingNight"),
      description: t("events.teenGamingNightDescription"),
      date: "2025-12-14",
      time: t("events.teenGamingNightTime"),
      location: t("events.teenGamingNightLocation"),
      category: t("events.childrenStoryTimeCategory"),
      capacity: 40,
      registered: 35,
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=500&fit=crop",
      featured: false,
    },
    {
      id: 6,
      title: t("events.photographyExhibition"),
      description: t("events.photographyExhibitionDescription"),
      date: "2025-12-16",
      time: t("vents.photographyExhibitionTime"),
      location: t("events.photographyExhibitionLocation"),
      category: t("events.photographyExhibitionCategory"),
      capacity: 80,
      registered: 45,
      image:
        "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=500&fit=crop",
      featured: true,
    },
    {
      id: 7,
      title: t("events.creativeWritingCircle"),
      description: t("events.creativeWritingCircleDescription"),
      date: "2025-12-18",
      time: t("events.creativeWritingCircleTime"),
      location: t("events.creativeWritingCircleLocation"),
      category: t("events.digitalWorkshopCategory"),
      capacity: 15,
      registered: 12,
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=500&fit=crop",
      featured: false,
    },
    {
      id: 8,
      title: t("events.holidayCraftWorkshop"),
      description: t("events.holidayCraftWorkshopDescription"),
      date: "2025-12-20",
      time: t("events.holidayCraftWorkshopTim"),
      location: t("events.holidayCraftWorkshopLocation"),
      category: t("events.childrenStoryTimeCategory"),
      capacity: 35,
      registered: 28,
      image:
        "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&h=500&fit=crop",
      featured: false,
    },
  ];

  const categories = [
    "all",
    ...Array.from(new Set(events.map((event) => event.category))),
  ];

  const filteredEvents = events.filter(
    (event) => selectedCategory === "all" || event.category === selectedCategory
  );

  const toggleFavorite = (eventId: number) => {
    setFavorites((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const getAvailabilityColor = (registered: number, capacity: number) => {
    const percentage = (registered / capacity) * 100;
    if (percentage >= 90) return "text-red-600 bg-red-50";
    if (percentage >= 70) return "text-orange-600 bg-orange-50";
    return "text-green-600 bg-green-50";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Events Banner */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-yellow-500">★</span>{" "}
            {t("events.featuredEvents")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {events
              .filter((e) => e.featured)
              .map((event) => (
                <div
                  key={event.id}
                  className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="absolute inset-0 bg-black opacity-30"></div>
                  <div className="relative p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {/* {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })} */}
                        {new Date(event.date).toLocaleDateString(
                          i18n.language,
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <button className="mt-3 px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                      {t("quickActions.learnMore")}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="font-semibold text-gray-700">
                  {t("events.filterBy")}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat === "all"
                      ? t("events.all")
                      : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-lg ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {t("events.grid")}
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-lg ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {t("events.list")}
              </button>
            </div>
          </div>
        </div>

        {/* Events Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {t("catalog.showing")}{" "}
            <span className="font-semibold">{filteredEvents.length}</span>{" "}
            {t("events.events")}
          </p>
        </div>

        {/* Events Grid/List */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 gap-6"
              : "space-y-4"
          }
        >
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${
                viewMode === "list" ? "flex" : ""
              }`}
            >
              <div
                className={`relative ${
                  viewMode === "list" ? "w-64 flex-shrink-0" : "h-48"
                }`}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleFavorite(event.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(event.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    {event.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">
                      {/* {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })} */}
                      {new Date(event.date).toLocaleDateString(i18n.language, {
                        weekday: "short",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>{event.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getAvailabilityColor(
                        event.registered,
                        event.capacity
                      )}`}
                    >
                      {new Intl.NumberFormat(i18n.language).format(
                        event.registered
                      )}
                      /
                      {new Intl.NumberFormat(i18n.language).format(
                        event.capacity
                      )}{" "}
                      {/* {event.registered}/{event.capacity}{" "} */}
                      {t("events.registered")}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2">
                    {t("events.registerNow")}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {t("events.noEventsFound")}
            </h3>
            <p className="text-gray-500">{t("events.tryDifferentCategory")}</p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-xl p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            {t("events.neverMissEvent")}
          </h3>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            {t("events.subscribeNewsletter")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t("events.enterYourEmail")}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 outline-none"
            />
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-bold">
              {t("events.subscribe")}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LibraryEvents;
