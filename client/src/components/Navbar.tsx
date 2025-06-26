import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center font-sans">
    <div className="flex items-center space-x-3">
      <img
        src="/images/logo.png"
        alt="Logo Arom Essenti’Elles"
        className="w-10 h-10 object-contain"
      />
      <span className="text-primary text-2xl font-semibold tracking-wide">
        Arom Essenti’Elles
      </span>
    </div>

    <div className="space-x-6 text-text text-base">
      <Link to="/" className="hover:text-primary transition">
        Accueil
      </Link>
      <Link to="/a-propos" className="hover:text-primary transition">
        À propos
      </Link>
      <Link to="/services" className="hover:text-primary transition">
        Services
      </Link>
      <Link to="/contact" className="hover:text-primary transition">
        Contact
      </Link>
    </div>
  </nav>
);

export default Navbar;
