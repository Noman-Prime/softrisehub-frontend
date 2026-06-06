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

    <img
      src={slider.image?.url}
      alt="slider"
      key={slider._id || current}
      className="absolute inset-0 w-full h-full object-cover animate-slowZoomFade"
    />

    <div className="absolute inset-0 bg-black/30"></div>

    <button
      onClick={prev}
      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 text-white hover:bg-black/60 flex items-center justify-center"
    >
      ‹
    </button>

    <button
      onClick={next}
      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 text-white hover:bg-black/60 flex items-center justify-center"
    >
      ›
    </button>

    <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-[92%] sm:w-[85%] md:w-[70%] text-center">

      <div className="bg-black/40 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl">

        <p className="text-white text-sm sm:text-base md:text-lg font-medium leading-snug">
          {slider.description}
        </p>

        <button className="mt-2 text-xs sm:text-sm text-sky-300 hover:text-sky-200 transition">
          {slider?.button}
        </button>

      </div>

    </div>

  </div>
);
};

export default Hero;