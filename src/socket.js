import { io } from "socket.io-client"

const socket = io(import.meta.env.VITE_API_URL, {
    withCredentials: true,
    transports: ["websocket", "polling"],
    reconnection: true,         // ✅ add this
    reconnectionAttempts: 10,   // ✅ add this
    reconnectionDelay: 3000,    // ✅ add this
})

export default socket