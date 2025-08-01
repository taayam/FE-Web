import React from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import BreadCrumb from 'Common/BreadCrumb';
import useIdleLogout from "hooks/useIdleLogout";
import Historical from "./Historical"
const HRDashboard = () => {
useIdleLogout();
    return (
        <React.Fragment>
            <div className="grid grid-cols-12 2xl:grid-cols-12 gap-x-5">
                        {/* Empty rows for spacing */}
                     <Historical/>   
                {/* <Ayam/> */}
                {/* <Spido/> */}
                {/* <Dashboard/>
                <Widgets/>
                <EmployeePerformance/>
                <UpcomingScheduled/>
                <TotalProjects/>
                <RecentPayroll/> */}

            </div>
        </React.Fragment>
    );
};

export default HRDashboard;
