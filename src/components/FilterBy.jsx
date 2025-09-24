import { useState, useEffect } from "react";

const FilterBy = ({ data, columns, onFilterChange }) => {
  const [selectedColumn, setSelectedColumn] = useState("");
  const [columnValues, setColumnValues] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  // Update options when selectedColumn changes
  useEffect(() => {
    if (selectedColumn) {
      const uniqueValues = [...new Set(data.map((row) => row[selectedColumn]))];
      setColumnValues(uniqueValues);
      setSelectedValue(""); // reset previous value
    } else {
      setColumnValues([]);
    }
  }, [selectedColumn, data]);

  // Handle filtering
  const handleApplyFilter = () => {
    if (selectedColumn && selectedValue) {
      onFilterChange(selectedColumn, selectedValue);
    }
  };

  const handleClearFilter = () => {
    setSelectedColumn("");
    setSelectedValue("");
    setColumnValues([]);
    if (onClearFilter) onClearFilter();
  };

  const isFilterApplied = selectedColumn && selectedValue;

  return (
    <div className="flex flex-col md:flex-row items-start md:items-end gap-3 p-4 bg-green-50 rounded-md shadow-md">
      {/* Column selector */}
      <div className="flex flex-col">
        <label className="text-green-800 font-medium mb-1">Column</label>
        <select
          className="px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}
        >
          <option value="">Select column</option>
          {columns.map((col) => (
            <option key={col.key} value={col.key}>
              {col.header}
            </option>
          ))}
        </select>
      </div>

      {/* Value selector */}
      <div className="flex flex-col">
        <label className="text-green-800 font-medium mb-1">Value</label>
        <select
          className="px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
          disabled={!selectedColumn}
        >
          <option value="">Select value</option>
          {columnValues.map((val, idx) => (
            <option key={idx} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>

      {/* Apply button */}
      <button
        className="mt-2 md:mt-0 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        onClick={handleApplyFilter}
        disabled={!selectedColumn || !selectedValue}
      >
        Apply Filter
      </button>

      {/* Clear filter button */}

      
    </div>
  );
};

export default FilterBy;
