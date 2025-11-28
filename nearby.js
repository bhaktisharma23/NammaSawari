const stops = [
  {
    name: "Park Street Junction",
    distance: "150 m",
    routes: ["23", "45", "67"],
    facilities: ["Shelter", "WiFi", "Accessible"],
    nextBuses: [
      { route: "23", time: "3 min", occupancy: "low" },
      { route: "45", time: "8 min", occupancy: "high" },
      { route: "67", time: "12 min", occupancy: "medium" }
    ],
    isFavorite: true
  },
  {
    name: "City Mall",
    distance: "320 m",
    routes: ["12", "23", "89"],
    facilities: ["Shelter", "Accessible"],
    nextBuses: [
      { route: "12", time: "5 min", occupancy: "medium" },
      { route: "23", time: "10 min", occupancy: "low" },
      { route: "89", time: "15 min", occupancy: "high" }
    ],
    isFavorite: false
  }
];

function getOccClass(occ) {
  return occ === "low" ? "occ-low" : occ === "medium" ? "occ-medium" : "occ-high";
}

function renderStops() {
  const container = document.getElementById("stopsList");
  container.innerHTML = "";

  stops.forEach(stop => {
    const card = document.createElement("div");
    card.className = "stop-card";

    card.innerHTML = `
      <div class="stop-header">
        <div>
          <div class="stop-name">${stop.name}</div>
          <div class="stop-distance">📍 ${stop.distance} away</div>
        </div>
        <div>${stop.isFavorite ? "⭐" : "☆"}</div>
      </div>

      <div>${stop.routes.map(r => `<span class="route-tag">${r}</span>`).join("")}</div>

      <div class="facilities-list">🏷 ${stop.facilities.join(" • ")}</div>

      <div class="next-buses">
        ${stop.nextBuses.map(bus => `
          <div class="bus-entry">
            <div><b>${bus.route}</b> – ${bus.time}</div>
            <div class="occupancy-badge ${getOccClass(bus.occupancy)}">
              ${bus.occupancy.toUpperCase()}
            </div>
          </div>
        `).join("")}
      </div>

      <button class="nav-btn">Navigate</button>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderStops();
  document.getElementById("updateLocationBtn").onclick = () => {
    alert("Location will use GPS here");
  };
});
