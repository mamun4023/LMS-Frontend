import {
  Award,
  BookMarked,
  BookOpen,
  Globe,
  Heart,
  Linkedin,
  Mail,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/unique/Header";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
  email: string;
  linkedin?: string;
}

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}

const LibraryAbout: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"mission" | "history" | "values">(
    "mission"
  );

  const stats: Stat[] = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      value: t("stats.booksCount"),
      label: t("stats.booksInCollection"),
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: t("stats.membersCount"),
      label: t("stats.activeMembers"),
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: t("stats.yearsCount"),
      label: t("stats.yearsOfService"),
      color: "from-green-500 to-green-600",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      value: t("stats.eventsCount"),
      label: t("stats.eventsAnnually"),
      color: "from-red-500 to-red-600",
    },
  ];

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: t("team.drEmilyRichardson"),
      position: t("team.libraryDirector"),
      bio: t("team.emilyBio"),
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      email: t("team.emilyEmail"),
      linkedin: t("common.hash"),
    },
    {
      id: 2,
      name: t("team.marcusChen"),
      position: t("team.headOfCollections"),
      bio: t("team.marcusBio"),
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      email: t("team.marcusEmail"),
      linkedin: t("common.hash"),
    },
    {
      id: 3,
      name: t("team.sarahWilliams"),
      position: t("team.communityProgramsManager"),
      bio: t("team.sarahBio"),
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      email: t("team.sarahEmail"),
      linkedin: t("common.hash"),
    },
    {
      id: 4,
      name: t("team.jamesFoster"),
      position: t("team.technologyServicesLead"),
      bio: t("team.jamesBio"),
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      email: t("team.jamesEmail"),
      linkedin: t("common.hash"),
    },
    {
      id: 5,
      name: t("team.drPriyaPatel"),
      position: t("team.youthServicesCoordinator"),
      bio: t("team.priyaBio"),
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop",
      email: t("team.priyaEmail"),
      linkedin: t("common.hash"),
    },
    {
      id: 6,
      name: t("team.davidMartinez"),
      position: t("team.referenceLibrarian"),
      bio: t("team.davidBio"),
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      email: t("team.davidEmail"),
      linkedin: t("common.hash"),
    },
  ];

  const values = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: t("values.accessForAll"),
      description: t("values.accessForAllDescription"),
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t("values.communityFirst"),
      description: t("values.communityFirstDescription"),
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: t("values.innovation"),
      description: t("values.innovationDescription"),
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: t("values.diversityInclusion"),
      description: t("values.diversityInclusionDescription"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl overflow-hidden mb-12 shadow-xl">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative px-8 py-16 md:py-24 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t("about.title")}
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              {t("about.subtitle")}
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div
                className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white mb-4`}
              >
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission, History, Values Tabs */}
        <div className="mb-16">
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("mission")}
              className={`pb-4 px-6 font-semibold transition-colors ${
                activeTab === "mission"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t("about.ourMission")}
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`pb-4 px-6 font-semibold transition-colors ${
                activeTab === "history"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t("history.ourHistory")}
            </button>
            <button
              onClick={() => setActiveTab("values")}
              className={`pb-4 px-6 font-semibold transition-colors ${
                activeTab === "values"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t("values.OurValues")}
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {activeTab === "mission" && (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {t("about.ourMission")}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      {t("about.missionParagraph1")}
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {t("about.missionParagraph2")}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "history" && (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <BookMarked className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {t("history.ourHistory")}
                    </h3>
                    <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                      <p>{t("history.paragraph1")}</p>
                      <p>{t("history.paragraph2")}</p>
                      <p>{t("history.paragraph3")}</p>
                      <p>{t("history.paragraph4")}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "values" && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t("values.ourCoreValues")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="bg-white p-3 rounded-lg shadow-sm h-fit">
                        {value.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">
                          {value.title}
                        </h4>
                        <p className="text-gray-700">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {t("team.meetOurTeam")}
            </h2>
            <p className="text-xl text-gray-600">
              {t("team.dedicatedProfessionals")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64 bg-gray-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.position}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex gap-3 pt-3 border-t border-gray-200">
                    <a
                      href={`mailto:${member.email}`}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visit Us CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">{t("about.visitUsToday")}</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t("about.visitUsTodayDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-bold text-lg">
              {t("about.getDirections")}
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-bold text-lg">
              {t("about.contactUs")}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LibraryAbout;
