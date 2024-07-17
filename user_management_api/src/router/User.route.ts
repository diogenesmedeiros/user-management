import express from 'express';
import User from '../controllers/User';
import authToken from '../middleware/auth'

const router = express.Router()

router.post("/", User.createUser)
router.get("/", authToken, User.getUsers)
router.put("/:id", authToken, User.updateUser)
router.delete("/:id", authToken, User.deleteUser)
router.post("/login", User.loginUser)

export default router