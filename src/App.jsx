import AppLayout from "./components/layout/AppLayout";
import { SharedSectionsBackground } from "./components/layout/Background";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import Advantages from "./components/sections/Advantages";
import Gallery from "./components/sections/Gallery";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import content from "./data/content.json";
import phoneCallIcon from "./assets/phone-call.png";
import CookieBanner from "./components/CookieBanner";

function App() {
  const galleryImages = import.meta.glob("./assets/*.{jpg,jpeg,png,svg}", {
    eager: true,
    import: "default",
  });

  const resolveAsset = (assetMap, fileName) =>
    assetMap[`./assets/${fileName}`] ?? "";

  const services = content.services;

  const advantages = content.advantages;

  const gallery = content.gallery.map((item) => ({
    ...item,
    imageSrc: resolveAsset(galleryImages, item.image),
  }));

  return (
    <AppLayout>
      <Navbar data={content.navbar} />

      <main>
        <Hero data={content.hero} />
        <SharedSectionsBackground>
          <Services data={content.servicesSection} items={services} />
          <Gallery data={content.gallerySection} items={gallery} />
          <Advantages data={content.advantagesSection} items={advantages} />
          <Contact data={content.contactSection} contact={content.contact} />
          <Footer data={content.footer} contact={content.contact} />
        </SharedSectionsBackground>
      </main>

      <a
        href={`tel:${content.contact.phoneRaw}`}
        className="fixed bottom-4 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/16 bg-[#171614]/88 shadow-[0_18px_36px_rgba(0,0,0,0.28)] backdrop-blur-sm transition hover:border-[#c4975b]/60 hover:bg-[#1f1d1a] sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
        aria-label={`Обади се на ${content.contact.phoneLabel}`}
      >
        <img src={phoneCallIcon} alt="" aria-hidden="true" className="h-7 w-7 object-contain sm:h-8 sm:w-8" />
      </a>
      <CookieBanner />
    </AppLayout>
  );
}

export default App;
