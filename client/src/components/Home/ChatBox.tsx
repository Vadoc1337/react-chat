import {Divider, HStack, Textarea, VStack} from "@chakra-ui/react";
import {Field, Form, Formik, FormikHelpers, FormikProps} from "formik";
import {Button} from "@chakra-ui/button";
import * as Yup from "yup";
import {addMessage} from "../../redux/slices/messagesSlice";
import socket from "../../socket";
import {IChatProps, IFormValues, IMessage} from "../../../client_declarations";
import {ArrowForwardIcon} from "@chakra-ui/icons";
import {useAppDispatch} from "../../redux/store";
import ResizeTextarea from "react-textarea-autosize";
import {useEffect, useRef} from "react";

const ChatBox: React.FC<IChatProps> = ({userid}) => {
    const dispatch = useAppDispatch();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const formikRef = useRef<FormikProps<{ message: string }> | null>(null);

    const sendMessage = (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
        if (values.message.trim() !== "") {
            const message: IMessage = {
                to: userid,
                from: null, // TODO убрать в будущем null
                text: values.message,
            };
            socket.emit("direct_message", message, (acknowledgement: { success: boolean, error?: string }) => {
                if (acknowledgement.success) {
                    console.log("Сообщение отправлено успешно"); // TODO этот раздел сокетов доработать
                    dispatch(addMessage(message));
                } else {
                    console.error("Неудалось отправить сообщение:", acknowledgement.error);
                }
            });
            actions.resetForm();
        }

        if (textareaRef.current) {
            setTimeout(() => {
                textareaRef.current?.focus();
            }, 0);
        }
    };

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if ((event.code === "Enter" || event.code === "NumpadEnter") && !event.shiftKey) {
                const textarea = document.getElementById("chat__textarea") as HTMLTextAreaElement;
                if (textarea === document.activeElement) {
                    event.preventDefault()
                    if (formikRef.current) {
                        formikRef.current.submitForm();
                    }
                }
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, []);

    return (
        <Formik
            initialValues={{message: ""}}
            validationSchema={Yup.object({
                message: Yup.string().min(1).max(4096),
            })}
            onSubmit={sendMessage}
            innerRef={formikRef}
        >
            <HStack as={Form} w="100%" pb="0.3rem" px="1.1rem" alignItems="flex-end">
                <Field
                    name="message"
                    component={({field}: { field: any }) => (
                        <VStack w="100%" alignItems="flex-center">
                            <Divider w="70%" borderColor="gray.500" position="absolute" right="0" mt={-2}/>
                            <Textarea
                                alignContent="center"
                                {...field}
                                id="chat__textarea"
                                as={ResizeTextarea}
                                placeholder="Сообщение"
                                size="md"
                                autoComplete="off"
                                minRows={1}
                                maxRows={15}
                                minH="50px"
                                overflow="hidden"
                                resize="none"
                                wordBreak="break-word"
                                whiteSpace="pre-wrap"
                                ml={5}
                                pr={7}
                                ref={textareaRef}
                            />
                        </VStack>
                    )}

                />
                <Button type="submit" size="md" colorScheme="blue" mb={1}>
                    <ArrowForwardIcon/>
                </Button>
            </HStack>
        </Formik>
    );
};

export default ChatBox;