import React, { useState } from "react";
import "../styles/Dashboard.css";
import { Link } from "react-router-dom";
import { Avatar, Dropdown, Menu } from "antd";
import { ManOutlined, PoweroffOutlined, UserOutlined, WomanOutlined } from "@ant-design/icons";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import FileUpload from "./fileupload";

const data = [
  { date: "2024-03-01", amount: 500 },
  { date: "2024-03-02", amount: 700 },
  { date: "2024-03-03", amount: 400 },
  { date: "2024-03-04", amount: 900 },
  { date: "2024-03-05", amount: 1200 },
  { date: "2024-03-07", amount: 130 },
  { date: "2024-03-08", amount: 300 },
  { date: "2024-03-09", amount: 200 },
  { date: "2024-03-10", amount: 1000 },
];

const Dashboard = () => {
  const [userGender, setUserGender] = useState("male");

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <a href="#">Profile</a>
      </Menu.Item>
      <Menu.Item key="2" icon={<PoweroffOutlined />}>
        <a href="/">Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="navigation-bar">
        <div className="hometopic">
          <h1>FlowFi</h1>
          <h1>FlowFi</h1>
        </div>
        
        <a href="/homepage">Home</a>
        <a href="/platform">Platform</a>
        <a href="/dashboard">Dashboard</a>
        <a href="/insights">Insights</a>

        <Dropdown  trigger={["click"]}>
          <div className="profile-icon" onClick={(e) => e.preventDefault()}>
            <Avatar
              icon={userGender === "male" ? <ManOutlined /> : <WomanOutlined />}
              style={{ backgroundColor: "#87d068", cursor: "pointer" }}
            />
          </div>
        </Dropdown>
      </div>

      <div className="dashboard">
        <h2 className="dashboard-title">Financial Overview</h2>
        <FileUpload/>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={500} >
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" label={{ value: "Date", position: "insideBottom", offset: -5 }} />
              <YAxis label={{ value: "Total Amount ($)", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
