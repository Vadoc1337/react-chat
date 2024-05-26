// import { Text } from "@chakra-ui/layout";
// import { useContext } from "react";
import {Route, Routes} from "react-router-dom";
// import { AccountContext } from "./AccountContext";
// import Home from "./Home/Home";
import Login from "./Login/Login";
import {Text} from "@chakra-ui/react";
import PrivateRoutes from "./PrivateRoutes";
// import SignUp from "./Login/SignUp"; регистрации не будет TODO удалить
// import PrivateRoutes from "./PrivateRoutes";

const NavigationRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route element={<PrivateRoutes/>}>
                <Route path="/home" element={<Text>Home</Text>}/>
            </Route>
            <Route path="*" element={<Login/>}/>
        </Routes>
    )
}


export default NavigationRoutes;
