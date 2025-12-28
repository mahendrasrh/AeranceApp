import { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/footer";
import { submitEmployeeForm } from "../Services/apiService";

const FormDataPage = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [workLocation, setWorkLocation] = useState("");

  const [baseSalary, setBaseSalary] = useState("");
  const [bonus, setBonus] = useState("");
  const [deductions, setDeductions] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(null);

  const validateFields = () => {
    const newErrors = {};

    if (!employeeName.trim()) newErrors.employeeName = "Employee Name is required";
    if (!designation.trim()) newErrors.designation = "Designation is required";
    if (!department.trim()) newErrors.department = "Department is required";
    if (!employeeId.trim()) newErrors.employeeId = "Employee ID is required";
    if (!bankAccountNumber.trim()) newErrors.bankAccountNumber = "Bank Account Number is required";
    if (!panNumber.trim()) newErrors.panNumber = "PAN Number is required";
    if (!bankName.trim()) newErrors.bankName = "Bank Name is required";
    if (!workLocation.trim()) newErrors.workLocation = "Work Location is required";

    if (!baseSalary) newErrors.baseSalary = "Base Salary is required";
    if (!bonus) newErrors.bonus = "Bonus is required";
    if (!deductions) newErrors.deductions = "Deductions are required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    const data = {
      employee_name: employeeName,
      designation,
      department,
      employee_id: employeeId,
      bank_account_number: bankAccountNumber,
      pan_number: panNumber,
      bank_name: bankName,
      work_location: workLocation,
      salary_details: {
        base_salary: Number(baseSalary),
        bonus: Number(bonus),
        deductions: Number(deductions),
      },
    };

    try {
      setLoading(true);

      const response = await submitEmployeeForm(data);

      setPopup({
        message: response.message,
      });

      // Reset all fields
      setEmployeeName("");
      setDesignation("");
      setDepartment("");
      setEmployeeId("");
      setBankAccountNumber("");
      setPanNumber("");
      setBankName("");
      setWorkLocation("");
      setBaseSalary("");
      setBonus("");
      setDeductions("");

      setErrors({});
    } catch (error) {
      alert("❌ Failed to submit!");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (setter, fieldName, value) => {
    setter(value);

    // Remove error instantly when typing
    setErrors((prev) => ({ ...prev, [fieldName]: "" }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {popup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-6 w-80 animate-scaleIn">
            <h3 className="text-xl font-semibold text-green-300 text-center mb-3">
              ✅ Submitted!
            </h3>

            <p className="text-gray-200 text-center mb-2">{popup.message}</p>

            <button
              onClick={() => setPopup(null)}
              className="w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <main className="flex-grow flex justify-center items-start p-6 bg-gradient-to-r from-[#042a2b] via-[#255e8c] to-[#0e1822]">
        <div
          className="w-full max-w-lg bg-[#0f172a]/90 backdrop-blur-md p-5 rounded-xl shadow-xl border border-[#304158]/40 mt-2 mb-10 overflow-y-auto"
          style={{ maxHeight: "75vh", scrollbarWidth: "thin" }}
        >
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-100 tracking-wide">
            Employee Details Form
          </h2>

          <form onSubmit={handleSubmit}>
            {/* EMPLOYEE NAME */}
            <label className="text-sm text-gray-300">Employee Name</label>
            <input
              type="text"
              value={employeeName}
              onChange={(e) =>
                handleInputChange(setEmployeeName, "employeeName", e.target.value)
              }
              className="input-style"
              placeholder="Enter employee name"
            />
            {errors.employeeName && (
              <p className="text-red-400 text-xs mb-2">{errors.employeeName}</p>
            )}

            {/* DESIGNATION */}
            <label className="text-sm text-gray-300">Designation</label>
            <input
              type="text"
              value={designation}
              onChange={(e) =>
                handleInputChange(setDesignation, "designation", e.target.value)
              }
              className="input-style"
              placeholder="Enter designation"
            />
            {errors.designation && (
              <p className="text-red-400 text-xs mb-2">{errors.designation}</p>
            )}

            {/* DEPARTMENT */}
            <label className="text-sm text-gray-300">Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) =>
                handleInputChange(setDepartment, "department", e.target.value)
              }
              className="input-style"
              placeholder="Enter department"
            />
            {errors.department && (
              <p className="text-red-400 text-xs mb-2">{errors.department}</p>
            )}

            {/* EMPLOYEE ID */}
            <label className="text-sm text-gray-300">Employee ID</label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) =>
                handleInputChange(setEmployeeId, "employeeId", e.target.value)
              }
              className="input-style"
              placeholder="Enter employee ID"
            />
            {errors.employeeId && (
              <p className="text-red-400 text-xs mb-2">{errors.employeeId}</p>
            )}

            {/* BANK ACCOUNT NUMBER */}
            <label className="text-sm text-gray-300">Bank Account Number</label>
            <input
              type="text"
              value={bankAccountNumber}
              onChange={(e) =>
                handleInputChange(setBankAccountNumber, "bankAccountNumber", e.target.value)
              }
              className="input-style"
              placeholder="Enter bank account number"
            />
            {errors.bankAccountNumber && (
              <p className="text-red-400 text-xs mb-2">{errors.bankAccountNumber}</p>
            )}

            {/* PAN NUMBER */}
            <label className="text-sm text-gray-300">PAN Number</label>
            <input
              type="text"
              value={panNumber}
              onChange={(e) =>
                handleInputChange(setPanNumber, "panNumber", e.target.value)
              }
              className="input-style"
              placeholder="Enter PAN number"
            />
            {errors.panNumber && (
              <p className="text-red-400 text-xs mb-2">{errors.panNumber}</p>
            )}

            {/* BANK NAME */}
            <label className="text-sm text-gray-300">Bank Name</label>
            <input
              type="text"
              value={bankName}
              onChange={(e) =>
                handleInputChange(setBankName, "bankName", e.target.value)
              }
              className="input-style"
              placeholder="Enter bank name"
            />
            {errors.bankName && (
              <p className="text-red-400 text-xs mb-2">{errors.bankName}</p>
            )}

            {/* WORK LOCATION */}
            <label className="text-sm text-gray-300">Work Location</label>
            <input
              type="text"
              value={workLocation}
              onChange={(e) =>
                handleInputChange(setWorkLocation, "workLocation", e.target.value)
              }
              className="input-style"
              placeholder="Enter work location"
            />
            {errors.workLocation && (
              <p className="text-red-400 text-xs mb-2">{errors.workLocation}</p>
            )}

            {/* SALARY FIELDS */}
            <label className="text-sm text-gray-300 mt-2">Base Salary</label>
            <input
              type="number"
              value={baseSalary}
              onChange={(e) =>
                handleInputChange(setBaseSalary, "baseSalary", e.target.value)
              }
              className="input-style"
            />
            {errors.baseSalary && (
              <p className="text-red-400 text-xs mb-2">{errors.baseSalary}</p>
            )}

            <label className="text-sm text-gray-300">Bonus</label>
            <input
              type="number"
              value={bonus}
              onChange={(e) =>
                handleInputChange(setBonus, "bonus", e.target.value)
              }
              className="input-style"
            />
            {errors.bonus && (
              <p className="text-red-400 text-xs mb-2">{errors.bonus}</p>
            )}

            <label className="text-sm text-gray-300">Deductions</label>
            <input
              type="number"
              value={deductions}
              onChange={(e) =>
                handleInputChange(setDeductions, "deductions", e.target.value)
              }
              className="input-style"
            />
            {errors.deductions && (
              <p className="text-red-400 text-xs mb-2">{errors.deductions}</p>
            )}

            <button
              type="submit"
              className="w-full mt-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white"
            >
              Submit
            </button>
          </form>
        </div>
      </main>

      <Footer />

      <style>
        {`
        .input-style {
          width: 100%;
          padding: 8px;
          margin-bottom: 4px;
          border-radius: 6px;
          background: #e8edf6;
          border: 1px solid #ccc;
        }
        @keyframes scaleIn {
          0% { transform: scale(0.7); opacity: 0 }
          100% { transform: scale(1); opacity: 1 }
        }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out }
      `}
      </style>
    </div>
  );
};

export default FormDataPage;
