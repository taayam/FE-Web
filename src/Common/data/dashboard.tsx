import {
    Activity,
    CloudRain,
    Goal,
    MousePointerClick,
    MousePointerSquare,
    Rocket,
    Scale,
    Thermometer
} from 'lucide-react';
import { ReactElement } from 'react';

// Images
import avatar1 from "assets/images/users/avatar-1.png";
import avatar2 from "assets/images/users/avatar-2.png";
import avatar3 from "assets/images/users/avatar-3.png";
import avatar4 from "assets/images/users/avatar-4.png";
import avatar5 from "assets/images/users/avatar-5.png";
import avatar6 from "assets/images/users/avatar-6.png";
import avatar7 from "assets/images/users/avatar-7.png";
import avatar8 from "assets/images/users/avatar-8.png";
import avatar9 from "assets/images/users/avatar-9.png";
import avatar10 from "assets/images/users/avatar-10.png";

import company from "assets/images/small/img-3.jpg"
import User1 from "assets/images/users/user-1.jpg";
import User2 from "assets/images/users/user-2.jpg";
import User3 from "assets/images/users/user-3.jpg";

import appStore from "assets/images/brand/app-store.png";
import telegram from "assets/images/brand/telegram.png";
import android from "assets/images/brand/android.png";
import slack from "assets/images/brand/slack.png";

const ProductsStatisticsData = [
    {
        id: "productsCheck1",
        productName: "SmartTech Pro-4K Ultra HD TV",
        price: "$1,542.99",
        income: "$12.36k",
        sales: "3,217",
        view: "21,451",
        click: "16,287",
        clickPercentage: "39.56%",
        status: "Active"
    },
    {
        id: "productsCheck2",
        productName: "LuxeLeather Vintage Messenger Bag",
        price: "$699.99",
        income: "$22.88k",
        sales: "7,321",
        view: "32,151",
        click: "27,485",
        clickPercentage: "87.33%",
        status: "Active"
    },
    {
        id: "productsCheck3",
        productName: "InfinityGlow LED Desk Lamp",
        price: "$324.77",
        income: "$21.10k",
        sales: "8,245",
        view: "33,415",
        click: "25,430",
        clickPercentage: "91.43%",
        status: "Unactive"
    },
    {
        id: "productsCheck4",
        productName: "PowerPulse Wireless Earbuds",
        price: "$99.00",
        income: "$374",
        sales: "2,987",
        view: "41,123",
        click: "46,963",
        clickPercentage: "79.21%",
        status: "Active"
    },
    {
        id: "productsCheck5",
        productName: "AdventureQuest Outdoor Backpack",
        price: "$107.00",
        income: "$8.22",
        sales: "2,541",
        view: "14,789",
        click: "12,584",
        clickPercentage: "39.04%",
        status: "Unactive"
    },
    {
        id: "productsCheck6",
        productName: "FitLifePro Fitness Tracker",
        price: "$111.99",
        income: "$42.2k",
        sales: "44,201",
        view: "40,888",
        click: "14,520",
        clickPercentage: "68.41%",
        status: "Active"
    },
    {
        id: "productsCheck7",
        productName: "ChefMaster Pro Cookware Set",
        price: "$107.00",
        income: "$8.22",
        sales: "2,541",
        view: "14,789",
        click: "12,584",
        clickPercentage: "39.04%",
        status: "Unactive"
    },
    {
        id: "productsCheck8",
        productName: "PetPalace Pet Accessories",
        price: "$1,542.99",
        income: "$12.36k",
        sales: "3,217",
        view: "21,451",
        click: "16,287",
        clickPercentage: "39.56%",
        status: "Active"
    },
    {
        id: "productsCheck9",
        productName: "MusicMuse Premium Headphones",
        price: "$99.00",
        income: "$374",
        sales: "2,987",
        view: "41,123",
        click: "46,963",
        clickPercentage: "79.21%",
        status: "Active"
    },
    {
        id: "productsCheck9",
        productName: "WellnessWonders Yoga Mat",
        price: "$324.77",
        income: "$21.10k",
        sales: "8,245",
        view: "33,415",
        click: "25,430",
        clickPercentage: "91.43%",
        status: "Unactive"
    },
    {
        id: "productsCheck10",
        productName: "SmartTech Pro-4K Ultra HD TV",
        price: "$1,542.99",
        income: "$12.36k",
        sales: "3,217",
        view: "21,451",
        click: "16,287",
        clickPercentage: "39.56%",
        status: "Active"
    },
    {
        id: "productsCheck11",
        productName: "LuxeLeather Vintage Messenger Bag",
        price: "$699.99",
        income: "$22.88k",
        sales: "7,321",
        view: "32,151",
        click: "27,485",
        clickPercentage: "87.33%",
        status: "Active"
    },
];

