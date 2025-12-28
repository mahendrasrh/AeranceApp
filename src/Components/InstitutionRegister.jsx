import React, { useState } from "react";
import { Lock, User, School, Eye, EyeOff, Copy } from "lucide-react";
import { registerTenant } from "./Services/apiService";

// ---------------------------------------------
// Glassmorphism Success Modal
// ---------------------------------------------
const SuccessModal = ({ result, onClose }) => {
  if (!result) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.tenant_id);
    alert("Tenant ID copied!");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/40 z-50 animate-fadeIn">
      <div className="bg-white/10 border border-white/30 shadow-2xl p-6 rounded-2xl w-96 backdrop-blur-xl animate-scaleIn">
        <h2 className="text-2xl text-green-400 font-bold text-center mb-4">
          🎉 Registration Successful!
        </h2>

        <p className="text-gray-200 text-center mb-3">
          <strong>Message:</strong> {result.message}
        </p>

        {/* Tenant ID Box */}
        <div className="bg-white/10 border border-white/20 p-4 rounded-xl mb-4">
          <p className="text-gray-100 text-lg break-all">
            <strong>Tenant ID:</strong> {result.tenant_id}
          </p>

          <button
            onClick={copyToClipboard}
            className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            <Copy size={18} /> Copy Tenant ID
          </button>
        </div>

        <p className="text-gray-300 text-center text-sm mb-4">
          {result.login_instructions}
        </p>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

// ---------------------------------------------
// Input Component
// ---------------------------------------------
const InputField = ({
  id,
  value,
  onChange,
  placeholder,
  icon: Icon,
  type = "text",
  showPassword,
  setShowPassword,
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#3786d5] opacity-80 pointer-events-none">
        <Icon size={24} />
      </div>

      <input
        id={id}
        type={type === "password" && showPassword ? "text" : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full p-2 pl-14 pr-14 text-sm text-gray-300 border border-transparent rounded-full
          focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 placeholder-gray-400 shadow-xl"
        style={{
          height: "3.5rem",
          backgroundColor: "#0c1a25",
        }}
      />

      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-4 flex items-center text-[#3786d5] opacity-80 hover:opacity-100 transition"
        >
          {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
        </button>
      )}
    </div>
  );
};

// ---------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------
const InstitutionRegister = () => {
  const [adminusername, setAdminUserName] = useState("");
  const [institutionname, setInstitutionName] = useState("");
  const [adminpassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // SUBMIT -------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      institution_name: institutionname.trim(),
      admin_username: adminusername.trim(),
      admin_password: adminpassword.trim(),
    };

    try {
      const response = await registerTenant(payload);
      setResult(response);

      // Reset fields
      setInstitutionName("");
      setAdminUserName("");
      setAdminPassword("");
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <section>
      {/* Background Blobs */}
      <div className="absolute bottom-px left-7 w-96 h-56 bg-[#135854] rounded-full mix-blend-screen opacity-45 animate-color-mix-wave shadow-[0_0_100px_rgba(19,88,84,0.7)]"></div>
      <div className="absolute -top-11 -left-10 w-96 h-96 bg-[#341a60] rounded-full mix-blend-screen opacity-15 animate-color-mix-wave shadow-[0_0_120px_rgba(52,26,96,0.6)]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-64 bg-[#490c66] rounded-full mix-blend-screen opacity-35 animate-color-mix-wave shadow-[0_0_100px_rgba(73,12,102,0.7)]"></div>

      <h1 className="text-3xl font-extrabold bg-gradient-to-br from-[#3786d5] to-[#126750] text-transparent [-webkit-background-clip:text] tracking-wider absolute top-20 left-0 right-0 text-center z-10">
        Register Your Institution
      </h1>

      {/* Form */}
      <div
        className="flex items-center justify-center min-h-screen bg-gray-900"
        style={{
          backgroundImage: "linear-gradient(155deg,#081a29 40%, #053435 100%)",
        }}
      >
        <div
          className="flex items-center justify-center border border-gray-400 rounded-3xl shadow-xl p-8 m-4 max-w-lg w-full mt-28"
          style={{
            backgroundImage: "linear-gradient(155deg,#081a29 2%, #1f435f 80%)",
          }}
        >
          <div className="w-full max-w-screen-sm space-y-4">
            <h2 className="text-2xl font-bold text-center tracking-wider text-gray-200">
              Institution Registration
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <InputField
                id="institutionname"
                value={institutionname}
                onChange={(e) => setInstitutionName(e.target.value)}
                placeholder="Institution Name"
                icon={School}
              />

              <InputField
                id="adminusername"
                value={adminusername}
                onChange={(e) => setAdminUserName(e.target.value)}
                placeholder="Admin User Name"
                icon={User}
              />

              <InputField
                id="adminpassword"
                value={adminpassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Admin Password"
                icon={Lock}
                type="password"
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />

              {/* BUTTON WITH LOADER */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 mt-10 py-3 text-xl font-bold text-gray-200 
                bg-gradient-to-r from-[#3786d5] to-[#255e8c] rounded-full
                hover:from-[#255e8c] hover:to-[#3786d5]
                transition duration-500 ease-in-out shadow-2xl tracking-wider
                focus:outline-none focus:ring-4 focus:ring-[#3786d5] focus:ring-opacity-80
                transform hover:scale-[1.01]"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  "Register"
                )}
              </button>
               <div className="text-center mt-4">
    <p className="text-gray-400 text-sm">
      Already have an account{" "}
      <a
        href="/login"
        className="text-[#3786d5] font-semibold hover:underline hover:text-[#4aa3ff] transition"
      >
        Go to Login
      </a>
    </p>
  </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      <SuccessModal
        result={result}
        onClose={() => {
          setResult(null);
          window.location.href = "/login";
        }}
      />

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out }

        @keyframes scaleIn {
          0% { transform: scale(0.7); opacity: 0 }
          100% { transform: scale(1); opacity: 1 }
        }
        .animate-scaleIn { animation: scaleIn 0.35s ease-out }
      `}</style>
    </section>
  );
};

export default InstitutionRegister;
