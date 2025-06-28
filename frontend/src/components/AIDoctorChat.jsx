import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const AIDoctorChat = () => {
    const { backendUrl, token, userData } = useContext(AppContext);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [sessionId, setSessionId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Debug logging
    useEffect(() => {
        console.log('AIDoctorChat Debug:', { token: !!token, userData: !!userData, userDataValue: userData });
    }, [token, userData]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (token && userData) {
            console.log('Starting consultation with:', { token: !!token, userId: userData._id });
            startNewConsultation();
        }
    }, [token, userData]);

    const startNewConsultation = async () => {
        try {
            setIsLoading(true);
            console.log('Making API call to start consultation');
            const { data } = await axios.post(
                `${backendUrl}/api/ai-doctor/start-consultation`,
                { userId: userData._id },
                { headers: { token } }
            );

            console.log('Consultation response:', data);

            if (data.success) {
                setSessionId(data.sessionId);
                setMessages(data.chat.messages);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error starting consultation:', error);
            toast.error('Failed to start AI consultation');
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim() || !sessionId) return;

        const userMessage = {
            sender: 'user',
            content: newMessage,
            timestamp: new Date(),
            messageType: 'text'
        };

        setMessages(prev => [...prev, userMessage]);
        setNewMessage('');
        setIsTyping(true);

        try {
            const { data } = await axios.post(
                `${backendUrl}/api/ai-doctor/send-message`,
                {
                    sessionId,
                    message: newMessage,
                    userId: userData._id
                },
                { headers: { token } }
            );

            if (data.success) {
                setMessages(prev => [...prev, data.aiResponse]);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message');
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    const renderMessage = (message, index) => {
        const isUser = message.sender === 'user';
        
        return (
            <div
                key={index}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
            >
                <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        isUser
                            ? 'bg-primary text-white rounded-br-none'
                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                >
                    <div className="whitespace-pre-wrap text-sm">
                        {message.content}
                    </div>
                    <div className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                        {formatTime(message.timestamp)}
                    </div>
                </div>
            </div>
        );
    };

    if (!token || !userData) {
        console.log('Rendering login prompt because:', { token: !!token, userData: !!userData });
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Please login to chat with AI Doctor</p>
                    <button 
                        onClick={() => window.location.href = '/login'}
                        className="bg-primary text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
            {/* Header */}
            <div className="bg-primary text-white px-6 py-4 rounded-t-lg">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">AI</span>
                    </div>
                    <div>
                        <h3 className="font-semibold">Dr. AI Assistant</h3>
                        <p className="text-sm text-blue-100">AI Medical Assistant</p>
                    </div>
                    <div className="ml-auto">
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-xs">Online</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {isLoading ? (
                    <div className="flex items-center justify-center h-32">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                            <p className="text-gray-600">Starting consultation...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {messages.map(renderMessage)}
                        {isTyping && (
                            <div className="flex justify-start mb-4">
                                <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none px-4 py-2">
                                    <div className="flex items-center gap-1">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                        <span className="text-xs text-gray-500 ml-2">AI is typing...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-4">
                <div className="flex gap-2">
                    <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your health concern or question..."
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        rows="2"
                        disabled={isLoading || isTyping}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!newMessage.trim() || isLoading || isTyping}
                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Press Enter to send, Shift+Enter for new line
                </p>
            </div>
        </div>
    );
};

export default AIDoctorChat; 