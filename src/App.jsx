import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Message from './components/Message';
import SuggestedQuery from './components/SuggestedQuery';
import { getBotResponse } from './mockData';
import VisualDataModal from "./components/VisualDataModal";

const App = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: "Hello! I am RIPPLE, your AI assistant for Indian groundwater data. How can I help you today?", type: 'text' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showVisualData, setShowVisualData] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
        window.lucide?.createIcons();
    }, [messages, isLoading]);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

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
        <div
            className={`h-screen w-screen flex flex-col bg-cover bg-center ${darkMode ? "bg-gray-900" : ""
                }`}
            style={
                darkMode
                    ? {}
                    : { backgroundImage: "url('https://placehold.co/1920x1080/e0e7ff/a5b4fc?text=.')" }
            }
        >
            {/* ---------- HEADER ---------- */}
            <header className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-sm p-2 flex items-center justify-between">
                {/* Centered Title with slight right shift */}
                <div className="absolute inset-0 flex flex-col items-center justify-center translate-x-0.1 pointer-events-none">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Ripple Effect</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Indian AI Groundwater Assistant</p>
                </div>

                {/* Dark Mode Toggle on Right */}
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="ml-auto relative z-10 px-3 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                    {darkMode ? " Light" : " Dark"}
                </button>
            </header>


            {/* ---------- MAIN CHAT ---------- */}
            <main
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 chat-container "
            >
                <div className="max-w-4xl mx-auto" >
                    {messages.map(msg => <Message key={msg.id} msg={msg} />)}
                    {isLoading && (
                        <div className="flex items-start gap-3 my-4 fade-in">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-md dark:bg-blue-400">
                                <i data-lucide="bot"></i>
                            </div>
                            <div className="max-w-md lg:max-w-2xl p-4 rounded-2xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm rounded-tl-none flex items-center gap-2 ">
                                <i data-lucide="loader-2" className="animate-spin"></i>
                                <span>Thinking...</span>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* ---------- FOOTER ---------- */}
            <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-4">
                <div className="max-w-4xl mx-auto">
                    {/* Suggested queries */}
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                        <SuggestedQuery text="Show heatmap of Punjab" />
                        <SuggestedQuery text="What is the 10-year trend in Hisar?" />
                        

                        {/* 📊 Get state-wise data Button */}
                        <button
                            type="button"
                            onClick={() => setShowVisualData(true)}
                            title="groundwater data"
                            className="px-3 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
                        >
                            Get state-wise data
                        </button>
                    </div>

                    {/* Chat input form */}
                    <form
                        id="chat-form"
                        onSubmit={handleSendMessage}
                        className="flex items-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full p-2 shadow-md focus-within:ring-2 focus-within:ring-blue-500 transition-all"
                    >
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask about groundwater in India..."
                            className="flex-1 bg-transparent px-4 py-2 focus:outline-none text-gray-700 dark:text-gray-200"
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
