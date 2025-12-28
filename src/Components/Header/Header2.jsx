import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header2 = () => {
  const navigate = useNavigate();
    const navigateToFormDataPage2 = () => {
    navigate('/form-data2');
  } 
  

  const navigateToDisplayDataPage2 = () => {
   navigate('/display-data2');
  }

  
 
return (

<header 
className=" bg-gradient-to-r from-[#0f172a] via-[#334155] to-[#0f172a]
 text-white shadow-lg p-4 sticky top-0 z-10">

<div className=" text-lg font-bold tracking-wider cursor-pointer">
 
 <button 
 onClick={navigateToFormDataPage2}
  className=" w-96 py-2  mx-44  font-bold text-gray-200
  bg-gradient-to-r from-[#0f172a] via-[#0a2b4a] to-[#334155] rounded-full hover:from-[#0a2b4a]  hover:to-[#0f172a] 
  transition duration-500 ease-in-out shadow-2xl tracking-wider focus:outline-none 
  focus:ring-opacity-80 transform hover:scale-[1.07]">
Form Data Page
</button>

 <button onClick={navigateToDisplayDataPage2}
 className="w-96 py-2  mx-44 mt-3 font-bold text-gray-200 
bg-gradient-to-r from-[#0f172a] via-[#0a2b4a] to-[#334155] rounded-full hover:from-[#0a2b4a]  hover:to-[#0f172a] 
transition duration-500 ease-in-out shadow-2xl tracking-wider focus:outline-none 
focus:ring-opacity-80 transform hover:scale-[1.07]">

 Display Data Page
</button>
</div>

</header>

);
};

export default Header2;
