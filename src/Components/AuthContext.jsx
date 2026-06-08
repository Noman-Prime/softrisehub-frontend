import { createContext, useContext, useEffect, useState } from "react"
export const TeackerContext = createContext(null)
export const TrackData = ({ children }) => {
    const [streamData, setStramData] = useState(null)

    useEffect(() => {
        const event = new EventSource(`${import.meta.env.VITE_API_URL}/api/v1/stram`, { withCredentials: true })
        event.onmessage = (e) => {
            try {
                setStramData(JSON.parse(e.data))
            } catch (error) {
                console.log("Parse are not working", error);
            }

        }
        event.onerror = (error) => {
            console.log("EventSource is not working", error)
        }
        return () => {
            event.close()
        }
    }, [])
    return (
        <TeackerContext.Provider value={{ streamData }}>
            {children}
        </TeackerContext.Provider>
    )
}

export const useTracker = () => useContext(TeackerContext)