/* ================================================================
   FABRICIO & LIBERTAD — INVITACIÓN DIGITAL INTERACTIVA
   script.js — toda la lógica e interactividad
   ================================================================
   Edita el objeto CONFIG de más abajo para actualizar textos,
   fechas, lugares, horarios, padrinos, padres y enlaces.
   Todo lo marcado como "EDITAR" debe reemplazarse cuando se tenga
   la información definitiva. No se ha inventado ningún dato.
   ================================================================ */

/* ================================================================
   CONFIGURACIÓN — edita aquí los datos de la boda
   ================================================================ */
const CONFIG = {
  // pareja
  nombreNovio: "Fabricio",
  nombreNovia: "Libertad",
  apellidosNovio: "EDITAR",
  apellidosNovia: "EDITAR",

  // fecha y lugar
  fechaBoda: "2026-11-28T16:00:00", // usada por la cuenta regresiva (fecha/hora de la ceremonia)
  fechaLarga: "28 de Noviembre de 2026",
  mesAnio: "Noviembre 2026",
  diaDestacado: 28,
  ciudad: "Cochabamba, Bolivia",

  // música (coloca tu archivo en la MISMA carpeta que index.html, con este nombre exacto)
  cancionTitulo: "[ Canción_Boda.mp3 ]",
  cancionArtista: "[EDITAR — Título / Artista]",

  // historia (texto editable)
  historia: `Entre millones de caminos, nuestros corazones se encontraron.
    <br><br>
    Hoy, con amor, ilusión y la certeza de que queremos caminar juntos
    para siempre, te invitamos a compartir el día más importante
    de nuestras vidas.`,

  // padrinos y padres
  padrino: "[EDITAR]",
  madrina: "[EDITAR]",
  padresFabricio: "[EDITAR]",
  padresLibertad: "[EDITAR]",

  // itinerario (formato libre, ej. "16:00 HRS")
  horaCeremonia: "[HORA]",
  horaRecepcion: "[HORA]",
  horaCoctel: "[HORA]",
  horaEntrada: "[HORA]",
  horaCena: "[HORA]",
  horaBrindis: "[HORA]",
  horaBaile: "[HORA]",
  horaExtra: "[HORA]",
  eventoExtra: "[EDITAR]",

  // ubicaciones
  iglesiaNombre: "[ Nombre del lugar ]",
  iglesiaDireccion: "[ Dirección ]",
  iglesiaMapsUrl: "", // pega aquí el enlace de Google Maps cuando se confirme
  lugarCeremoniaCorto: "[EDITAR]",

  recepcionNombre: "[ Nombre del lugar ]",
  recepcionDireccion: "[ Dirección ]",
  recepcionMapsUrl: "", // pega aquí el enlace de Google Maps cuando se confirme
  lugarRecepcionCorto: "[EDITAR]",

  // regalos
  datosRegalo: "[ Datos de regalo — EDITAR ]",

  // confirmación de asistencia
  rsvpDeadline: "[EDITAR]",
  rsvpLink: "", // pega aquí el enlace de Google Forms / WhatsApp / formulario propio

  // fotos (colócalas en la MISMA carpeta que index.html, con estos nombres exactos)
  fotoPrincipal: "foto-principal.jpg",
  fotoSecundaria: "foto-2.jpg",
};

/* ================================================================
   INYECCIÓN DE DATOS DE CONFIG EN EL DOM
   ================================================================ */
