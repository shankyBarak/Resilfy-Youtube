// User.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";

const { Option } = Select;

const User = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState(["User", "Admin", "Moderator"]);
  const [auth, setAuth] = useAuth();

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-users`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Update role for a specific user
  const handleRoleChange = async (userId, value) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/update-role/${userId}`,
        { role: value },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      fetchUsers(); // Refresh users after role update
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    if (auth?.token) fetchUsers();
  }, [auth?.token]);

  return (
    <Layout title="User Management">
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Users</h1>
          {users.map((user, index) => (
            <div className="border shadow mb-3" key={user._id}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Join Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <Select
                        bordered={false}
                        onChange={(value) => handleRoleChange(user._id, value)}
                        defaultValue={user.role}
                      >
                        {roles.map((role, idx) => (
                          <Option key={idx} value={role}>
                            {role}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    <td>{moment(user.createdAt).format("YYYY-MM-DD")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default User;
