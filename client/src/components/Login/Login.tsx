import {
    Button, ButtonGroup, Heading, VStack, Text
} from "@chakra-ui/react";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import TextField from "../TextField";
import axios from "axios";
import {useNavigate} from "react-router";

import {setUser} from "../../redux/slices/userSlice";
import {useState} from "react";
import {useAppDispatch} from "../../redux/store";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const [error, setError] = useState(null);

    return (
        <Formik initialValues={{username: "", password: ""}}
                validationSchema={Yup.object({
                    username: Yup.string()
                        .required("Необходимо указать имя пользователя")
                        .min(2, "Имя пользователя слишком короткое")
                        .max(28, "Имя пользователя слишком длинное")
                        .matches(/^\S*$/, "Имя пользователя не должно содержать пробелы"),

                    password: Yup.string()
                        .required("Необходимо указать пароль")
                        .min(4, "Пароль слишком короткий")
                        .max(28, "Пароль слишком длинный")
                        .matches(/^\S*$/, "Пароль не должен содержать пробелы"),
                })}
                onSubmit={(values, actions) => {
                    const vals = {...values}
                    actions.resetForm();
                    axios.post(`http://localhost:4000/login`, vals, {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })
                        .then((res) => {
                            if (res && res.data) {
                                dispatch(setUser({...res.data}));
                                if (res.data.status) {
                                    setError(res.data.status);
                                } else if (res.data.loggedIn) {
                                    navigate("/chat");
                                }
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });

                }}
        >
            <VStack
                as={Form}
                w={{base: "90%", md: "500px"}}
                m="auto"
                justify="center"
                h="100vh"
                spacing="1rem"
            >
                <Heading>
                    Корпоративный чат
                </Heading>
                <Text as="p" color="red.400">{error}</Text>
                <TextField name="username" label="Имя пользователя" autoComplete="off"/>
                <TextField name="password" label="Введите пароль" autoComplete="off" type="password"/>
                <ButtonGroup>
                    <Button colorScheme="blue" type="submit" size="lg">
                        Войти
                    </Button>
                </ButtonGroup>
            </VStack>
        </Formik>
    );
};

export default Login;