function aplicarConfig(){
  const setText = (selector, value) => {
    document.querySelectorAll(selector).forEach(el => { el.textContent = value; });
  };

  setText('[data-config="date-long"]', CONFIG.fechaLarga);
  setText('[data-config="place"]', CONFIG.ciudad);
  setText('[data-config="month-year"]', CONFIG.mesAnio);

  setText('[data-config="song-title"]', CONFIG.cancionTitulo);
  setText('[data-config="song-artist"]', CONFIG.cancionArtista);

  setText('[data-config="padrino"]', CONFIG.padrino);
  setText('[data-config="madrina"]', CONFIG.madrina);
  setText('[data-config="padres-fabricio"]', CONFIG.padresFabricio);
  setText('[data-config="padres-libertad"]', CONFIG.padresLibertad);

  setText('[data-config="hora-ceremonia"]', CONFIG.horaCeremonia);
  setText('[data-config="hora-recepcion"]', CONFIG.horaRecepcion);
  setText('[data-config="hora-coctel"]', CONFIG.horaCoctel);
  setText('[data-config="hora-entrada"]', CONFIG.horaEntrada);
  setText('[data-config="hora-cena"]', CONFIG.horaCena);
  setText('[data-config="hora-brindis"]', CONFIG.horaBrindis);
  setText('[data-config="hora-baile"]', CONFIG.horaBaile);
  setText('[data-config="hora-extra"]', CONFIG.horaExtra);
  setText('[data-config="evento-extra"]', CONFIG.eventoExtra);
  setText('[data-config="lugar-ceremonia-corto"]', CONFIG.lugarCeremoniaCorto);
  setText('[data-config="lugar-recepcion-corto"]', CONFIG.lugarRecepcionCorto);

  setText('[data-config="iglesia-nombre"]', CONFIG.iglesiaNombre);
  setText('[data-config="iglesia-direccion"]', CONFIG.iglesiaDireccion);
  setText('[data-config="recepcion-nombre"]', CONFIG.recepcionNombre);
  setText('[data-config="recepcion-direccion"]', CONFIG.recepcionDireccion);

  setText('[data-config="gift-info"]', CONFIG.datosRegalo);
  setText('[data-config="rsvp-deadline"]', CONFIG.rsvpDeadline);

  // historia (permite HTML simple: <br>)
  const storyEl = document.querySelector('[data-config="story-text"]');
  if (storyEl) storyEl.innerHTML = CONFIG.historia;

  // nombres/apellidos en la portada
  document.querySelectorAll('.surnames').forEach(el => {
    el.textContent = `[${CONFIG.apellidosNovio}] & [${CONFIG.apellidosNovia}]`;
  });

  // enlaces de mapas
  const mapCeremonia = document.getElementById('mapCeremonia');
  const mapRecepcion = document.getElementById('mapRecepcion');
  if (mapCeremonia){
    if (CONFIG.iglesiaMapsUrl){
      mapCeremonia.href = CONFIG.iglesiaMapsUrl;
    } else {
      mapCeremonia.href = '#';
      mapCeremonia.setAttribute('aria-disabled', 'true');
      mapCeremonia.addEventListener('click', (e) => {
        e.preventDefault();
        alert('La ubicación de la ceremonia aún no ha sido confirmada.');
      });
    }
  }
  if (mapRecepcion){
    if (CONFIG.recepcionMapsUrl){
      mapRecepcion.href = CONFIG.recepcionMapsUrl;
    } else {
      mapRecepcion.href = '#';
      mapRecepcion.setAttribute('aria-disabled', 'true');
      mapRecepcion.addEventListener('click', (e) => {
        e.preventDefault();
        alert('La ubicación de la recepción aún no ha sido confirmada.');
      });
    }
  }

  // enlace de confirmación (RSVP)
  const rsvpBtn = document.getElementById('rsvpBtn');
  if (rsvpBtn){
    if (CONFIG.rsvpLink){
      rsvpBtn.href = CONFIG.rsvpLink;
    } else {
      rsvpBtn.href = '#';
      rsvpBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('El enlace de confirmación de asistencia se habilitará pronto.');
      });
    }
  }

  // fotografías: si el archivo existe, reemplaza el placeholder por la imagen real
  intentarCargarFoto('[data-config-photo="main"]', CONFIG.fotoPrincipal);
  intentarCargarFoto('[data-config-photo="secondary"]', CONFIG.fotoSecundaria);
}

function intentarCargarFoto(selector, src){
  const frame = document.querySelector(selector);
  if (!frame || !src) return;
  const testImg = new Image();
  testImg.onload = () => {
    const inner = frame.querySelector('.photo-frame__inner');
    if (inner){
      inner.style.backgroundImage = `url("${src}")`;
      inner.style.backgroundSize = 'cover';
      inner.style.backgroundPosition = 'center';
      const label = inner.querySelector('.photo-frame__label');
      if (label) label.style.display = 'none';
    }
  };
  testImg.onerror = () => { /* no hay foto todavía: se conserva el placeholder */ };
  testImg.src = src;
}

/* ================================================================
   SOBRE INTERACTIVO — apertura
   ================================================================ */
