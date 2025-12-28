import { useEffect, useState } from "react";
import {
  generatePayslips,
  getFolders,
  getPdfFiles,
  downloadPdfFile,
} from "../Services/apiService";

export default function PayslipGenerator() {
  const [xlsFile, setXlsFile] = useState(null);
  const [payPeriod, setPayPeriod] = useState("");

  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [pdfFiles, setPdfFiles] = useState([]);

  const [loading, setLoading] = useState(false);

  // Load folders
  const loadFolders = async () => {
    try {
      const data = await getFolders();
      setFolders(data.folders || []);
    } catch (error) {
      console.error("Error loading folders:", error);
    }
  };

  useEffect(() => {
    loadFolders();
  }, []);

  // Generate payslips
  const handleGenerate = async () => {
    if (!xlsFile || !payPeriod) {
      alert("Please upload file and enter pay period.");
      return;
    }

    const formData = new FormData();
    formData.append("file", xlsFile);
    formData.append("pay_period", payPeriod);

    try {
      setLoading(true);

      const res = await generatePayslips(formData);
      alert(res.message || "Payslips generated successfully!");

      loadFolders();
    } catch (err) {
      alert("Failed to generate payslips");
    } finally {
      setLoading(false);
    }
  };

  // Select folder
  const handleFolderSelect = async (value) => {
    setSelectedFolder(value);

    if (!value) return setPdfFiles([]);

    try {
      const pdfData = await getPdfFiles(value);
      setPdfFiles(pdfData.files || []);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  };

  // Download PDF
  // Download PDF
const handleDownloadPdf = async (filePath) => {
  if (!selectedFolder) {
    alert("Please select a folder before downloading.");
    return;
  }

  try {
    // Use selectedFolder as the pay_period
    const blob = await downloadPdfFile(filePath, selectedFolder);

    const url = window.URL.createObjectURL(new Blob([blob]));
    const a = document.createElement("a");
    a.href = url;
    a.download = filePath.split("/").pop(); // extract file name
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    alert("Failed to download PDF");
  }
};



  return (
    <div className="h-screen w-screen bg-[#0e1822] text-white flex text-sm">

      {/* Global Loader */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* LEFT SIDE */}
      <div className="w-1/2 h-full p-6 overflow-y-auto bg-[#1a2534] border-r border-gray-700">
        <h2 className="text-xl font-bold mb-6 text-center">
          Payslip Generator
        </h2>

        <div className="space-y-4">

          {/* Upload XLS */}
          <div>
            <label className="block mb-1 font-semibold text-xs">
              Upload XLS File
            </label>
            <input
              type="file"
              accept=".xls,.xlsx"
              onChange={(e) => setXlsFile(e.target.files[0])}
              className="w-full p-2 bg-[#0e1822] border border-gray-500 rounded"
            />
          </div>

          {/* Pay Period */}
          <div>
            <label className="block mb-1 font-semibold text-xs">
              Enter Pay Period
            </label>
            <input
              type="text"
              placeholder="Ex: October 2025"
              value={payPeriod}
              onChange={(e) => setPayPeriod(e.target.value)}
              className="w-full p-2 bg-[#0e1822] border border-gray-500 rounded"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-blue-600 py-2 rounded font-semibold hover:bg-blue-700 text-sm"
          >
            {loading ? "Processing..." : "Generate Payslips"}
          </button>

          <hr className="border-gray-600 my-4" />

          {/* Folder Dropdown */}
          <div>
            <label className="block mb-1 font-semibold text-xs">
              Select Folder
            </label>

            <select
              value={selectedFolder}
              onChange={(e) => handleFolderSelect(e.target.value)}
              className="w-full p-2 bg-[#0e1822] border border-gray-500 rounded"
            >
              <option value="">-- Select Folder --</option>
              {folders.map((f, i) => (
                <option key={i} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 h-full p-6 overflow-y-auto bg-[#0e1822]">
        <h3 className="text-lg font-semibold mb-4">
          PDF Files ({pdfFiles.length})
        </h3>

       <div className="border border-gray-700 rounded p-3 bg-[#1f2d3d] max-h-full overflow-y-auto">

  {pdfFiles.length === 0 ? (
    <p className="text-gray-400 text-xs">No PDFs available.</p>
  ) : (
    <ul className="space-y-2">
      {pdfFiles.map((file, idx) => (
        <li
          key={idx}
          className="flex justify-between items-center bg-[#2b3a4d] px-4 py-3 rounded shadow-sm border border-[#3a4a5a]"
        >
          {/* FILE NAME */}
          <span className="text-sm text-gray-200 font-medium truncate max-w-[65%]">
            {file}
          </span>

          {/* DOWNLOAD BUTTON */}
          <button
            onClick={() => handleDownloadPdf(file)}
            className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 text-xs font-semibold shadow"
          >
            Download
          </button>
        </li>
      ))}
    </ul>
  )}
</div>

      </div>
    </div>
  );
}
