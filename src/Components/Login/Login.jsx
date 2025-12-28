import React from "react";
import { Lock, User, School, Eye, EyeOff, Loader2 } from "lucide-react";
import { loginUser } from "../Services/apiService";
import {toast,Toaster }  from "react-hot-toast";

const Login = () => {
  const [tenantId, setTenantId] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [shake, setShake] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username,
      password,
      tenant_id: tenantId,
    };

    try {
      setLoading(true);

      const result = await loginUser(payload);

      // Save login data
      localStorage.setItem("token", result.token);
      localStorage.setItem("role", result.role);
      localStorage.setItem("tenant_id", result.tenant_id);
      localStorage.setItem("username", result.username);

      window.location.href = "/employee-information";

    } catch (error) {
      console.error("Login error:", error);

      // 🔥 Show toast error
      toast.error(error.response?.data?.message || "Invalid username or password!");

      // 🔥 Trigger shake animation
      setShake(true);
      setTimeout(() => setShake(false), 400);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      {/* Background Effects & Title are unchanged */}

      <div
        className="flex items-center justify-center min-h-screen bg-gray-900"
        style={{ backgroundImage: "linear-gradient(155deg,#081a29 40%, #053435 100%)" }}
      >
        <div
          className={`flex items-center justify-center bg-gray-900 border border-gray-400 rounded-3xl shadow-xl p-8 m-4 max-w-lg w-full mt-28 
            ${shake ? "shake" : ""}  // Apply shake class
          `}
          style={{ backgroundImage: "linear-gradient(155deg,#081a29 2%, #1f435f 80%)" }}
        >
          <div className="w-full max-w-screen-sm space-y-4 opacity-100">
            <h2 className="text-2xl font-bold text-center tracking-wider text-gray-200">
              Login
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>

              {/* Tenant ID */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tenant ID"
                  value={tenantId}
                  onChange={(e) => setTenantId(e.target.value)}
                  required
                  className="w-full p-2 pl-14 text-sm text-gray-300 border border-transparent rounded-full shadow-xl"
                  style={{ height: "3.5rem", backgroundColor: "#0c1a25" }}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#3786d5]">
                  <School size={24} />
                </div>
              </div>

              {/* Username */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full p-2 pl-14 text-sm text-gray-300 border border-transparent rounded-full shadow-xl"
                  style={{ height: "3.5rem", backgroundColor: "#0c1a25" }}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#3786d5]">
                  <User size={24} />
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#3786d5]">
                  <Lock size={24} />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 pl-14 pr-14 text-sm text-gray-200 border border-transparent rounded-full shadow-xl"
                  style={{ height: "3.5rem", backgroundColor: "#0c1a25" }}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-[#3786d5]"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full h-12 mt-10 text-xl font-bold text-gray-200 rounded-full transition duration-500 shadow-2xl 
                  ${loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#3786d5] to-[#255e8c] hover:scale-[1.01]"
                  }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <Loader2 className="animate-spin" size={24} />
                    Logging In...
                  </div>
                ) : (
                  "Log In"
                )}
              </button>

              {/* Register */}
              <div className="text-center mt-4">
                <p className="text-gray-400 text-sm">
                  Don't have an account?{" "}
                  <a
                    href="/institution-register"
                    className="text-[#3786d5] font-semibold hover:underline"
                  >
                    Register for Institution
                  </a>
                </p>
              </div>

            </form>

          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default Login;
