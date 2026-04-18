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

function App() {
  const galleryImages = import.meta.glob("./assets/*.{jpg,jpeg,png,svg}", {
    eager: true,
    import: "default",
  });

  const iconImages = import.meta.glob("./assets/icon-*.svg", {
    eager: true,
    import: "default",
  });

  const resolveAsset = (assetMap, fileName) =>
    assetMap[`./assets/${fileName}`] ?? "";

  const extraGalleryItems = [
    {
      title: "Изкоп за улично трасе",
      description:
        "Работа по тесен изкоп в урбанизирана среда с прецизно оформяне на трасето и извозване на материала.",
      alt: "Комбиниран багер работи по изкоп за улично трасе между жилищни сгради",
      image: "Image (4).jpg",
    },
    {
      title: "Товарене на инертни материали",
      description:
        "Челен товарач зарежда самосвал директно на обекта за бърз транспорт на насипни материали.",
      alt: "Челен товарач пълни самосвал с инертни материали на строителен обект",
      image: "Image (6).jpg",
    },
    {
      title: "Дълбок изкоп с гофрирана тръба",
      description:
        "Изкоп за подземна инфраструктура с оформени стени и подготовка за полагане на тръбни връзки.",
      alt: "Дълбок машинен изкоп с положена гофрирана тръба и багер на обекта",
      image: "Image (5).jpg",
    },
  ];

  const services = content.services.map((service) => ({
    ...service,
    iconSrc: resolveAsset(iconImages, service.icon),
  }));

  const advantages = content.advantages.map((advantage) => ({
    ...advantage,
    iconSrc: resolveAsset(iconImages, advantage.icon),
  }));

  const gallery = [...content.gallery, ...extraGalleryItems].map((item) => ({
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
    </AppLayout>
  );
}

export default App;
