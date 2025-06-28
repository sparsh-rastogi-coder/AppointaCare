import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import AIDoctorChat from '../components/AIDoctorChat';
import { toast } from 'react-toastify';

const AIDoctor = () => {
    const { token, user } = useContext(AppContext);
    const [activeTab, setActiveTab] = useState('chat');

    const healthTopics = [
        {
            title: "Common Symptoms",
            items: [
                "Headache and Migraine",
                "Fever and Temperature",
                "Cough and Cold",
                "Stomach Pain",
                "Back Pain",
                "Fatigue and Weakness"
            ]
        },
        {
            title: "Health Tips",
            items: [
                "Healthy Diet Guidelines",
                "Exercise Recommendations",
                "Sleep Hygiene",
                "Stress Management",
                "Preventive Care",
                "Mental Health"
            ]
        },
        {
            title: "Emergency Signs",
            items: [
                "Chest Pain",
                "Severe Headache",
                "Difficulty Breathing",
                "Uncontrolled Bleeding",
                "Loss of Consciousness",
                "Stroke Symptoms"
            ]
        }
    ];

    const quickQuestions = [
        "I have a headache, what should I do?",
        "What are the symptoms of COVID-19?",
        "How can I improve my sleep?",
        "What's a healthy diet plan?",
        "I feel stressed, any tips?",
        "When should I see a doctor?"
    ];

    const handleQuickQuestion = (question) => {
        // This would be handled by the chat component
        toast.info(`Ask: "${question}" in the chat below`);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        AI Medical Assistant
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Get instant health guidance, symptom analysis, and medical information from our AI-powered medical assistant. 
                        Available 24/7 to help with your health concerns.
                    </p>
                </div>

                {/* Disclaimer */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">
                                Important Disclaimer
                            </h3>
                            <div className="mt-2 text-sm text-yellow-700">
                                <p>
                                    This AI assistant provides general health information and guidance only. 
                                    It is not a substitute for professional medical advice, diagnosis, or treatment. 
                                    Always consult with a qualified healthcare provider for medical concerns, 
                                    especially in emergency situations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Sidebar - Health Information */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                Health Information
                            </h2>

                            {/* Quick Questions */}
                            <div className="mb-8">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Quick Questions
                                </h3>
                                <div className="space-y-2">
                                    {quickQuestions.map((question, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleQuickQuestion(question)}
                                            className="w-full text-left p-3 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            {question}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Health Topics */}
                            <div className="space-y-6">
                                {healthTopics.map((topic, index) => (
                                    <div key={index}>
                                        <h3 className="text-lg font-medium text-gray-900 mb-3">
                                            {topic.title}
                                        </h3>
                                        <ul className="space-y-2">
                                            {topic.items.map((item, itemIndex) => (
                                                <li key={itemIndex} className="text-sm text-gray-600 flex items-center">
                                                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* Emergency Contact */}
                            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <h3 className="text-lg font-medium text-red-800 mb-2">
                                    Emergency Contact
                                </h3>
                                <p className="text-sm text-red-700 mb-3">
                                    For medical emergencies, call your local emergency number immediately.
                                </p>
                                <div className="text-center">
                                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                                        Emergency: 911
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Chat Area */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    Chat with AI Doctor
                                </h2>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-green-600 font-medium">Online</span>
                                </div>
                            </div>

                            {!token || !user ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        Login Required
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Please login to start chatting with our AI medical assistant.
                                    </p>
                                    <button 
                                        onClick={() => window.location.href = '/login'}
                                        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        Login to Continue
                                    </button>
                                </div>
                            ) : (
                                <AIDoctorChat />
                            )}
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        AI Doctor Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Symptom Analysis
                            </h3>
                            <p className="text-gray-600">
                                Get preliminary assessment of your symptoms and health concerns.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Health Information
                            </h3>
                            <p className="text-gray-600">
                                Access reliable medical information and health guidelines.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                24/7 Availability
                            </h3>
                            <p className="text-gray-600">
                                Get instant responses anytime, day or night.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Emergency Alerts
                            </h3>
                            <p className="text-gray-600">
                                Immediate recognition of emergency symptoms.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIDoctor; 