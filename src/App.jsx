import React, { useState, useEffect, useRef } from 'react';
import './app.css';
import Message from './components/Message';
import SuggestedQuery from './components/SuggestedQuery';
import { getBotResponse } from './mockData';
import VisualDataModal from "./components/VisualDataModal";

const App = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: "Hello! I am Jal-Vaani, your AI assistant for Indian groundwater data. How can I help you today?", type: 'text' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showVisualData, setShowVisualData] = useState(false);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
        window.lucide?.createIcons();
    }, [messages, isLoading]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (inputValue.trim() === '' || isLoading) return;

        const newUserMessage = { id: Date.now(), sender: 'user', text: inputValue, type: 'text' };
        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsLoading(true);

        const botResponse = await getBotResponse(inputValue);
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
    };

    return (
        <div className="h-screen w-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x1080/e0e7ff/a5b4fc?text=.')" }}>
            <header className="bg-white/70 backdrop-blur-md shadow-sm p-4 text-center">
                <h1 className="text-2xl font-bold text-gray-800">Jal-Vaani</h1>
                <p className="text-sm text-gray-600">Your AI Groundwater Assistant</p>
            </header>

            <main ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 chat-container">
                <div className="max-w-4xl mx-auto">
                    {messages.map(msg => <Message key={msg.id} msg={msg} />)}
                    {isLoading && (
                        <div className="flex items-start gap-3 my-4 fade-in">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                <i data-lucide="bot"></i>
                            </div>
                            <div className="max-w-md lg:max-w-2xl p-4 rounded-2xl bg-white text-gray-800 shadow-sm rounded-tl-none flex items-center gap-2">
                                <i data-lucide="loader-2" className="animate-spin"></i>
                                <span>Thinking...</span>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <footer className="bg-white/80 backdrop-blur-md p-4">
                <div className="max-w-4xl mx-auto">
                    {/* Suggested queries */}
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                        <SuggestedQuery text="Show heatmap of Punjab" />
                        <SuggestedQuery text="What is the 10-year trend in Hisar?" />
                        <SuggestedQuery text="Summarize the 2023 CGWB report" />

                        {/* 📊 Get Visual Data Button */}
                        <button
                            type="button"
                            onClick={() => setShowVisualData(true)}
                            title="Get visual groundwater data"
                            className="px-3 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
                        >
                            📊 Get Visual Data
                        </button>
                    </div>

                    {/* Chat input form */}
                    <form
                        id="chat-form"
                        onSubmit={handleSendMessage}
                        className="flex items-center gap-2 bg-white border border-gray-300 rounded-full p-2 shadow-md focus-within:ring-2 focus-within:ring-blue-500 transition-all"
                    >
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask about groundwater in India..."
                            className="flex-1 bg-transparent px-4 py-2 focus:outline-none text-gray-700"
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                            title="Voice Input"
                        >
                            <i data-lucide="mic"></i>
                        </button>
                        <button
                            type="submit"
                            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-blue-300 transition-colors flex items-center justify-center"
                            disabled={isLoading}
                        >
                            <i data-lucide="send"></i>
                        </button>
                    </form>
                </div>

                {/* Visual Data Modal */}
                {showVisualData && <VisualDataModal onClose={() => setShowVisualData(false)} />}
            </footer>
        </div>
    );
};

export default App;
