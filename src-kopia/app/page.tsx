
"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  Star,
  UserRound,
  X,
} from "lucide-react";

import SiteHeader from "@/components/SiteHeader/SiteHeader";
import { PolishText } from "./polish-text";

const locations = [
  {
    id: "demo",
    name: "Lokalizacja demonstracyjna",
    badge: "Dane demonstracyjne",
    address: "ul. Przykładowa 12",
    postal: "00-000 Warszawa",
    phone: "+48 000 000 000",
    mapQuery: "ul. Przykładowa 12, Warszawa",
    hours: [
      ["Poniedziałek – Piątek", "09:00–20:00"],
      ["Sobota", "09:00–15:00"],
      ["Niedziela", "09:00–12:00"],
    ],
  },
];

const doctors = [
  {
    id: "anna",
    name: "lek. wet. Anna Kowalska",
    specialty: "Choroby wewnętrzne • psy i koty",
    initials: "AK",
  },
  {
    id: "marek",
    name: "lek. wet. Marek Nowak",
    specialty: "Diagnostyka • profilaktyka",
    initials: "MN",
  },
  {
    id: "kasia",
    name: "lek. wet. Katarzyna Zielińska",
    specialty: "Chirurgia • stomatologia",
    initials: "KZ",
  },
];

const services = [
  {
    title: "Profilaktyka",
    text: "Szczepienia, badania kontrolne, odrobaczanie i opieka profilaktyczna.",
    image: "/assets/illustrations/service-1.webp",
  },
  {
    title: "Diagnostyka",
    text: "Badania laboratoryjne, USG, EKG, RTG i diagnostyka chorób.",
    image: "/assets/illustrations/service-2.webp",
  },
  {
    title: "Choroby wewnętrzne",
    text: "Diagnostyka i leczenie chorób wewnętrznych psów i kotów.",
    image: "/assets/illustrations/service-3.webp",
  },
  {
    title: "Chirurgia",
    text: "Zabiegi chirurgiczne oraz opieka przed- i pooperacyjna.",
    image: "/assets/illustrations/service-4.webp",
  },
  {
    title: "Stomatologia",
    text: "Profilaktyka i leczenie chorób jamy ustnej.",
    image: "/assets/illustrations/service-5.webp",
  },
];

const reviews = [
  {
    name: "Anna",
    meta: "Opinia demonstracyjna",
    rating: 5,
    text: "Przykładowa opinia pokazująca, jak można prezentować doświadczenia klientów w projekcie demonstracyjnym.",
    avatar: "A",
  },
  {
    name: "Marek",
    meta: "Opinia demonstracyjna",
    rating: 5,
    text: "Przykładowa treść opinii — wyłącznie na potrzeby prezentacji interfejsu strony.",
    avatar: "M",
  },
  {
    name: "Kasia",
    meta: "Opinia demonstracyjna",
    rating: 5,
    text: "Przykładowa opinia ilustrująca sposób prezentacji krótkiego komentarza klienta.",
    avatar: "K",
  },
  {
    name: "Piotr",
    meta: "Opinia demonstracyjna",
    rating: 5,
    text: "Przykładowa opinia dla fikcyjnej marki — dane nie przedstawiają rzeczywistych klientów.",
    avatar: "P",
  },
  {
    name: "Natalia",
    meta: "Opinia demonstracyjna",
    rating: 5,
    text: "Przykładowa treść przygotowana wyłącznie jako element projektu portfolio.",
    avatar: "N",
  },
];

const values = [
  {
    title: "Doświadczenie",
    text: "Wiedza i praktyka zdobywane przez lata pracy ze zwierzętami.",
  },
  {
    title: "Rozwój",
    text: "Rozwijamy przychodnię i zaplecze diagnostyczne.",
  },
  {
    title: "Indywidualne podejście",
    text: "Opieka jest dopasowana do konkretnego pacjenta.",
  },
  {
    title: "Zaufanie",
    text: "Liczy się dla nas zarówno zwierzę, jak i jego opiekun.",
  },
];

