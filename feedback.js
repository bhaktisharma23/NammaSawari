// Sample past feedback data
const pastFeedback = [
  {
    id: '1',
    type: 'delay',
    route: '23',
    status: 'resolved',
    description: 'Bus was 30 minutes late',
    timestamp: '2 days ago'
  },
  {
    id: '2',
    type: 'crowding',
    route: '45',
    status: 'submitted',
    description: 'Severe overcrowding during peak hours',
    timestamp: '1 week ago'
  }
];

function getIconName(type) {
  switch(type) {
    case 'delay': return 'clock';
    case 'crowding': return 'users';
    case 'cleanliness': return 'alert-circle';
    case 'other': default: return 'bus';
  }
}

function getIconBgClass(type) {
  switch(type) {
    case 'delay': return 'delay';
    case 'crowding': return 'crowding';
    case 'cleanliness': return 'cleanliness';
    default: return 'other';
  }
}

function getStatusBadge(status) {
  return status === 'resolved' ? 'resolved' : 'submitted';
}

function renderHistory() {
  const container = document.getElementById('historyList');
  container.innerHTML = '';
  pastFeedback.forEach(item => {
    const div = document.createElement('div');
    div.className = 'feedback-item';
    div.innerHTML = `
      <div class="item-header">
        <div class="flex items-center">
          <div class="icon-bg ${getIconBgClass(item.type)}">
            <i data-lucide="${getIconName(item.type)}" class="icon"></i>
          </div>
          <div>
            <h3 class="text-gray-900">Route ${item.route}</h3>
            <p class="text-gray-500 text-sm">${item.timestamp}</p>
          </div>
        </div>
        <span class="status-badge ${getStatusBadge(item.status)}">
          ${item.status === 'resolved' ? 'Resolved' : 'Under Review'}
        </span>
      </div>
      <p class="text-gray-600 text-sm mt-2">${item.description}</p>
    `;
    container.appendChild(div);
  });
  lucide.createIcons(); // re-initialize icons inside dynamic content
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedbackForm');
  const success = document.getElementById('successMessage');
  const historyList = document.getElementById('historyList');
  const toggleBtn = document.getElementById('toggleHistoryBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const issueType = document.getElementById('issueType').value;
    const route = document.getElementById('routeInput').value.trim();
    const desc = document.getElementById('description').value.trim();
    if (!(issueType && route && desc)) {
      alert('Please fill all the fields.');
      return;
    }

    // Add to pastFeedback list (in-memory)
    pastFeedback.unshift({
      id: String(Date.now()),
      type: issueType,
      route: route,
      status: 'submitted',
      description: desc,
      timestamp: 'just now'
    });

    // Show success message
    form.style.display = 'none';
    success.style.display = 'block';

    // Optionally: after a timeout, reset
    setTimeout(() => {
      success.style.display = 'none';
      form.reset();
      form.style.display = '';
    }, 3000);
  });

  toggleBtn.addEventListener('click', () => {
    const visible = historyList.style.display === 'block';
    historyList.style.display = visible ? 'none' : 'block';
    toggleBtn.textContent = visible ? 'View All' : 'Hide';
    if (!visible) {
      renderHistory();
    }
  });

  // Quick-report buttons
  document.querySelectorAll('.qr-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-issue');
      document.getElementById('issueType').value = type;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
});
