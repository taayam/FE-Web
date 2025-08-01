import React from 'react';
import { BiogasProductionChart } from './Charts'; // Assuming you have a chart component for biogas production
import CountUp from 'react-countup';
import ApplicationReceived from './ApplicationReceived'; // Assuming this component is relevant

const Widgets = () => {
    return (
        <React.Fragment>
            <div className="col-span-12 md:order-3 lg:col-span-6 2xl:col-span-3 card">
                <div className="card-body">
                    <div className="grid grid-cols-12">
                        <div className="col-span-8 md:col-span-9">
                            <p className="text-slate-500 dark:text-slate-200">Total Biogas Produced</p>
                            <h5 className="mt-3 mb-4">
                                <CountUp end={1000} className="counter-value" /> <span className="text-slate-500 dark:text-slate-200">kg</span>
                            </h5>
                        </div>
                        <div className="col-span-4 md:col-span-3">
                            <BiogasProductionChart chartId="biogasProduction" dataChartColor='["bg-green-500"]' series={[50]} />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                        <p className="text-slate-500 dark:text-slate-200 grow"><span className="font-medium text-green-500">15%</span> Increase</p>
                        <p className="text-slate-500 dark:text-slate-200">This Month</p>
                    </div>
                </div>
            </div>
            <div className="col-span-12 md:order-4 lg:col-span-6 2xl:col-span-3 card">
                <div className="card-body">
                    <div className="grid grid-cols-12">
                        <div className="col-span-8 md:col-span-9">
                            <p className="text-slate-500 dark:text-slate-200">Electricity Generated</p>
                            <h5 className="mt-3 mb-4">  <CountUp end={500} className="counter-value" /> <span className="text-slate-500 dark:text-slate-200">kWh</span></h5>
                        </div>
                        <div className="col-span-4 md:col-span-3">
                            <BiogasProductionChart chartId="electricityGenerated" dataChartColor='["bg-yellow-500"]' series={[75]} />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                        <p className="text-slate-500 dark:text-slate-200 grow"><span className="font-medium text-green-500">26%</span> Increase</p>
                        <p className="text-slate-500 dark:text-slate-200">This Month</p>
                    </div>
                </div>
            </div>

            <ApplicationReceived />

            <div className="col-span-12 md:order-5 2xl:order-6 lg:col-span-6 2xl:col-span-3 card">
                <div className="card-body">
                    <div className="grid grid-cols-12">
                        <div className="col-span-8 md:col-span-9">
                            <p className="text-slate-500 dark:text-slate-200">Carbon Footprint Reduction</p>
                            <h5 className="mt-3 mb-4"> <CountUp end={20} className="counter-value" /> <span className="text-slate-500 dark:text-slate-200">%</span></h5>
                        </div>
                        <div className="col-span-4 md:col-span-3">
                            <BiogasProductionChart chartId="carbonFootprintReduction" dataChartColor='["bg-blue-500"]' series={[30]} />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                        <p className="text-slate-500 dark:text-slate-200 grow"><span className="font-medium text-green-500">05%</span> Increase</p>
                        <p className="text-slate-500 dark:text-slate-200">This Month</p>
                    </div>
                </div>
            </div>
            <div className="col-span-12 md:order-6 2xl:order-7 lg:col-span-6 2xl:col-span-3 card">
                <div className="card-body">
                    <div className="grid grid-cols-12">
                        <div className="col-span-8 md:col-span-9">
                            <p className="text-slate-500 dark:text-slate-200">Chicken Waste Utilized</p>
                            <h5 className="mt-3 mb-4"><CountUp end={95} className="counter-value" /> <span className="text-slate-500 dark:text-slate-200">%</span></h5>
                        </div>
                        <div className="col-span-4 md:col-span-3">
                            <BiogasProductionChart chartId="chickenWasteUtilized" dataChartColor='["bg-purple-500"]' series={[80]} />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                        <p className="text-slate-500 dark:text-slate-200 grow"><span className="font-medium text-green-500">16%</span> Increase</p>
                        <p className="text-slate-500 dark:text-slate-200">This Month</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Widgets;
