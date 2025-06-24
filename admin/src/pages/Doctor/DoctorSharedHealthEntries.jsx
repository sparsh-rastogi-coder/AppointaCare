import React, { useEffect, useState, useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext'

// import axios from 'axios'

const DoctorSharedHealthEntries = () => {
  const { dToken } = useContext(DoctorContext);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { backendUrl } = useContext(AppContext)
  const [feedbacks, setFeedbacks] = useState({});

  useEffect(() => {
    const fetchSharedEntries = async () => {
      setLoading(true);
      try {
        const response = await fetch(backendUrl +'/api/health-tracker/shared/entries', {headers: { dtoken: dToken }});
        const data = await response.json();
        if (data.success) {
          setEntries(data.data);
          // Initialize feedbacks state with existing feedbacks if present
          const initialFeedbacks = {};
          data.data.forEach(entry => {
            // If entry.doctorFeedback is an object keyed by doctorId, get current doctor's feedback
            // Otherwise, fallback to string or empty
            initialFeedbacks[entry._id] = entry.doctorFeedback || '';
          });
          setFeedbacks(initialFeedbacks);
        } else {
          toast.error(data.message || 'Failed to fetch shared entries');
        }
      } catch (error) {
        console.log(entries);
        toast.error('Failed to fetch shared entries');
      } finally {
        setLoading(false);
      }
    };
    if (dToken) fetchSharedEntries();
  }, [dToken]);

  if (loading) {
    return <div className="text-center py-10">Loading shared health entries...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 min-h-screen bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat bg-neutral fade-in">
      <h2 className="text-3xl font-bold mb-8 text-primary">Shared Health Entries</h2>
      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-60 text-gray-400">
          <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h3m4 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
          <span>No health entries have been shared with you yet.</span>
        </div>
      ) : (
        <div className="grid gap-6">
          {entries.map(entry => (
            <div key={entry._id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col gap-2 slide-up">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <div className="text-lg font-bold text-primary">{entry.userId.firstName} {entry.userId.lastName} <span className="text-sm text-gray-500 font-normal">({entry.userId.email})</span></div>
                <div className="text-sm text-gray-500 font-semibold mt-1 md:mt-0">{new Date(entry.date).toLocaleString()}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div><span className="font-semibold text-gray-700">Mood:</span> {entry.mood}</div>
                <div><span className="font-semibold text-gray-700">Blood Pressure:</span> {entry.metrics.bloodPressure.systolic}/{entry.metrics.bloodPressure.diastolic} mmHg</div>
                {entry.metrics.bloodGlucose && (
                  <div><span className="font-semibold text-gray-700">Blood Glucose:</span> {entry.metrics.bloodGlucose} mg/dL</div>
                )}
                {entry.metrics.weight && (
                  <div><span className="font-semibold text-gray-700">Weight:</span> {entry.metrics.weight} kg</div>
                )}
                {entry.metrics.temperature && (
                  <div><span className="font-semibold text-gray-700">Temperature:</span> {entry.metrics.temperature}°C</div>
                )}
                {entry.metrics.heartRate && (
                  <div><span className="font-semibold text-gray-700">Heart Rate:</span> {entry.metrics.heartRate} bpm</div>
                )}
                {entry.metrics.oxygenLevel && (
                  <div><span className="font-semibold text-gray-700">Oxygen Level:</span> {entry.metrics.oxygenLevel}%</div>
                )}
              </div>
              {entry.symptoms.length > 0 && (
                <div className="mb-2"><span className="font-semibold text-gray-700">Symptoms:</span> <span className="text-gray-600">{entry.symptoms.join(', ')}</span></div>
              )}
              {entry.medications.length > 0 && (
                <div className="mb-2"><span className="font-semibold text-gray-700">Medications:</span> <span className="text-gray-600">{entry.medications.map(med => `${med.name} (${med.dosage}, ${med.timing})`).join('; ')}</span></div>
              )}
              {entry.notes && (
                <div className="mb-2"><span className="font-semibold text-gray-700">Notes:</span> <span className="text-gray-600">{entry.notes}</span></div>
              )}
              {/* Doctor Feedback Form */}
              <div className="mt-2">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const feedback = feedbacks[entry._id] || '';
                    if (!feedback.trim()) {
                      toast.error('Feedback cannot be empty');
                      return;
                    }
                    try {
                      const res = await fetch(`${backendUrl}/api/health-tracker/${entry._id}/feedback`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          dtoken: dToken,
                        },
                        body: JSON.stringify({ feedback }),
                      });
                      const data = await res.json();
                      if (data.success) {
                        toast.success('Feedback submitted');
                        // Optionally update entry in UI
                        setEntries(prev => prev.map(en => en._id === entry._id ? { ...en, doctorFeedback: feedback } : en));
                      } else {
                        toast.error(data.message || 'Failed to submit feedback');
                      }
                    } catch (err) {
                      toast.error('Failed to submit feedback');
                    }
                  }}
                  className="flex flex-col gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200 mt-2"
                >
                  <label className="font-semibold text-gray-700 mb-1">Your Feedback:</label>
                  <textarea
                    className="border rounded p-2 min-h-[60px] focus:outline-primary"
                    value={feedbacks[entry._id] || ''}
                    onChange={e => setFeedbacks(fb => ({ ...fb, [entry._id]: e.target.value }))}
                    placeholder="Write your feedback for this entry..."
                  />
                  <button
                    type="submit"
                    className="self-end px-4 py-1.5 bg-primary text-white rounded hover:bg-primary-dark transition-all mt-1"
                  >
                    {entry.doctorFeedback ? 'Update Feedback' : 'Submit Feedback'}
                  </button>
                </form>
                {entry.doctorFeedback && (
                  <div className="text-green-700 text-sm mt-1">Last submitted feedback: <span className="font-medium">{entry.doctorFeedback}</span></div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorSharedHealthEntries; 