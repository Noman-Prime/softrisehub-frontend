import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Hero = () => {
  const [object, setObject] = useState([]);
  const [current, setCurrent] = useState(0);

  const intervalRef = useRef(null);

const getData = async () => {
    try {
      const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/slider/allsliders`, { withCredentials: true });
      setObject(resp.data.sliders);
      return resp.data;
    } catch (error) {
      console.error("there is no data in API", error);
    }
  };

  useEffect(() => {
    getData();
    const result = new EventSource(`${import.meta.env.VITE_API_URL}/api/v1/slider/allsliders`, { withCredentials: true });

    result.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data && data.sliders) {
          setObject(data.sliders);
        }
      } catch (error) {
        console.error("Parsing error:", error);
      }
    };

    result.onerror = (error) => {
      console.error("EventSource connection error:", error);
    };
    return () => {
      result.close();
    };
  }, []);

  const startAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCurrent((prev) =>
        prev === object.length - 1 ? 0 : prev + 1
      );
    }, 3000);
  };

  useEffect(() => {
    if (!object.length) return;

    startAuto();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [object]);

  const next = () => {
    setCurrent((prev) =>
      prev === object.length - 1 ? 0 : prev + 1
    );
    startAuto();
  };

  const prev = () => {
    setCurrent((prev) =>
      prev === 0 ? object.length - 1 : prev - 1
    );
    startAuto();
  };

  if (!object.length) return null;

  const slider = object[current];

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">

      {/* IMAGE with slow cinematic effect */}
      <img
        src={slider.image?.url}
        alt="slider"
        key={slider._id || current}
        className="absolute inset-0 w-full h-full object-cover animate-slowZoomFade"
      />

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* left button */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white hover:bg-black/60"
      >
        ‹
      </button>

      {/* right button */}
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white hover:bg-black/60"
      >
        ›
      </button>

      {/* text */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center w-[90%]">

        <div className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl">

          <p className="text-white text-base md:text-lg font-medium">
            {slider.description}
          </p>

          <button className="mt-2 text-sm text-sky-300 hover:text-sky-200 transition">
            {slider?.button}
          </button>

        </div>

      </div>

    </div>
  );
};

export default Hero;