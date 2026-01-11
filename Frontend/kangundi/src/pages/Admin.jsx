import React, { useState, useEffect } from 'react';

import { api } from '../services/api';
import { Lock, Calendar, MessageSquare, LogOut } from 'lucide-react';
import Button from '../components/ui/Button';


export default function Admin() {
    const [token, setToken] = useState(localStorage.getItem('admin_token'));
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bookings, setBookings] = useState([]);
    const [inquiries, setInquiries] = useState([]); // Re-enabled
    const [activeTab, setActiveTab] = useState('bookings');
    const [error, setError] = useState('');
    // const navigate = useNavigate(); // Removed unused var

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookingsData = await api.getAdminBookings(token);
                setBookings(Array.isArray(bookingsData) ? bookingsData : []);

                // Mock inquiries for now until API is ready
                setInquiries([]);
            } catch (e) {
                handleLogout();
            }
        };

        if (token) {
            fetchData();
        }
    }, [token]);

    // const fetchData = async () => { ... } // Moved inside useEffect

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await api.login(email, password);
            localStorage.setItem('admin_token', data.token);
            setToken(data.token);
            setError('');
        } catch (e) {
            setError('Invalid credentials');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        setToken(null);
    };

    if (!token) {
        return (
            <div className="min-h-screen bg-heritage-cream flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-heritage-sand">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-heritage-charcoal text-white rounded-full mb-4">
                            <Lock size={20} />
                        </div>
                        <h1 className="text-2xl font-serif text-heritage-charcoal">Official Login</h1>
                        <p className="text-heritage-bark text-sm">Kangundhi Tourism Administration</p>
                    </div>

                    {error && <div className="bg-red-50 text-red-600 p-3 rounded text-sm mb-4 text-center">{error}</div>}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                placeholder="Official Email ID"
                                className="w-full p-3 border border-gray-300 rounded focus:border-heritage-charcoal outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full p-3 border border-gray-300 rounded focus:border-heritage-charcoal outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button className="w-full justify-center">Authenticate</Button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            {/* Admin Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="font-serif font-bold text-xl text-heritage-charcoal">Kangundhi</div>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full uppercase tracking-wider font-bold">Admin Portal</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500 hidden md:inline">admin@kangundhi.com</span>
                    <button onClick={handleLogout} className="text-gray-500 hover:text-red-600" title="Logout">
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            <main className="p-6 max-w-7xl mx-auto">
                {/* Stats / Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div
                        onClick={() => setActiveTab('bookings')}
                        className={`p-6 rounded-lg border cursor-pointer transition-all ${activeTab === 'bookings' ? 'bg-white border-heritage-charcoal shadow-md' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Total Bookings</span>
                            <Calendar className="text-heritage-charcoal" size={20} />
                        </div>
                        <span className="text-3xl font-bold">{bookings.length}</span>
                    </div>

                    <div
                        onClick={() => setActiveTab('inquiries')}
                        className={`p-6 rounded-lg border cursor-pointer transition-all ${activeTab === 'inquiries' ? 'bg-white border-heritage-charcoal shadow-md' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Inquiries</span>
                            <MessageSquare className="text-heritage-charcoal" size={20} />
                        </div>
                        <span className="text-3xl font-bold">{inquiries.length}</span>
                    </div>
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-lg font-bold">
                            {activeTab === 'bookings' ? 'Recent Guide Requests' : 'General Inquiries'}
                        </h2>
                        <Button variant="outline" className="text-xs py-1 h-auto text-gray-600 border-gray-300">Download CSV</Button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-xs font-medium">
                                <tr>
                                    <th className="px-6 py-3">Date Received</th>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Contact</th>
                                    {activeTab === 'bookings' && (
                                        <>
                                            <th className="px-6 py-3">Tour Date</th>
                                            <th className="px-6 py-3">Group</th>
                                            <th className="px-6 py-3">Status</th>
                                        </>
                                    )}
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {activeTab === 'bookings' && bookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-gray-400 font-mono text-xs">{booking.created_at}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{booking.name}</td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {booking.email}<br />
                                            <span className="text-xs">{booking.phone}</span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-heritage-charcoal">{booking.date}</td>
                                        <td className="px-6 py-4 text-gray-600">{booking.group_size} Pax<br /><span className="text-xs text-gray-400">{booking.experience_level}</span></td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
                                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div> Pending
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">View Email</button>
                                        </td>
                                    </tr>
                                ))}
                                {bookings.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-gray-400 italic">No records found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
