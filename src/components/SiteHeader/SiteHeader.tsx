"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import styles from "./SiteHeader.module.css";

const openingHours = [
  ["09:00", "12:00"], // niedziela
  ["09:00", "20:00"], // poniedziałek
  ["09:00", "20:00"], // wtorek
  ["09:00", "20:00"], // środa
  ["09:00", "20:00"], // czwartek
  ["09:00", "20:00"], // piątek
  ["09:00", "15:00"], // sobota
] as const;

function ClinicStatus() {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState("");

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const day = now.getDay();

      const currentMinutes =
        now.getHours() * 60 + now.getMinutes();

      const today = openingHours[day];

      if (!today) {
        setIsOpen(false);
        setHours("");
        return;
      }

      const [openHour, openMinute] = today[0]
        .split(":")
        .map(Number);

      const [closeHour, closeMinute] = today[1]
        .split(":")
        .map(Number);

      const openMinutes =
        openHour * 60 + openMinute;

      const closeMinutes =
        closeHour * 60 + closeMinute;

      setIsOpen(
        currentMinutes >= openMinutes &&
          currentMinutes < closeMinutes,
      );

      setHours(`${today[0]}–${today[1]}`);
    };

    updateStatus();

    const interval = window.setInterval(
      updateStatus,
      60_000,
    );

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className={`${styles.clinicStatus} ${
        isOpen ? styles.isOpen : styles.isClosed
      }`}
    >
      <span
        className={styles.clinicStatusDot}
        aria-hidden="true"
      />

      <span className={styles.clinicStatusLabel}>
        {isOpen ? "Teraz otwarte" : "Teraz zamknięte"}
      </span>

      {hours && (
        <span className={styles.clinicStatusHours}>
          {hours}
        </span>
      )}
    </div>
  );
}

type SiteHeaderProps = {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeMenu: () => void;
};

export default function SiteHeader({
  menuOpen,
  setMenuOpen,
  closeMenu,
}: SiteHeaderProps) {
  return (
    <>
      {/* Duże logo */}
      <header className={styles.siteHeader}>
        <div className={styles.siteHeaderBrand}>
          <div
            className={`container ${styles.siteHeaderBrandInner}`}
          >
            <a
              href="#home"
              className={styles.siteHeaderLogo}
              onClick={closeMenu}
            >
              <span aria-hidden="true">VETERA</span>
            </a>
          </div>
        </div>
      </header>

      {/* Sticky navigation */}
      <div className={styles.siteHeaderNav}>
        <div className={`container ${styles.headerInner}`}>
          <nav
            className={`${styles.mainNav} ${
              menuOpen ? styles.isOpen : ""
            }`}
            aria-label="Główna nawigacja"
          >
            <a href="#visit" onClick={closeMenu}>
              Wizyta
            </a>

            <a href="#about" onClick={closeMenu}>
              O nas
            </a>

            <a href="#services" onClick={closeMenu}>
              Opieka
            </a>

            <a href="#faq" onClick={closeMenu}>
              FAQ
            </a>

            <a href="#contact" onClick={closeMenu}>
              Kontakt
            </a>
          </nav>

          <ClinicStatus />

          <a
            className={styles.headerCall}
            href="tel:+48000000000"
            aria-label="Zadzwoń (dane demonstracyjne)"
          >
            <span>+48 000 000 000</span>

            <Phone
              size={14}
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </a>

          <button
            className={styles.menuButton}
            type="button"
            aria-label={
              menuOpen
                ? "Zamknij menu"
                : "Otwórz menu"
            }
            aria-expanded={menuOpen}
            onClick={() =>
              setMenuOpen((value) => !value)
            }
          >
            {menuOpen ? (
              <X
                size={20}
                strokeWidth={1.7}
                aria-hidden="true"
              />
            ) : (
              <Menu
                size={20}
                strokeWidth={1.7}
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </div>
    </>
  );
}