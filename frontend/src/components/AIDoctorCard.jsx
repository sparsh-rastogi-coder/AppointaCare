import React from 'react';
import { useNavigate } from 'react-router-dom';

const AIDoctorCard = () => {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate('/ai-doctor')} 
            className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 bg-gradient-to-br from-blue-50 to-indigo-100'
        >
            <div className='bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-center'>
                <div className='w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3'>
                    <span className='text-2xl font-bold text-blue-600'>AI</span>
                </div>
                <h3 className='text-white text-lg font-semibold mb-1'>Dr. AI Assistant</h3>
                <p className='text-blue-100 text-sm'>AI Medical Assistant</p>
            </div>
            <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-green-500 mb-3'>
                    <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                    <p>Available 24/7</p>
                </div>
                <p className='text-[#262626] text-sm mb-2'>AI-powered medical assistant for instant health guidance</p>
                <div className='flex flex-wrap gap-1 mb-3'>
                    <span className='bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full'>Symptom Analysis</span>
                    <span className='bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full'>Health Tips</span>
                    <span className='bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full'>Free Consultation</span>
                </div>
                <div className='text-center'>
                    <button className='bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors'>
                        Start Chat
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIDoctorCard; 