import React, { useState } from "react";
import Footer from "../Components/Footer";

const FAQ = () => {
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
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
    <section className="py-24 bg-slate-50 text-slate-900 font-sans">
      <div className="max-w-3xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-[0.2em] text-blue-600 uppercase block mb-3">
            / Documentation
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-md mx-auto leading-relaxed">
            Everything you need to know about architectural execution and working processes with SoftRiseHub.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 shadow-[0_4px_12px_rgba(15,23,42,0.02)]"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 group cursor-pointer"
                >
                  <span className={`font-bold text-base sm:text-lg tracking-tight transition-colors duration-150 ${isOpen ? 'text-blue-600' : 'text-slate-800 group-hover:text-slate-900'}`}>
                    {faq.question}
                  </span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={2.5} 
                    stroke="currentColor" 
                    className={`w-4 h-4 text-slate-400 shrink-0 transform transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : 'group-hover:text-slate-600'}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                <div 
                  className={`px-6 transition-all duration-200 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4 font-normal">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
    <Footer />
    </>
  );
};

export default FAQ;

{/* it is not comleted yet */}