const ProductOrdersData = [
    {
        id: "01",
        orderId: "#TWT5015100365",
        customerName: "Marie Prohaska",
        location: "Germany",
        orderDate: "08 Jun, 2023",
        payments: "Credit Card",
        quantity: "05",
        price: "$146.99",
        totalAmount: "$749.95",
        status: "Delivered"
    },
    {
        id: "02",
        orderId: "#TWT5015100366",
        customerName: "Jaqueline Hammes",
        location: "France",
        orderDate: "11 July, 2023",
        payments: "Paypal",
        quantity: "02",
        price: "$450.00",
        totalAmount: "$900.00",
        status: "Shipping"
    },
    {
        id: "03",
        orderId: "#TWT5015100367",
        customerName: "Marlene Hirthe",
        location: "Argentina",
        orderDate: "21 Aug, 2023",
        payments: "Visa Card",
        quantity: "03",
        price: "$147.23",
        totalAmount: "$294.46",
        status: "New"
    },
    {
        id: "04",
        orderId: "#TWT5015100368",
        customerName: "Reagan Larson",
        location: "Belgium",
        orderDate: "28 Nov, 2023",
        payments: "American Express",
        quantity: "01",
        price: "$579.12",
        totalAmount: "$579.12",
        status: "Delivered"
    },
    {
        id: "05",
        orderId: "#TWT5015100369",
        customerName: "Glennie Langosh",
        location: "Australia",
        orderDate: "11 Oct, 2023",
        payments: "American Express",
        quantity: "01",
        price: "$349.00",
        totalAmount: "$349.00",
        status: "Pending"
    },
    {
        id: "06",
        orderId: "#TWT5015100370",
        customerName: "Rickie Cremin",
        location: "United States",
        orderDate: "16 Feb, 2023",
        payments: "COD",
        quantity: "03",
        price: "$89.49",
        totalAmount: "$268.47",
        status: "Delivered"
    },
    {
        id: "07",
        orderId: "#TWT5015100371",
        customerName: "Domenic Tromp",
        location: "Afghanistan",
        orderDate: "21 Jan, 2024",
        payments: "PayPal",
        quantity: "02",
        price: "$739.79",
        totalAmount: "$1,479.58",
        status: "New"
    },

];
const MaintenanceData = [
    {
        id: "01",
        equipmentName: "Chicken Feeder 1",
        lastMaintained: "01 Jan, 2023",
        nextMaintenanceDue: "01 Jan, 2025",
        predictedIssue: "Motor wear",
        status: "Warning"
    },
    {
        id: "02",
        equipmentName: "Water System 2",
        lastMaintained: "15 Mar, 2023",
        nextMaintenanceDue: "15 Mar, 2026",
        predictedIssue: "Pipe clogging",
        status: "Normal"
    },
    {
        id: "03",
        equipmentName: "Climate Control 1",
        lastMaintained: "10 May, 2023",
        nextMaintenanceDue: "10 May, 2024",
        predictedIssue: "Filter replacement",
        status: "Critical"
    },
    {
        id: "04",
        equipmentName: "Lighting System 3",
        lastMaintained: "20 Jul, 2023",
        nextMaintenanceDue: "20 Jul, 2025",
        predictedIssue: "Bulb burnout",
        status: "Normal"
    },
    {
        id: "05",
        equipmentName: "Feed Mixer 2",
        lastMaintained: "25 Feb, 2023",
        nextMaintenanceDue: "25 Feb, 2025",
        predictedIssue: "Blade dulling",
        status: "Warning"
    }
];

