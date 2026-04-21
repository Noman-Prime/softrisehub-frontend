import React, { useState } from "react";

const FAQ = () => {
    // State to track which question is currently open
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What services does SoftRiseHub provide?",
            answer: "We specialize in custom Web Development (React, Tailwind), AI/Machine Learning solutions (Python, PyTorch), and full-scale UI/UX design for startups and established businesses."
        },
        {
            question: "How long does a typical software project take?",
            answer: "A standard MVP (Minimum Viable Product) usually takes between 4 to 8 weeks. Larger, more complex AI integrations or enterprise platforms may take 3+ months."
        },
        {
            question: "Will I own the source code after the project is finished?",
            answer: "Yes, absolutely. Once the final payment is made, you own 100% of the intellectual property and source code. We provide full handovers via GitHub."
        },
        {
            question: "Do you offer technical support after deployment?",
            answer: "We provide 30 days of free high-priority support after launch to ensure everything runs smoothly. We also offer monthly maintenance packages for long-term scaling."
        }
    ];

    const toggleFAQ = (index) => {
        // If the same index is clicked, close it. Otherwise, open the new one.
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600">
                        Everything you need to know about working with SoftRiseHub.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className="bg-white border border-gray-200 rounded-[20px] overflow-hidden transition-all duration-300 shadow-sm"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full p-6 text-left flex justify-between items-center group"
                            >
                                <span className={`font-bold text-lg ${openIndex === index ? 'text-blue-600' : 'text-gray-800'} group-hover:text-blue-500 transition-colors`}>
                                    {faq.question}
                                </span>
                                <span className={`transform transition-transform duration-300 text-2xl ${openIndex === index ? 'rotate-45 text-blue-600' : 'text-gray-400'}`}>
                                    +
                                </span>
                            </button>

                            {/* Animated Answer Section */}
                            <div 
                                className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${
                                    openIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <p className="text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;