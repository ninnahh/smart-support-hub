let priorityChart = null;
let requestChart = null;

function buildDashboard() {
  const deployments = loadData("deployments", startDeployments);
  const incidents = loadData("incidents", startIncidents);
  const requests = loadData("requests", startRequests);
  const releases = loadData("releases", startReleases);

  
  document.querySelector("#kpiDeployments").textContent =
    deployments.filter(item => item.stage !== "production").length;
  document.querySelector("#kpiIncidents").textContent =
    incidents.filter(item => item.status !== "resolved").length;
  document.querySelector("#kpiSla").textContent = getSlaPercent(incidents, settings) + "%";
  document.querySelector("#kpiVersion").textContent = getCurrentVersion(releases);

  
  if (typeof Chart === "undefined") return;
  const styles = getComputedStyle(document.body);
  Chart.defaults.color = styles.getPropertyValue("--muted").trim();
  Chart.defaults.borderColor = styles.getPropertyValue("--line").trim();
  if (priorityChart) priorityChart.destroy();
  if (requestChart) requestChart.destroy();

  const levels = ["critical", "high", "medium", "low"];
  priorityChart = new Chart(document.querySelector("#priorityChart"), {
    type: "bar",
    data: {
      labels: levels.map(level => priorityNames[level]),
      datasets: [{
        label: "Инциденты",
        data: levels.map(level => incidents.filter(item => item.priority === level).length),
        backgroundColor: ["#ff7070", "#ffc857", "#36a3ff", "#72e0c4"]
      }]
    },
    options: {
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
    }
  });

  const types = ["corrective", "adaptive", "perfective", "preventive"];
  requestChart = new Chart(document.querySelector("#requestChart"), {
    type: "doughnut",
    data: {
      labels: types.map(type => typeNames[type]),
      datasets: [{
        data: types.map(type => requests.filter(item => item.type === type).length),
        backgroundColor: ["#ff7070", "#ffc857", "#36a3ff", "#72e0c4"],
        borderColor: styles.getPropertyValue("--panel").trim()
      }]
    },
    options: { maintainAspectRatio: false }
  });
}

buildDashboard();
document.addEventListener("themechange", buildDashboard);
