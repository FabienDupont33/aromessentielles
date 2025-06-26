import { useEffect, useState } from "react";

import { services } from "../data/services";

const Services = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="bg-[#F7F9F9] min-h-screen px-6 md:px-20 py-16 font-sans">
      <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
        Mes services
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl shadow-md p-6 text-center transform transition duration-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            } delay-[${index * 100}ms]`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h2 className="text-xl font-semibold text-primary mb-2">
              {service.title}
            </h2>
            <p className="text-sm text-text">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Bouton prendre RDV */}
      <div className="mt-16 text-center">
        <a
          href="/contact"
          className="bg-primary text-white px-8 py-3 rounded-full shadow-md hover:bg-[#94c9ab] transition"
        >
          Prendre rendez-vous
        </a>
      </div>
    </section>
  );
};

export default Services;
