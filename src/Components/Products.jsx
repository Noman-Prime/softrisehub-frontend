import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Products = () => {
  const [projects, setProjects] = useState([]);
  const getProjects = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/project/all`,
        { withCredentials: true }
      );
      setProjects(res.data.Projects);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProjects();

    const result = new EventSource(`${import.meta.env.VITE_API_URL}/api/v1/project/all`,
      { withCredentials: true })
      result.onmessage = (event) =>{
        try {
          const resp = JSON.parse(event.data)
          if(resp && resp.Projects){
            setProjects(resp.Projects)
          }
        } catch (error) {
          console.log("Parsing have an error", error);
        }
      }
      result.onerror = (error )=>{
        console.log("EventSource is not working", error);
      }
      return () =>(
        result.close()
      )
  }, []);

  const visibleProjects = projects.slice(0, 5);

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-sky-50/40 to-white overflow-hidden">
      <div className="absolute top-20 left-20 w-72 h-72 bg-sky-200/30 blur-[120px] rounded-full" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-200/30 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Digital Solutions We Have Built
          </h2>
          <p className="mt-4 text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We develop web, mobile, and enterprise applications that are designed to be reliable, scalable, and easy to use, helping businesses operate more efficiently and grow with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project) => (
            <div
              key={project._id}
              className="group bg-white rounded-3xl overflow-hidden border border-sky-100 shadow-sm hover:shadow-xl hover:shadow-sky-100 hover:border-sky-300 hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project?.images?.[0]?.url}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition">
                  {project.name}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-5">
                  {project.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs text-slate-500">
                    {project.startingDate}
                  </span>
                  <span className="text-sm font-medium text-sky-600">
                    View Project →
                  </span>
                </div>
              </div>
            </div>
          ))}

          <Link
            to="/projects"
            className="group rounded-3xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center min-h-[360px] shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
          >
            <div className="text-center px-8 text-white">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-5">
                <ArrowRight size={24} className="group-hover:translate-x-1 transition" />
              </div>
              <h3 className="text-2xl font-bold mb-3">View All Projects</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Explore our complete range of web, mobile, and enterprise solutions built for modern businesses.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;