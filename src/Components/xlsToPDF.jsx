import React, { useState, useEffect } from "react";
import { Upload, Loader2, FileDown } from "lucide-react";
import axios from "axios";

export default function XlsPdfFlow() {
  const [xlsFile, setXlsFile] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [pdfList, setPdfList] = useState([]);

  // ------------------------------
  // 1️⃣ Upload XLS + Input → Call first API
  // ------------------------------
  const handleSubmit = async () => {
    if (!xlsFile || !inputValue) {
      alert("Please upload XLS and enter input!");
      return;
    }

    const formData = new FormData();
    formData.append("file", xlsFile);
    formData.append("input_text", inputValue);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/upload-xls",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Uploaded successfully!");

      // 👉 API returns data for dropdown
      setDropdownOptions(res.data.dropdownOptions || []);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  // 2️⃣ On Dropdown Select → API #3 → Get PDF list
  // ------------------------------
  const handleDropdownChange = async (value) => {
    setSelectedOption(value);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/get-pdf-list/${value}`
      );

      setPdfList(res.data.pdfFiles || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load PDF list");
    }
  };

  // ------------------------------
  // 3️⃣ Download PDF
  // ------------------------------
  const downloadPdf = async (fileName) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/download/${fileName}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
    } catch (err) {
      console.error(err);
      alert("Failed to download PDF!");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-xl shadow-lg bg-white border">

      {/* Upload Row */}
      <div className="flex items-center gap-4 mb-4">
        <label className="cursor-pointer flex items-center gap-2 p-2 border rounded-lg">
          <Upload size={18} />
          <span>Upload XLS</span>
          <input
            type="file"
            accept=".xls,.xlsx"
            className="hidden"
            onChange={(e) => setXlsFile(e.target.files[0])}
          />
        </label>
        <span className="text-gray-600">
          {xlsFile ? xlsFile.name : "No file selected"}
        </span>
      </div>

      {/* Input box */}
      <input
        type="text"
        placeholder="Enter your input..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full border p-2 rounded-lg mb-4"
      />

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg flex justify-center"
      >
        {loading ? <Loader2 className="animate-spin" /> : "Submit"}
      </button>

      {/* Dropdown */}
      {dropdownOptions.length > 0 && (
        <select
          className="w-full border p-2 mt-5 rounded-lg"
          value={selectedOption}
          onChange={(e) => handleDropdownChange(e.target.value)}
        >
          <option value="">Select an option</option>
          {dropdownOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {/* PDF List */}
      {pdfList.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">PDF Files:</h3>
          <ul className="space-y-2">
            {pdfList.map((file) => (
              <li
                key={file}
                className="flex items-center justify-between p-2 border rounded-lg"
              >
                {file}
                <button
                  // onClick={() to=downloadPdf(file)}
                  className="flex items-center gap-1 text-blue-600"
                >
                  <FileDown size={18} /> Download
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
