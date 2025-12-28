import { useState, useEffect, useMemo } from "react";
import ReactPaginate from "react-paginate";
import Header from "../Header/Header";
import Footer from "../Footer/footer";
import { getAllEmployees, submitEmployeeForm } from "../Services/apiService";
import {toast,Toaster} from "react-hot-toast";

const DisplayDataPage = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [form, setForm] = useState({
    employee_name: "",
    employee_id: "",
    designation: "",
    department: "",
    work_location: "",
    bank_account_number: "",
    pan_number: "",
    base_salary: "",
    bonus: "",
    deductions: "",
  });

  // Validation State
  const [errors, setErrors] = useState({});

  const employeesPerPage = 15;

  // Load Employees
  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await getAllEmployees();
      setEmployeeData(data || []);
    } catch (error) {
      console.error("❌ Error loading employees", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // Handle Input Change + Remove error when typing
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate Form
  const validateForm = () => {
    let newErrors = {};

    Object.keys(form).forEach((field) => {
      if (!form[field]?.trim()) {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit Form
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    setLoading(true);

    const salary_details = {
      base_salary: form.base_salary,
      bonus: form.bonus,
      deductions: form.deductions,
    };

    const payload = { ...form, salary_details };

    const response = await submitEmployeeForm(payload);

    if (response.message) {
      toast.success(response.message); // ✅ show success toast
    }

    setIsModalOpen(false);
    setForm({
      employee_name: "",
      employee_id: "",
      designation: "",
      department: "",
      work_location: "",
      bank_account_number: "",
      pan_number: "",
      base_salary: "",
      bonus: "",
      deductions: "",
    });

    loadEmployees();
  } catch (error) {
    if (error.response?.data?.message) {
      toast.error(error.response.data.message); // ❌ show error toast
    } else {
      toast.error("Failed to save employee. Please try again.");
    }
    console.error("❌ Error saving employee", error);
  } finally {
    setLoading(false);
  }
};

  // Pagination
  const { currentEmployees, pageCount } = useMemo(() => {
    const offset = currentPage * employeesPerPage;

    return {
      currentEmployees: employeeData.slice(offset, offset + employeesPerPage),
      pageCount: Math.ceil(employeeData.length / employeesPerPage),
    };
  }, [employeeData, currentPage]);

  return (
    <div>
      <Header />

      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="mx-auto min-h-[85vh] p-4 sm:p-6 bg-gradient-to-r from-[#0f172a] via-[#334155] to-[#0f172a]">
        <div className="max-w-7xl min-h-[85vh] mx-auto bg-[#1a2534] p-5 md:p-7 rounded-xl shadow-xl border border-gray-700">

          {/* TOP BAR */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-200">Employee List</h2>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white shadow-md transition"
            >
              + Add Employee
            </button>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto max-h-[60vh] overflow-y-auto rounded-md shadow-md">
            <table className="min-w-full divide-y divide-gray-700 text-xs">
              <thead className="bg-[#25619e] text-white uppercase text-[12px]">
                <tr>
                  <th className="px-3 py-2 text-left">Employee Name</th>
                  <th className="px-3 py-2 text-left">Employee ID</th>
                  <th className="px-3 py-2 text-left">Designation</th>
                  <th className="px-3 py-2 text-left">Department</th>
                  <th className="px-3 py-2 text-left">Work Location</th>
                  <th className="px-3 py-2 text-left">Bank Account</th>
                  <th className="px-3 py-2 text-left">PAN Number</th>
                  <th className="px-3 py-2 text-left">Base Salary</th>
                  <th className="px-3 py-2 text-left">Bonus</th>
                  <th className="px-3 py-2 text-left">Deductions</th>
                </tr>
              </thead>

              <tbody className="bg-[#0e1822] text-gray-200 divide-y divide-gray-700">
                {currentEmployees.length > 0 ? (
                  currentEmployees.map((emp, index) => (
                    <tr key={index} className="hover:bg-[#1f2d3d] text-md">
                      <td className="px-3 py-2">{emp.employee_name}</td>
                      <td className="px-3 py-2">{emp.employee_id}</td>
                      <td className="px-3 py-2">{emp.designation}</td>
                      <td className="px-3 py-2">{emp.department}</td>
                      <td className="px-3 py-2">{emp.work_location}</td>
                      <td className="px-3 py-2">{emp.bank_account_number}</td>
                      <td className="px-3 py-2">{emp.pan_number}</td>
                      <td className="px-3 py-2">{emp.salary_details.base_salary}</td>
                      <td className="px-3 py-2">{emp.salary_details.bonus}</td>
                      <td className="px-3 py-2">{emp.salary_details.deductions}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="px-3 py-2 text-center italic text-gray-400">
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {employeeData.length > employeesPerPage && (
            <div className="flex justify-center mt-4 text-md">
              <ReactPaginate
                previousLabel={"< Prev"}
                nextLabel={"Next >"}
                breakLabel={"..."}
                pageCount={pageCount}
                onPageChange={({ selected }) => setCurrentPage(selected)}
                containerClassName={"flex space-x-2"}
                pageClassName={"bg-[#25619e] px-2 py-1 rounded hover:bg-[#0f4377]"}
                activeClassName={"bg-[#0f4377]"}
                previousLinkClassName={"text-gray-200 px-2 py-1"}
                nextLinkClassName={"text-gray-200 px-2 py-1"}
              />
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-[#1e293b] p-6 rounded-xl shadow-xl w-[95%] max-w-3xl relative">
            
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-3 text-white text-xl hover:text-red-400"
            >
              ✖
            </button>

            <h2 className="text-xl text-white mb-4 font-semibold">Add Employee</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 text-white">

              {/* FORM FIELDS */}
             {[
  { name: "employee_name", label: "Employee Name", placeholder: "Enter full name" },
  { name: "employee_id", label: "Employee ID", placeholder: "Ex: A1E00065" },
  { name: "designation", label: "Designation", placeholder: "Ex: Software Engineer" },
  { name: "department", label: "Department", placeholder: "Ex: HR, Finance, IT" },
  { name: "work_location", label: "Work Location", placeholder: "Ex: Bangalore, Hyderabad" },
  { name: "bank_account_number", label: "Bank Account Number", placeholder: "Ex: 123456789012" },
  { name: "pan_number", label: "PAN Number", placeholder: "Ex: ABCDE1234F" },
  { name: "base_salary", label: "Base Salary", placeholder: "Enter base salary" },
  { name: "bonus", label: "Bonus", placeholder: "Enter bonus amount" },
  { name: "deductions", label: "Deductions", placeholder: "Enter total deductions" },
].map((field) => (
  <div key={field.name} className="flex flex-col">
    <label className="mb-1">{field.label}</label>

    <input
      type="text"
      name={field.name}
      placeholder={field.placeholder}
      value={form[field.name]}
      onChange={handleChange}
      className={`p-2 rounded bg-[#0f172a] text-white border ${
        errors[field.name]
          ? "border-red-500"
          : "border-gray-600 focus:border-blue-400"
      }`}
    />

    {errors[field.name] && (
      <span className="text-red-400 text-xs mt-1">
        {errors[field.name]}
      </span>
    )}
  </div>
))}


              <div className="col-span-2 flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded text-white"
                >
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default DisplayDataPage;
