import Home from "./Component/homepage";
import About from "./Component/about";
import Login from "./Component/login";
import Signup from "./Component/signup";
import FoodOrder from './OrderPages/foodOrder';
import MedicineOrder from './OrderPages/medicineOrder';
import GroceryOrder from './OrderPages/GroceryOrder';
import ParcelOrder from './OrderPages/ParcelOrder';
import OTPEntry from "./Component/otp";
import OrderSummary from "./OrderPages/ordersummary";
import Placed from "./OrderPages/orderplaced";
import Profile from "./Component/profile";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "*",
    element: "Page not found",
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/foodOrder",
    element: <FoodOrder />,
  },
  {
    path: "/medicineOrder",
    element: <MedicineOrder />,
  },
  {
    path: "/groceryOrder",
    element: <GroceryOrder />,
  },
  {
    path: "/parcelOrder",
    element: <ParcelOrder />,
  },
  {
    path: "/otp",
    element: <OTPEntry />,
  },
  {
    path: "/order-summary",
    element: <OrderSummary />,
  },
  
  {
    path: "/order-placed",
    element: <Placed/>
  },
  {
    path: "/profile",
    element: <Profile/>
  }
  
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
