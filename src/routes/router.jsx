import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import FourOFour from "../pages/FourOFour/FourOFour";
import LogIn from "../pages/LogIn/LogIn";
import Register from "../pages/Register/Register";
import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import AdminClasses from "../pages/Dashboard/Admin/AdminClasses";
import AdminRoute from "./AdminRoute";
import AdminUsers from "../pages/Dashboard/Admin/AdminUsers";
import AdminFeedBack from "../pages/Dashboard/Admin/AdminFeedBack";
import InstructorRoute from "./InstructorRoute";
import InstructorClasses from "../pages/Dashboard/Instructor/InstructorClasses";
import AddClass from "../pages/Dashboard/Instructor/AddClass";
import UpdateClass from "../pages/Dashboard/Instructor/UpdateClass";
import SelectedClasses from "../pages/Dashboard/Student/SelectedClasses";
import EnrolledClasses from "../pages/Dashboard/Student/EnrolledClasses";
import PaymentHistory from "../pages/Dashboard/Student/PaymentHistory";
import Payment from "../pages/Dashboard/Student/Payment/Payment";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <FourOFour/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/login",
                element: <LogIn/>,
            },
            {
                path: "/register",
                element: <Register/>,
            },
            {
                path: "/instructors",
                element: <Instructors/>,
            },
            {
                path: "/classes",
                element: <Classes/>,
            }

        ]

    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard/></PrivateRoute>,
        children: [
            {
                path: "admin/classes",
                element: <AdminRoute><AdminClasses/></AdminRoute>
            },
            {
                path: "admin/classes/feedback/:id",
                element: <AdminRoute><AdminFeedBack/></AdminRoute>,
                loader: ({params}) => {return fetch(`https://sports-camp-rayhanali-dev.vercel.app/class/${params.id}`)},
            },
            {
                path: "admin/users",
                element: <AdminRoute><AdminUsers/></AdminRoute>
            },
            {
                path: "instructor/addClass",
                element: <InstructorRoute><AddClass/></InstructorRoute>,
            },
            {
                path: "instructor/myClasses",
                element: <InstructorRoute><InstructorClasses/></InstructorRoute>,
            },
            {
                path: "instructor/myClasses/update/:id",
                element: <InstructorRoute><UpdateClass/></InstructorRoute>,
                loader: ({params}) => {return fetch(`https://sports-camp-rayhanali-dev.vercel.app/class/${params.id}`)},
            },
            {
                path: "selectedClasses",
                element: <PrivateRoute><SelectedClasses/></PrivateRoute>,
            },
            {
                path: "selectedClasses/payment/:id",
                element: <PrivateRoute><Payment/></PrivateRoute>,
                loader: ({params}) => {return fetch(`https://sports-camp-rayhanali-dev.vercel.app/selected/class/${params.id}`)},
            },
            {
                path: "enrolledClasses",
                element: <PrivateRoute><EnrolledClasses/></PrivateRoute>,
            },
            {
                path: "paymentHistory",
                element: <PrivateRoute><PaymentHistory/></PrivateRoute>,
            }
        ]
    }
]);

export default router;