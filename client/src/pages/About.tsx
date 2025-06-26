const About = () => {
  return (
    <section className="bg-[#F7F9F9] min-h-screen px-6 md:px-20 py-16 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src="/images/aroma-2.jpg"
            alt="Ambiance aromathérapie"
            className="rounded-xl shadow-md object-cover w-full h-auto"
          />
        </div>

        {/* Texte */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            À propos
          </h1>

          <p className="text-text text-sm leading-relaxed">
            Je m'appelle <strong>Mélissa</strong>, praticienne en aromathérapie,
            animée par une passion profonde pour le bien-être et les solutions
            naturelles. <br />
            <br />
            C’est à travers mon propre parcours de femme — les hauts, les bas,
            les transitions — que j’ai découvert la richesse des huiles
            essentielles et leur pouvoir d’accompagnement physique, émotionnel
            et énergétique.
          </p>

          <p className="text-text text-sm leading-relaxed">
            Avec <strong>Arom Essenti’Elles</strong>, j’ai souhaité créer un
            espace doux, respectueux et bienveillant dédié aux femmes, de
            l’adolescence jusqu’à l’âge mûr. Mon approche est simple : écouter,
            comprendre, et proposer un accompagnement sur-mesure, basé sur
            l’expérience, l’intuition… et beaucoup de cœur.
          </p>

          <p className="text-text text-sm leading-relaxed">
            🌿 Mon souhait est de vous aider à vous reconnecter à vous-même, à
            votre corps et à vos émotions, en vous offrant des solutions
            naturelles adaptées à chaque étape de la vie féminine.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
