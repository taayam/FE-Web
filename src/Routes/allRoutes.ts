// dashboard
import Iot from "pages/Dashboards/Iot";
import Actuators from "pages/Dashboards/Actuators";
import Forensik from "pages/Dashboards/Forensik";
import Analytics from "pages/Dashboards/Analytics";
import Example from "pages/Dashboards/Example";
import Example1 from "pages/Dashboards/Example1";
import Example2 from "pages/Dashboards/Example2";
// Chat
import Chat from "pages/Chat";
// Email
import Mailbox from "pages/Email";
// Calendar
import DefaultCalendar from "pages/Calendar/Default";
import MonthGrid from "pages/Calendar/MonthGrid";
import MultiMonthStack from "pages/Calendar/MultiMonthStack";
// Ecommerce
import ListView from "pages/Ecommerce/Products/ListView"; 
// Notes
import Notes from "pages/Notes";
// Social Media
import WatchVideo from "pages/SocialMedia/WatchVideo";
// Users
import UserListView from "pages/Users/ListView";
import UserGridView from "pages/Users/GridView";
// plugins
import VideoPlayer from "pages/Components/Plugins/VideoPlayer";


// Create Password
import Login from "pages/Authentication/Login";
import Logout from "pages/Authentication/LogOut";
import Register from "pages/Authentication/Register";
import UserProfile from "pages/Authentication/UserProfile";
import Account from "pages/Pages/Account";
import Settings from "pages/Pages/Settings";
import Dashboard from "@/pages/Dashboards/Iot/Dashboard";

interface RouteObject {
  path: string;
  component: React.ComponentType<any>; // Use React.ComponentType to specify the type of the component
  exact?: boolean;
}

const authProtectedRoutes: Array<RouteObject> = [
  // Dashboard
  { path: "/", component: Iot },
  { path: "/dashboards-automatic", component: Actuators },
  { path: "/dashboard", component: Iot },
  { path: "/dashboards-forensik", component: Forensik },
  { path: "/dashboards-analytics", component: Analytics },
  { path: "/dashboards-example", component: Example },
  { path: "/dashboards-example1", component: Example1 },
  { path: "/dashboards-example2", component: Example2 },

  // plugins
  { path: "/plugins-video-player", component: VideoPlayer },

  // Chat
  { path: "/apps-chat", component: Chat },

  // Mailbox
  { path: "/apps-mailbox", component: Mailbox },

  // Calendar
  { path: "/apps-calendar", component: DefaultCalendar },
  { path: "/apps-calendar-month-grid", component: MonthGrid },
  { path: "/apps-calendar-multi-month-stack", component: MultiMonthStack },

  // Ecommerce
  { path: "/apps-ecommerce-product-list", component: ListView }, //Untuk EWS atau FEED SCHEDULE

  
  // Notes
  { path: "/apps-notes", component: Notes },


  { path: "/apps-social-video", component: WatchVideo },

  // Users
  { path: "/apps-users-list", component: UserListView },
  { path: "/apps-users-grid", component: UserGridView },

  // pages
  { path: "/pages-account", component: Account },
  { path: "/pages-account-settings", component: Settings },

  // profile
  { path: "/user-profile", component: UserProfile },
];

const publicRoutes = [

  // authentication
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
  { path: "/register", component: Register },

]

export { authProtectedRoutes, publicRoutes };
