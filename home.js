const routesList = document.getElementById("routes-list");
const stopsList = document.getElementById("stops-list");

const avgTime = document.getElementById("avgTime");
const tripsWeek = document.getElementById("tripsWeek");
const weekCost = document.getElementById("weekCost");

// ================== REALISTIC STATS (Live Feeling) ==================
function generateLiveStats() {
  avgTime.textContent = `${Math.floor(Math.random() * 30) + 15} min`;
  tripsWeek.textContent = Math.floor(Math.random() * 15) + 5;
  weekCost.textContent = `₹${Math.floor(Math.random() * 300) + 100}`;
}

// Update stats every 15 seconds
setInterval(generateLiveStats, 15000);
generateLiveStats();


// ================== LIVE DELAY ALERT SIMULATION ==================
const alertCard = document.querySelector(".alert-card");

function updateAlert() {
  const delays = [
    { route: "Route 45", time: 10 },
    { route: "Route 210", time: 5 },
    { route: "Route 88", time: 20 },
    { route: "Route 12A", time: 7 },
    { route: "Route 19", time: 15 }
  ];

  const random = delays[Math.floor(Math.random() * delays.length)];

  alertCard.innerHTML = `
    <i data-lucide="alert-triangle"></i>
    <div>
      <h4>${random.route} Delayed</h4>
      <p>Expected delay: ${random.time} minutes due to traffic</p>
    </div>
  `;

  lucide.createIcons();
}

// update alert every 20 sec
setInterval(updateAlert, 20000);
updateAlert();


// ================== FAKE REALISTIC SAVED ROUTES ==================
const routes = [
  { name: "Home → College", duration: "35 mins", status: "On Time" },
  { name: "College → Metro", duration: "18 mins", status: "Delayed" },
  { name: "Office → Home", duration: "42 mins", status: "On Time" }
];

function loadSavedRoutes() {
  routesList.innerHTML = "";
  routes.forEach(route => {
    const div = document.createElement("div");
    div.className = "route-card";
    div.innerHTML = `
      <strong>${route.name}</strong>
      <p>${route.duration} • ${route.status}</p>
    `;
    routesList.appendChild(div);
  });
}

loadSavedRoutes();


// ================== REAL NEARBY BUS STOPS + GPS ==================
async function getPlaceName(lat, lon) {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
    const data = await res.json();
    return data.display_name || "Current Location";
  } catch {
    return "Current Location";
  }
}

async function fetchBusStops(lat, lon) {
  const query = `
    [out:json];
    node["highway"="bus_stop"](around:1000,${lat},${lon});
    out;
  `;

  const url = "https://overpass-api.de/api/interpreter";

  try {
    const res = await fetch(url, { method: "POST", body: query });
    const data = await res.json();

    stopsList.innerHTML = "";

    if (!data.elements.length) {
      stopsList.innerHTML = "<li>No nearby bus stops found</li>";
      return;
    }

    data.elements.slice(0, 6).forEach(stop => {
      const name = stop.tags.name || "Unnamed Bus Stop";

      const li = document.createElement("li");
      li.innerHTML = `🚌 ${name}`;

      li.style.cursor = "pointer";

      // open Google Maps walking when clicked
      li.addEventListener("click", () => {
        const gmap = `https://www.google.com/maps/dir/?api=1&origin=${lat},${lon}&destination=${stop.lat},${stop.lon}&travelmode=walking`;
        window.open(gmap, "_blank");
      });

      stopsList.appendChild(li);
    });
  } catch {
    stopsList.innerHTML = "<li>Error loading stops</li>";
  }
}


// ================== LIVE GPS ==================
function detectLocation() {
  if (!navigator.geolocation) {
    stopsList.innerHTML = "<li>Geolocation not supported</li>";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchBusStops(lat, lon);
    },
    () => {
      stopsList.innerHTML = "<li>Permission denied for location</li>";
    }
  );
}

detectLocation();
