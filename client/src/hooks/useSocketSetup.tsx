import {useEffect} from "react";
import socket from "../socket";
import {setUser} from "../redux/slices/userSlice";
import {selectColleague, setColleagueList} from "../redux/slices/colleagueListSlice";
import {setMessages} from "../redux/slices/messagesSlice";
import {useAppDispatch} from "../redux/store";
import {useSelector} from "react-redux";

const useSocketSetup = () => {
    const dispatch = useAppDispatch()
    const colleagues = useSelector(selectColleague);
    useEffect(() => {
        socket.connect();

        socket.on("colleagues", (colleagueList: any) => {
            // console.log(colleagueList)
            dispatch(setColleagueList(colleagueList))
        })

        socket.on("messages", messages => {
            console.log('test2')
            dispatch(setMessages(messages))
        })

        socket.on("direct_message", message => {
            console.log("test3")
            dispatch(setMessages(message))
        })

        // socket.on("colleagues", (colleagueList) => {
        //     console.log([...colleagueList].map((colleague:any) => colleague.connected))
        //     dispatch(setColleagueList(colleagueList))
        // });

        socket.on("connected", (status: any, username: any) => {
            console.log("test connected"); // TODO не работает определение онлайн статуса друзей + сокеты отправки сообщений между пользователями
            let updatedColleagues: any
            dispatch(setColleagueList([...updatedColleagues].map((colleague) => {
                if (colleague.username === username) {
                    colleague.connected = status;
                }
                return colleague;
            })))
        });

        socket.on("connect_error", () => {
            dispatch(setUser({loggedIn: false}));
        });

        return () => {
            socket.off("connect_error");
            socket.off("connected");
            socket.off("colleagues");
            socket.off("messages")
            socket.off("direct_message")
        }
    }, [dispatch, socket]);
}
export default useSocketSetup