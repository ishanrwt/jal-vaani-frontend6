import React from 'react';

const SuggestedQuery = ({ text, onClick }) => (
    <button 
        onClick={() => onClick(text)}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full text-sm transition-colors"
    >
        {text}
    </button>
);

export default SuggestedQuery;