function initEnvelope(){
  const gate = document.getElementById('envelopeGate');
  const seal = document.getElementById('waxSeal');
  const openBtn = document.getElementById('openInviteBtn');
  const mainContent = document.getElementById('mainContent');
  const floatingBtn = document.getElementById('floatingMusicBtn');

  let opened = false;

  function openEnvelope(){
    if (opened) return;
    opened = true;

    gate.classList.add('is-opening');

    // secuencia: solapa se abre -> sello se anima -> tarjeta se desliza -> transición
    window.setTimeout(() => {
      gate.classList.add('is-open-done');
    }, 1150);

    window.setTimeout(() => {
      gate.hidden = true;
      mainContent.hidden = false;
      floatingBtn.hidden = false;
      // fuerza reflow para iniciar animaciones de scroll-reveal en la portada
      requestAnimationFrame(() => {
        revealVisibleSections();
        window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
      });
    }, 1950);
  }

  seal.addEventListener('click', openEnvelope);
  openBtn.addEventListener('click', openEnvelope);
}

/* ================================================================
   SCROLL REVEAL — aparición progresiva de elementos
   ================================================================ */
let revealObserver;
function initScrollReveal(){
  const items = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)){
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => revealObserver.observe(el));
}
function revealVisibleSections(){
  // revela de inmediato lo que ya está en viewport al abrir el sobre
  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight){
      el.classList.add('is-visible');
      if (revealObserver) revealObserver.unobserve(el);
    }
  });
}

/* ================================================================
   REPRODUCTOR DE MÚSICA
   ================================================================ */
