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

import Spido from "./Spido"
const HRDashboard = () => {

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
                <Spido/>
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
