import React from 'react';
import ChartComponent from './ChartComponent';
import MapComponent from './MapComponent';

const Message = ({ msg }) => {
    const isBot = msg.sender === 'bot';
    return (
        <div className={`flex items-start gap-3 my-4 fade-in ${isBot ? '' : 'justify-end'}`}>
            {isBot && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <i data-lucide="bot"></i>
                </div>
            )}
            <div className={`max-w-md lg:max-w-2xl p-4 rounded-2xl ${isBot ? 'bg-white text-gray-800 shadow-sm rounded-tl-none' : 'bg-blue-600 text-white rounded-br-none'}`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
                {msg.type === 'chart' && <ChartComponent data={msg.data} />}
                {msg.type === 'map' && <MapComponent data={msg.data} />}
            </div>
        </div>
    );
};

export default Message;