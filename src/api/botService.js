// This function simulates an API call to your backend.
// LATER, you will replace this with a real fetch() call to your FastAPI server.

export const getBotResponse = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    
    // This is the endpoint you will eventually call
    // const API_URL = 'http://127.0.0.1:8000/chat';

    return new Promise(resolve => {
        setTimeout(() => {
            if (lowerCaseMessage.includes("map") || lowerCaseMessage.includes("heatmap")) {
                resolve({
                    id: Date.now(),
                    sender: 'bot',
                    text: "Here is the heatmap for groundwater extraction in Punjab. The darker red areas indicate over-exploited zones.",
                    type: 'map',
                    data: {
                        center: [31.1471, 75.3412], // Punjab
                        zoom: 7
                    }
                });
            } else if (lowerCaseMessage.includes("trend") || lowerCaseMessage.includes("chart")) {
                resolve({
                    id: Date.now(),
                    sender: 'bot',
                    text: "Here is the 10-year trend of groundwater levels in Hisar, Haryana. As you can see, there has been a slight decline over the period.",
                    type: 'chart',
                    data: {
                        labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                        datasets: [{
                            label: 'Groundwater Level (meters)',
                            data: [15.2, 15.1, 15.3, 15.0, 14.9, 14.8, 15.0, 14.7, 14.6, 14.5],
                            borderColor: 'rgb(59, 130, 246)',
                            backgroundColor: 'rgba(59, 130, 246, 0.5)',
                            tension: 0.1
                        }]
                    }
                });
            } else if (lowerCaseMessage.includes("report")) {
                 resolve({
                    id: Date.now(),
                    sender: 'bot',
                    text: "According to the 2023 CGWB report, 35% of assessment units in India are classified as Semi-Critical, Critical, or Over-Exploited. Key initiatives like the Atal Bhujal Yojana are focused on participatory groundwater management to address these issues.",
                    type: 'text'
                });
            } else {
                resolve({
                    id: Date.now(),
                    sender: 'bot',
                    text: "Hello! I am Jal-Vaani, your AI assistant for Indian groundwater data. How can I help you today? You can ask me for trends, maps, or data from specific reports.",
                    type: 'text'
                });
            }
        }, 1500);
    });
};
