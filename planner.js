// sample route options
const routes = [
  {
    id: '1',
    type: 'bus',
    duration: '35 min',
    steps: ['Bus 23 from Park Street', 'Bus 45 from Central Station', 'Walk 5 min'],
    cost: '₹25',
    transfers: 1,
    occupancy: 'low',
    co2Saved: '2.3 kg'
  },
  {
    id: '2',
    type: 'metro',
    duration: '28 min',
    steps: ['Walk to Metro Station', 'Blue Line to Tech Park', 'Walk 3 min'],
    cost: '₹40',
    transfers: 0,
    occupancy: 'medium',
    co2Saved: '3.1 kg'
  },
  {
    id: '3',
    type: 'mixed',
    duration: '32 min',
    steps: ['Bus 67 from Park Street', 'Metro Red Line', 'Walk 2 min'],
    cost: '₹35',
    transfers: 1,
    occupancy: 'medium',
    co2Saved: '2.7 kg'
  },
  {
    id: '4',
    type: 'bike',
    duration: '45 min',
    steps: ['Rent bike from Station A', 'Route via Main Road', 'Drop at Station B'],
    cost: '₹15',
    transfers: 0,
    occupancy: 'low',
    co2Saved: '4.5 kg'
  }
];

function getOccupancyText(occ) {
  if (occ === 'low') return 'Available';
  if (occ === 'medium') return 'Moderate';
  if (occ === 'high') return 'Crowded';
  return '';
}

// render route cards
function renderRoutes() {
  const list = document.getElementById('routesList');
  list.innerHTML = '';
  routes.forEach(route => {
    const div = document.createElement('div');
    div.className = 'route-card';
    div.innerHTML = `
      <div class="card-header">
        <div class="transport-type">${route.type === 'bus' ? 'Bus Only' : route.type === 'metro' ? 'Metro' : route.type === 'bike' ? 'Bike Share' : 'Bus + Metro'}</div>
        <div class="duration-cost">
          <div>${route.duration}</div>
          <div class="text-sm">${route.cost}</div>
        </div>
      </div>
      <div class="steps">
        ${route.steps.map((s, idx) => `
          <div class="step-item">
            <div class="step-num">${idx + 1}</div>
            <div>${s}</div>
          </div>
        `).join('')}
      </div>
      <div class="details">
        <div>${route.transfers} transfer${route.transfers !== 1 ? 's' : ''}</div>
        <div>${getOccupancyText(route.occupancy)}</div>
        <div>🌱 ${route.co2Saved}</div>
      </div>
      <button class="select-route-btn">Select Route</button>
    `;
    list.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  const newSearchBtn = document.getElementById('newSearchBtn');
  const suggestions = document.getElementById('suggestions');
  const resultsSection = document.getElementById('resultsSection');

  document.getElementById("search").onclick = () => {
  const from = document.getElementById("origin").value;
  const to = document.getElementById("destination").value;

  if (!from || !to) {
    alert("Please enter both From and To locations");
    return;
  }

  performSearch(from, to);
};


  newSearchBtn.addEventListener('click', () => {
    suggestions.style.display = 'block';
    resultsSection.style.display = 'none';
    document.getElementById('origin').value = '';
    document.getElementById('destination').value = '';
  });

  // suggestion buttons
  document.querySelectorAll('.suggestion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const origin = btn.getAttribute('data-origin');
      const destination = btn.getAttribute('data-destination');
      document.getElementById('origin').value = origin;
      document.getElementById('destination').value = destination;
      searchBtn.click();
    });
  });
});
