import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons"; // Specific icons

const AdminDashboard = () => {
  const [auth] = useAuth();

  // Inline styles for component elements
  const cardStyle = {
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    padding: "24px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "75%",
    margin: "0 auto",
  };

  const headerStyle = {
    color: "#007bff",
    marginBottom: "24px",
    fontSize: "1.5em",
    fontWeight: "bold",
  };

  const detailStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
  };

  const iconStyle = {
    fontSize: "20px",
    color: "#007bff",
    marginRight: "10px",
  };

  const labelStyle = {
    fontWeight: "bold",
    marginRight: "8px",
    color: "#333",
    minWidth: "80px",
  };

  const valueStyle = {
    color: "#555",
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div style={cardStyle}>
              <h2 style={headerStyle}>Admin Profile</h2>
              <div style={detailStyle}>
                <UserOutlined style={iconStyle} />
                <span style={labelStyle}>Name:</span>
                <span style={valueStyle}>{auth?.user?.name || "Not Available"}</span>
              </div>
              <div style={detailStyle}>
                <MailOutlined style={iconStyle} />
                <span style={labelStyle}>Email:</span>
                <span style={valueStyle}>{auth?.user?.email || "Not Available"}</span>
              </div>
              <div style={detailStyle}>
                <PhoneOutlined style={iconStyle} />
                <span style={labelStyle}>Contact:</span>
                <span style={valueStyle}>{auth?.user?.phone || "Not Available"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
