import {Route, Routes} from "react-router-dom";
import Login from "./Login/Login";
import {Text} from "@chakra-ui/react";
import PrivateRoutes from "./PrivateRoutes";
import {selectUser} from "../redux/slices/userSlice";
import {useSelector} from "react-redux";
import Home from "./Home/Home";


const NavigationRoutes = () => {
    const user = useSelector(selectUser);
    return user.loggedIn === null ? (<Text>Загрузка...</Text>) : (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="*" element={<Login/>}/>
            <Route element={<PrivateRoutes/>}>
                <Route path="/chat" element={<Home/>}/>
            </Route>
        </Routes>);
}


export default NavigationRoutes;
