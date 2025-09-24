import { useEffect, useState } from "react";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import Pagination from "./Pagination";
import { MdEdit, MdDelete } from "react-icons/md";
import FilterBy from "./FilterBy";
import UserModal from "./UserModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sortBy from "../utils/sortBy"; // Add sorting utility

const Table = ({ data, columns }) => {
  const [tableData, setTableData] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [sortByValue, setSortByValue] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const [filterApplied, setFilterApplied] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [isOpen, setIsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  // --- Search ---
  const handleSearchData = (searchValue) => {
    setSearchKey(searchValue);
    const searchedData = data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setTableData(searchedData);
  };

  // --- Sorting ---
  const handleSortBy = (key, direction) => {
    const sortedData = sortBy(tableData, key, direction);
    setSortByValue(key);
    setSortDirection(direction);
    setTableData(sortedData);
  };

  const handleClearSort = () => {
    setSortByValue(null);
    setSortDirection(null);
    setTableData(data);
  };

  // --- CRUD Functions (same as before) ---
  const handleDeleteUser = async (id) => {
    try {
      setTableData((prev) => prev.filter((each) => each.id !== id));

      const response = await fetch(
        `https://mockend.com/api/2kMaddy/User-Dashboard/users/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete user");

      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      setTableData((prev) => [...prev, tableData.find((u) => u.id === id)]);
    }
  };

  const handleSave = async (user) => {
    try {
      let previousData = [...tableData];

      if (editingUser) {
        setTableData((prev) =>
          prev.map((u) => (u.id === editingUser.id ? { ...user, id: u.id } : u))
        );

        const response = await fetch(
          `https://mockend.com/api/2kMaddy/User-Dashboard/users/${editingUser.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...user, id: editingUser.id }),
          }
        );
        if (!response.ok) throw new Error("Failed to update user");

        toast.success("User updated successfully!");
      } else {
        const lastId =
          tableData.length > 0 ? tableData[tableData.length - 1].id : 0;
        const newUser = { ...user, id: lastId + 1 };
        setTableData((prev) => [...prev, newUser]);

        const response = await fetch(
          `https://mockend.com/api/2kMaddy/User-Dashboard/users`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
          }
        );
        if (!response.ok) throw new Error("Failed to create user");

        toast.success("User created successfully!");
      }

      setEditingUser(null);
      setIsOpen(false);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      setTableData(previousData);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsOpen(true);
  };

  // --- Pagination ---
  const totalPage = Math.ceil(tableData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;

  const entryOptions = [];
  const step = 5;
  const max = tableData.length;
  for (let i = step; i <= max; i += step) entryOptions.push(i);
  if (!entryOptions.includes(max)) entryOptions.push(max);

  return (
    <div className="overflow-x-auto mt-4">
      {/* User Modal */}
      <UserModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditingUser(null);
        }}
        onSave={handleSave}
        user={editingUser}
      />

      {/* Search Bar & Sort Indicator */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
        {/* Search */}
        <div className="flex items-center gap-2">
          <p className="font-medium text-gray-700">Search:</p>
          <input
            type="search"
            placeholder="Search"
            value={searchKey}
            onChange={(e) => handleSearchData(e.target.value)}
            className="px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition w-64"
          />
        </div>

        {/* Sort Indicator */}
        {sortByValue && (
          <div
            onClick={handleClearSort}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-md cursor-pointer hover:bg-green-200 transition shadow-sm"
          >
            <p className="font-medium flex items-center gap-2">
              Sort By:{" "}
              <span className="font-semibold">
                {columns.find((col) => col.key === sortByValue)?.header ||
                  "None"}{" "}
                {sortDirection}
              </span>
              <span className="ml-2 text-red-500 font-bold text-[16px] hover:text-red-700 transition">
                x
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Top controls */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          onClick={() => setIsOpen(true)}
        >
          Create User
        </button>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <FilterBy
            data={data}
            columns={columns}
            onFilterChange={(col, val) => {
              setTableData(data.filter((row) => row[col] === val));
              setFilterApplied(true);
            }}
          />
          {filterApplied && (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md mt-7 hover:bg-red-600 transition"
              onClick={() => {
                setTableData(data);
                setFilterApplied(false);
              }}
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <table className="mt-4 min-w-full border border-green-200 rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-green-700 text-white">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-2 text-left">
                <div className="flex items-center gap-2">
                  {col.header}
                  <div className="flex flex-col gap-0">
                    <button
                      type="button"
                      onClick={() => handleSortBy(col.key, "asc")}
                    >
                      <TiArrowSortedUp />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSortBy(col.key, "desc")}
                    >
                      <TiArrowSortedDown />
                    </button>
                  </div>
                </div>
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {tableData.slice(startIndex, endIndex).map((row) => (
            <tr
              key={row.id}
              className="border-b border-green-200 hover:bg-green-50 transition"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2">
                  {row[col.key]}
                </td>
              ))}
              <td className="flex gap-2">
                <button
                  type="button"
                  className="p-2 text-blue-500 hover:text-blue-700"
                  onClick={() => handleEditUser(row)}
                >
                  <MdEdit />
                </button>
                <button
                  type="button"
                  className="p-2 text-red-600 hover:text-red-700"
                  onClick={() => handleDeleteUser(row.id)}
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="mt-5 flex flex-col md:flex-row justify-between items-center gap-5">
        {/* Show entries */}
        <div className="flex items-center space-x-2 text-gray-700">
          <label htmlFor="show-entries" className="font-medium">
            Show
          </label>
          <select
            id="show-entries"
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-green-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
          >
            {entryOptions.map((each, index) => (
              <option value={each} key={index}>
                {each}
              </option>
            ))}
          </select>
          <span className="text-gray-700">Entries</span>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onClick={setCurrentPage}
        />
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Table;
