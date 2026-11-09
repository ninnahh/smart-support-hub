let incidents = loadData("incidents", startIncidents);

function renderIncidents(list) {
  const tbody = document.querySelector("#incidentTable");
  tbody.innerHTML = "";
  list.forEach(item => {
    const state = getSlaState(item, settings);
    const row = document.createElement("tr");
    if (state === "breached") row.className = "breached-row";
    row.append(makeCell(item.id), makeCell(item.title));

    const priorityCell = document.createElement("td");
    priorityCell.append(makeBadge(priorityNames[item.priority], item.priority));
    const statusCell = document.createElement("td");
    statusCell.append(makeBadge(incidentStatusNames[item.status], item.status));
    const slaCell = document.createElement("td");
    slaCell.append(makeBadge(slaNames[state], state));

    const actionCell = document.createElement("td");
    if (item.status === "new") {
      const take = document.createElement("button");
      take.type = "button";
      take.className = "btn secondary small";
      take.textContent = "В работу";
      take.addEventListener("click", () => startIncident(item.id));
      actionCell.append(take);
    }
    if (item.status !== "resolved") {
      const resolve = document.createElement("button");
      resolve.type = "button";
      resolve.className = "btn small";
      resolve.textContent = "Решить";
      resolve.addEventListener("click", () => resolveIncident(item.id));
      actionCell.append(resolve);
    }

    row.append(priorityCell, statusCell, slaCell, makeCell(formatDate(getSlaDeadline(item, settings))), actionCell);
    tbody.append(row);
  });
}

function applyFilter() {
  const value = document.querySelector("#statusFilter").value;
  const result = value === "all" ? incidents : incidents.filter(item => item.status === value);
  renderIncidents(result);
}

function startIncident(id) {
  const item = incidents.find(incident => incident.id === id);
  item.status = "in_progress";
  saveData("incidents", incidents);
  applyFilter();
}

function resolveIncident(id) {
  const item = incidents.find(incident => incident.id === id);
  item.status = "resolved";
  item.resolvedAt = new Date().toISOString();
  saveData("incidents", incidents);
  applyFilter();
}

document.querySelector("#incidentForm").addEventListener("submit", event => {
  event.preventDefault();
  const title = document.querySelector("#title").value.trim();
  const priority = document.querySelector("#priority").value;
  if (title === "") {
    alert("Введите описание инцидента");
    return;
  }
  incidents.push({
    id: nextId(incidents, "INC", 3),
    title: title,
    priority: priority,
    status: "new",
    createdAt: new Date().toISOString(),
    resolvedAt: null
  });
  saveData("incidents", incidents);
  applyFilter();
  event.target.reset();
});

document.querySelector("#statusFilter").addEventListener("change", applyFilter);

renderIncidents(incidents);
