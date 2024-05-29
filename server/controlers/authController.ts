import bcrypt from "bcrypt";
import pool from "../database";

export const handleLogin = async (req: any, res: any) => {
    if (req.session.user && req.session.user.username) {
        res.json({loggedIn: true, username: req.session.user.username})
    } else {
        res.json({loggedIn: false})
    }
}

export const attemptLogin = async (req: any, res: any) => {

const potentialLogin = await pool.query(
    "SELECT id, username, passhash, userid FROM users u WHERE u.username=$1",
    [req.body.username]
)
    if (potentialLogin && potentialLogin.rowCount && potentialLogin.rowCount > 0) {
        const isSamePass = await bcrypt.compare(req.body.password, potentialLogin.rows[0].passhash)
        if (isSamePass) {
            req.session.user = {
                username: req.body.username,
                id: potentialLogin.rows[0].id,
                userid: potentialLogin.rows[0].userid
            };
            res.json({loggedIn: true, username: req.body.username, status: "Успешная авторизация"})
        } else {
            res.json({loggedIn: false, status: "Неверный логин или пароль"})
        }
    } else {
        res.json({loggedIn: false, status: "Неверный логин или пароль"})
    }
};

//     const existingUser = await pool.query(
//         "SELECT username from users WHERE username=$1",
//         [req.body.username]
//     );
//
//     if (existingUser.rowCount === 0) {
//         // Добавление нового пользователя в бау
//         const hashedPass = await bcrypt.hash(req.body.password, 10);
//         const newUserQuery = await pool.query(
//             "INSERT INTO users(username, passhash, userid) values($1,$2,$3) RETURNING id, username, userid",
//             [req.body.username, hashedPass, uuidv4()]
//         )
//         req.session.user = {
//             username: req.body.username,
//             id: newUserQuery.rows[0].id,
//             userid: newUserQuery.rows[0].userid
//         };
//         res.json({loggedIn: true, username: req.body.username, status: "Успешное создание пользователя"})
//     } else {
//         res.json({loggedIn: false, status: "Такой пользователь уже существует"})
//     }
// };

// TODO КОСТЫЛЬ ДЛЯ ДОБАВЛЕНИЯ ПОЛЬЗОВАТЕЛЯ И ПАРОЛЯ В БАЗУ (можно реализовать функционал регистрации пользователей) + добавить типы