import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const HealthMetricsForm = ({ onSubmit, initialData = null }) => {
    const [formData, setFormData] = useState({
        metrics: {
            bloodPressure: {
                systolic: initialData?.metrics?.bloodPressure?.systolic || '',
                diastolic: initialData?.metrics?.bloodPressure?.diastolic || ''
            },
            bloodGlucose: initialData?.metrics?.bloodGlucose || '',
            weight: initialData?.metrics?.weight || '',
            temperature: initialData?.metrics?.temperature || '',
            heartRate: initialData?.metrics?.heartRate || '',
            oxygenLevel: initialData?.metrics?.oxygenLevel || '',
            sleepHours: initialData?.metrics?.sleepHours || ''
        },
        symptoms: initialData?.symptoms || [''],
        mood: initialData?.mood || 'Good',
        medications: initialData?.medications || [{ name: '', dosage: '', timing: '' }],
        notes: initialData?.notes || ''
    });
    const [errors, setErrors] = useState({});

    // Real-time validation
    useEffect(() => {
        const newErrors = {};
        if (!formData.metrics.bloodPressure.systolic) newErrors.systolic = 'Required';
        if (!formData.metrics.bloodPressure.diastolic) newErrors.diastolic = 'Required';
        if (!formData.metrics.bloodGlucose) newErrors.bloodGlucose = 'Required';
        if (!formData.metrics.weight) newErrors.weight = 'Required';
        setErrors(newErrors);
    }, [formData]);

    const handleMetricsChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('bloodPressure')) {
            const type = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                metrics: {
                    ...prev.metrics,
                    bloodPressure: {
                        ...prev.metrics.bloodPressure,
                        [type]: value
                    }
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                metrics: {
                    ...prev.metrics,
                    [name]: value
                }
            }));
        }
    };

    const handleSymptomChange = (index, value) => {
        const newSymptoms = [...formData.symptoms];
        newSymptoms[index] = value;
        setFormData(prev => ({ ...prev, symptoms: newSymptoms }));
    };

    const addSymptom = () => {
        setFormData(prev => ({
            ...prev,
            symptoms: [...prev.symptoms, '']
        }));
    };

    const removeSymptom = (index) => {
        const newSymptoms = formData.symptoms.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, symptoms: newSymptoms }));
    };

    const handleMedicationChange = (index, field, value) => {
        const newMedications = [...formData.medications];
        newMedications[index] = { ...newMedications[index], [field]: value };
        setFormData(prev => ({ ...prev, medications: newMedications }));
    };

    const addMedication = () => {
        setFormData(prev => ({
            ...prev,
            medications: [...prev.medications, { name: '', dosage: '', timing: '' }]
        }));
    };

    const removeMedication = (index) => {
        const newMedications = formData.medications.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, medications: newMedications }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Final validation before submit
        const newErrors = {};
        if (!formData.metrics.bloodPressure.systolic) newErrors.systolic = 'Required';
        if (!formData.metrics.bloodPressure.diastolic) newErrors.diastolic = 'Required';
        if (!formData.metrics.bloodGlucose) newErrors.bloodGlucose = 'Required';
        if (!formData.metrics.weight) newErrors.weight = 'Required';
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            toast.error('Please fill all required fields');
            return;
        }
        // Remove empty symptoms and medications
        const cleanedData = {
            ...formData,
            symptoms: formData.symptoms.filter(s => s.trim()),
            medications: formData.medications.filter(m => m.name.trim())
        };
        onSubmit(cleanedData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-4">
            <div className="max-h-[70vh] overflow-y-auto pr-2">
                {/* Blood Pressure */}
                <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-100">
                    <h3 className="text-2xl font-bold mb-2 text-indigo-700 flex items-center gap-2">
                        <span>Blood Pressure</span>
                        <span className="text-xs text-gray-400 font-normal">(mmHg)</span>
                    </h3>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Systolic <span className="text-red-500">*</span></label>
                            <input
                                type="number"
                                name="bloodPressure.systolic"
                                value={formData.metrics.bloodPressure.systolic}
                                onChange={handleMetricsChange}
                                className={`w-full px-4 py-2 rounded-lg border ${errors.systolic ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-400 focus:outline-none transition`}
                                placeholder="120"
                            />
                            {errors.systolic && <span className="text-xs text-red-500">{errors.systolic}</span>}
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Diastolic <span className="text-red-500">*</span></label>
                            <input
                                type="number"
                                name="bloodPressure.diastolic"
                                value={formData.metrics.bloodPressure.diastolic}
                                onChange={handleMetricsChange}
                                className={`w-full px-4 py-2 rounded-lg border ${errors.diastolic ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-400 focus:outline-none transition`}
                                placeholder="80"
                            />
                            {errors.diastolic && <span className="text-xs text-red-500">{errors.diastolic}</span>}
                        </div>
                    </div>
                </div>

                {/* Other Metrics */}
                <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-100">
                    <h3 className="text-2xl font-bold mb-2 text-indigo-700">Other Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Blood Glucose (mg/dL) <span className="text-red-500">*</span></label>
                            <input
                                type="number"
                                name="bloodGlucose"
                                value={formData.metrics.bloodGlucose}
                                onChange={handleMetricsChange}
                                className={`w-full px-4 py-2 rounded-lg border ${errors.bloodGlucose ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-400 focus:outline-none transition`}
                            />
                            {errors.bloodGlucose && <span className="text-xs text-red-500">{errors.bloodGlucose}</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Weight (kg) <span className="text-red-500">*</span></label>
                            <input
                                type="number"
                                name="weight"
                                value={formData.metrics.weight}
                                onChange={handleMetricsChange}
                                className={`w-full px-4 py-2 rounded-lg border ${errors.weight ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-400 focus:outline-none transition`}
                            />
                            {errors.weight && <span className="text-xs text-red-500">{errors.weight}</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Temperature (°C)</label>
                            <input
                                type="number"
                                name="temperature"
                                value={formData.metrics.temperature}
                                onChange={handleMetricsChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                                step="0.1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Heart Rate (bpm)</label>
                            <input
                                type="number"
                                name="heartRate"
                                value={formData.metrics.heartRate}
                                onChange={handleMetricsChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Oxygen Level (%)</label>
                            <input
                                type="number"
                                name="oxygenLevel"
                                value={formData.metrics.oxygenLevel}
                                onChange={handleMetricsChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Sleep Hours</label>
                            <input
                                type="number"
                                name="sleepHours"
                                value={formData.metrics.sleepHours}
                                onChange={handleMetricsChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                                step="0.5"
                            />
                        </div>
                    </div>
                </div>

                {/* Symptoms */}
                <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-100">
                    <h3 className="text-2xl font-bold mb-2 text-indigo-700">Symptoms</h3>
                    {formData.symptoms.map((symptom, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={symptom}
                                onChange={(e) => handleSymptomChange(index, e.target.value)}
                                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Enter symptom"
                            />
                            <button
                                type="button"
                                onClick={() => removeSymptom(index)}
                                className="px-2 py-1 text-red-600 hover:text-red-800"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addSymptom}
                        className="mt-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                        + Add Symptom
                    </button>
                </div>

                {/* Medications */}
                <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-100">
                    <h3 className="text-2xl font-bold mb-2 text-indigo-700">Medications</h3>
                    {formData.medications.map((medication, index) => (
                        <div key={index} className="grid grid-cols-3 gap-2 mb-4">
                            <input
                                type="text"
                                value={medication.name}
                                onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Medication name"
                            />
                            <input
                                type="text"
                                value={medication.dosage}
                                onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Dosage"
                            />
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={medication.timing}
                                    onChange={(e) => handleMedicationChange(index, 'timing', e.target.value)}
                                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="Timing"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeMedication(index)}
                                    className="px-2 py-1 text-red-600 hover:text-red-800"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addMedication}
                        className="mt-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                        + Add Medication
                    </button>
                </div>

                {/* Mood & Notes */}
                <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-100">
                    <h3 className="text-2xl font-bold mb-2 text-indigo-700">Mood & Notes</h3>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Mood</label>
                            <select
                                value={formData.mood}
                                onChange={(e) => setFormData(prev => ({ ...prev, mood: e.target.value }))}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                            >
                                <option value="Excellent">Excellent</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                                <option value="Poor">Poor</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Notes</label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                                rows="4"
                                placeholder="Add any additional notes here..."
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-4">
                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                >
                    {initialData ? 'Update Entry' : 'Add Entry'}
                </button>
            </div>
        </form>
    );
};

export default HealthMetricsForm; 