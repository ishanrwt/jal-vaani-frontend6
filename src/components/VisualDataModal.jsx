import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const VisualDataModal = ({ onClose }) => {
  const [state, setState] = useState(""); // selected state
  const [districtData, setDistrictData] = useState([]);

  const handleFetchData = async (selectedState) => {
    try {
      const response = await fetch(`http://localhost:5000/api/districts?state=${selectedState}`);
      const data = await response.json();
      setDistrictData(data);
    } catch (error) {
      console.error("Error fetching district data:", error);
    }
  };

  useEffect(() => {
    if (state === "Haryana") {
      handleFetchData(state);
    }
  }, [state]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-4xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4">Visual Groundwater Data</h2>

        {/* State selector */}
        <div className="mb-4">
          <label className="font-medium mr-2">Select State:</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
          >
            <option value="">--Choose--</option>
            <option value="Haryana">Haryana</option>
          </select>
        </div>

        {/* Chart */}
        {districtData.length > 0 ? (
          <div className="w-full h-80">
            <ResponsiveContainer>
              <BarChart data={districtData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district_name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="water_level" fill="#3b82f6" name="Water Level (m)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-gray-600">Please select a state to view data.</p>
        )}
      </div>
    </div>
  );
};

export default VisualDataModal;
