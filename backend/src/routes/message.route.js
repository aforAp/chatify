import express from "express";
import { getAllContacts, getMessagesByUserId, sendMessage, getChatPartners } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import {arcjetProtection} from "../middleware/arcjet.middleware.js";
const router = express.Router();
//this is actually more efficient since authenticated requests get blocked by rate limiting before
//hitting the auth middleware.
router.use(arcjetProtection, protectRoute);
router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
// //we need to pass the id to the router than only we can get the user details

router.post("/send/:id", sendMessage);
//only auth users are abel to send the messages...

//router.get("/contacts", getAllContacts); why this is undefined bcoz we have a protected route so it was undefined...

export default router;