type WidgetData = {
    id: number;
    icon: ReactElement;
    price: number;
    name: string;
    description: string;
    chartId: string;
    chartColor: string; // Assuming that 'chartColor' is a string representing a CSS class
    decimals: number;
    suffix: string;
    series: {
        name: string;
        data: number[];
    }[];
};

//Dashboard Email
const widgetsData = [
    {
        id: 1,
        icon: <Thermometer className="inline-block size-4 ltr:mr-1 rtl:ml-1" />,
        price: 23.5,
        name: "Temperature",
        description: "Average Temperature (°C)",
        chartId: "temperatureMetric",
        chartColor: '["bg-red-500"]',
        decimals: 1,
        suffix: '°C',
        series: [{
            name: 'Temperature',
            data: [
                22, 23, 24, 25, 24, 23, 22, 23.5, 24.2, 23.8, 24, 23.5, 23
            ]
        }],
    },
    {
        id: 2,
        icon: <CloudRain className="inline-block size-4 ltr:mr-1 rtl:ml-1" />,
        price: 65,
        name: "Humidity",
        description: "Average Humidity (%)",
        chartId: "humidityMetric",
        chartColor: '["bg-blue-500"]',
        decimals: 0,
        suffix: '%',
        series: [{
            name: 'Humidity',
            data: [
                63, 64, 65, 66, 67, 68, 65, 64, 66, 67, 66, 65, 64
            ]
        }],
    },
    {
        id: 3,
        icon: <Activity className="inline-block size-4 ltr:mr-1 rtl:ml-1" />,
        price: 95,
        name: "Air Quality",
        description: "Air Quality Index (AQI)",
        chartId: "airQualityMetric",
        chartColor: '["bg-green-500"]',
        decimals: 0,
        suffix: 'AQI',
        series: [{
            name: 'Air Quality',
            data: [
                92, 94, 93, 95, 96, 94, 93, 92, 91, 95, 93, 94, 95
            ]
        }],
    },
    {
        id: 4,
        icon: <Scale className="inline-block size-4 ltr:mr-1 rtl:ml-1" />,
        price: 120,
        name: "Feed Distribution",
        description: "Feed (kg/day)",
        decimals: 0,
        suffix: 'kg',
        chartId: "feedDistributionMetric",
        chartColor: '["bg-yellow-500"]',
        series: [{
            name: 'Feed Distribution',
            data: [
                115, 120, 118, 119, 121, 122, 123, 124, 121, 120, 122, 123, 124
            ]
        }],
    },
];


const widgetsData2 = [
    {
        id: 1,
        title: "Optimal Temperature Rate",
        percentage: 98,
        chartId: "optimalTempRate",
        dataChartColor: '["bg-green-500"]',
        series: [{
            name: 'Optimal Temperature Rate',
            data: [
                95, 96, 98, 97, 96, 98, 97, 96, 95, 96, 97, 98, 98
            ]
        }],
    },
    {
        id: 2,
        title: "Humidity Stability Rate",
        percentage: 87,
        chartId: "humidityStabilityRate",
        dataChartColor: '["bg-blue-500"]',
        series: [{
            name: 'Humidity Stability Rate',
            data: [
                85, 87, 86, 88, 89, 87, 86, 87, 88, 87, 88, 87, 86
            ]
        }],
    },
    {
        id: 3,
        title: "Air Quality Consistency",
        percentage: 90,
        chartId: "airQualityConsistencyRate",
        dataChartColor: '["bg-purple-500"]',
        series: [{
            name: 'Air Quality Consistency',
            data: [
                88, 89, 90, 91, 90, 89, 91, 90, 89, 91, 90, 89, 90
            ]
        }],
    },
    {
        id: 4,
        title: "Feed Distribution Accuracy",
        percentage: 94.5,
        decimals: 1,
        chartId: "feedDistributionAccuracyRate",
        dataChartColor: '["bg-yellow-500"]',
        series: [{
            name: 'Feed Distribution Accuracy',
            data: [
                92, 93, 94, 95, 96, 94, 95, 94, 95, 94, 93, 94, 95
            ]
        }],
    },
];


