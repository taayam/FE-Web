import React from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import BreadCrumb from 'Common/BreadCrumb';
import useIdleLogout from "hooks/useIdleLogout";


import Spido from "./Spido"
const HRDashboard = () => {
useIdleLogout();
    return (
        <React.Fragment>
            <div className="grid grid-cols-12 2xl:grid-cols-12 gap-x-5">
                        {/* Empty rows for spacing */}
        <div className="mb-200"></div>
        <div className="mb-200"></div>
        <div className="mb-200"></div>
        <div className="mb-200"></div>
        <div className="mb-200"></div>
        <div className="mb-200"></div>
        <div className="mb-200"></div>
        <div className="mb-200"></div>
        <div className="mb-200"></div>
        <div className="mb-200"></div>
                {/* <Ayam/> */}
                {/* <App/> */}
                {/* <Dashboard/>
                <Widgets/>
                <EmployeePerformance/>
                <UpcomingScheduled/>
                <TotalProjects/>
                <RecentPayroll/> */}
                <Spido/>
            </div>
        </React.Fragment>
    );
};

export default HRDashboard;
