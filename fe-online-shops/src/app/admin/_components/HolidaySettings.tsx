"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface HolidaySetting {
  _id: string;
  holidayName: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

const HolidaySettings = () => {
  const [holidaySettings, setHolidaySettings] = useState<HolidaySetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState<HolidaySetting | null>(null);
  const [formData, setFormData] = useState({
    holidayName: "",
    isActive: false,
    startDate: "",
    endDate: ""
  });

  useEffect(() => {
    fetchHolidaySettings();
  }, []);

  const fetchHolidaySettings = async () => {
    try {
      const response = await axios.get("http://localhost:8000/getHolidaySettings");
      if (response.data.success && Array.isArray(response.data.holidaySettings)) {
        setHolidaySettings(response.data.holidaySettings);
      } else {
        setHolidaySettings([]);
      }
    } catch (error) {
      console.error("Error fetching holiday settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
      if (editingHoliday) {
        // Update existing holiday
        await axios.put(`http://localhost:8000/updateHolidaySetting/${editingHoliday._id}`, formData, { headers });
      } else {
        // Create new holiday
        await axios.post("http://localhost:8000/createHolidaySetting", formData, { headers });
      }
      
      fetchHolidaySettings();
      resetForm();
    } catch (error) {
      console.error("Error saving holiday setting:", error);
    }
  };

  const handleEdit = (holiday: HolidaySetting) => {
    setEditingHoliday(holiday);
    setFormData({
      holidayName: holiday.holidayName,
      isActive: holiday.isActive,
      startDate: holiday.startDate ? holiday.startDate.split('T')[0] : "",
      endDate: holiday.endDate ? holiday.endDate.split('T')[0] : ""
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this holiday setting?")) {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
        await axios.delete(`http://localhost:8000/deleteHolidaySetting/${id}`, { headers });
        fetchHolidaySettings();
      } catch (error) {
        console.error("Error deleting holiday setting:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      holidayName: "",
      isActive: false,
      startDate: "",
      endDate: ""
    });
    setEditingHoliday(null);
    setShowForm(false);
  };

  const toggleActive = async (holiday: HolidaySetting) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
      await axios.put(`http://localhost:8000/updateHolidaySetting/${holiday._id}`, {
        ...holiday,
        isActive: !holiday.isActive
      }, { headers });
      fetchHolidaySettings();
    } catch (error) {
      console.error("Error updating holiday status:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading holiday settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Holiday Settings</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Holiday
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            {editingHoliday ? "Edit Holiday" : "Add New Holiday"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Holiday Name
              </label>
              <input
                type="text"
                value={formData.holidayName}
                onChange={(e) => setFormData({ ...formData, holidayName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                Active (Show on frontend)
              </label>
            </div>

            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {editingHoliday ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Holiday Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {holidaySettings.map((holiday) => (
              <tr key={holiday._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {holiday.holidayName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleActive(holiday)}
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      holiday.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {holiday.isActive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {holiday.startDate ? new Date(holiday.startDate).toLocaleDateString() : "Not set"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {holiday.endDate ? new Date(holiday.endDate).toLocaleDateString() : "Not set"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleEdit(holiday)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(holiday._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {holidaySettings.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No holiday settings found. Create your first holiday setting above.
          </div>
        )}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">How it works:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Create holiday settings with names like "Christmas Special", "Black Friday", etc.</li>
          <li>• Mark products as holiday items in the Products tab</li>
          <li>• Only one holiday can be active at a time</li>
          <li>• The holiday section will appear on the frontend when a holiday is active</li>
          <li>• Set start and end dates to track holiday periods</li>
        </ul>
      </div>
    </div>
  );
};

export default HolidaySettings;