const steps = [
  {
    title: "Wybierz termin",
    text: "Wybierz lekarza, dzień i dogodną godzinę wizyty.",
    image: "/assets/illustrations/process-1.webp",
  },
  {
    title: "Podaj dane",
    text: "Wpisz podstawowe dane opiekuna i pacjenta.",
    image: "/assets/illustrations/process-2.webp",
  },
  {
    title: "Potwierdź",
    text: "Sprawdź podsumowanie i potwierdź demonstracyjną rezerwację.",
    image: "/assets/illustrations/process-3.webp",
  },
  {
    title: "Gotowe",
    text: "Otrzymasz potwierdzenie na ekranie — bez zapisu do bazy.",
    image: "/assets/illustrations/process-4.webp",
  },
];

const faqs = [
  {
    question: "Czy trzeba wcześniej umawiać wizytę?",
    answer:
      "W tej wersji demonstracyjnej możesz zarówno przyjść bez rezerwacji, jak i przejść przez pokazowy formularz „Umów wizytę”. Rezerwacja nie jest zapisywana w bazie.",
  },
  {
    question: "Czy mogę wybrać konkretnego lekarza?",
    answer:
      "Tak. W demonstracyjnym formularzu możesz wybrać lekarza, usługę, dzień oraz godzinę.",
  },
  {
    question: "Czy dane z formularza są zapisywane?",
    answer:
      "Nie. To wersja demonstracyjna interfejsu. Dane wpisane w formularzu służą wyłącznie do pokazania przebiegu rezerwacji i nie są wysyłane ani zapisywane w bazie.",
  },
  {
    question: "Czy dostanę prawdziwe potwierdzenie wizyty?",
    answer:
      "Nie. Po kliknięciu potwierdzenia pojawia się wyłącznie ekran demonstracyjny. Nie jest wysyłany e-mail ani SMS.",
  },
  {
    question: "Czy mogę przyjść z psem lub kotem?",
    answer: "Tak. Projekt prezentuje opiekę weterynaryjną dla psów i kotów.",
  },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    if (rect.bottom <= 0) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

function Stars() {
  return (
    <div className="stars" aria-label="5 na 5 gwiazdek">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} size={11} strokeWidth={1.5} fill="currentColor" />
      ))}
    </div>
  );
}

function makeDate(offset: number) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return date;
}

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

