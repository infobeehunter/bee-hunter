// Inizializzazione mappa Leaflet
const map = L.map('map').setView([41.1171, 16.8719], 13); // Bari
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Punti di interesse esempio
const poi = [
  {name: "Basilica di San Nicola", category:"Culture Hunter", coords:[41.1186,16.8719]},
  {name: "Tour Barca Porto", category:"Sea Hunter", coords:[41.1200,16.8700]},
  {name: "Street Food Tour", category:"Food Hunter", coords:[41.1110,16.8725]}
];

// Badge e punti
let points = 0;

// Aggiungi marker alla mappa
poi.forEach(p => {
  const marker = L.marker(p.coords).addTo(map).bindPopup(`${p.name} - ${p.category}`);
  marker.on('click', () => {
    unlockBadge(p.category, p.name);
  });
});

function unlockBadge(category, name) {
  const badgeList = document.getElementById('badgeList');
  // Evita duplicati
  if([...badgeList.children].some(li => li.textContent === `${name} (${category})`)) return;

  const li = document.createElement('li');
  li.textContent = `${name} (${category})`;
  badgeList.appendChild(li);

  points += 10; // punti esempio
  document.getElementById('points').textContent = points;
}

// Categorie click
document.querySelectorAll('.category').forEach(cat => {
  cat.addEventListener('click', () => {
    alert(`Mostro sfide e premi per ${cat.dataset.category}`);
  });
});
