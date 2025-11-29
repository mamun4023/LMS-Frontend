import React, { useState } from 'react';
import { Users, BookOpen, UserCog, BarChart3, Settings, Search, Plus, Edit, Trash2, Eye, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface Stats {
  totalBooks: number;
  totalUsers: number;
  activeLoans: number;
  overdueBooks: number;
  librarians: number;
  students: number;
}

interface Activity {
  id: number;
  action: string;
  user: string;
  time: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface Librarian {
  id: number;
  name: string;
  email: string;
  status: string;
  booksManaged: number;
}

interface Student {
  id: number;
  name: string;
  email: string;
  booksLoaned: number;
  overdue: number;
  status: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  copies: number;
  available: number;
}

type TabType = 'overview' | 'books' | 'librarians' | 'students' | 'settings';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const stats: Stats = {
    totalBooks: 1247,
    totalUsers: 356,
    activeLoans: 89,
    overdueBooks: 12,
    librarians: 8,
    students: 348
  };

  const recentActivity: Activity[] = [
    { id: 1, action: 'New book added', user: 'Librarian Sarah', time: '2 hours ago', type: 'success' },
    { id: 2, action: 'User registered', user: 'Student John Doe', time: '3 hours ago', type: 'info' },
    { id: 3, action: 'Overdue alert', user: 'Student Jane Smith', time: '5 hours ago', type: 'warning' },
    { id: 4, action: 'Book returned', user: 'Student Mike Johnson', time: '1 day ago', type: 'success' }
  ];

  const librarians: Librarian[] = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@library.com', status: 'Active', booksManaged: 234 },
    { id: 2, name: 'Michael Chen', email: 'michael@library.com', status: 'Active', booksManaged: 198 },
    { id: 3, name: 'Emma Davis', email: 'emma@library.com', status: 'Active', booksManaged: 267 }
  ];

  const students: Student[] = [
    { id: 1, name: 'John Doe', email: 'john@student.com', booksLoaned: 3, overdue: 0, status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@student.com', booksLoaned: 2, overdue: 1, status: 'Active' },
    { id: 3, name: 'Bob Wilson', email: 'bob@student.com', booksLoaned: 5, overdue: 0, status: 'Active' }
  ];

  const books: Book[] = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', copies: 5, available: 2 },
    { id: 2, title: '1984', author: 'George Orwell', isbn: '9780451524935', copies: 4, available: 1 },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780061120084', copies: 6, available: 3 }
  ];

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'info': return <Clock className="w-5 h-5 text-blue-500" />;
      default: return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Books</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalBooks}</p>
            </div>
            <BookOpen className="w-12 h-12 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
            <Users className="w-12 h-12 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Loans</p>
              <p className="text-3xl font-bold text-gray-900">{stats.activeLoans}</p>
            </div>
            <BarChart3 className="w-12 h-12 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Overdue Books</p>
              <p className="text-3xl font-bold text-red-600">{stats.overdueBooks}</p>
            </div>
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Librarians</p>
              <p className="text-3xl font-bold text-gray-900">{stats.librarians}</p>
            </div>
            <UserCog className="w-12 h-12 text-indigo-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Students</p>
              <p className="text-3xl font-bold text-gray-900">{stats.students}</p>
            </div>
            <Users className="w-12 h-12 text-teal-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center space-x-3">
                  {getActivityIcon(activity.type)}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderBooks = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="ml-4 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          Add Book
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Copies</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.isbn}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.copies}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${book.available > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {book.available}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900"><Eye className="w-5 h-5" /></button>
                    <button className="text-green-600 hover:text-green-900"><Edit className="w-5 h-5" /></button>
                    <button className="text-red-600 hover:text-red-900"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderLibrarians = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search librarians..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="ml-4 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          Add Librarian
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Books Managed</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {librarians.map((librarian) => (
              <tr key={librarian.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{librarian.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{librarian.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{librarian.booksManaged}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {librarian.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900"><Eye className="w-5 h-5" /></button>
                    <button className="text-green-600 hover:text-green-900"><Edit className="w-5 h-5" /></button>
                    <button className="text-red-600 hover:text-red-900"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="ml-4 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          Add Student
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Books Loaned</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overdue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.booksLoaned}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${student.overdue > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {student.overdue}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900"><Eye className="w-5 h-5" /></button>
                    <button className="text-green-600 hover:text-green-900"><Edit className="w-5 h-5" /></button>
                    <button className="text-red-600 hover:text-red-900"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">System Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Library Name</label>
            <input type="text" defaultValue="Central Library" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Books Per Student</label>
            <input type="number" defaultValue="5" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Loan Duration (days)</label>
            <input type="number" defaultValue="14" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fine Per Day (Overdue)</label>
            <input type="number" defaultValue="1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Admin User</span>
              <button className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <nav className="flex space-x-1 p-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('books')}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'books' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Books
            </button>
            <button
              onClick={() => setActiveTab('librarians')}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'librarians' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <UserCog className="w-5 h-5 mr-2" />
              Librarians
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'students' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users className="w-5 h-5 mr-2" />
              Students
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'settings' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Settings className="w-5 h-5 mr-2" />
              Settings
            </button>
          </nav>
        </div>

        {/* Content Area */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'books' && renderBooks()}
        {activeTab === 'librarians' && renderLibrarians()}
        {activeTab === 'students' && renderStudents()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
}