import { useEffect, useState } from "react";
import { fetchDistricts } from "../api/dataApi";

export default function DistrictList() {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const loadData = async () => {
        try {
          const data = await fetchDistricts();
          setDistricts(data);
        } catch (err) {
          console.error("Error fetching districts:", err);
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }
  }, [open]);

  return (
    <div>
      {/* Footer button */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          📊 View District Data
        </button>
      </div>

      {/* Overlay modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-3/4 md:w-1/2 rounded-2xl shadow-xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">🌊 Jal Vaani Districts</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-red-500 font-bold text-lg"
              >
                ✖
              </button>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <ul className="list-disc pl-6 space-y-1">
                {districts.map((d, idx) => (
                  <li key={idx}>
                    <span className="font-semibold">{d.state}</span> —{" "}
                    {d.district} →{" "}
                    <span className="text-blue-600">{d.category}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
