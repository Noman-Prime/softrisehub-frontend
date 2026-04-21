import React from "react";

const Services = () => {
    const services = [
        {
            title: "Web Development",
            desc: "High-performance React applications built with scalability in mind.",
            icon: "🌐"
        },
        {
            title: "AI & Machine Learning",
            desc: "Custom neural networks and intelligent automation for your data.",
            icon: "🤖"
        },
        {
            title: "UI/UX Design",
            desc: "Modern, user-centric designs that prioritize conversion and clarity.",
            icon: "🎨"
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Expertise</h2>
                <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                    We combine technical precision with creative strategy to build digital products that move the needle.
                </p>

                {/* The Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="group bg-white p-8 rounded-[30px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-left">
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;