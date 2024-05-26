import * as Yup from "yup";
import {Request, Response} from 'express'

const formSchema = Yup.object({
    username: Yup.string()
        .required("Необходимо указать имя пользователя")
        .min(2, "Имя пользователя слишком короткое")
        .max(28, "Имя пользователя слишком длинное")
        .matches(/^\S*$/, "Пароль не должен содержать пробелы"),
    password: Yup.string()
        .required("Необходимо указать пароль")
        .min(4, "Пароль слишком короткий")
        .max(28, "Пароль слишком длинный")
        .matches(/^\S*$/, "Пароль не должен содержать пробелы"),
});
const validateForm = (req:Request,res:Response) => {

    const formData = req.body
    formSchema
        .validate(formData)
        .then((valid:any) => {
            if (valid) {
                console.log("Валидация прошла успешно")
            }
        })
        .catch((err:any) => {
            res.status(422).send("Валидация не прошла");
            console.log(err.errors)

        });
}

export default validateForm