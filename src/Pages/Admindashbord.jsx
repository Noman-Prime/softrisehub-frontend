import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
    const [users, setUsers] = useState(null)
    const [projects, setProjects] = useState(null)
    const [orders, setOrders] = useState(null)
    const [length, setLength] = useState(null)
    useEffect(() => {
        showUser()
    }, [])

    const showUser = async () => {
        try {
            const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/admin/users`, { withCredentials: true })
            console.log(userResponse.data)
            setLength(userResponse.data)
            setUsers(userResponse.data.users)
            setProjects(null)
            setOrders(null)
        } catch (error) {
            console.error(error);
        }
    }

    const showProjects = async () => {
        try {
            const projectResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/project/all`, { withCredentials: true })
            console.log(projectResponse.data)
            setLength(projectResponse.data)
            setProjects(projectResponse.data.Projects)
            setUsers(null)
            setOrders(null)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="flex bg-gray-30 my-2 mx-2  bg-black gap-1">
                <div className="flex flex-col bg-white border rounded-[10px]  w-30 h-screen">
                    <div className="flex flex-col items-enter justify-centert my-2 mx-1 gap-2">
                        <button className="flex text-center font-bold justify-center border-2 rounded-[10px] " onClick={showUser}>Users</button>
                        <button className="flex text-center font-bold justify-center border-2 rounded-[10px] " onClick={showProjects}>Projectts</button>
                        <button className="flex text-center font-bold justify-center border-2 rounded-[10px] ">orders</button>
                    </div>
                </div>
                <div className="w-full h-screen bg-gray-400 border rounded-[10px] p-4 overflow-y-auto">
                    {users && (
                        <div className="p-4 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-white border rounded-xl shadow p-4 flex items-center justify-center font-semibold gap-1">
                                    <span className="text-blue-500 font-bold">Total Accounts: </span> {length.Total}
                                </div>

                                <div className="bg-white border rounded-xl shadow p-4 flex items-center justify-center font-semibold gap-1">
                                    <span className="text-blue-500 font-bold">Admins: </span> {length.Admin}
                                </div>

                                <div className="bg-white border rounded-xl shadow p-4 flex items-center justify-center font-semibold gap-1">
                                    <span className="text-blue-500 font-bold">Developers: </span> {length.Developer}
                                </div>

                                <div className="bg-white border rounded-xl shadow p-4 flex items-center justify-center font-semibold gap-1">
                                    <span className="text-green-500 font-bold">Active User: </span> {length.User}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {users.map((user) => (
                                    <div
                                        key={user._id}
                                        className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition"
                                    >
                                        <div className="flex justify-center mb-4">
                                            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-600">
                                                <img src={user.image?.url} alt={user.firstName?.[0]?.toUpperCase()} className="w-16 h-16 rounded-full object-cover"/>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <h2 className="text-lg font-semibold">{user.name}</h2>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                        <div className="flex justify-between mt-4 text-sm">
                                            <span className="px-2 py-1 bg-gray-200 rounded-lg">
                                                {user.role || "User"}
                                            </span>

                                            <span className="px-2 py-1 bg-green-500 text-white rounded-lg">
                                                Active
                                            </span>
                                        </div>
                                        <div className="flex gap-2 mt-4">
                                            <button className="flex-1 bg-yellow-400 py-1 rounded-lg text-sm">
                                                Edit
                                            </button>
                                            <button className="flex-1 bg-red-500 text-white py-1 rounded-lg text-sm">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                    )}

                    {projects && (
                        <div className="p-4 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-white border rounded-xl shadow p-4 flex items-center justify-center font-semibold gap-1">
                                    <span className="text-blue-500 font-bold">Total Projects: </span> {length.Total}
                                </div>

                                <div className="bg-white border rounded-xl shadow p-4 flex items-center justify-center font-semibold gap-1">
                                    <span className="text-blue-500 font-bold">Complete Projects: </span> {length.Completed}
                                </div>

                                <div className="bg-white border rounded-xl shadow p-4 flex items-center justify-center font-semibold gap-1">
                                    <span className="text-blue-500 font-bold">Develping Projects: </span> {length.Building}
                                </div>

                                <div className="bg-white border rounded-xl shadow p-4 flex items-center justify-center font-semibold gap-1">
                                    <span className="text-blue-500 font-bold">Pending Projects: </span> {length.Pending}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {projects.map((project) => (
                                    <div
                                        key={project._id}
                                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                                    >
                                        <div className="w-full h-40 bg-gray-200">
                                            {project.images?.length > 0 ? (
                                                <img
                                                    src={project.images[0].url}
                                                    alt={project.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-500">
                                                    No Image
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-4">
                                            <h2 className="text-lg font-bold text-gray-800">
                                                {project.name}
                                            </h2>

                                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                                {project.description || "No description available"}
                                            </p>

                                            <div className="flex justify-between text-xs text-gray-500 mt-3">
                                                <span>Start: {project.startingDate || "N/A"}</span>
                                                <span>End: {project.endDate || "N/A"}</span>
                                            </div>

                                            <div className="flex gap-3 mt-4 text-sm">
                                                {project.gitHubLink && (
                                                    <a
                                                        href={project.gitHubLink}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-blue-600 font-medium"
                                                    >
                                                        GitHub
                                                    </a>
                                                )}

                                                {project.liveLink && (
                                                    <a
                                                        href={project.liveLink}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-green-600 font-medium"
                                                    >
                                                        Live
                                                    </a>
                                                )}
                                            </div>

                                            {project.images?.length > 1 && (
                                                <div className="flex gap-2 mt-3">
                                                    {project.images.slice(1, 3).map((img, index) => (
                                                        <img
                                                            key={img.public_id || index}
                                                            src={img.url}
                                                            className="w-12 h-12 object-cover rounded-md"
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}

export default AdminDashboard