import React, { useEffect } from 'react';
import BreadCrumb from 'Common/BreadCrumb';
import Actuator from './Actuator';
import { useNavigate } from 'react-router-dom';
import Dashboard from './filter';
import useIdleLogout from "hooks/useIdleLogout";
const Ecommerce = () => {
useIdleLogout();
    const navigate = useNavigate();
    useEffect(() => navigate("/dashboards-automatic"), [navigate]);

    return (
        <React.Fragment>
            {/* <BreadCrumb title='All Automatic' pageTitle='Automatic' /> */}
            <div className="grid grid-cols-12 2xl:grid-cols-12 gap-x-2 pt-2">
                {/*<WelcomeWidget />*/}
                
                <Actuator />
                {/* <Dashboard /> */}
                {/* <Widgets /> */}

                {/* <ScheduledFeed/>
                <UpcomingFeed /> */}
{/* 
                <TrafficResources />
                <OrderStatistics /> */}

{/* 
                <ProductsOrders /> */}
            </div>
        </React.Fragment>
    );
};

export default Ecommerce;
