import express, {Request,Response} from 'express'
import bcrypt from "bcrypt";

import validateForm from "../controlers/validateForm";
import pool from "../database";
// import {CustomSession} from "../server_declarations";
// import {Session} from "socket.io-adapter";

const router = express.Router();

router
    .route("/login")
    .get(async (req: any, res:any) => {
        if (req.session.user && req.session.user.username) {
            res.json({loggedIn: true, username: req.session.user.username})
        } else {
            res.json({loggedIn: false})
        }
    })
    .post(async (req: any, res:any) => {
        validateForm(req, res)

        // const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // const potentialLogin = await pool.query(
        //     "INSERT INTO users (username, passhash) VALUES ($1, $2) RETURNING id",
        //     [req.body.username, hashedPassword]
        // );  //TODO КОСТЫЛЬ ДЛЯ ДОБАВЛЕНИЯ ПОЛЬЗОВАТЕЛЯ И ПАРОЛЯ В БАЗУ (зашифровано)

        const potentialLogin = await pool.query(
            "SELECT id, username, passhash FROM users u WHERE u.username=$1",
            [req.body.username]
        )

        if (potentialLogin && potentialLogin.rowCount && potentialLogin.rowCount > 0) {
            const isSamePass = await bcrypt.compare(req.body.password, potentialLogin.rows[0].passhash)
            if (isSamePass) {
                req.session.user = {
                    username: req.body.username,
                    id: potentialLogin.rows[0].id
                };
                res.json({loggedIn: true, username: req.body.username, status: "Успешная авторизация"})
            } else {
                res.json({loggedIn: false, status: "Неверный логин или пароль"})
            }
        } else {
            res.json({loggedIn: false, status: "Неверный логин или пароль"})
        }
    });
// TODO добавить типы плюс удалить комменты

export default router
