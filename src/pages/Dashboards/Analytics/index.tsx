import React from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import BreadCrumb from 'Common/BreadCrumb';
import Widgets from './Widgets';
import EmployeePerformance from './EmployeePerformance';
import UpcomingScheduled from './UpcomingScheduled';
import TotalProjects from './TotalProjects';
import UpcomingInterview from './UpcomingInterview';
import RecentPayroll from './RecentPayroll';
import Dashboard from "./Dashboard"
import Ayam from "./Ayam"
import MortalitasChart from './Mortality';
import FCRChart from './FCR'
import useIdleLogout from "hooks/useIdleLogout";
import Spido from "./Spido"
const HRDashboard = () => {
useIdleLogout();
    return (
        <React.Fragment>
            <div className="grid grid-cols-12 2xl:grid-cols-12 gap-x-2 pt-2">
                        {/* Empty rows for spacing */}
        {/* <div className="mb-200"></div>
        <div className="mb-200"></div>
        <div className="mb-200"></div>
        <div className="mb-200"></div>
        <div className="mb-200"></div>
        <div className="mb-200"></div>
        <div className="mb-200"></div>
        <div className="mb-200"></div>
        <div className="mb-200"></div>
        <div className="mb-200"></div> */}
                <Ayam/>
                <div className="mb-200"></div>
                <div className="mb-200"></div>
                <div className="mb-200"></div>
                <MortalitasChart/>
                <FCRChart/>
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
