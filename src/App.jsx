import AppLayout from "./components/layout/AppLayout";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import Advantages from "./components/sections/Advantages";
import Gallery from "./components/sections/Gallery";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import content from "./data/content.json";

function App() {
  const galleryImages = import.meta.glob("./assets/gallery-*.svg", {
    eager: true,
    import: "default",
  });

  const iconImages = import.meta.glob("./assets/icon-*.svg", {
    eager: true,
    import: "default",
  });

  const resolveAsset = (assetMap, fileName) =>
    assetMap[`./assets/${fileName}`] ?? "";

  const services = content.services.map((service) => ({
    ...service,
    iconSrc: resolveAsset(iconImages, service.icon),
  }));

  const advantages = content.advantages.map((advantage) => ({
    ...advantage,
    iconSrc: resolveAsset(iconImages, advantage.icon),
  }));

  const gallery = content.gallery.map((item) => ({
    ...item,
    imageSrc: resolveAsset(galleryImages, item.image),
  }));

  return (
    <AppLayout>
      <Navbar data={content.navbar} />

      <main>
        <Hero data={content.hero} />
        <Services data={content.servicesSection} items={services} />
        <Advantages data={content.advantagesSection} items={advantages} />
        <Gallery data={content.gallerySection} items={gallery} />
        <Contact data={content.contactSection} contact={content.contact} />
      </main>

      <Footer data={content.footer} contact={content.contact} />
    </AppLayout>
  );
}

export default App;