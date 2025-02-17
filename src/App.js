import Home from "./Component/homepage";
import About from "./Component/about";
import Login from "./Component/login";
import Signup from "./Component/signup";
import FoodOrder from './OrderPages/foodOrder';
import MedicineOrder from './OrderPages/medicineOrder';
import GroceryOrder from './OrderPages/GroceryOrder';
import ParcelOrder from './OrderPages/ParcelOrder';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: "*",
    element: "Page not found"
  },
  {
    path: "about",
    element: <About/>
  },
  {
    path: "login",
    element: <Login/>
  },
  {
    path: "signup",
    element: <Signup/>
  },
  {
    path: "foodOrder",
    element: <FoodOrder/>
  },
  {
    path: "medicineOrder",
    element: <MedicineOrder/>
  },
  {
    path: "groceryOrder",
    element: <GroceryOrder/>
  },{
    path: "parcelOrder",
    element: <ParcelOrder/>
  }
])
function App(){
  return(
    <RouterProvider router = {router}/>
  )
}
export default App;