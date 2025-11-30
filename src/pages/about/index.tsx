import React, { useState } from 'react';
import { BookOpen, Users, Award, Heart, Target, Eye, TrendingUp, BookMarked, Coffee, Wifi, Globe, Mail, Linkedin, Twitter } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'mission' | 'history' | 'values'>('mission');

  const stats: Stat[] = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      value: "50,000+",
      label: "Books in Collection",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: "15,000+",
      label: "Active Members",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: "25+",
      label: "Years of Service",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      value: "500+",
      label: "Events Annually",
      color: "from-red-500 to-red-600"
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Dr. Emily Richardson",
      position: "Library Director",
      bio: "With over 20 years of experience in library science, Emily leads our team with passion and innovation.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      email: "emily.richardson@library.com",
      linkedin: "#"
    },
    {
      id: 2,
      name: "Marcus Chen",
      position: "Head of Collections",
      bio: "Marcus curates our diverse collection and ensures we have the latest and most relevant materials.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      email: "marcus.chen@library.com",
      linkedin: "#"
    },
    {
      id: 3,
      name: "Sarah Williams",
      position: "Community Programs Manager",
      bio: "Sarah designs engaging programs that bring our community together through literacy and learning.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      email: "sarah.williams@library.com",
      linkedin: "#"
    },
    {
      id: 4,
      name: "James Foster",
      position: "Technology Services Lead",
      bio: "James ensures our digital infrastructure runs smoothly and helps patrons navigate technology.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      email: "james.foster@library.com",
      linkedin: "#"
    },
    {
      id: 5,
      name: "Dr. Priya Patel",
      position: "Youth Services Coordinator",
      bio: "Priya creates magical experiences for young readers and fosters a love of reading in children.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop",
      email: "priya.patel@library.com",
      linkedin: "#"
    },
    {
      id: 6,
      name: "David Martinez",
      position: "Reference Librarian",
      bio: "David helps patrons find exactly what they need and is an expert in research assistance.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      email: "david.martinez@library.com",
      linkedin: "#"
    }
  ];

  const values = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Access for All",
      description: "We believe knowledge should be freely accessible to everyone in our community, regardless of background or circumstances."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community First",
      description: "We are a gathering place where people connect, learn, and grow together in a welcoming environment."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Innovation",
      description: "We embrace new technologies and ideas while preserving the timeless value of books and reading."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Diversity & Inclusion",
      description: "We celebrate diverse perspectives and ensure our collections and programs reflect our entire community."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
              <p className="text-gray-600 mt-1">Learn more about our library and mission</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl overflow-hidden mb-12 shadow-xl">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative px-8 py-16 md:py-24 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Gateway to Knowledge & Community
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Serving our community with excellence since 2000, we're more than just a library—we're a place where minds meet and ideas flourish.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white mb-4`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission, History, Values Tabs */}
        <div className="mb-16">
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('mission')}
              className={`pb-4 px-6 font-semibold transition-colors ${
                activeTab === 'mission'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Our Mission
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`pb-4 px-6 font-semibold transition-colors ${
                activeTab === 'history'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Our History
            </button>
            <button
              onClick={() => setActiveTab('values')}
              className={`pb-4 px-6 font-semibold transition-colors ${
                activeTab === 'values'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Our Values
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {activeTab === 'mission' && (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      To empower our community through free and open access to information, resources, and cultural experiences. We are committed to fostering literacy, supporting lifelong learning, and creating an inclusive space where everyone can explore, discover, and grow.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      We strive to be more than a repository of books—we aim to be a vibrant community hub that connects people, preserves our heritage, and prepares our community for the future.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <BookMarked className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our History</h3>
                    <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                      <p>
                        Founded in 2000, our library began as a small collection of 5,000 books in a modest building. The vision was simple: create a place where everyone in the community could access knowledge and opportunity.
                      </p>
                      <p>
                        Over the past 25 years, we've grown exponentially. In 2010, we expanded our building to include a modern computer lab and children's wing. In 2015, we launched our digital lending platform, making thousands of e-books and audiobooks available to our members.
                      </p>
                      <p>
                        In 2020, we adapted to serve our community during challenging times, offering curbside pickup, virtual programming, and expanded digital services. Today, we're proud to serve over 15,000 active members with a collection of more than 50,000 items.
                      </p>
                      <p>
                        Our journey continues as we look forward to serving future generations with the same dedication and passion that has defined us from the beginning.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'values' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Core Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="bg-white p-3 rounded-lg shadow-sm h-fit">
                        {value.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">{value.title}</h4>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Dedicated professionals committed to serving you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64 bg-gray-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.position}</p>
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
          <h3 className="text-3xl font-bold mb-4">Visit Us Today</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience the warmth of our community and discover all that our library has to offer. We can't wait to welcome you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-bold text-lg">
              Get Directions
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-bold text-lg">
              Contact Us
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LibraryAbout;