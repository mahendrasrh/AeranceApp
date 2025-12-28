import { useState,useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/footer";
import { Users, School, Plus } from "lucide-react";
import { addUser,addSchoolConfig ,getSchoolConfig} from "../Services/apiService";
const UserManagement = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("users");
  const [isModalOpen, setIsModalOpen] = useState(false);
const [responseModal, setResponseModal] = useState({
  open: false,
  message: "",
  username: "",
  role: "",
  success: true,
});

  // USERS DATA
  const [users, setUsers] = useState([
    { username: "admin", role: "Admin" },
    { username: "mahendra", role: "User" }
  ]);

  // SCHOOLS DATA
const [schools, setSchools] = useState([]);


  // FORM DATA
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
    schoolName: "",
    grades: []
  });

  const resetForm = () => {
    setFormData({
      username: "",
      password: "",
      role: "",
      schoolName: "",
      grades: []
    });
  };


useEffect(() => {
  const fetchSchools = async () => {
    try {
      const result = await getSchoolConfig();

      setSchools(
        result.schools.map(s => ({
          schoolName: s.school_name,
          grades: s.grades,
        }))
      );

    } catch (error) {
      console.error("Error loading schools:", error);
    }
  };

  fetchSchools();
}, []);



  const handleSubmit = async() => {
   if (activeTab === "users") {
  if (!formData.username || !formData.password || !formData.role) {
    setResponseModal({
      open: true,
      message: "Please fill all user fields.",
      success: false
    });
    return;
  }

  setLoading(true);

  try {
    const response = await addUser({
      username: formData.username,
      password: formData.password,
      role: formData.role,
    });

    // Add to UI table
    setUsers([...users, { username: response.username, role: response.role }]);

    // 🎉 SHOW SUCCESS MODAL
    setResponseModal({
      open: true,
      message: response.message,
      username: response.username,
      role: response.role,
      success: true,
    });

  } catch (err) {

    // ❌ ERROR MODAL
    setResponseModal({
      open: true,
      message: err.message || "Failed to add user.",
      success: false,
    });
  }

  setLoading(false);
}

if (activeTab === "schools") {
  if (!formData.schoolName) {
    setResponseModal({
      open: true,
      message: "Please enter school name",
      success: false
    });
    return;
  }

  setLoading(true);

  try {
    // Create new school object
    const newSchool = {
      school_name: formData.schoolName,
      grades: formData.grades,
    };

    // API payload: all existing + newly added
    const payload = {
      schools: [
        ...schools.map(s => ({
          school_name: s.schoolName,
          grades: s.grades
        })),
        newSchool
      ]
    };

    // Call API
    const response = await addSchoolConfig(payload);

    // Update UI table
    setSchools([
      ...schools,
      {
        schoolName: formData.schoolName,
        grades: formData.grades
      }
    ]);

    // SUCCESS MODAL
    setResponseModal({
      open: true,
      message: response.message, // 💡 backend message -> "School configuration updated successfully."
      username: formData.schoolName,
      role: "School Added",
      success: true,
    });

  } catch (error) {
    // ERROR MODAL
    setResponseModal({
      open: true,
      message: error.message || "Failed to update school configuration.",
      success: false,
    });
  }

  setLoading(false);
  resetForm();
  setIsModalOpen(false);
}



    resetForm();
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* LOADER */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* MAIN */}
      <main className="flex-grow p-6 bg-gradient-to-r from-[#042a2b] via-[#255e8c] to-[#0e1822] flex justify-center">
        <div className="w-full max-w-5xl bg-[#0d1b32]/50 p-6 rounded-xl backdrop-blur-xl shadow-xl text-white">

          {/* TABS */}
      {/* TABS */}
{/* TABS */}
<div className="flex justify-between items-center mb-6 border-b border-white/20 pb-4">

  {/* LEFT SIDE TABS */}
  <div className="flex gap-4">

    {/* USERS TAB */}
    <button
      onClick={() => setActiveTab("users")}
      className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300
        ${activeTab === "users"
          ? "bg-blue-600 scale-105 shadow-lg shadow-blue-500/50"
          : "bg-gray-700 hover:bg-gray-600 hover:scale-105"}
      `}
    >
      <Users size={18} />
      Users
    </button>

    {/* SCHOOLS TAB */}
    <button
      onClick={() => setActiveTab("schools")}
      className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300
        ${activeTab === "schools"
          ? "bg-blue-600 scale-105 shadow-lg shadow-blue-500/50"
          : "bg-gray-700 hover:bg-gray-600 hover:scale-105"}
      `}
    >
      <School size={18} />
      Schools
    </button>

  </div>

  {/* RIGHT SIDE ADD NEW BUTTON */}
  <button
    onClick={() => setIsModalOpen(true)}
    className="
      px-5 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2
      animate-pulse-glow transition-all duration-300
      hover:scale-110 hover:shadow-[0_0_20px_rgba(34,197,94,0.7)]
    "
  >
    <Plus size={18} />
    Add New
  </button>
