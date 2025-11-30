import React, { useState } from 'react';
import { BookOpen, Users, Wifi, Coffee, Monitor, Headphones, Calendar, Clock, MapPin, Mail, Phone, Check } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  schedule: string;
}

const LibraryServices: React.FC = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const services: Service[] = [
    {
      id: 1,
      title: "Book Lending",
      description: "Borrow from our extensive collection of books, magazines, and journals for up to 3 weeks.",
      icon: <BookOpen className="w-8 h-8" />,
      features: [
        "Over 50,000 books available",
        "Online reservation system",
        "Automatic renewal option",
        "Hold and request services"
      ],
      schedule: "Mon-Sat: 9 AM - 8 PM, Sun: 10 AM - 6 PM"
    },
    {
      id: 2,
      title: "Study Spaces",
      description: "Quiet and collaborative study areas equipped with comfortable seating and natural lighting.",
      icon: <Users className="w-8 h-8" />,
      features: [
        "Individual study carrels",
        "Group study rooms",
        "Silent reading zones",
        "Bookable spaces online"
      ],
      schedule: "24/7 access for members"
    },
    {
      id: 3,
      title: "Free WiFi",
      description: "High-speed internet access throughout the library for research and work.",
      icon: <Wifi className="w-8 h-8" />,
      features: [
        "Unlimited bandwidth",
        "Secure connection",
        "Guest access available",
        "Technical support"
      ],
      schedule: "Available during library hours"
    },
    {
      id: 4,
      title: "Café & Refreshments",
      description: "Enjoy coffee, snacks, and light meals while you read or study.",
      icon: <Coffee className="w-8 h-8" />,
      features: [
        "Fresh coffee and tea",
        "Healthy snacks",
        "Comfortable seating",
        "Outdoor terrace"
      ],
      schedule: "Mon-Sat: 8 AM - 7 PM, Sun: 10 AM - 5 PM"
    },
    {
      id: 5,
      title: "Computer Lab",
      description: "Access to modern computers with software for research, productivity, and creative work.",
      icon: <Monitor className="w-8 h-8" />,
      features: [
        "30+ workstations",
        "Microsoft Office Suite",
        "Design software available",
        "Printing & scanning services"
      ],
      schedule: "Mon-Sat: 9 AM - 8 PM, Sun: 10 AM - 6 PM"
    },
    {
      id: 6,
      title: "Audio/Visual Resources",
      description: "Access multimedia content including audiobooks, films, and music collections.",
      icon: <Headphones className="w-8 h-8" />,
      features: [
        "Audiobook collection",
        "DVD & Blu-ray library",
        "Music streaming access",
        "Private listening booths"
      ],
      schedule: "Available during library hours"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Book Club Meeting",
      date: "Dec 5, 2025",
      time: "6:00 PM"
    },
    {
      id: 2,
      title: "Children's Story Time",
      date: "Dec 7, 2025",
      time: "10:00 AM"
    },
    {
      id: 3,
      title: "Digital Literacy Workshop",
      date: "Dec 10, 2025",
      time: "2:00 PM"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Library Services</h1>
              <p className="text-gray-600 mt-1">Discover what we offer to our community</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your Gateway to Knowledge & Community
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide a wide range of services designed to support learning, research, and community engagement.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
              onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
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

                <div className={`transition-all duration-300 ${
                  selectedService === service.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                  <h4 className="font-semibold text-gray-900 mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className="w-full mt-4 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                >
                  {selectedService === service.id ? 'Show Less' : 'Learn More'}
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
              <h3 className="text-2xl font-bold text-gray-900">Upcoming Events</h3>
            </div>
            
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  <div className="bg-indigo-600 text-white rounded-lg p-3 text-center min-w-16">
                    <div className="text-xs font-semibold">{event.date.split(',')[0]}</div>
                    <div className="text-2xl font-bold">{event.date.split(' ')[1].replace(',', '')}</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
              View All Events
            </button>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Address</h4>
                  <p className="text-indigo-100">123 Library Street<br />Knowledge City, KC 12345</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <p className="text-indigo-100">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-indigo-100">info@library.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Hours</h4>
                  <p className="text-indigo-100">
                    Monday - Saturday: 9 AM - 8 PM<br />
                    Sunday: 10 AM - 6 PM
                  </p>
                </div>
              </div>
            </div>

            <button className="w-full py-3 px-4 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-semibold">
              Get Directions
            </button>
          </div>
        </div>

        {/* Membership CTA */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-xl p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Become a Member Today</h3>
          <p className="text-xl text-indigo-100 mb-6 max-w-2xl mx-auto">
            Join our community and get access to all library services, exclusive events, and special programs.
          </p>
          <button className="py-3 px-8 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-bold text-lg">
            Sign Up Now
          </button>
        </div>
      </main>
    </div>
  );
};

export default LibraryServices;