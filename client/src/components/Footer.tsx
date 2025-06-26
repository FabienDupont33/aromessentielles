const Footer = () => {
  return (
    <footer className="relative bg-accent text-text pt-16 pb-8 mt-12 font-sans">
      {/* Vague décorative */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-[40px]"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            fill="#FAF3E0"
          />
        </svg>
      </div>

      {/* Contenu du footer */}
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 z-10 relative">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold text-primary">
            Arom Essenti’Elles
          </h3>
          <p className="mt-2 text-sm">
            Bien-être naturel & accompagnement personnalisé
            <br />à base d’huiles essentielles.
          </p>
        </div>

        <div className="text-sm text-center md:text-right space-y-2">
          <p>
            Email :{" "}
            <a href="mailto:contact@aromessentielles.fr" className="underline">
              contact@aromessentielles.fr
            </a>
          </p>
          <p>Adresse : Bordeaux, France</p>
          <p>
            &copy; {new Date().getFullYear()} Arom Essenti’Elles. Tous droits
            réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
