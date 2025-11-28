// sample bus data
const buses = [
  { id: 'BUS-001', route: '23', destination: 'Central Station', eta: '5 min', occupancy: 'low', distance: '1.2 km', status: 'on-time', currentStop: 'Park Street', nextStop: 'City Mall' },
  { id: 'BUS-002', route: '45', destination: 'Tech Park', eta: '12 min', occupancy: 'high', distance: '3.5 km', status: 'delayed', currentStop: 'Railway Station', nextStop: 'University Gate' },
  { id: 'BUS-003', route: '67', destination: 'Airport', eta: '8 min', occupancy: 'medium', distance: '2.1 km', status: 'on-time', currentStop: 'Metro Junction', nextStop: 'Market Square' },
  { id: 'BUS-004', route: '89', destination: 'Beach Road', eta: '15 min', occupancy: 'low', distance: '4.2 km', status: 'early', currentStop: 'Hospital', nextStop: 'College Road' }
];

// helpers for badge / status classes
function getOccupancyClass(occ) {
  if (occ === 'low') return 'occupancy-low';
  if (occ === 'medium') return 'occupancy-medium';
  if (occ === 'high') return 'occupancy-high';
  return '';
}
function getStatusClass(status) {
  if (status === 'on-time') return 'status-on-time';
  if (status === 'delayed') return 'status-delayed';
  if (status === 'early') return 'status-early';
  return '';
}

// render bus cards
function renderBuses(filterRoute) {
  const container = document.getElementById('busList');
  container.innerHTML = '';
  const filtered = filterRoute ? buses.filter(b => b.route === filterRoute) : buses;
  filtered.forEach(bus => {
    const div = document.createElement('div');
    div.className = 'bus-card';
    div.innerHTML = `
      <div class="bus-header">
        <div class="bus-info">
          <div class="bus-route">${bus.route}</div>
          <div>
            <div class="bus-dest">${bus.destination}</div>
            <div class="bus-status ${getStatusClass(bus.status)}">${bus.status.replace('-', ' ')}</div>
          </div>
        </div>
        <div class="bus-meta">
          <p class="eta">${bus.eta}</p>
          <p class="distance">${bus.distance}</p>
        </div>
      </div>
      <div class="bus-stops">
        <strong>From:</strong> ${bus.currentStop} → <strong>Next:</strong> ${bus.nextStop}
      </div>
      <div class="bus-footer">
        <span class="${getOccupancyClass(bus.occupancy)}">
          ${bus.occupancy === 'low' ? 'Seats Available' : bus.occupancy === 'medium' ? 'Moderate' : 'Crowded'}
        </span>
      </div>
    `;
    container.appendChild(div);
  });
}
// ---------------- LIVE LOCATION MAP ----------------
let map;
let userMarker;

function initMap(lat, lng) {
  map = L.map('map').setView([lat, lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  userMarker = L.marker([lat, lng]).addTo(map)
    .bindPopup('You are here')
    .openPopup();
}

function updateLiveLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        if (!map) {
          initMap(lat, lng);
        } else {
          userMarker.setLatLng([lat, lng]);
          map.setView([lat, lng], 15);
        }
      },
      (error) => {
        alert("Location access denied. Turn on GPS.");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
      }
    );
  } else {
    alert("Geolocation not supported in this browser.");
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const sel = document.getElementById('routeSelect');
  renderBuses(sel.value);
  sel.addEventListener('change', () => renderBuses(sel.value));

  updateLiveLocation(); // start live GPS tracking
});

