"use client";
import React, { useState, useEffect } from "react";
import "../css/usertable.css";
import { apiEndPoint } from "../common/apiEndpoint";
import { fetchData } from "../utils/apiHelper";
import Cookies from "js-cookie";
import { putData } from "../utils/apiHelper";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [roleId, setRoleId] = useState(null);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [editingUser, setEditingUser] = useState({});
  const totalDesignations = {
    1: "admin",
    2: "editor",
    3: "viewer",
  };

  useEffect(() => {
    const userRole = Cookies.get("roleId");
    setRoleId(Number(userRole));
    const fetchUsers = async () => {
      const response = await fetchData(apiEndPoint.getUsersList);
      setUsers(response?.data);
    };
    fetchUsers();
  }, []);

  const handleEdit = (id, designation) => {
    setEditRowId(id);
    setSelectedDesignation(designation);
    const roleIdFromDesignation = Object.keys(totalDesignations).find(
      (key) => totalDesignations[key] === designation
    );
    setEditingUser({ id, roleId: roleIdFromDesignation });
  };

  const handleCancel = () => {
    setEditRowId(null);
    setSelectedDesignation(null);
    setEditingUser({});
  };

  const handleSave = async () => {
    const { id, roleId } = editingUser;
    const response = await putData(`${apiEndPoint?.updateUserDesignation}`, {
      _id: id,
      roleId: roleId,
    });

    if (response.status === 200) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, roleId: Number(roleId) } : user
        )
      );
      handleCancel();
    } else {
      const errorDetails = await response.text();
      console.error("Failed to update role:", response.status, errorDetails);
    }
  };

  return (
    <div className="container">
      <h2>User Table</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Designation</th>
            {roleId === 1 && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.fullName}</td>
              <td>
                {editRowId === user._id ? (
                  <select
                    value={selectedDesignation}
                    onChange={(e) => {
                      setSelectedDesignation(e.target.value);
                      const roleIdFromDesignation = Object.keys(
                        totalDesignations
                      ).find(
                        (key) => totalDesignations[key] === e.target.value
                      );
                      setEditingUser({
                        id: user._id,
                        roleId: roleIdFromDesignation,
                      });
                    }}
                    className="select-designation"
                  >
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                ) : (
                  totalDesignations[user.roleId]
                )}
              </td>
              {roleId === 1 && (
                <td>
                  {editRowId === user._id ? (
                    <div>
                      <button
                        className="button save-button"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      <button
                        className="button cancel-button"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="button edit-button"
                      onClick={() =>
                        handleEdit(user._id, totalDesignations[user.roleId])
                      }
                    >
                      Edit
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
