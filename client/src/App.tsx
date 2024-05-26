import {io} from 'socket.io-client'
import ToggleColorMode from "./components/ToggleColorMode";
import NavigationRoutes from "./components/NavigationRoutes";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {selectUser} from "./redux/slices/userSlice";

const socketIO = io("http://localhost:4000");


function App() {
    const navigate = useNavigate();
    const user = useSelector(selectUser);

    useEffect(() => {
        if (!user.loggedIn) {
            navigate('/');
        }
        if (user.loggedIn) {
            navigate('/home');
        }
    }, [navigate, user.loggedIn]);

    return (
        <>
            <NavigationRoutes/>
            <ToggleColorMode/>
        </>)
}

export default App