// Dashboard HR
const EmployeePerformanceData = [
    {
        id: 1,
        employeeId: "TW-1001",
        img: avatar10,
        checkboxId: "productsCheck1",
        name: "Kristen Redden",
        email: "kredden@bimoo.com",
        designation: "Designer",
        performance: "Good",
        isActive: true
    },
    {
        id: 2,
        employeeId: "TW-1002",
        img: avatar2,
        checkboxId: "productsCheck2",
        name: "Howard George",
        email: "george@bimoo.com",
        designation: "ASP.Net Developer",
        performance: "Low",
        isActive: true
    },
    {
        id: 3,
        employeeId: "TW-1003",
        img: avatar3,
        checkboxId: "productsCheck3",
        name: "Laura Carlson",
        email: "carlson15@bimoo.com",
        designation: "React Developer",
        performance: "Good",
        isActive: true
    },
    {
        id: 4,
        employeeId: "TW-1004",
        img: avatar4,
        checkboxId: "productsCheck4",
        name: "Joseph Hawkins",
        email: "joseph@bimoo.com",
        designation: "Angular Developer",
        performance: "Good",
        isActive: false
    },
    {
        id: 5,
        employeeId: "TW-1005",
        img: avatar5,
        checkboxId: "productsCheck5",
        name: "Jeremy Clifford",
        email: "joseph@bimoo.com",
        designation: "UI / UX Designer",
        performance: "Low",
        isActive: false
    }
];
const GreenEnergyData:any = [
    {
        id: 1,
        farmId: "GF-1001",
        img: company,
        farmName: "Green Farm",
        location: "City, Country",
        biogasProduction: "1000 kg",
        energyGenerated: "50 kWh",
        isActive: true
    },

];
const RecentPayrollData = [
    {
        id: 1,
        icon: "move-up-right",
        name: "Christopher Horn",
        amount: "$145.32",
        status: "Paid"
    },
    {
        id: 2,
        icon: "move-down-left",
        name: "Richard Peters",
        amount: "$4512.99",
        status: "Pending"
    },
    {
        id: 3,
        icon: "move-down-left",
        name: "James Perez",
        amount: "$879.99",
        status: "Paid"
    },
    {
        id: 4,
        icon: "move-up-right",
        name: "Myrtle Velez",
        amount: "$978.14",
        status: "Cancelled"
    },
    {
        id: 5,
        icon: "move-down-left",
        name: "Brad Castillo",
        amount: "$412.59",
        status: "Pending"
    },
    {
        id: 6,
        icon: "move-down-left",
        name: "Robert Jump",
        amount: "$666.99",
        status: "Paid"
    },
    {
        id: 7,
        icon: "move-up-right",
        name: "Myrtle Velez",
        amount: "$978.14",
        status: "Cancelled"
    },
    {
        id: 8,
        icon: "move-up-right",
        name: "Christopher Horn",
        amount: "$145.32",
        status: "Paid"
    },
    {
        id: 9,
        icon: "move-down-left",
        name: "Richard Peters",
        amount: "$4512.99",
        status: "Pending"
    },
    {
        id: 10,
        icon: "move-down-left",
        name: "James Perez",
        amount: "$879.99",
        status: "Paid"
    }
];

