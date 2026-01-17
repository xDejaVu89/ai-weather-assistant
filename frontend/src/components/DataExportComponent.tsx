import React, { useState } from "react";
import { Download, FileJson, FileText, PieChart } from "lucide-react";

export const DataExportComponent: React.FC = () => {
  const [exportFormat, setExportFormat] = useState<"json" | "csv" | "pdf">(
    "json"
  );
  const [dateRange, setDateRange] = useState("7days");

  const handleExport = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/export?format=${exportFormat}&range=${dateRange}`,
        {
          method: "GET",
          headers: { Accept: "application/json" },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `weather_export.${exportFormat}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error("Export error:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex items-center space-x-2 mb-4">
        <Download className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-bold dark:text-white">Export Data</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 mb-2">
            Export Format
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { format: "json" as const, label: "JSON", icon: FileJson },
              { format: "csv" as const, label: "CSV", icon: FileText },
              { format: "pdf" as const, label: "PDF", icon: PieChart },
            ].map(({ format, label, icon: Icon }) => (
              <button
                key={format}
                onClick={() => setExportFormat(format)}
                className={`p-3 rounded border-2 flex items-center justify-center space-x-2 transition ${
                  exportFormat === format
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                    : "border-gray-300 dark:border-gray-600 hover:border-blue-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium dark:text-gray-300 mb-2">
            Date Range
          </label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        <button
          onClick={handleExport}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-medium flex items-center justify-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Download {exportFormat.toUpperCase()}</span>
        </button>
      </div>
    </div>
  );
};
