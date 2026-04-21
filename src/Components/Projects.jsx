import React from "react";

const Projects = () => {
    const projects = [
        {
            title: "CIFAR-10 Neural Network",
            tech: "Python, PyTorch, CNN",
            desc: "A custom-built convolutional neural network capable of identifying objects with high accuracy.",
            img: "/project1.png"
        },
        {
            title: "SoftRiseHub Platform",
            tech: "React, Tailwind, Node.js",
            desc: "Our primary hub for software solutions, featuring a modern, responsive interface.",
            img: "/project2.png"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Selected Projects</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {projects.map((project, index) => (
                        <div key={index} className="group relative bg-gray-50 rounded-[30px] overflow-hidden border border-gray-200 transition-all hover:shadow-2xl">
                            {/* Image Placeholder */}
                            <div className="h-64 bg-gray-300 flex items-center justify-center">
                                {/* Use an actual image here */}
                                <span className="text-gray-500 font-medium">Project Screenshot</span>
                            </div>
                            
                            <div className="p-8">
                                <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">{project.tech}</span>
                                <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">{project.title}</h3>
                                <p className="text-gray-600 mb-6">{project.desc}</p>
                                <button className="text-blue-600 font-bold hover:underline">View Case Study →</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;