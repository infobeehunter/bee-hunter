// ===== Setup mappa =====
const map = L.map('map').setView([41.117, 16.871], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// ===== Dati esperienze completi =====
const poi = [
  // Sea Hunter
  { name:"Tour Barca Porto", category:"Sea Hunter", coords:[41.1200,16.8700], description:"Giro in barca lungo la costa di Bari con aperitivo al tramonto.", tips:"Prenota in anticipo nel weekend.", opening:"10:00-18:00", price:"20€ a persona", badge:"Capitano del Levante" },

  // Bike & Ride
  { name:"Tour Bari Vecchia in bici", category:"Bike & Ride", coords:[41.1208,16.8723], description:"Escursione guidata in bici nel centro storico di Bari.", tips:"Indossa scarpe comode.", opening:"9:00-13:00", price:"15€ a persona", badge:"Pedalatore Seriale" },

  { name:"Noleggio ebike Lungomare", category:"Bike & Ride", coords:[41.1140,16.8740], description:"Noleggio e-bike sul lungomare di Bari.", tips:"Porta casco.", opening:"8:00-20:00", price:"10€ all'ora", badge:"Pedalatore Seriale" },

  // Food Hunter
  { name:"Degustazione focaccia", category:"Food Hunter", coords:[41.1180,16.8710], description:"Assaggia la focaccia tipica barese.", tips:"Meglio al mattino.", opening:"9:00-13:00", price:"Gratuita", badge:"Orecchietta Master" },

  { name:"Corso di orecchiette con le nonne", category:"Food Hunter", coords:[41.1175,16.8720], description:"Impara a fare le orecchiette a mano.", tips:"Porta grembiule.", opening:"15:00-18:00", price:"20€", badge:"Orecchietta Master" },

  { name:"Street Food Tour", category:"Food Hunter", coords:[41.1110,16.8725], description:"Tour degustativo di street food barese.", tips:"Scarpe comode.", opening:"12:00-20:00", price:"25€ a persona", badge:"Orecchietta Master" },

  // Culture Hunter
  { name:"Basilica di San Nicola", category:"Culture Hunter", coords:[41.1186,16.8719], description:"La Basilica di San Nicola è il cuore storico e religioso di Bari.", tips:"Non perdere la cripta.", opening:"9:00-19:00", price:"Ingresso gratuito", badge:"Storico Barese" },

  { name:"Castello Svevo", category:"Culture Hunter", coords:[41.1190,16.8670], description:"Visita il Castello Svevo di Bari.", tips:"Audioguida consigliata.", opening:"10:00-18:00", price:"5€", badge:"Storico Barese" },

  { name:"Sotterranei di Bari Vecchia", category:"Culture Hunter", coords:[41.1185,16.8725], description:"Esplora i sotterranei storici di Bari.", tips:"Lampada consigliata.", opening:"10:00-16:00", price:"8€", badge:"Storico Barese" },

  // Local Services
  { name:"Ceramiche Artigianali", category:"Local Services", coords:[41.1165,16.8705], description:"Laboratorio di ceramica locale.", tips:"Acquista souvenir unici.", opening:"9:00-18:00", price:"Varie", badge:"Local Supporter" },

  { name:"Mercati Rionali", category:"Local Services", coords:[41.1150,16.8720], description:"Visita i mercati tradizionali di Bari.", tips:"Porta contanti.", opening:"7:00-14:00", price:"Gratuito", badge:"Local Supporter" },

  { name:"Negozi Storici", category:"Local Services", coords:[41.1170,16.8735], description:"Scopri negozi storici e botteghe artigiane.", tips:"Orari variabili.", opening:"10:00-19:00", price:"Gratuito", badge:"Local Supporter" }
];

// ===== Badge e punti =====
let points = 0;
const unlocked = [];
const badgeList = document.getElementById('badgeList');
const pointsEl = document.getElementById('points');

// ===== Sezione esperienza =====
const experienceDetail = document.getElementById('experienceDetail');
const expName = document.getElementById('expName');
const expCategory = document.getElementById('expCategory');
const expDetails = document.getElementById('expDetails');
const unlockBtn = document.getElementById('unlockBtn');

function showExperience(exp){
  expName.textContent = exp.name;
  expCategory.textContent = exp.category;
  expDetails.innerHTML = `
    <p><b>Descrizione:</b> ${exp.description}</p>
    <p><b>Consigli:</b> ${exp.tips}</p>
    <p><b>Orari:</b> ${exp.opening}</p>
    <p><b>Prezzo:</b> ${exp.price}</p>
  `;
  document.querySelector('.dropdown').classList.add('show');
  unlockBtn.onclick = function(){ unlockBadge(exp.badge); };
}

// ===== Marker mappa =====
poi.forEach(p => {
  const marker = L.marker(p.coords).addTo(map);
  marker.on('click', ()=>showExperience(p));
});

// ===== Categorie cliccabili =====
document.querySelectorAll('.category').forEach(cat => {
  cat.addEventListener('click', ()=>{
    const items = poi.filter(p => p.category === cat.dataset.cat);
    if(items.length > 0) showExperience(items[0]);
  });
});

// ===== Funzione sblocca badge =====
function unlockBadge(badgeName){
  if(!unlocked.includes(badgeName)){
    unlocked.push(badgeName);
    points += 10;
    const li = document.createElement('li');
    li.textContent = badgeName;
    badgeList.appendChild(li);
    pointsEl.textContent = points;
  }
}
