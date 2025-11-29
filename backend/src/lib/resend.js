import {Resend} from "resend";
import { ENV } from "./env.js";
//instead we can do like this way import "dotenv/config";
export const resendClient = new Resend(ENV.RESEND_API_KEY);

export const sender = {
    email: ENV.EMAIL_FROM,
    name: ENV.EMAIL_FROM_NAME,
};