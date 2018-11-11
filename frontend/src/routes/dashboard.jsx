
import Publisher from "views/Publisher/Publisher.jsx";
import UserTableList from "../views/UserTableList/UserTableList";

const dashboardRoutes = [
  /*{
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },*/
  {
    path: "/user",
    sidebarName: "User",
    navbarName: "User Table List",
    icon: "content_paste",
    component: UserTableList
  },
  {
    path: "/publisher",
    sidebarName: "Publisher",
    navbarName: "Publisher Table List",
    icon: "content_paste",
    component: Publisher
  },
  /*,
  {
    path: "/typography",
    sidebarName: "Typography",
    navbarName: "Typography",
    icon: LibraryBooks,
    component: Typography
  },
  {
    path: "/icons",
    sidebarName: "Icons",
    navbarName: "Icons",
    icon: BubbleChart,
    component: Icons
  },
  {
    path: "/maps",
    sidebarName: "Maps",
    navbarName: "Map",
    icon: LocationOn,
    component: Maps
  },

  {
    path: "/upgrade-to-pro",
    sidebarName: "Upgrade To PRO",
    navbarName: "Upgrade To PRO",
    icon: Unarchive,
    component: UpgradeToPro
  }*/
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