const UpcomingInterviewData = [
    {
        id: 1,
        name: "James Krogman",
        email: "james@bimoo.com",
        image: User1,
        date: "25 Nov",
        time: "02:41 PM",
        status: "Confirm"
    },
    {
        id: 2,
        name: "Michael Scott",
        email: "michaelScott@bimoo.com",
        image: User2,
        date: "05 Dec",
        time: "01:23 PM",
        status: "Re-scheduled"
    },
    {
        id: 3,
        name: "Denise Ledford",
        email: "ledford@bimoo.com",
        image: User3,
        date: "27 Nov",
        time: "11:59 PM",
        status: "Scheduled"
    },
    {
        id: 4,
        name: "Gladys Smith",
        email: "gap-4@bimoo.com",
        image: avatar5,
        date: "07 Dec",
        time: "05:19 PM",
        status: "Cancelled"
    }
];

const UpcomingScheduledData = [
    {
        id: 1,
        date: "Tmrw",
        month: "Ev Day",
        title: "Schedule Chicken Feeding",
        time: "06:00 PM",
        createdBy: "Automatic System"
    },
    {
        id: 2,
        date: "01",
        month: "Jun",
        title: "Chicken Water will run out ",
        time: "09:57 AM",
        createdBy: "System"
    },
    {
        id: 3,
        date: "03",
        month: "Sep",
        title: "Chicken Food will run out",
        time: "10:54 AM",
        createdBy: "System"
    },
    {
        id: 4,
        date: "11",
        month: "Nov",
        title: "Schedule Egg Collection",
        createdBy: "Automatic System"
    },
    {
        id: 5,
        date: "20",
        month: "Nov",
        title: "Schedule Lamp Maintenence",
        time: "03:49 PM",
        createdBy: "Automatic System"
    },
];

// Dashborad Social Media
const activeFriendsData = [avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10, avatar10, avatar9, avatar4, avatar5, avatar1];

const storyData = [
    { id: 1, image: avatar1, username: "Your story", bgColor: "bg-pink-100 dark:bg-pink-500/20", isActive: true },
    { id: 2, image: avatar2, username: "@zaria_muller", bgColor: "bg-sky-100 dark:bg-sky-500/20", isActive: true },
    { id: 3, image: avatar3, username: "@christina", bgColor: "bg-slate-100 dark:bg-zink-600", isActive: true },
    { id: 4, image: avatar4, username: "@blaze_herzog", bgColor: "bg-yellow-100 dark:bg-yellow-500/20", isActive: true },
    { id: 5, image: avatar5, username: "@keon_rippin", bgColor: "bg-emerald-100 dark:bg-emerald-500/20", isActive: true },
    { id: 6, image: avatar6, username: "@niko_watsica", bgColor: "bg-purple-100 dark:bg-purple-500/20", isActive: true },
    { id: 7, image: avatar7, username: "@genesis", bgColor: "bg-custom-100 dark:bg-custom-500/20", isActive: false },
    { id: 8, image: avatar8, username: "@brayan_herman", bgColor: "bg-green-100 dark:bg-green-500/20", isActive: false },
    { id: 9, image: avatar9, username: "@logan", bgColor: "bg-purple-100 dark:bg-purple-500/20", isActive: false },
    { id: 10, image: avatar10, username: "@gerhold", bgColor: "bg-cyan-100 dark:bg-cyan-500/20", isActive: false },
    { id: 11, image: avatar2, username: "@fletcher", bgColor: "bg-sky-100 dark:bg-sky-500/20", isActive: false },
    { id: 12, image: avatar2, username: "@fletcher", bgColor: "bg-sky-100 dark:bg-sky-500/20", isActive: false },
    { id: 13, image: avatar3, username: "@christina", bgColor: "bg-slate-100 dark:bg-zink-600", isActive: false },
];

const MessageData = [
    { id: 1, image: avatar3, name: "Louisa Howe", isActive: true },
    { id: 2, image: avatar4, name: "Everett Moore", isActive: true },
    { id: 3, image: avatar5, name: "Omari Welch", isActive: true },
    { id: 4, image: avatar6, name: "Paul Gerhold", isActive: true },
    { id: 5, image: avatar7, name: "Green Langworth", isActive: true },
    { id: 6, image: avatar8, name: "Lucie Beahan", isActive: false },
    { id: 7, image: avatar9, name: "Susana Dooley", isActive: false },
];

