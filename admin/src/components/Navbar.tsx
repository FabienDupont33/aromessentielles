import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/appointments", label: "Rendez-vous" },
  { to: "/working-hours", label: "Horaires" },
  { to: "/clients", label: "Clients" }, // 🔥 Nouveau lien ajouté ici
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-primary text-white px-6 py-4 shadow-md flex justify-between items-center">
      <div className="text-lg font-bold">Admin Arom Essenti’Elles</div>
      <ul className="flex gap-6">
        {navLinks.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={`hover:underline ${
                location.pathname === link.to ? "font-semibold underline" : ""
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
