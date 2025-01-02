import React from "react";

function DisasterTable({ disasters, onEdit, onDelete }) {
  return (
    <table className="w-full border-collapse border border-gray-300 mb-6">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">ID</th>
          <th className="border border-gray-300 px-4 py-2">Nama Gunung</th>
          <th className="border border-gray-300 px-4 py-2">Status Aktivitas</th>
          <th className="border border-gray-300 px-4 py-2">Jenis Bahaya</th>
          <th className="border border-gray-300 px-4 py-2">Dampak Potensial</th>
          <th className="border border-gray-300 px-4 py-2">
            Tindakan Mitigasi
          </th>
          <th className="border border-gray-300 px-4 py-2">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {disasters.map((disaster) => (
          <tr key={disaster.id}>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {disaster.id}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {disaster.name}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {disaster.status}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {disaster.type}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {disaster.impact}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {disaster.mitigation}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => onEdit(disaster)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => onDelete(disaster.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DisasterTable;