function initMusicPlayer(){
  const audio = document.getElementById('audioEl');
  const playBtn = document.getElementById('playBtn');
  const muteBtn = document.getElementById('muteBtn');
  const likeBtn = document.getElementById('likeBtn');
  const progressBar = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  const progressHandle = document.getElementById('progressHandle');
  const currentTimeEl = document.getElementById('currentTime');
  const totalTimeEl = document.getElementById('totalTime');
  const floatingBtn = document.getElementById('floatingMusicBtn');

  if (!audio) return;

  function formatTime(sec){
    if (!isFinite(sec) || isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function setPlayingUI(isPlaying){
    document.querySelectorAll('.icon-play').forEach(i => i.hidden = isPlaying);
    document.querySelectorAll('.icon-pause').forEach(i => i.hidden = !isPlaying);
    floatingBtn.classList.toggle('is-playing', isPlaying);
  }

  function togglePlay(){
    if (audio.paused){
      audio.play().then(() => {
        setPlayingUI(true);
      }).catch(() => {
        alert('Agrega el archivo de audio "cancion-boda.mp3" en la misma carpeta que index.html para reproducir la canción.');
      });
    } else {
      audio.pause();
      setPlayingUI(false);
    }
  }

  playBtn.addEventListener('click', togglePlay);
  floatingBtn.addEventListener('click', togglePlay);

  muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    muteBtn.style.opacity = audio.muted ? 0.45 : 1;
  });

  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('is-liked');
  });

  audio.addEventListener('loadedmetadata', () => {
    totalTimeEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('timeupdate', () => {
    const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    progressFill.style.width = pct + '%';
    progressHandle.style.left = pct + '%';
    currentTimeEl.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener('ended', () => setPlayingUI(false));

  function seek(clientX){
    const rect = progressBar.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    if (audio.duration){
      audio.currentTime = pct * audio.duration;
    }
  }
  progressBar.addEventListener('click', (e) => seek(e.clientX));
  progressBar.addEventListener('touchstart', (e) => seek(e.touches[0].clientX), { passive: true });
}

/* ================================================================
   CALENDARIO — Noviembre 2026 (generado dinámicamente)
   ================================================================ */
function initCalendar(){
  const calendarEl = document.getElementById('calendar');
  if (!calendarEl) return;

  const dias = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
  dias.forEach(d => {
    const el = document.createElement('span');
    el.className = 'calendar__dow';
    el.textContent = d;
    calendarEl.appendChild(el);
  });

  // parsea el mes/año desde CONFIG.fechaBoda para que el calendario
  // siempre coincida con la fecha real configurada
  const fecha = new Date(CONFIG.fechaBoda);
  const anio = fecha.getFullYear();
  const mes = fecha.getMonth(); // 0-indexado

  const primerDia = new Date(anio, mes, 1);
  const ultimoDia = new Date(anio, mes + 1, 0).getDate();

  // convierte domingo=0 a formato lunes-primero (0=lunes ... 6=domingo)
  let offset = primerDia.getDay() - 1;
  if (offset < 0) offset = 6;

  for (let i = 0; i < offset; i++){
    const empty = document.createElement('span');
    empty.className = 'calendar__day calendar__day--empty';
    calendarEl.appendChild(empty);
  }

  for (let d = 1; d <= ultimoDia; d++){
    const dayEl = document.createElement('span');
    dayEl.className = 'calendar__day';
    if (d === CONFIG.diaDestacado){
      dayEl.classList.add('calendar__day--highlight');
      dayEl.innerHTML = `${d}`;
      dayEl.setAttribute('aria-label', `${d} de ${CONFIG.mesAnio} — nuestra boda`);
    } else {
      dayEl.textContent = d;
    }
    calendarEl.appendChild(dayEl);
  }
}

/* ================================================================
   CUENTA REGRESIVA
   ================================================================ */
function initCountdown(){
  const target = new Date(CONFIG.fechaBoda).getTime();
  const elDays = document.getElementById('cdDays');
  const elHours = document.getElementById('cdHours');
  const elMinutes = document.getElementById('cdMinutes');
  const elSeconds = document.getElementById('cdSeconds');
  const title = document.getElementById('countdownTitle');
  const countdownBox = document.getElementById('countdown');

  if (!elDays) return;

  function tick(){
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0){
      elDays.textContent = '00';
      elHours.textContent = '00';
      elMinutes.textContent = '00';
      elSeconds.textContent = '00';
      title.textContent = 'Hoy comienza nuestro para siempre.';
      countdownBox.style.opacity = '0.35';
      clearInterval(intervalId);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    elDays.textContent = String(days).padStart(2, '0');
    elHours.textContent = String(hours).padStart(2, '0');
    elMinutes.textContent = String(minutes).padStart(2, '0');
    elSeconds.textContent = String(seconds).padStart(2, '0');
  }

  tick();
  const intervalId = setInterval(tick, 1000);
}

/* ================================================================
   MODAL DE REGALOS
   ================================================================ */
function initGiftsModal(){
  const openBtn = document.getElementById('openGiftsModal');
  const modal = document.getElementById('giftsModal');
  if (!openBtn || !modal) return;

  const closeElements = modal.querySelectorAll('[data-close-modal]');

  function open(){
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function close(){
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', open);
  closeElements.forEach(el => el.addEventListener('click', close));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
}

/* ================================================================
   CAPA AMBIENTAL — tulipanes cayendo lentamente (marca de agua)
   ================================================================ */
function initFallingPetals(){
  const layer = document.getElementById('petalsLayer');
  if (!layer) return;

  const petalShapes = [
    // pétalo suelto simple
    `<svg viewBox="0 0 40 60"><path d="M20 4 C10 14 6 26 6 34 C6 44 12 52 20 58 C28 52 34 44 34 34 C34 26 30 14 20 4Z" fill="currentColor"/></svg>`,
    // hoja alargada
    `<svg viewBox="0 0 40 60"><path d="M20 2 C32 16 34 34 20 58 C6 34 8 16 20 2Z" fill="currentColor"/></svg>`,
  ];
  const colors = ['var(--dusty-blue)', 'var(--powder-blue)', 'var(--sage)', 'var(--coastal-sand)'];
  const total = window.innerWidth < 700 ? 9 : 14;

  for (let i = 0; i < total; i++){
    const outer = document.createElement('div');
    outer.className = 'petal';
    const size = 14 + Math.random() * 16; // 14–30px
    const left = Math.random() * 100; // vw
    const duration = 22 + Math.random() * 18; // 22–40s
    const delay = -(Math.random() * duration); // desincroniza
    const swayDuration = 3 + Math.random() * 3;
    const opacity = 0.12 + Math.random() * 0.16;

    outer.style.left = `${left}vw`;
    outer.style.width = `${size}px`;
    outer.style.height = `${size * 1.5}px`;
    outer.style.opacity = opacity.toFixed(2);
    outer.style.animationDuration = `${duration}s`;
    outer.style.animationDelay = `${delay}s`;

    const inner = document.createElement('div');
    inner.className = 'petal__inner';
    inner.style.color = colors[Math.floor(Math.random() * colors.length)];
    inner.style.width = '100%';
    inner.style.height = '100%';
    inner.style.animationDuration = `${swayDuration}s`;
    inner.style.animationDelay = `${delay}s`;
    inner.innerHTML = petalShapes[Math.floor(Math.random() * petalShapes.length)];

    outer.appendChild(inner);
    layer.appendChild(outer);
  }
}

/* ================================================================
   INICIALIZACIÓN GENERAL
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  aplicarConfig();
  initEnvelope();
  initScrollReveal();
  initMusicPlayer();
  initCalendar();
  initCountdown();
  initGiftsModal();
  initFallingPetals();
});
