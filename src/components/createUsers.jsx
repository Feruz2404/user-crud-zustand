import React, { useState } from 'react';
import { useUserStore } from '../zustand/createUser';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    age: '',
    gender: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState('');
  const { users, addUser, removeUser, updateUser } = useUserStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = () => {
    const { fname, lname, age, gender } = formData;
    if (!fname || !lname || !age || !gender) {
      setError('All fields are required!');
      return;
    }
    setError('');
    if (isEditing) {
      updateUser(editIndex, formData);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      addUser(formData);
    }
    setFormData({ fname: '', lname: '', age: '', gender: '' });
  };

  const handleEditUser = (index) => {
    const userToEdit = users[index];
    setFormData(userToEdit);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDeleteUser = (index) => {
    removeUser(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col md:flex-row">
      {/* Form Section */}
      <div className="w-full md:w-1/3 bg-white p-6 shadow-lg rounded-lg md:rounded-none">
        <h3 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
          {isEditing ? 'Edit User' : 'Create User'}
        </h3>
        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}
        <div className="space-y-5">
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleInputChange}
            placeholder="First Name"
            className="border p-3 w-full rounded-lg shadow-sm focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="border p-3 w-full rounded-lg shadow-sm focus:ring focus:ring-blue-300"
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Age"
            className="border p-3 w-full rounded-lg shadow-sm focus:ring focus:ring-blue-300"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="border p-3 w-full rounded-lg shadow-sm focus:ring focus:ring-blue-300"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <button
          onClick={handleAddUser}
          className={`mt-6 w-full py-3 rounded-lg text-white font-semibold transition ${
            isEditing
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isEditing ? 'Update User' : 'Add User'}
        </button>
      </div>

      {/* User List Section */}
      <div className="flex-1 p-6 md:p-8 flex flex-wrap gap-6 items-start justify-center bg-gray-50">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={index}
              className="w-full md:w-64 lg:w-80 bg-white shadow-lg border rounded-lg p-6 transform transition hover:-translate-y-1 hover:shadow-xl"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {user.fname} {user.lname}
              </h3>
              <p className="text-gray-600 mb-1">Age: {user.age}</p>
              <p className="text-gray-600 mb-4">Gender: {user.gender}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEditUser(index)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg text-center mt-20">
            No users available. Add one above!
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateUser;
