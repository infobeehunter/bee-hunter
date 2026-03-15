// 1. Setup della mappa
const map = L.map('map').setView([41.117, 16.871], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 2. Array dei punti di interesse con tutte le informazioni
const poi = [
  { name: "Basilica di San Nicola", category: "Culture Hunter", coords:[41.1186,16.8719], description: "...", tips:"...", opening:"...", price:"..." },
  { name: "Tour Barca Porto", category: "Sea Hunter", coords:[41.1200,16.8700], description: "...", tips:"...", opening:"...", price:"..." },
  { name: "Street Food Tour", category: "Food Hunter", coords:[41.1110,16.8725], description:"...", tips:"...", opening:"...", price:"..." }
];

// 3. Badge e punti
let points = 0;
const unlocked = [];
const badgeList = document.getElementById('badgeList');
const pointsEl = document.getElementById('points');

// 4. Aggiungi marker alla mappa con popup dettagliati
poi.forEach(p => {
  const marker = L.marker(p.coords).addTo(map)
    .bindPopup(
      `<b>${p.name}</b><br>
       Categoria: ${p.category}<br>
       Descrizione: ${p.description}<br>
       Consigli: ${p.tips}<br>
       Orari: ${p.opening}<br>
       Prezzo: ${p.price}<br>
       <button onclick="unlockBadge('${p.name}')">Sblocca Badge</button>`
    );
});

// 5. Funzione sblocca badge
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

// 6. Categorie cliccabili che mostrano tutte le informazioni
document.querySelectorAll('.category').forEach(cat => {
  cat.addEventListener('click', ()=>{
    const catName = cat.dataset.cat;
    const items = poi.filter(p => p.category === catName);
    let message = `Esperienze in ${catName}:\n\n`;
    items.forEach(i => {
      message += `${i.name}\nDescrizione: ${i.description}\nConsigli: ${i.tips}\nOrari: ${i.opening}\nPrezzo: ${i.price}\n\n`;
    });
    alert(message);
  });
});
