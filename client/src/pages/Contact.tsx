const Contact = () => {
  return (
    <section className="bg-[#FAF3E0] min-h-screen px-6 md:px-20 py-16 font-sans">
      <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-8">
        Me contacter
      </h1>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-8">
        {/* Coordonnées */}
        <div className="text-center space-y-2">
          <p>
            ✉️ <strong>Email :</strong>{" "}
            <a href="mailto:contact@aromessentielles.fr" className="underline">
              contact@aromessentielles.fr
            </a>
          </p>
          <p>
            📍 <strong>Localisation :</strong> Bordeaux, France
          </p>
        </div>

        {/* Formulaire */}
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Nom
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-1 font-medium">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-full shadow-md hover:bg-[#94c9ab] transition"
          >
            Envoyer le message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
