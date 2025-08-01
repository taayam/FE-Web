import React from 'react';
import BreadCrumb from 'Common/BreadCrumb';
import Widgets from './Widgets';
import VideoPlayer from './Video'
import Historis from './Historical';
import Dashboard from "./Dashboard";
import Spido from "./Spido"
import useIdleLogout from "hooks/useIdleLogout";
const Analytics = () => {
useIdleLogout();
  return (
    <React.Fragment>
      {/* <BreadCrumb title='Dashboard' pageTitle='Dashboards' /> */}
      <div className="grid grid-cols-12 gap-x-2">
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
        {/* <Widgets /> */}
        {/* <Dashboard/> */}
        {/* <VideoPlayer /> */}
        <Spido/>
        {/* <Historis /> */}

      </div>
    </React.Fragment>
  );
};


export default Analytics;
