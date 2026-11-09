let requests = loadData("requests", startRequests);

function renderRequests(list) {
  const tbody = document.querySelector("#requestTable");
  tbody.innerHTML = "";
  list.forEach(item => {
    const row = document.createElement("tr");
    row.append(makeCell(item.id), makeCell(item.title), makeCell(typeNames[item.type] + " (" + item.type + ")"));

    const statusCell = document.createElement("td");
    const select = document.createElement("select");
    Object.keys(requestStatusNames).forEach(key => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = requestStatusNames[key];
      if (key === item.status) option.selected = true;
      select.append(option);
    });
    select.addEventListener("change", () => {
      item.status = select.value;
      saveData("requests", requests);
    });
    statusCell.append(select);

    row.append(statusCell, makeCell(item.targetVersion));
    tbody.append(row);
  });
}

document.querySelector("#requestForm").addEventListener("submit", event => {
  event.preventDefault();
  const title = document.querySelector("#reqTitle").value.trim();
  const targetVersion = document.querySelector("#reqVersion").value.trim();
  if (title === "") {
    alert("Введите описание заявки");
    return;
  }
  if (!/^v\d+\.\d+\.\d+$/.test(targetVersion)) {
    alert("Целевая версия должна быть в формате v1.3.0");
    return;
  }
  requests.push({
    id: nextId(requests, "REQ", 3),
    title: title,
    type: document.querySelector("#reqType").value,
    status: document.querySelector("#reqStatus").value,
    targetVersion: targetVersion
  });
  saveData("requests", requests);
  renderRequests(requests);
  event.target.reset();
});

renderRequests(requests);
