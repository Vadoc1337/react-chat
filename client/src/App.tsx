import ToggleColorMode from "./components/ToggleColorMode";
import NavigationRoutes from "./components/NavigationRoutes";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {selectUser, setUser} from "./redux/slices/userSlice";
import axios from "axios";
import {useAppDispatch} from "./redux/store";


function App() {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const dispatch = useAppDispatch()


    useEffect(() => {
        axios.get(`http://localhost:4000/login`, { withCredentials: true })
            .then(response => {
                if (!response || !response.data || response.status >= 400) {
                    dispatch(setUser({ loggedIn: false }));
                    return;
                }
                dispatch(setUser({ loggedIn: response.data.loggedIn }));
                navigate('/chat');
            })
            .catch(error => {
                console.log(error);
                setUser({ loggedIn: false });
            });
    }, [user.loggedIn]);

    return (
        <>
            <NavigationRoutes/>
            <ToggleColorMode/>
        </>)
}

export default App
