import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import DisasterTable from "../components/DisasterTable";

function Dashboard() {
  const navigate = useNavigate();
  const [disasters, setDisasters] = useState([]);
  const [newDisaster, setNewDisaster] = useState({
    name: "",
    status: "",
    type: "",
    impact: "",
    mitigation: "",
  });
  const [editDisaster, setEditDisaster] = useState(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }

    const fetchDisasters = async () => {
      try {
        const response = await axios.get(
          "http://localhost/merapi-app/backend/disasters.php"
        );
        setDisasters(response.data);
      } catch (error) {
        console.error("Error fetching disasters:", error);
      }
    };

    fetchDisasters();
  }, [navigate]);

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
      window.location.reload();
    } catch (error) {
      console.error("Error adding disaster:", error);
    }
  };

  const handleUpdateDisaster = async () => {
    try {
      await axios.put(
        "http://localhost/merapi-app/backend/disasters.php",
        editDisaster
      );
      setEditDisaster(null);
      alert("Disaster updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating disaster:", error);
    }
  };

  const handleDeleteDisaster = async (id) => {
    try {
      await axios.delete(
        `http://localhost/merapi-app/backend/disasters.php?id=${id}`
      );
      alert("Disaster deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting disaster:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <h2 className="text-xl mb-4">Data Bencana Gunung Merapi</h2>

        <DisasterTable
          disasters={disasters}
          onEdit={setEditDisaster}
          onDelete={handleDeleteDisaster}
        />

        {editDisaster && (
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Edit Bencana</h2>
            <input
              type="text"
              placeholder="Nama Gunung"
              value={editDisaster.name}
              onChange={(e) =>
                setEditDisaster({ ...editDisaster, name: e.target.value })
              }
              className="border border-gray-300 rounded px-2 py-1 mr-2"
            />
            <input
              type="text"
              placeholder="Status Aktivitas"
              value={editDisaster.status}
              onChange={(e) =>
                setEditDisaster({ ...editDisaster, status: e.target.value })
              }
              className="border border-gray-300 rounded px-2 py-1 mr-2"
            />
            <input
              type="text"
              placeholder="Jenis Bahaya"
              value={editDisaster.type}
              onChange={(e) =>
                setEditDisaster({ ...editDisaster, type: e.target.value })
              }
              className="border border-gray-300 rounded px-2 py-1 mr-2"
            />
            <input
              type="text"
              placeholder="Dampak Potensial"
              value={editDisaster.impact}
              onChange={(e) =>
                setEditDisaster({ ...editDisaster, impact: e.target.value })
              }
              className="border border-gray-300 rounded px-2 py-1 mr-2"
            />
            <input
              type="text"
              placeholder="Tindakan Mitigasi"
              value={editDisaster.mitigation}
              onChange={(e) =>
                setEditDisaster({ ...editDisaster, mitigation: e.target.value })
              }
              className="border border-gray-300 rounded px-2 py-1 mr-2"
            />
            <button
              className="bg-green-500 text-white px-4 py-1 rounded"
              onClick={handleUpdateDisaster}
            >
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
