import React, { useState, useEffect ,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import HealthMetricsForm from '../components/HealthTracker/HealthMetricsForm';
import HealthMetricsChart from '../components/HealthTracker/HealthMetricsChart';
import ExportPDFButton from '../components/HealthTracker/ExportPDFButton';
import { AppContext } from '../context/AppContext'

const HealthTracker = () => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editEntry, setEditEntry] = useState(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const [shareEntryId, setShareEntryId] = useState(null);
    const [futureDoctors, setFutureDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [loadingDoctors, setLoadingDoctors] = useState(false);
    const navigate = useNavigate();
    const {backendUrl}=useContext(AppContext);

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const response = await fetch(backendUrl+'/api/health-tracker', {
                headers: {
                    'token': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            
            if (data.success) {
                setEntries(data.data);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching entries:', error);
            toast.error('Failed to fetch health entries');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            const response = await fetch(backendUrl+'/api/health-tracker', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (data.success) {
                toast.success('Health entry saved successfully');
                setShowForm(false);
                fetchEntries();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error saving entry:', error);
            toast.error('Failed to save health entry');
        }
    };

    const handleShare = async (entryId, doctorId) => {
        try {
            const response = await fetch(backendUrl+`/api/health-tracker/${entryId}/share`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({ doctorId })
            });
            
            const data = await response.json();
            
            if (data.success) {
                toast.success('Entry shared with doctor successfully');
                fetchEntries();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error sharing entry:', error);
            toast.error('Failed to share health entry');
        }
    };

    const handleDelete = async (entryId) => {
        if (!window.confirm('Are you sure you want to delete this entry?')) return;
        try {
            const response = await fetch(backendUrl+`/api/health-tracker/${entryId}`, {
                method: 'DELETE',
                headers: {
                    'token': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            if (data.success) {
                toast.success('Health entry deleted successfully');
                fetchEntries();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error deleting entry:', error);
            toast.error('Failed to delete health entry');
        }
    };

    const handleEdit = (entry) => {
        setEditEntry(entry);
        setShowForm(true);
    };

    const handleFormSubmit = async (formData) => {
        if (editEntry) {
            try {
                const response = await fetch(backendUrl+`/api/health-tracker/${editEntry._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token')
                    },
                    body: JSON.stringify(formData)
                });
                const data = await response.json();
                if (data.success) {
                    toast.success('Health entry updated successfully');
                    setShowForm(false);
                    setEditEntry(null);
                    fetchEntries();
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error('Error updating entry:', error);
                toast.error('Failed to update health entry');
            }
        } else {
            handleSubmit(formData);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const openShareModal = async (entryId) => {
        setShareEntryId(entryId);
        setShowShareModal(true);
        setSelectedDoctor('');
        setLoadingDoctors(true);
        try {
            const response = await fetch(backendUrl+'/api/user/my-future-doctors', {
                headers: { 'token': localStorage.getItem('token') }
            });
            const data = await response.json();
            if (data.success) {
                setFutureDoctors(data.doctors);
            } else {
                toast.error(data.message || 'Failed to fetch doctors');
                setFutureDoctors([]);
            }
        } catch (error) {
            toast.error('Failed to fetch doctors');
            setFutureDoctors([]);
        } finally {
            setLoadingDoctors(false);
        }
    };

    const handleShareConfirm = async () => {
        if (!selectedDoctor) {
            toast.error('Please select a doctor');
            return;
        }
        try {
            const response = await fetch(backendUrl+`/api/health-tracker/${shareEntryId}/share`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({ doctorId: selectedDoctor })
            });
            const data = await response.json();
            if (data.success) {
                toast.success('Entry shared with doctor successfully');
                setShowShareModal(false);
                setShareEntryId(null);
                setSelectedDoctor('');
                fetchEntries();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to share entry');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 min-h-screen bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat bg-neutral fade-in">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-primary">My Health Tracker</h1>
                <button
                    onClick={() => { setShowForm(true); setEditEntry(null); }}
                    className="bg-primary hover:bg-secondary text-white font-semibold px-6 py-2 rounded-lg shadow transition button-animate"
                >
                    + Add Entry
                </button>
            </div>
            {/* Export PDF Button */}
            <ExportPDFButton entries={entries} />
            {/* Health Metrics Chart */}
            {entries.length > 0 && <HealthMetricsChart entries={entries} />}
            {loading ? (
                <div className="grid gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col gap-2 animate-pulse">
                            <div className="h-6 w-1/3 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
                            <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            ) : entries.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-60 text-gray-400">
                    <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h3m4 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                    <span>No health entries yet. Start by adding your first entry!</span>
                </div>
            ) : (
                <div className="grid gap-6">
                    {entries.map(entry => (
                        <div key={entry._id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <div className="text-lg font-semibold text-indigo-700 mb-1">{formatDate(entry.createdAt)}</div>
                                <div className="text-gray-600 text-sm mb-2">BP: {entry.metrics?.bloodPressure?.systolic}/{entry.metrics?.bloodPressure?.diastolic} | Glucose: {entry.metrics?.bloodGlucose} | Weight: {entry.metrics?.weight}kg</div>
                                <div className="text-gray-500 text-xs">Mood: {entry.mood} | Symptoms: {entry.symptoms?.join(', ')}</div>
                            </div>
                            <div className="flex gap-2 md:gap-4">
                                <button onClick={() => handleEdit(entry)} className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-1 rounded-lg font-semibold transition" title="Edit">Edit</button>
                                <button onClick={() => handleDelete(entry._id)} className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-lg font-semibold transition" title="Delete">Delete</button>
                                <button onClick={() => openShareModal(entry._id)} className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-lg font-semibold transition" title="Share">Share</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Modal for Add/Edit Entry */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 fade-in">
                    <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl relative slide-up">
                        <button onClick={() => { setShowForm(false); setEditEntry(null); }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                        <HealthMetricsForm onSubmit={handleFormSubmit} initialData={editEntry} />
                    </div>
                </div>
            )}
            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 fade-in">
                    <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative slide-up">
                        <button onClick={() => setShowShareModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                        <h2 className="text-xl font-bold mb-4 text-primary">Share Entry with Doctor</h2>
                        {loadingDoctors ? (
                            <div className="text-gray-400">Loading doctors...</div>
                        ) : (
                            <>
                                <select value={selectedDoctor} onChange={e => setSelectedDoctor(e.target.value)} className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition">
                                    <option value="">Select Doctor</option>
                                    {futureDoctors.map(doc => (
                                        <option key={doc._id} value={doc._id}>{doc.name}</option>
                                    ))}
                                </select>
                                <button onClick={handleShareConfirm} className="bg-primary hover:bg-secondary text-white font-semibold px-6 py-2 rounded-lg shadow transition w-full">Share</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HealthTracker; 