function getDemoSlots(doctorId: string, dayOffset: number) {
  const base = ["09:30", "10:30", "12:00", "14:00", "15:30", "17:00"];
  const shift = (doctorId.length + dayOffset) % 3;
  return base.filter((_, index) => (index + shift) % 4 !== 0);
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0].id);
  const [selectedDayOffset, setSelectedDayOffset] = useState(1);
  const [selectedTime, setSelectedTime] = useState("");
  const [service, setService] = useState("Konsultacja");
  const [ownerName, setOwnerName] = useState("");
  const [petName, setPetName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bookingDone, setBookingDone] = useState(false);
  const [bookingNotice, setBookingNotice] = useState("");

  const closeMenu = () => setMenuOpen(false);

  const reviewGridRef = useRef<HTMLDivElement>(null);
  const [canScrollReviewsPrev, setCanScrollReviewsPrev] = useState(false);
  const [canScrollReviewsNext, setCanScrollReviewsNext] = useState(true);

  const updateReviewNavigation = () => {
    const element = reviewGridRef.current;
    if (!element) return;
    const maxScrollLeft = element.scrollWidth - element.clientWidth;
    setCanScrollReviewsPrev(element.scrollLeft > 2);
    setCanScrollReviewsNext(element.scrollLeft < maxScrollLeft - 2);
  };

  const scrollReviews = (direction: "prev" | "next") => {
    const element = reviewGridRef.current;
    if (!element) return;
    const card = element.querySelector<HTMLElement>(".review-grid > .reveal");
    if (!card) return;
    element.scrollBy({
      left: direction === "next" ? card.offsetWidth + 15 : -(card.offsetWidth + 15),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const element = reviewGridRef.current;
    if (!element) return;
    updateReviewNavigation();
    element.addEventListener("scroll", updateReviewNavigation, { passive: true });
    window.addEventListener("resize", updateReviewNavigation);
    return () => {
      element.removeEventListener("scroll", updateReviewNavigation);
      window.removeEventListener("resize", updateReviewNavigation);
    };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("is-ready");
    const frame = requestAnimationFrame(() => html.classList.add("is-ready"));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!bookingOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [bookingOpen]);

  const selectedDoctorData =
    doctors.find((doctor) => doctor.id === selectedDoctor) ?? doctors[0];
  const selectedDate = makeDate(selectedDayOffset);
  const slots = getDemoSlots(selectedDoctor, selectedDayOffset);

  const openBooking = () => {
    setBookingOpen(true);
    setBookingStep(1);
    setBookingDone(false);
    setBookingNotice("");
    setSelectedTime("");
  };

  const closeBooking = () => {
    setBookingOpen(false);
    setBookingDone(false);
    setBookingNotice("");
  };

  const nextBookingStep = () => {
    if (bookingStep === 1 && !selectedTime) {
      setBookingNotice("Wybierz godzinę wizyty, aby przejść dalej.");
      return;
    }
    if (bookingStep === 2 && (!ownerName.trim() || !petName.trim() || !phone.trim())) {
      setBookingNotice("Uzupełnij imię i nazwisko, imię pupila oraz telefon.");
      return;
    }
    setBookingNotice("");
    setBookingStep((step) => Math.min(3, step + 1));
  };

  const confirmBooking = () => {
    setBookingDone(true);
    setBookingStep(4);
    setBookingNotice("");
  };

  return (
    <>
      <SiteHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} closeMenu={closeMenu} />

      <main>
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div className="hero-copy">
              <Reveal>
                <h1>
                  <PolishText>Twój pupil</PolishText>
                  <br />
                  <PolishText>potrzebuje pomocy?</PolishText>
                  <br />
                  <em><PolishText>Jesteśmy.</PolishText></em>
                </h1>
              </Reveal>

              <Reveal delay={80}>
                <p className="hero-intro">
                  <PolishText>
                    Opieka weterynaryjna dla psów i kotów. Możesz przyjść bez rezerwacji albo wygodnie umówić wizytę online.
                  </PolishText>
                </p>
              </Reveal>

              <Reveal delay={150}>
                <div className="hero-actions">
                  <button type="button" className="button button-primary" onClick={openBooking}>
                    <CalendarDays size={15} strokeWidth={1.7} />
                    <PolishText>Umów wizytę</PolishText>
                  </button>
                  <a href="#visit" className="button button-secondary">
                    <PolishText>Sprawdź gdzie przyjechać</PolishText>
                  </a>
                </div>
              </Reveal>

              <Reveal delay={220}>
                <div className="hero-reassurance">
                  <span className="status-dot" aria-hidden="true" />
                  <span>
                    <PolishText>
                      Nie musisz rezerwować terminu. Jeśli wolisz, możesz też wybrać lekarza, dzień i godzinę w formularzu demonstracyjnym.
                    </PolishText>
                  </span>
                </div>
              </Reveal>
            </div>

            <Reveal className="hero-visual" delay={150}>
              <div className="hero-image">
                <img src="/assets/illustrations/hero-vet.webp" alt="Weterynarka opiekująca się psem" />
              </div>
            </Reveal>
          </div>

          <div className="container hero-proof">
            <Reveal>
              <div className="proof">
                <strong><PolishText>Psy i koty</PolishText></strong>
                <p><PolishText>Opieka nad najbliższymi Ci pacjentami.</PolishText></p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="proof">
                <strong><PolishText>Umów wizytę</PolishText></strong>
                <p><PolishText>Wybierz lekarza, termin i godzinę online.</PolishText></p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="proof">
                <strong><PolishText>Wersja demo</PolishText></strong>
                <p><PolishText>Formularz nie zapisuje ani nie wysyła danych.</PolishText></p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section visit-section" id="visit">
          <div className="container visit-layout">
            <Reveal className="visit-intro">
              <h2>
                <PolishText>Wybierz, jak</PolishText>
                <br />
                <em><PolishText>chcesz przyjść.</PolishText></em>
              </h2>
              <p>
                <PolishText>
                  Możesz pojawić się w godzinach przyjęć bez wcześniejszej rezerwacji albo skorzystać z pokazowego kalendarza i umówić konkretny termin.
                </PolishText>
              </p>

              <div className="visit-alert">
                <span className="visit-alert-icon" aria-hidden="true"><Check width={14} height={14} strokeWidth={2} /></span>
                <div>
                  <strong><PolishText>Rezerwacja online — wersja demonstracyjna</PolishText></strong>
                  <span><PolishText>Wybrany termin i podane dane są używane tylko w tej sesji. Nie trafiają do bazy danych.</PolishText></span>
                </div>
              </div>

              <button type="button" className="button button-primary booking-cta" onClick={openBooking}>
                <CalendarDays size={15} strokeWidth={1.7} />
                <PolishText>Umów wizytę</PolishText>
                <ArrowRight size={14} strokeWidth={1.7} />
              </button>
            </Reveal>

            <Reveal className="locations-list" delay={80}>
              {locations.map((location) => (
                <article className="location" key={location.id}>
                  <div>
                    <span className="demo-badge">{location.badge}</span>
                    <h3 className="location-name"><PolishText>{location.name}</PolishText></h3>
                    <p className="location-address">
                      <PolishText>{location.address}</PolishText><br />
                      <PolishText>{location.postal}</PolishText>
                    </p>
                    <a className="location-phone" href={`tel:${location.phone.replace(/\s/g, "")}`}>
                      <PolishText>{location.phone}</PolishText>
                    </a>
                    <br />
                    <a
                      className="location-map"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapQuery)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MapPin size={14} strokeWidth={1.7} />
                      <PolishText>Pokaż lokalizację na mapie</PolishText>
                      <ArrowRight size={14} strokeWidth={1.7} />
                    </a>
                  </div>

                  <div className="location-right">
                    <div className="hours-heading">
                      <span><PolishText>GODZINY PRZYJĘĆ</PolishText></span>
                      <span><PolishText>● BEZ REZERWACJI</PolishText></span>
                    </div>
                    {location.hours.map(([day, hours]) => (
                      <div className="hours-row" key={day}>
                        <span><PolishText>{day}</PolishText></span>
                        <strong><PolishText>{hours}</PolishText></strong>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="section section-soft" id="about">
          <div className="container about-grid">
            <Reveal className="about-photo">
              <img src="/assets/illustrations/about-vet.webp" alt="Weterynarka podczas opieki nad zwierzęciem" />
            </Reveal>

            <Reveal className="about-copy" delay={80}>
              <h2>
                <PolishText>Dobra opieka zaczyna się od</PolishText>
                <br />
                <em><PolishText>uważności.</PolishText></em>
              </h2>
              <p className="lead">
                <PolishText>
                  Vetera — opieka weterynaryjna to miejsce, w którym doświadczenie spotyka się z diagnostyką i codzienną troską o zwierzęta.
                </PolishText>
              </p>
              <p>
                <PolishText>
                  Rozwijamy przychodnię i jej zaplecze, ale nie chcemy komplikować kontaktu z nami. Dlatego wprowadzamy dwie proste ścieżki: wizytę bez rezerwacji oraz możliwość pokazowego umówienia konkretnego terminu.
                </PolishText>
              </p>

              <div className="values">
                {values.map((value, index) => (
                  <Reveal key={value.title} delay={index * 70}>
                    <div className="value">
                      <h3><PolishText>{value.title}</PolishText></h3>
                      <p><PolishText>{value.text}</PolishText></p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section section-light" id="services">
          <div className="container">
            <Reveal className="section-head center">
              <h2>
                <PolishText>Od profilaktyki</PolishText>
                <br />
                <PolishText>po </PolishText><em><PolishText>leczenie.</PolishText></em>
              </h2>
              <p><PolishText>Zakres opieki dobieramy do potrzeb konkretnego pacjenta — od rutynowych badań po diagnostykę i zabiegi.</PolishText></p>
            </Reveal>

            <div className="services">
              {services.map((service, index) => (
                <Reveal key={service.title} delay={index * 70}>
                  <article className="service">
                    <img className="service-illustration" src={service.image} alt="" />
                    <h3><PolishText>{service.title}</PolishText></h3>
                    <p><PolishText>{service.text}</PolishText></p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="development">
          <div className="container development-grid">
            <Reveal>
              <h2>
                <PolishText>Nowa przestrzeń.</PolishText>
                <br />
                <PolishText>Ta sama</PolishText>
                <br />
                <em><PolishText>troska.</PolishText></em>
              </h2>
              <p>
                <PolishText>
                  Rozwijamy przychodnię, żeby móc jeszcze lepiej odpowiadać na potrzeby naszych pacjentów. Zmienia się przestrzeń, ale najważniejsze pozostaje bez zmian — sposób, w jaki traktujemy zwierzęta i ich opiekunów.
                </PolishText>
              </p>
              <a href="#visit" className="text-link">
                <PolishText>Sprawdź aktualną lokalizację</PolishText>
                <ArrowRight size={14} strokeWidth={1.7} />
              </a>
            </Reveal>

            <Reveal className="development-photo" delay={80}>
              <img src="/assets/illustrations/development-vet.webp" alt="Weterynarka podczas pracy w przychodni" />
            </Reveal>
          </div>
        </section>

        <section className="section section-soft" id="opinions">
          <div className="container">
            <Reveal className="section-head split">
              <div>
                <h2>
                  <PolishText>Zaufanie buduje się</PolishText>
                  <br />
                  <PolishText>podczas </PolishText><em><PolishText>każdej wizyty.</PolishText></em>
                </h2>
              </div>
              <div className="reviews-summary">
                <span className="google"><PolishText>Opinie demonstracyjne</PolishText></span>
                <div className="rating">
                  <strong>5,0</strong>
                  <Stars />
                  <small><PolishText>przykładowe opinie</PolishText></small>
                </div>
              </div>
            </Reveal>

            <div className="review-scroll">
              <div ref={reviewGridRef} className="review-grid">
                {reviews.map((review, index) => (
                  <Reveal key={`${review.name}-${index}`} delay={index * 70}>
                    <article className="review">
                      <div className="review-header">
                        <span className="review-avatar">{review.avatar}</span>
                        <div>
                          <span className="review-name"><PolishText>{review.name}</PolishText></span>
                          <span className="review-source"><PolishText>{review.meta}</PolishText></span>
                        </div>
                        <Stars />
                      </div>
                      <p><PolishText>{review.text}</PolishText></p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="review-nav" aria-label="Nawigacja opinii">
              <button type="button" className="review-nav-button" onClick={() => scrollReviews("prev")} disabled={!canScrollReviewsPrev} aria-label="Poprzednie opinie">
                <ChevronLeft size={17} strokeWidth={1.7} />
              </button>
              <button type="button" className="review-nav-button" onClick={() => scrollReviews("next")} disabled={!canScrollReviewsNext} aria-label="Następne opinie">
                <ChevronRight size={17} strokeWidth={1.7} />
              </button>
            </div>
            <div className="review-note"><PolishText>Przykładowe opinie — dane demonstracyjne.</PolishText></div>
          </div>
        </section>

        <section className="section section-light">
          <div className="container">
            <Reveal className="section-head center">
              <h2>
                <PolishText>Umów wizytę w</PolishText>
                <br />
                <em><PolishText>kilku krokach.</PolishText></em>
              </h2>
              <p><PolishText>Pokazowy proces wyboru terminu, lekarza i danych pacjenta — bez bazy danych.</PolishText></p>
            </Reveal>

            <div className="process-grid">
              {steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 70}>
                  <div className="process-step">
                    <img className="process-illustration" src={step.image} alt="" />
                    <h3><PolishText>{step.title}</PolishText></h3>
                    <p><PolishText>{step.text}</PolishText></p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="process-action">
              <button type="button" className="button button-primary" onClick={openBooking}>
                <CalendarDays size={15} strokeWidth={1.7} />
                <PolishText>Otwórz kalendarz wizyt</PolishText>
              </button>
              <span><ShieldCheck size={14} /><PolishText>Dane pozostają tylko w tej demonstracji.</PolishText></span>
            </div>
          </div>
        </section>

        <section className="section section-soft" id="faq">
          <div className="container faq-grid">
            <Reveal className="faq-intro">
              <h2><PolishText>Najważniejsze</PolishText><br /><PolishText>odpowiedzi.</PolishText></h2>
              <p><PolishText>Jeśli czegoś nie ma poniżej, najlepiej skontaktować się z nami telefonicznie.</PolishText></p>
              <a href="tel:+48000000000" className="text-link">
                <PolishText>Zadzwoń do przychodni</PolishText>
                <ArrowRight size={14} strokeWidth={1.7} />
              </a>
            </Reveal>

            <Reveal className="faq-list" delay={80}>
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div className={`faq-item ${isOpen ? "open" : ""}`} key={faq.question}>
                    <button
                      type="button"
                      className="faq-question"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <span><PolishText>{faq.question}</PolishText></span>
                      <span className="faq-plus">
                        {isOpen ? <Minus size={15} strokeWidth={1.7} /> : <Plus size={15} strokeWidth={1.7} />}
                      </span>
                    </button>
                    <div className="faq-answer">
                      <div className="faq-answer-inner">
                        <p><PolishText>{faq.answer}</PolishText></p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Reveal>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="container contact-grid">
            <Reveal className="contact-copy">
              <h2><PolishText>Twój pupil</PolishText><br /><PolishText>potrzebuje</PolishText><br /><em><PolishText>pomocy?</PolishText></em></h2>
              <p><PolishText>Zadzwoń, przyjdź bez rezerwacji albo wybierz pokazowy termin online.</PolishText></p>
            </Reveal>

            <Reveal className="contact-action" delay={80}>
              <button type="button" className="contact-booking" onClick={openBooking}>
                <span><CalendarDays size={17} /><PolishText>Umów wizytę</PolishText></span>
                <ArrowRight size={18} strokeWidth={1.7} />
              </button>
              <a className="contact-phone" href="tel:+48000000000">
                <span><PolishText>+48 000 000 000</PolishText></span>
                <Phone size={17} strokeWidth={1.7} />
              </a>
              <span className="contact-note"><PolishText>Projekt demonstracyjny — telefon i rezerwacja są przykładowe.</PolishText></span>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <a href="#home" className="footer-logo" aria-label="Vetera — strona główna"><span aria-hidden="true">VETERA</span></a>
            <p><PolishText>Koncepcja strony dla fikcyjnej marki z branży weterynaryjnej.</PolishText></p>
          </div>
          <div className="footer-column">
            <span className="footer-label"><PolishText>NA STRONIE</PolishText></span>
            <a href="#visit"><PolishText>Wizyta</PolishText></a>
            <a href="#about"><PolishText>O nas</PolishText></a>
            <a href="#services"><PolishText>Zakres opieki</PolishText></a>
          </div>
          <div className="footer-column">
            <span className="footer-label"><PolishText>INFORMACJE</PolishText></span>
            <a href="#opinions"><PolishText>Opinie</PolishText></a>
            <a href="#faq"><PolishText>FAQ</PolishText></a>
            <a href="#contact"><PolishText>Kontakt</PolishText></a>
          </div>
          <div className="footer-column footer-contact">
            <span className="footer-label"><PolishText>DANE DEMONSTRACYJNE</PolishText></span>
            <span><PolishText>+48 000 000 000</PolishText></span>
            <span><PolishText>Przykładowa 12, Warszawa</PolishText></span>
          </div>
        </div>
        <div className="container footer-disclosure">
          <p><PolishText>Projekt koncepcyjny — fikcyjna marka i dane demonstracyjne. Nie jest to strona rzeczywistej przychodni ani oferta świadczenia usług.</PolishText></p>
          <p><PolishText>Formularz „Umów wizytę” jest interaktywną demonstracją. Dane nie są zapisywane w bazie, nie są wysyłane do serwera i nie generują prawdziwej rezerwacji.</PolishText></p>
          <p><PolishText>Materiały wizualne wykorzystane w projekcie mają charakter demonstracyjny. Projekt: KBUI.</PolishText></p>
        </div>
        <div className="container footer-bottom">
          <span><PolishText>© 2026 Vetera — projekt demonstracyjny</PolishText></span>
          <span><PolishText>Autor: KBUI</PolishText></span>
        </div>
      </footer>

      {bookingOpen && (
        <div className="booking-overlay" role="dialog" aria-modal="true" aria-labelledby="booking-title">
          <div className="booking-backdrop" onClick={closeBooking} />
          <div className="booking-modal">
            <div className="booking-header">
              <div>
                <span className="booking-kicker"><PolishText>REZERWACJA DEMONSTRACYJNA</PolishText></span>
                <h2 id="booking-title">
                  {bookingDone ? <PolishText>Wizyta gotowa.</PolishText> : <><PolishText>Umów</PolishText><br /><em><PolishText>wizytę.</PolishText></em></>}
                </h2>
              </div>
              <button type="button" className="booking-close" onClick={closeBooking} aria-label="Zamknij">
                <X size={19} />
              </button>
            </div>

            {!bookingDone && (
              <>
                <div className="booking-steps" aria-label="Postęp rezerwacji">
                  {[1, 2, 3].map((step) => (
                    <div className={`booking-step-dot ${bookingStep >= step ? "active" : ""}`} key={step}>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                {bookingStep === 1 && (
                  <div className="booking-content">
                    <div className="demo-info">
                      <ShieldCheck size={17} />
                      <div>
                        <strong><PolishText>Bezpieczna demonstracja</PolishText></strong>
                        <span><PolishText>To tylko interfejs. Dane nie są zapisywane ani wysyłane.</PolishText></span>
                      </div>
                    </div>

                    <div className="booking-field">
                      <label><UserRound size={14} /><PolishText>Wybierz lekarza</PolishText></label>
                      <div className="doctor-list">
                        {doctors.map((doctor) => (
                          <button
                            type="button"
                            className={`doctor-card ${selectedDoctor === doctor.id ? "selected" : ""}`}
                            key={doctor.id}
                            onClick={() => {
                              setSelectedDoctor(doctor.id);
                              setSelectedTime("");
                              setBookingNotice("");
                            }}
                          >
                            <span className="doctor-avatar">{doctor.initials}</span>
                            <span>
                              <strong><PolishText>{doctor.name}</PolishText></strong>
                              <small><PolishText>{doctor.specialty}</PolishText></small>
                            </span>
                            <Check size={15} className="doctor-check" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="booking-field">
                      <label><CalendarDays size={14} /><PolishText>Wybierz dzień</PolishText></label>
                      <div className="date-strip">
                        {[1, 2, 3, 4, 5, 6].map((offset) => {
                          const date = makeDate(offset);
                          const selected = selectedDayOffset === offset;
                          return (
                            <button
                              type="button"
                              className={`date-card ${selected ? "selected" : ""}`}
                              key={dateKey(date)}
                              onClick={() => {
                                setSelectedDayOffset(offset);
                                setSelectedTime("");
                                setBookingNotice("");
                              }}
                            >
                              <span>{new Intl.DateTimeFormat("pl-PL", { weekday: "short" }).format(date).replace(".", "")}</span>
                              <strong>{date.getDate()}</strong>
                              <small>{new Intl.DateTimeFormat("pl-PL", { month: "short" }).format(date).replace(".", "")}</small>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="booking-field">
                      <label><Clock3 size={14} /><PolishText>Wybierz godzinę</PolishText></label>
                      <div className="time-grid">
                        {slots.map((time) => (
                          <button
                            type="button"
                            className={`time-slot ${selectedTime === time ? "selected" : ""}`}
                            key={time}
                            onClick={() => {
                              setSelectedTime(time);
                              setBookingNotice("");
                            }}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="booking-actions">
                      <button type="button" className="button button-primary" onClick={nextBookingStep}>
                        <PolishText>Dalej</PolishText><ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div className="booking-content">
                    <div className="booking-summary-mini">
                      <div><CalendarDays size={15} /><span><PolishText>{formatDate(selectedDate)}</PolishText></span></div>
                      <div><Clock3 size={15} /><span>{selectedTime}</span></div>
                      <div><UserRound size={15} /><span><PolishText>{selectedDoctorData.name}</PolishText></span></div>
                    </div>

                    <div className="booking-form-grid">
                      <label>
                        <span><PolishText>Imię i nazwisko opiekuna *</PolishText></span>
                        <input value={ownerName} onChange={(event) => setOwnerName(event.target.value)} placeholder="np. Anna Kowalska" />
                      </label>
                      <label>
                        <span><PolishText>Imię pupila *</PolishText></span>
                        <input value={petName} onChange={(event) => setPetName(event.target.value)} placeholder="np. Luna" />
                      </label>
                      <label>
                        <span><PolishText>Telefon *</PolishText></span>
                        <input value={phone} onChange={(event) => setPhone(event.target.value)} inputMode="tel" placeholder="+48 000 000 000" />
                      </label>
                      <label>
                        <span><PolishText>E-mail (opcjonalnie)</PolishText></span>
                        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="anna@example.com" />
                      </label>
                      <label className="full">
                        <span><PolishText>Rodzaj wizyty</PolishText></span>
                        <select value={service} onChange={(event) => setService(event.target.value)}>
                          <option>Konsultacja</option>
                          <option>Profilaktyka</option>
                          <option>Diagnostyka</option>
                          <option>Stomatologia</option>
                          <option>Kontrola</option>
                        </select>
                      </label>
                    </div>

                    <div className="demo-disclosure">
                      <ShieldCheck size={16} />
                      <span><PolishText>Podane dane są przykładowe. Nie są zapisywane w bazie ani przesyłane poza tę demonstrację.</PolishText></span>
                    </div>

                    <div className="booking-actions split">
                      <button type="button" className="button button-secondary" onClick={() => setBookingStep(1)}>
                        <ChevronLeft size={14} /><PolishText>Wstecz</PolishText>
                      </button>
                      <button type="button" className="button button-primary" onClick={nextBookingStep}>
                        <PolishText>Sprawdź</PolishText><ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {bookingStep === 3 && (
                  <div className="booking-content">
                    <div className="confirmation-card">
                      <span className="confirmation-icon"><Check size={20} /></span>
                      <div>
                        <span className="booking-kicker"><PolishText>PODSUMOWANIE</PolishText></span>
                        <h3><PolishText>Sprawdź szczegóły wizyty</PolishText></h3>
                      </div>
                    </div>

                    <div className="confirmation-list">
                      <div><span><PolishText>Lekarz</PolishText></span><strong><PolishText>{selectedDoctorData.name}</PolishText></strong></div>
                      <div><span><PolishText>Termin</PolishText></span><strong><PolishText>{formatDate(selectedDate)}</PolishText>, {selectedTime}</strong></div>
                      <div><span><PolishText>Pacjent</PolishText></span><strong><PolishText>{petName || "—"}</PolishText></strong></div>
                      <div><span><PolishText>Opiekun</PolishText></span><strong><PolishText>{ownerName || "—"}</PolishText></strong></div>
                      <div><span><PolishText>Rodzaj wizyty</PolishText></span><strong><PolishText>{service}</PolishText></strong></div>
                    </div>

                    <div className="demo-disclosure large">
                      <ShieldCheck size={17} />
                      <span><strong><PolishText>To nie jest prawdziwa rezerwacja.</PolishText></strong><PolishText> Kliknięcie przycisku poniżej pokaże ekran sukcesu, ale nie zapisze danych, nie wyśle wiadomości i nie zablokuje terminu.</PolishText></span>
                    </div>

                    <div className="booking-actions split">
                      <button type="button" className="button button-secondary" onClick={() => setBookingStep(2)}>
                        <ChevronLeft size={14} /><PolishText>Edytuj dane</PolishText>
                      </button>
                      <button type="button" className="button button-primary" onClick={confirmBooking}>
                        <Check size={14} /><PolishText>Potwierdź demo</PolishText>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {bookingDone && (
              <div className="booking-success">
                <span className="success-icon"><Check size={26} /></span>
                <span className="booking-kicker"><PolishText>DEMONSTRACJA ZAKOŃCZONA</PolishText></span>
                <h3><PolishText>Termin wygląda świetnie.</PolishText></h3>
                <p>
                  <PolishText>
                    Pokazowa wizyta została „potwierdzona” tylko na ekranie. Nie została zapisana w bazie i nie została wysłana do przychodni.
                  </PolishText>
                </p>
                <div className="success-details">
                  <strong><PolishText>{formatDate(selectedDate)}</PolishText>, {selectedTime}</strong>
                  <span><PolishText>{selectedDoctorData.name}</PolishText> • <PolishText>{petName || "Twój pupil"}</PolishText></span>
                </div>
                <button type="button" className="button button-primary" onClick={closeBooking}>
                  <PolishText>Zamknij demonstrację</PolishText>
                </button>
              </div>
            )}

            {bookingNotice && <div className="booking-notice" role="alert">{bookingNotice}</div>}
          </div>
        </div>
      )}
    </>
  );
}
