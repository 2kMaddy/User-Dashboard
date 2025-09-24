import { useEffect, useState } from "react";
import Table from "../components/Table";
import Navbar from "../components/Navbar";

const Home = () => {
  const userColumns = [
    { key: "id", header: "ID" },
    { key: "first_name", header: "First Name" },
    { key: "last_name", header: "Last Name" },
    { key: "email", header: "Email" },
    { key: "department", header: "Department" },
  ];

  const [data, setData] = useState([]);

  // API Call for Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://mockend.com/api/2kMaddy/User-Dashboard/users"
      );
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-dvh w-full">
      <Navbar />
      <div className="w-full p-5">
        {/* User table component */}
        <Table data={data} columns={userColumns} />
      </div>
    </div>
  );
};

export default Home;
