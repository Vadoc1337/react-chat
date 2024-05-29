import TextField from "../TextField";
import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay} from "@chakra-ui/modal";
import {Heading} from "@chakra-ui/react";
import {Form, Formik} from "formik";
import {Button} from "@chakra-ui/button";
import {useCallback, useState} from "react";
import {colleagueSchema} from "../../../../server/controlers/validateForm";
import socket from "../../socket";
import {useDispatch} from "react-redux";
import {setColleagueList} from "../../redux/slices/colleagueListSlice";
import {useAppDispatch} from "../../redux/store";

const AddColleagueModal = ({isOpen, onClose}: { isOpen: boolean, onClose: () => void }) => {
    const dispatch = useAppDispatch()
    const [error, setError] = useState("");
    const closeModal = useCallback(() => {
        setError("");
        onClose();
    }, [onClose]);

    return (
        <Modal isOpen={isOpen} onClose={closeModal} isCentered>
            <ModalOverlay/>
            <ModalContent m='auto 25px'>
                <ModalCloseButton/>
                <Formik
                    initialValues={{colleagueName: ""}}
                    validationSchema={colleagueSchema}
                    onSubmit={values => {
                        socket.emit(
                            "add_colleague",
                            values.colleagueName,
                            ({errorMsg, done, newColleague}: { errorMsg: string, done: boolean, newColleague: any }) => {
                                if (done && newColleague) {
                                    dispatch(setColleagueList([{...newColleague}]))
                                    closeModal();
                                    return;
                                }
                                setError(errorMsg)
                            });
                    }}
                >
                    <Form>
                        <ModalBody pt="3rem">
                            <Heading fontSize="xl" color="red.500" textAlign="center">
                                {error}
                            </Heading>
                            <TextField
                                label="Добавить коллегу"
                                marginTop="1rem"
                                placeholder="Имя пользователя"
                                autoComplete="off"
                                name="colleagueName"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" type="submit">
                                Добавить
                            </Button>
                        </ModalFooter>
                    </Form>
                </Formik>
            </ModalContent>
        </Modal>
    );
};

export default AddColleagueModal