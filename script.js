/* ============================================================
   FABRICIO & LIBERTAD — script principal
   ============================================================ */
(function () {
  "use strict";

  /* ----------------------------------------------------------
     1. APERTURA DE LA INVITACIÓN
        Al hacer clic en "Abrir invitación" (o en el sello):
        - se anima el sobre
        - se revela el sitio principal
        - comienza la música (solo aquí, tras interacción del usuario)
     ---------------------------------------------------------- */
  const envelopeScreen = document.getElementById("envelope-screen");
  const envelope = document.getElementById("envelope");
  const openBtn = document.getElementById("open-invitation");
  const waxSeal = document.getElementById("wax-seal");
  const site = document.getElementById("site");
  const music = document.getElementById("bg-music");
  const musicToggle = document.getElementById("music-toggle");

  let opened = false;

  function openInvitation() {
    if (opened) return;
    opened = true;

    envelope.classList.add("is-open");

    // Intenta reproducir la música justo tras la interacción del usuario.
    // ▼▼ La canción debe estar en assets/music.mp3 ▼▼
    if (music) {
      music.volume = 0.6;
      const playPromise = music.play();
      if (playPromise && playPromise.catch) {
        playPromise.catch(function () {
          // Si el navegador bloquea el audio, se deja disponible el botón de música.
          musicToggle.classList.add("is-paused");
          musicToggle.setAttribute("aria-pressed", "false");
        });
      }
    }

    // Espera a que termine la animación del sobre antes de revelar el sitio
    window.setTimeout(function () {
      envelopeScreen.classList.add("is-closing");
      site.removeAttribute("aria-hidden");
      site.classList.add("is-visible");
      document.body.style.overflow = "";
      initScrollReveal();
    }, 1000);

    window.setTimeout(function () {
      envelopeScreen.style.display = "none";
    }, 2200);
  }

  if (openBtn) openBtn.addEventListener("click", openInvitation);
  if (waxSeal) waxSeal.addEventListener("click", openInvitation);

  // Bloquea el scroll del body mientras la carta está cerrada
  document.body.style.overflow = "hidden";

  /* ----------------------------------------------------------
     2. REPRODUCTOR DE MÚSICA — play / pause discreto
     ---------------------------------------------------------- */
  if (musicToggle && music) {
    musicToggle.addEventListener("click", function () {
      if (music.paused) {
        music.play().catch(function () {});
        musicToggle.classList.remove("is-paused");
        musicToggle.setAttribute("aria-pressed", "false");
        musicToggle.setAttribute("aria-label", "Silenciar música");
      } else {
        music.pause();
        musicToggle.classList.add("is-paused");
        musicToggle.setAttribute("aria-pressed", "true");
        musicToggle.setAttribute("aria-label", "Reproducir música");
      }
    });
  }

  /* ----------------------------------------------------------
     3. CUENTA REGRESIVA hasta el 28 de noviembre de 2026
        (hora local de Bolivia, UTC-4)
     ---------------------------------------------------------- */
  var WEDDING_DATE = new Date("2026-11-28T16:00:00-04:00").getTime();

  var elDays = document.getElementById("cd-days");
  var elHours = document.getElementById("cd-hours");
  var elMinutes = document.getElementById("cd-minutes");
  var elSeconds = document.getElementById("cd-seconds");
  var countdownWrap = document.getElementById("countdown");
  var countdownDone = document.getElementById("countdown-done");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function updateCountdown() {
    var now = Date.now();
    var diff = WEDDING_DATE - now;

    if (diff <= 0) {
      if (countdownWrap) countdownWrap.hidden = true;
      if (countdownDone) countdownDone.hidden = false;
      window.clearInterval(countdownTimer);
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    var minutes = Math.floor((diff / (1000 * 60)) % 60);
    var seconds = Math.floor((diff / 1000) % 60);

    if (elDays) elDays.textContent = pad(days);
    if (elHours) elHours.textContent = pad(hours);
    if (elMinutes) elMinutes.textContent = pad(minutes);
    if (elSeconds) elSeconds.textContent = pad(seconds);
  }

  updateCountdown();
  var countdownTimer = window.setInterval(updateCountdown, 1000);

  /* ----------------------------------------------------------
     4. REVEAL-ON-SCROLL — aparición progresiva de secciones
     ---------------------------------------------------------- */
  function initScrollReveal() {
    var reveals = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach(function (el) { observer.observe(el); });
  }

  /* ----------------------------------------------------------
     5. GALERÍA — lightbox simple y accesible
     ---------------------------------------------------------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxClose = document.getElementById("lightbox-close");
  var galleryItems = document.querySelectorAll(".galeria__item");
  var lastFocused = null;

  function openLightbox(src, alt) {
    lastFocused = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.hidden = false;
    lightboxClose.focus();
    document.addEventListener("keydown", onLightboxKeydown);
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.removeEventListener("keydown", onLightboxKeydown);
    if (lastFocused) lastFocused.focus();
  }

  function onLightboxKeydown(e) {
    if (e.key === "Escape") closeLightbox();
  }

  galleryItems.forEach(function (item) {
    item.addEventListener("click", function () {
      var img = item.querySelector("img");
      openLightbox(item.getAttribute("data-full"), img ? img.alt : "");
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  /* ----------------------------------------------------------
     6. ENLACES PENDIENTES DE CONFIGURAR
        ▼▼ Reemplaza estos valores cuando los tengas listos ▼▼
     ---------------------------------------------------------- */
  var RSVP_URL = ""; // Ej: "https://forms.gle/xxxxxxx" o enlace de WhatsApp
  var GIFT_INFO_URL = ""; // Ej: enlace a tu lista de regalos o cuenta bancaria
  var MAPS_URL = ""; // Ej: "https://maps.google.com/?q=..."

  var rsvpLink = document.getElementById("rsvp-link");
  var giftLink = document.getElementById("regalos-link");
  var mapsLink = document.getElementById("maps-link");

  if (rsvpLink && RSVP_URL) rsvpLink.href = RSVP_URL;
  if (giftLink && GIFT_INFO_URL) giftLink.href = GIFT_INFO_URL;
  if (mapsLink && MAPS_URL) mapsLink.href = MAPS_URL;

})();