const PopularEventsData = [
    { id: 1, image: appStore, event: "Music Festivals" },
    { id: 2, image: telegram, event: "Conferences and Seminars" },
    { id: 3, image: android, event: "Business Networking Events" },
    { id: 4, image: slack, event: "Award Ceremonies" }
];

const UpcomingBirthdayData = [
    { id: 1, image: avatar3, name: "Louisa Howe", date: "Today" },
    { id: 2, image: avatar4, name: "Everett Moore", date: "Tomorrow" },
    { id: 3, image: avatar5, name: "Omari Welch", date: "13 Nov" },
    { id: 4, image: avatar6, name: "Paul Gerhold", date: "14 Nov" }
];

const EmailPerformanceData = [
    { id: 1, email: "Adverting & Marketing Agencies", createDate: "05 Aug, 2023", openRate: "18.65%", clickThrough: "2.66%", clickRate: "14.14%", unsubscribed: "0.19%", bounce: "1.29%", spam: "0.03%" },
    { id: 2, email: "Automotive & Aerospace", createDate: "20 Sep, 2023", openRate: "20.13%", clickThrough: "3.44%", clickRate: "18.03%", unsubscribed: "0.18%", bounce: "1.18%", spam: "0.00%" },
    { id: 3, email: "Education", createDate: "04 Jun, 2023", openRate: "18.74%", clickThrough: "2.80%", clickRate: "14.94%", unsubscribed: "0.17%", bounce: "1.35%", spam: "0.02%" },
    { id: 4, email: "Financial Services", createDate: "11 Feb, 2023", openRate: "18.23%", clickThrough: "2.72%", clickRate: "14.79%", unsubscribed: "0.16%", bounce: "1.30%", spam: "0.00%" },
    { id: 5, email: "Food & Beverage", createDate: "26 Nov, 2023", openRate: "15.48%", clickThrough: "1.69%", clickRate: "10.69%", unsubscribed: "0.11%", bounce: "0.63%", spam: "0.00%" },
    { id: 6, email: "Healthcare Services", createDate: "19 July, 2023", openRate: "19.12%", clickThrough: "2.98%", clickRate: "15.11%", unsubscribed: "0.17%", bounce: "1.08%", spam: "0.00%" },
    { id: 7, email: "Professional Services", createDate: "14 Jun, 2023", openRate: "18.14%", clickThrough: "2.39%", clickRate: "12.92%", unsubscribed: "0.17%", bounce: "1.10%", spam: "0.00%" },
    { id: 8, email: "Logistics & Wholesale", createDate: "03 Dec, 2023", openRate: "18.50%", clickThrough: "0.20%", clickRate: "14.84%", unsubscribed: "0.15%", bounce: "1.40%", spam: "0.00%" },
    { id: 9, email: "Real Estate Agents & Brokers", createDate: "03 Dec, 2023", openRate: "18.06%", clickThrough: "2.02%", clickRate: "11.51%", unsubscribed: "0.22%", bounce: "1.18%", spam: "0.00%" },
    { id: 10, email: "Nonprofit", createDate: "03 Dec, 2023", openRate: "20.39%", clickThrough: "2.66%", clickRate: "12.99%", unsubscribed: "0.17%", bounce: "1.09%", spam: "0.01%" },
    { id: 11, email: "Retail", createDate: "03 Dec, 2023", openRate: "14.98%", clickThrough: "2.25%", clickRate: "14.82%", unsubscribed: "0.12%", bounce: "0.69%", spam: "0.01%" },
];

export {
    ProductsStatisticsData,
    GreenEnergyData,
    ProductOrdersData,
    widgetsData,
    widgetsData2,
    MaintenanceData,
    EmployeePerformanceData, RecentPayrollData, UpcomingInterviewData, UpcomingScheduledData, activeFriendsData, storyData, MessageData, PopularEventsData, UpcomingBirthdayData, EmailPerformanceData
};
