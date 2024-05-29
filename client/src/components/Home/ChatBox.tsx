import {HStack, Input} from "@chakra-ui/react";
import {Field, Form, Formik} from "formik";
import {Button} from "@chakra-ui/button";
import * as Yup from "yup";
import {setMessages} from "../../redux/slices/messagesSlice";
import socket from "../../socket";
import {ChatProps} from "../../../client_declarations";
import {ArrowForwardIcon} from "@chakra-ui/icons";
import {useAppDispatch} from "../../redux/store";


const ChatBox: React.FC<ChatProps> = ({userid}) => {
    const dispatch = useAppDispatch()
    return (
        <Formik
            initialValues={{message: ""}}
            validationSchema={Yup.object({
                message: Yup.string().min(1).max(4096),
            })}
            onSubmit={(values, actions) => {
                if (values.message.trim() !== "") {
                    const message = {to: userid, from: null, text: values.message};
                    socket.emit("direct_message", message);
                    dispatch(setMessages(message));
                    actions.resetForm();
                }}}
        >
            <HStack as={Form} w="100%" pb="1.4rem" px="1.1rem">
                <Input
                    as={Field}
                    name="message"
                    placeholder="Сообщение"
                    size="md"
                    autoComplete="off"
                />
                <Button type="submit" size="md" colorScheme="blue" >
                    <ArrowForwardIcon/>
                </Button>
            </HStack>
        </Formik>
    );
};
export default ChatBox;
