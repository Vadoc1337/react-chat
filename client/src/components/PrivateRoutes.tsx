import {Navigate, Outlet} from "react-router";
import {useSelector} from "react-redux";
import {selectUser} from "../redux/slices/userSlice";

const useAuth = () => {
    const user = useSelector(selectUser);
    return user && user.loggedIn;
};



const PrivateRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to="/"/>;
};

export default PrivateRoutes;
