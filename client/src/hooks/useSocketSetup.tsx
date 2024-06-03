import {useEffect} from "react";
import socket from "../socket";
import {setUser} from "../redux/slices/userSlice";
import {selectColleague, setColleagueList} from "../redux/slices/colleagueListSlice";
import {addMessage, setInitialMessages} from "../redux/slices/messagesSlice";
import {useAppDispatch} from "../redux/store";
import {useSelector} from "react-redux";
import {IColleaguesSlice, IMessage} from "../../client_declarations";

const useSocketSetup = () => {
    const dispatch = useAppDispatch()
    const colleagues = useSelector(selectColleague);
    useEffect(() => {
        socket.connect();

        socket.on("colleagues", (colleagueList: IColleaguesSlice[]) => {
            dispatch(setColleagueList(colleagueList))
        })

        socket.on("messages", (messages:IMessage[]) => {
            console.log('test2', "сообщения загружены")
            dispatch(setInitialMessages(messages));
        })

        socket.on("direct_message", (message:IMessage) => {
            console.log("test3, сообщение отправлено")
            dispatch(addMessage(message))
        })

        // socket.on("colleagues", (colleagueList) => {
        //     console.log([...colleagueList].map((colleague:any) => colleague.connected))
        //     dispatch(setColleagueList(colleagueList))
        // }); удалить?!
        socket.on("connected", (status: boolean, username: string) => {
            console.log("connected TRUE")
            const updatedColleagues = colleagues.map((colleague) => {
                if (colleague.username === username) {
                    return { ...colleague, connected: status };
                }
                return colleague;
            });
            dispatch(setColleagueList(updatedColleagues));
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
    }, [dispatch, socket,addMessage,setColleagueList,setUser]);
}
export default useSocketSetup