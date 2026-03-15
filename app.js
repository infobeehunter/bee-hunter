// ===== Setup mappa =====
const map = L.map('map').setView([41.117, 16.871], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// ===== Punti di interesse =====
const poi = [
  {name: "Basilica di San Nicola", category:"Culture Hunter", coords:[41.1186,16.8719]},
  {name: "Tour Barca Porto", category:"Sea Hunter", coords:[41.1200,16.8700]},
  {name: "Street Food Tour", category:"Food Hunter", coords:[41.1110,16.8725]},
  {name: "Noleggio Bici", category:"Bike & Ride", coords:[41.1125,16.8720]},
  {name: "Mercato Storico", category:"Local Services", coords:[41.1140,16.8705]}
];

// ===== Badge e punti =====
let points = 0;
const unlocked = [];
const badgeList = document.getElementById('badgeList');
const pointsEl = document.getElementById('points');

// ===== Aggiungi marker =====
poi.forEach(p => {
  const marker = L.marker(p.coords).addTo(map)
    .bindPopup(`<b>${p.name}</b><br>${p.category}<br><button onclick="unlockBadge('${p.name}')">Sblocca Badge</button>`);
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
    alert(`Hai sbloccato il badge: ${name}!`);
  }
}

// ===== Categorie cliccabili =====
document.querySelectorAll('.category').forEach(cat => {
  cat.addEventListener('click', ()=>{
    const catName = cat.dataset.cat;
    alert(`Mostriamo punti di interesse per: ${catName}`);
  });
});
