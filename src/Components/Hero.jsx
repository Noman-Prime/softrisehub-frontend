import React from "react";

const Hero = () => {
    return (
        <section className="w-full py-16 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
                
                {/* 1. TEXT CONTENT: Constrained width for readability */}
                <div className="flex-1 text-center md:text-left space-y-6 max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1]">
                        Elevating Digital <br />
                        <span className="text-blue-600">Solutions for Growth.</span>
                    </h1>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                        At <span className="font-semibold text-gray-800">SoftRiseHub</span>, we build high-performance web applications and AI-driven software to help your business scale.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
                        <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md w-full sm:w-auto">
                            Get Started
                        </button>
                        <button className="px-8 py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-full hover:bg-gray-50 transition-all w-full sm:w-auto">
                            View Portfolio
                        </button>
                    </div>
                </div>

                {/* 2. VISUAL: Logo Container with strict size limits */}
                <div className="flex-1 flex justify-center md:justify-end">
                    {/* Added max-w-sm to prevent it from ever getting "too big" */}
                    <div className="bg-gray-50 p-6 md:p-10 rounded-[24px] border border-gray-100 shadow-lg max-w-[280px] md:max-w-[320px] w-full">
                        <img 
                            src="/logo.png" 
                            alt="SoftRiseHub Branding" 
                            className="w-full h-auto object-contain" 
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;