import { Link } from "react-router-dom";
import { services } from "../data/services";

const Home = () => {
  return (
    <div className="bg-[#FAF3E0] font-sans">
      <section className="w-full bg-[#d5ede3] py-4 text-center text-text text-sm md:text-base font-medium shadow-inner">
        🌿 Une approche naturelle & bienveillante, pensée pour chaque étape de
        la vie des femmes 🌸
      </section>
      {/* Hero avec logo complet */}
      <section className="bg-[#E6F2EF] px-6 md:px-20 py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:justify-between gap-10 relative z-10">
          {/* Logo */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <img
              src="/images/logo-titre.png"
              alt="Logo Arom Essenti’Elles"
              className="w-64 md:w-80 mx-auto md:mx-0 mb-4"
            />
          </div>

          {/* Texte + CTA */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
            <p className="text-lg md:text-xl text-text leading-relaxed">
              Offrez-vous un moment de douceur et de reconnexion grâce aux
              bienfaits des huiles essentielles 🌿
            </p>

            <Link
              to="/prendre-rendez-vous"
              className="inline-block bg-primary text-white px-6 py-3 rounded-full shadow-md hover:bg-[#94c9ab] transition"
            >
              Prendre rendez-vous
            </Link>
          </div>
        </div>

        {/* Décor SVG – Feuille en bas à droite */}
        <svg
          className="absolute bottom-[-40px] right-[-40px] w-48 h-48 opacity-20"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M44.5 2C32.3 7.8 17.3 21.4 11 33.9c-5.4 10.8-2.3 20.2 3.8 24.7 7.5 5.7 16.7 1.6 24.1-5.2C46 46.8 54.5 30.1 61 17.7 53.4 9.7 49 6.3 44.5 2Z"
            fill="#94c9ab"
          />
        </svg>
      </section>

      {/* Présentation rapide */}
      <section className="px-6 md:px-20 py-12 text-center">
        <p className="text-lg md:text-xl text-text max-w-3xl mx-auto leading-relaxed">
          Je m'appelle Mélissa, praticienne en aromathérapie. J'accompagne les
          femmes de tous âges grâce à une approche douce, personnalisée et
          profondément humaine.
        </p>
        <Link
          to="/a-propos"
          className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-full shadow-md hover:bg-[#94c9ab] transition"
        >
          En savoir plus
        </Link>
      </section>

      {/* Aperçu des services */}
      <section className="bg-[#F7F9F9] px-6 md:px-20 py-16">
        <h2 className="text-3xl font-bold text-primary text-center mb-10">
          Mes services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.slice(0, 3).map((service, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition"
            >
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-text">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/services"
            className="bg-primary text-white px-6 py-3 rounded-full shadow-md hover:bg-[#94c9ab] transition"
          >
            Voir tous les services
          </Link>
        </div>
      </section>

      {/* Galerie d’ambiance */}
      <section className="px-6 md:px-20 py-16 bg-white">
        <h2 className="text-2xl font-bold text-primary text-center mb-8">
          Une ambiance douce et naturelle
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {[1, 2, 3, 4].map((num) => (
            <img
              key={num}
              src={`/images/aroma-${num}.jpg`}
              alt={`Ambiance aroma ${num}`}
              className="rounded-lg shadow-sm object-cover w-full h-full"
            />
          ))}
        </div>
      </section>

      {/* Valeurs */}
      <section className="text-center px-6 md:px-20 py-12 text-text bg-[#F7F9F9]">
        <p className="text-lg font-medium">
          🌸 Bienveillance – 🌿 Écoute – 💧 Naturel
        </p>
      </section>

      {/* Appel à l’action final */}
      <section className="text-center px-6 md:px-20 py-16">
        <h3 className="text-2xl font-bold text-primary mb-4">
          Vous souhaitez réserver une séance ?
        </h3>
        <Link
          to="/prendre-rendez-vous"
          className="bg-primary text-white px-8 py-3 rounded-full shadow-md hover:bg-[#94c9ab] transition"
        >
          Prendre rendez-vous
        </Link>
      </section>
    </div>
  );
};

export default Home;
