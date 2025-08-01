import React from 'react';
import BreadCrumb from 'Common/BreadCrumb';
import Forensik from './Forensik';
import useIdleLogout from "hooks/useIdleLogout";
const EmailDashboard = () => {
useIdleLogout();
    return (
        <React.Fragment>
            {/* <BreadCrumb title='Historical Data' pageTitle='Dashboards' /> */}
            <div className="grid grid-cols-12 2xl:grid-cols-12 gap-x-2">
                {/* <DataHistoris /> */}
                <Forensik />
            </div>
        </React.Fragment>
    );
};

export default EmailDashboard;
