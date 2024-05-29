import express from 'express'

import validateForm from "../controlers/validateForm";
import {attemptLogin, handleLogin} from "../controlers/authController";
import {rateLimiter} from "../controlers/rateLimiter";

const router = express.Router();

router
    .route("/login")
    .get(handleLogin)
    .post(validateForm, rateLimiter,attemptLogin)

export default router
