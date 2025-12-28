import { useState, useEffect, useCallback, useMemo } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/footer";
// import DisplayDataPage from "./DisplayDataPage/DisplayDataPage";
import FormDataPage from "./FormDataPage/FormDataPage";
import XlsPdfFlow from "./xlsToPDF";
import PayslipGenerator from "./Pages/PayslipGenerator";
const Dashboard = () => {


  return (
    <div >
    <Header/>
   <PayslipGenerator/>
    <Footer/>
    </div>
  );
};

export default Dashboard;