</div>


          {/* ADD NEW BUTTON */}
         

          {/* USERS TABLE */}
          {activeTab === "users" && (
            <table className="w-full bg-[#0d1b32] rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-[#132b4e] text-left">
                  <th className="py-3 px-4">Username</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={i} className="border-b border-gray-700">
                    <td className="py-3 px-4">{u.username}</td>
                    <td className="py-3 px-4">{u.role}</td>
                    <td className="py-3 px-4 text-red-400 cursor-pointer">Delete</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* SCHOOLS TABLE */}
          {activeTab === "schools" && (
            <table className="w-full bg-[#0d1b32] rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-[#132b4e] text-left">
                  <th className="py-3 px-4">School Name</th>
                  <th className="py-3 px-4">Grades</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {schools.map((school, i) => (
                  <tr key={i} className="border-b border-gray-700">
                    <td className="py-3 px-4">{school.schoolName}</td>
                    <td className="py-3 px-4">
                      {school.grades.join(", ")}
                    </td>
                    <td className="py-3 px-4 text-red-400 cursor-pointer">
                      Delete
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      </main>

      {/* SLIDE-IN SIDEBAR MODAL */}
    {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
    <div className="w-[420px] bg-[#0d1b32]/80 p-6 rounded-2xl shadow-xl text-white animate-[fadeIn_0.3s_ease]">

      <h3 className="text-xl font-semibold mb-4 text-center">
        {activeTab === "users" ? "Add User" : "Add School & Grades"}
      </h3>

      {/* USER FORM */}
      {activeTab === "users" && (
        <>
          <input
            className="w-full p-2 bg-[#132b4e] rounded mb-3"
            placeholder="Enter Username"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />

          <input
            type="password"
            className="w-full p-2 bg-[#132b4e] rounded mb-3"
            placeholder="Enter Password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <input
            className="w-full p-2 bg-[#132b4e] rounded mb-3"
            placeholder="Role (Admin/User)"
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
          />
        </>
      )}

      {/* SCHOOLS FORM */}
      {activeTab === "schools" && (
        <>

          <input
            className="w-full p-2 bg-[#132b4e] rounded mb-3"
            placeholder="Enter School Name"
            onChange={(e) =>
              setFormData({ ...formData, schoolName: e.target.value })
            }
          />

          <h4 className="mb-2">Grades</h4>

          {formData.grades.map((grade, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                value={grade}
                className="flex-1 p-2 bg-[#132b4e] rounded"
                onChange={(e) => {
                  const updated = [...formData.grades];
                  updated[index] = e.target.value;
                  setFormData({ ...formData, grades: updated });
                }}
              />

              <button
                className="px-3 bg-red-500 rounded"
                onClick={() => {
                  setFormData({
                    ...formData,
                    grades: formData.grades.filter((_, i) => i !== index)
                  });
                }}
              >
                ✕
              </button>
            </div>
          ))}

          <button
            className="w-full p-2 bg-green-600 rounded mt-2"
            onClick={() =>
              setFormData({
                ...formData,
                grades: [...formData.grades, ""]
              })
            }
          >
            + Add Grade
          </button>
        </>
      )}

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 py-2 rounded-lg mt-5"
      >
        Submit
      </button>

      {/* CANCEL */}
      <button
        onClick={() => {
          resetForm();
          setIsModalOpen(false);
        }}
        className="w-full bg-gray-700 py-2 rounded-lg mt-3"
      >
        Cancel
      </button>

    </div>
  </div>
)}

{responseModal.open && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[999]">
    <div className="bg-white/10 border border-white/20 p-6 rounded-2xl w-[380px] shadow-2xl animate-[fadeIn_0.3s_ease] text-white">

      {/* Title */}
      <h2 className="text-xl font-semibold mb-3">
        {responseModal.success ? "Success" : "Error"}
      </h2>

      {/* Message */}
      <p className="mb-2">{responseModal.message}</p>

      {/* Extra Info Only For Success */}
      {responseModal.success && (
        <>
          <p><strong>Username: </strong>{responseModal.username}</p>
          <p><strong>Role: </strong>{responseModal.role}</p>
        </>
      )}

      <button
        className="w-full mt-5 bg-blue-600 hover:bg-blue-700 py-2 rounded-xl"
        onClick={() => setResponseModal({ ...responseModal, open: false })}
      >
        OK
      </button>
    </div>
  </div>
)}

      <Footer />
    </div>
    
  );
  <style>
{`
@keyframes pulse-glow {
  0% { box-shadow: 0 0 10px rgba(34, 197, 94, 0.4); }
  50% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.7); }
  100% { box-shadow: 0 0 10px rgba(34, 197, 94, 0.4); }
}
.animate-pulse-glow {
  animation: pulse-glow 2s infinite ease-in-out;
}
`}
</style>
};

export default UserManagement;
