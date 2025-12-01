import axios from "axios";

// Base URL (adjust if needed)
const API_BASE_URL = "http://40.192.27.186/";

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// ✅ 1. Fetch all categories
export const submitEmployeeForm = async (payload) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post("/api/employees", payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,  
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error submitting employee form:", error);
    throw error;
  }
};


export const getAllEmployees = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/api/employees", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;   // your backend sends an array directly
};



// ✅ Register New Institution (Tenant)
export const registerTenant = async (tenantData) => {
  try {
    const response = await api.post("/api/register_tenant", tenantData, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;   // <-- contains tenant_id, message, login_instructions
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await api.post("/api/login", payload);
    return response.data;
  } catch (error) {
    console.error("Login API Error:", error);
    throw error.response ? error.response.data : error;
  }
};

// ✅ Add New User (to specific tenant)
// ✅ Add new user
export const addUser = async (userData) => {
  try {
    const token = localStorage.getItem("token"); // fetch JWT

    const response = await api.post("/api/add_user", userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // { message, role, username }
  } catch (error) {
    console.error("Add User API Error:", error);
    throw error.response ? error.response.data : error;
  }
};

export const addSchoolConfig = async (data) => {
  try {
    const token = localStorage.getItem("token"); // ✅ Fetch JWT

    const response = await api.post("/api/school_config", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ Add token
      },
    });

    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "School config failed" };
  }
};
export const getSchoolConfig = async () => {
  try {
    const token = localStorage.getItem("token"); // JWT Token

    const response = await api.get("/api/school_config", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; 
    // full object:
    // { last_updated_at, last_updated_by, schools: [...] }

  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch school config" };
  }
};
export const generatePayslips = async (formData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post("/api/generate_payslips", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error generating payslips", error);
    throw error;
  }
};

// -------------------------------------------------------
// 2️⃣ GET FOLDERS FOR DROPDOWN → /api/folders
// -------------------------------------------------------
export const getFolders = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get("/api/folders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error fetching folders:", error);
    throw error;
  }
};

// -------------------------------------------------------
// 3️⃣ GET PDF LIST → /api/listpdfs?folder=October 2025
// -------------------------------------------------------
export const getPdfFiles = async (payPeriod) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      "/api/listpdfs",
      { pay_period: payPeriod }, // ✅ JSON body payload
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("❌ Error fetching PDF list:", error);
    throw error;
  }
};


// -------------------------------------------------------
// 4️⃣ DOWNLOAD A PDF FILE → /api/download?path=folder//file.pdf
// -------------------------------------------------------
export const downloadPdfFile = async (fileName, payPeriod) => {
  try {
    const token = localStorage.getItem("token"); // Get JWT token

    const response = await api.post(
      `/api/download_report/${fileName}`,
      { pay_period: payPeriod },
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`, // Include token
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("❌ Error downloading PDF:", error);
    throw error;
  }
};


export default api;
