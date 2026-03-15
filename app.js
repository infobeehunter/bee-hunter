// ===== Setup mappa =====
const map = L.map('map').setView([41.117, 16.871], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// ===== Dati esperienze =====
const poi = [
  {
    name: "Basilica di San Nicola",
    category: "Culture Hunter",
    coords: [41.1186,16.8719],
    description: "La Basilica di San Nicola è il cuore storico e religioso di Bari.",
    tips: "Non perdere la cripta e gli affreschi interni.",
    opening: "9:00 - 19:00",
    price: "Ingresso gratuito"
  },
  {
    name: "Tour Barca Porto",
    category: "Sea Hunter",
    coords: [41.1200,16.8700],
    description: "Giro in barca lungo la costa di Bari con aperitivo.",
    tips: "Prenota in anticipo nel weekend.",
    opening: "10:00 - 18:00",
    price: "20€ a persona"
  },
  {
    name: "Street Food Tour",
    category: "Food Hunter",
    coords: [41.1110,16.8725],
    description: "Degustazione focaccia, panzerotti e altre specialità locali.",
    tips: "Indossa scarpe comode, dura 2 ore.",
    opening: "12:00 - 20:00",
    price: "25€ a persona"
  }
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
  unlockBtn.onclick = function(){ unlockBadge(exp.name); };
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
function unlockBadge(name){
  if(!unlocked.includes(name)){
    unlocked.push(name);
    points += 10;
    const li = document.createElement('li');
    li.textContent = name;
    badgeList.appendChild(li);
    pointsEl.textContent = points;
  }
}
