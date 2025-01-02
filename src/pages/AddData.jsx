import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function AddData() {
  const navigate = useNavigate();
  const [newDisaster, setNewDisaster] = useState({
    name: "",
    status: "",
    type: "",
    impact: "",
    mitigation: "",
  });

  const handleAddDisaster = async () => {
    try {
      await axios.post(
        "http://localhost/merapi-app/backend/disasters.php",
        newDisaster
      );
      setNewDisaster({
        name: "",
        status: "",
        type: "",
        impact: "",
        mitigation: "",
      });
      alert("Disaster added successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding disaster:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 w-full">
        <h2 className="text-xl font-bold mb-4">Tambah Bencana</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nama Gunung"
            value={newDisaster.name}
            onChange={(e) =>
              setNewDisaster({ ...newDisaster, name: e.target.value })
            }
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <input
            type="text"
            placeholder="Status Aktivitas"
            value={newDisaster.status}
            onChange={(e) =>
              setNewDisaster({ ...newDisaster, status: e.target.value })
            }
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <input
            type="text"
            placeholder="Jenis Bahaya"
            value={newDisaster.type}
            onChange={(e) =>
              setNewDisaster({ ...newDisaster, type: e.target.value })
            }
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <input
            type="text"
            placeholder="Dampak Potensial"
            value={newDisaster.impact}
            onChange={(e) =>
              setNewDisaster({ ...newDisaster, impact: e.target.value })
            }
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <input
            type="text"
            placeholder="Tindakan Mitigasi"
            value={newDisaster.mitigation}
            onChange={(e) =>
              setNewDisaster({ ...newDisaster, mitigation: e.target.value })
            }
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded"
            onClick={handleAddDisaster}
          >
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddData;
