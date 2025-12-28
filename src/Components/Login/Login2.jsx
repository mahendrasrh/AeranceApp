 import React from "react";
import { Lock, User, School, Eye, EyeOff } from "lucide-react";
 import BACKGROUND_IMAGE from '../../Assets/Logo/bgim2.jpg';
 const Login2 = () => {
  const [schoolname, setschoolname] = React.useState("");
  const [operatername, setoperatername] = React.useState("");
     const [password, setPassword] = React.useState("");
const [showPassword, setShowPassword] = React.useState(false);
   const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Logging in with:', { schoolname, operatername, password });
 
   };

   return (
      <section 
      className="relative min-h-screen w-full overflow-hidden bg-cover bg-no-repeat bg-center flex items-center justify-center" 
      style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }} >
      
     <h1 className="text-3xl font-extrabold text-gray-200 tracking-wider absolute top-20 mx-auto left-0 right-0 text-center z-20">
         Welcome to E-Studios
       </h1>
       
   <div className="relative z-30 flex items-center justify-center min-h-screen w-full">
      
    
   
  <div className="flex items-center justify-center  bg-gray-900 border border-gray-400 rounded-3xl shadow-xl p-8 m-4 max-w-lg w-full mt-28" 
  style={{ backgroundImage: "linear-gradient(155deg,#AFEEEE 1%,#000C40 10%)"}}>

  
  
   <div className="w-full max-w-screen-sm  space-y-4 opacity-100">
 
  <h2 className="text-2xl font-bold text-center  tracking-wider text-gray-200 ">
   User Login
  </h2>
 {/* bg-gradient-to-r from-[#AFEEEE] to-[#000C40] */}
 
  <form className="space-y-6" onSubmit={handleSubmit}>
  
 
   <div className="relative">
  <input
   type="text"
   id="schoolname"
   placeholder="School Name"
   value={schoolname}
   onChange={(e) => setschoolname(e.target.value)}
   required
   className="w-full p-2 pl-14 text-sm text-gray-400 bg-gray-400 bg-opacity-50 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-300 placeholder-gray-400 shadow-xl"
  
   style={{ 
  height: "3.5rem", 
  backgroundColor: "#191a29"
   }}
  />

  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-[#ffffff] opacity-80">
   <School size={24} />
  </div>
   </div>
   <div className="relative">
  <input
   type="text"
   id="operatername"
   placeholder="Operater Name"
   value={operatername}
   onChange={(e) => setoperatername(e.target.value)}
   required
   className="w-full p-2 pl-14 text-sm text-gray-400 bg-white bg-opacity-50 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-300 placeholder-gray-400 shadow-xl"
  
   style={{ 
  height: "3.5rem", 
  backgroundColor: "#191a29"
   }}
  />

  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-[#ffffff] opacity-80">
   <User size={24} />
  </div>
   </div>

   <div className="relative">
 
   <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#ffffff] opacity-80 pointer-events-none">
     <Lock size={24} />
   </div>

 
   <input
     type={showPassword ? "text" : "password"}
     id="password"
     placeholder="Password"
     value={password}
     onChange={(e) => setPassword(e.target.value)}
     required
     className="w-full p-2 pl-14 pr-14 text-sm text-gray-200 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 placeholder-gray-400 shadow-xl"
     style={{
       height: "3.5rem",
       backgroundColor: "#191a29",
     }}
   />

  
   <button
     type="button"
     onClick={() => setShowPassword(!showPassword)}
     className="absolute inset-y-0 right-4 flex items-center text-[#ffffff] opacity-80 hover:opacity-100 transition"
   >
     {showPassword ? <EyeOff size={22} /> : <Eye size={22} className="text-[#ffffff]" />}
   </button>
 </div>

 
   <button
  type="submit"
 className="w-full h-16 mt-10 py-3 text-xl font-bold text-gray-200 bg-gradient-to-r from-[#3786d5] to-[#255e8c] rounded-full hover:from-[#255e8c] hover:to-[#3786d5] transition duration-500 ease-in-out shadow-2xl tracking-wider focus:outline-none focus:ring-4 focus:ring-[#3786d5] focus:ring-opacity-80 transform hover:scale-[1.01]"
   >
  LogIn
   </button>
  </form>
   </div>
  </div>
  </div>
  </section>
   );
 };

 export default Login2;