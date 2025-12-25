import {
  BookOpen,
  Calendar,
  Check,
  Clock,
  Coffee,
  Headphones,
  Mail,
  MapPin,
  Monitor,
  Phone,
  Users,
  Wifi,
} from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/unique/Header";
interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  schedule: string;
}

const LibraryServices: React.FC = () => {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const services: Service[] = [
    {
      id: 1,
      title: t("services.bookLending"),
      description: t("services.bookLendingDescription"),
      icon: <BookOpen className="w-8 h-8" />,
      features: [
        t("services.bookLendingFeature1"),
        t("services.bookLendingFeature2"),
        t("services.bookLendingFeature3"),
        t("services.bookLendingFeature4"),
      ],
      schedule: t("services.bookLendingHours"),
    },
    {
      id: 2,
      title: t("services.studySpaces"),
      description: t("services.studySpacesDescription"),
      icon: <Users className="w-8 h-8" />,
      features: [
        t("services.studySpacesFeature1"),
        t("services.studySpacesFeature2"),
        t("services.studySpacesFeature3"),
        t("services.studySpacesFeature4"),
      ],
      schedule: t("services.studySpacesFeature5"),
    },
    {
      id: 3,
      title: t("services.freeWiFi"),
      description: t("services.freeWiFiDescription"),
      icon: <Wifi className="w-8 h-8" />,
      features: [
        t("services.freeWiFiFeature1"),
        t("services.freeWiFiFeature2"),
        t("services.freeWiFiFeature3"),
        t("services.freeWiFiFeature4"),
      ],
      schedule: t("services.freeWiFiFeature5"),
    },
    {
      id: 4,
      title: t("services.cafeRefreshments"),
      description: t("services.cafeRefreshmentsDescription"),
      icon: <Coffee className="w-8 h-8" />,
      features: [
        t("services.cafeRefreshmentsFeature1"),
        t("services.cafeRefreshmentsFeature2"),
        t("services.cafeRefreshmentsFeature3"),
        t("services.cafeRefreshmentsFeature4"),
      ],
      schedule: t("services.cafeRefreshmentsHours"),
    },
    {
      id: 5,
      title: t("services.computerLab"),
      description: t("services.computerLabDescription"),
      icon: <Monitor className="w-8 h-8" />,
      features: [
        t("services.computerLabFeature1"),
        t("services.computerLabFeature2"),
        t("services.computerLabFeature3"),
        t("services.computerLabFeature4"),
      ],
      schedule: t("services.audioVisualResources"),
    },
    {
      id: 6,
      title: t("services.audioVisualResources"),
      description: t("services.audioVisualResourcesDescription"),
      icon: <Headphones className="w-8 h-8" />,
      features: [
        t("services.audioVisualResourcesFeature1"),
        t("services.audioVisualResourcesFeature2"),
        t("services.audioVisualResourcesFeature3"),
        t("services.audioVisualResourcesFeature4"),
      ],
      schedule: t("services.freeWiFiFeature5"),
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: t("events.bookClubMeeting"),
      date: t("events.bookClubDate"),
      time: t("events.bookClubTime"),
    },
    {
      id: 2,
      title: t("events.childrenStoryTimeShort"),
      date: t("events.childrenStoryDateShort"),
      time: t("events.childrenStoryTimeShort2"),
    },
    {
      id: 3,
      title: t("events.digitalWorkshopShort"),
      date: t("events.digitalWorkshopDateShort"),
      time: t("events.digitalWorkshopTimeShort"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("about.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("services.servicesDescription")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
              onClick={() =>
                setSelectedService(
                  selectedService === service.id ? null : service.id
                )
              }
            >
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6">
                <div className="flex items-center gap-4 mb-3">
                  {service.icon}
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>
                <p className="text-indigo-100">{service.description}</p>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Clock className="w-4 h-4" />
                  <span>{service.schedule}</span>
                </div>

                <div
                  className={`transition-all duration-300 ${
                    selectedService === service.id
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {t("services.features")}
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-700"
                      >
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full mt-4 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
                  {selectedService === service.id
                    ? t("services.showLess")
                    : t("quickActions.learnMore")}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section - Events & Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Events */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-7 h-7 text-indigo-600" />
              <h3 className="text-2xl font-bold text-gray-900">
                {t("events.upcomingEvents")}
              </h3>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  <div className="bg-indigo-600 text-white rounded-lg p-3 text-center min-w-16">
                    <div className="text-xs font-semibold">
                      {event.date.split(",")[0]}
                    </div>
                    <div className="text-2xl font-bold">
                      {event.date.split(" ")[1].replace(",", "")}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {event.title}
                    </h4>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
              {t("events.viewAllEvents")}
            </button>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6">{t("about.contactUs")}</h3>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">{t("contact.address")}</h4>
                  <p className="text-indigo-100">
                    {t("contact.addressLine1")}
                    <br />
                    {t("contact.addressLine2")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">{t("profile.phone")}</h4>
                  <p className="text-indigo-100">{t("contact.phoneAlt")}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">{t("profile.email")}</h4>
                  <p className="text-indigo-100">{t("contact.contactEmail")}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">{t("Hours")}</h4>
                  <p className="text-indigo-100">
                    {t("contact.hoursWeekday")}
                    <br />
                    {t("contact.hoursSunday")}
                  </p>
                </div>
              </div>
            </div>

            <button className="w-full py-3 px-4 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-semibold">
              {t("about.getDirections")}
            </button>
          </div>
        </div>

        {/* Membership CTA */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-xl p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            {t("membership.becomeMember")}
          </h3>
          <p className="text-xl text-indigo-100 mb-6 max-w-2xl mx-auto">
            {t("membership.becomeMemberDescription")}
          </p>
          <button className="py-3 px-8 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-bold text-lg">
            {t("membership.signUpNow")}
          </button>
        </div>
      </main>
    </div>
  );
};

export default LibraryServices;
