let deployments = loadData("deployments", startDeployments);

function renderDeployments(list) {
  const tbody = document.querySelector("#deploymentTable");
  tbody.innerHTML = "";
  list.forEach(item => {
    const row = document.createElement("tr");
    row.append(makeCell(item.id), makeCell(item.client), makeCell(item.product), makeCell(item.version));

    
    const stageCell = document.createElement("td");
    const select = document.createElement("select");
    Object.keys(stageNames).forEach(key => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = stageNames[key];
      if (key === item.stage) option.selected = true;
      select.append(option);
    });
    select.addEventListener("change", () => {
      item.stage = select.value;
      saveData("deployments", deployments);
    });
    stageCell.append(select);

    
    const percent = item.total > 0 ? Math.round((item.done / item.total) * 100) : 0;
    const progressCell = document.createElement("td");
    const wrap = document.createElement("div");
    wrap.className = "progress-cell";
    const label = document.createElement("span");
    label.textContent = `${percent}% (${item.done} из ${item.total})`;
    const bar = document.createElement("div");
    bar.className = "progress";
    const fill = document.createElement("i");
    fill.style.width = percent + "%";
    bar.append(fill);
    wrap.append(label, bar);
    progressCell.append(wrap);

    row.append(stageCell, progressCell, makeCell(item.owner), makeCell(item.plannedDate));
    tbody.append(row);
  });
}

document.querySelector("#deploymentForm").addEventListener("submit", event => {
  event.preventDefault();
  const client = document.querySelector("#client").value.trim();
  const product = document.querySelector("#product").value.trim();
  const version = document.querySelector("#version").value.trim();
  const owner = document.querySelector("#owner").value.trim();
  const plannedDate = document.querySelector("#plannedDate").value;
  const done = Number(document.querySelector("#done").value);
  const total = Number(document.querySelector("#total").value);

  if (client === "" || product === "" || owner === "" || plannedDate === "") {
    alert("Заполните заказчика, продукт, ответственного и дату");
    return;
  }
  if (!/^v\d+\.\d+\.\d+$/.test(version)) {
    alert("Версия должна быть в формате v1.2.3");
    return;
  }
  if (!Number.isInteger(done) || !Number.isInteger(total) || total < 1 || done < 0 || done > total) {
    alert("Количество задач: всего не меньше 1, выполнено не больше, чем всего");
    return;
  }

  deployments.push({
    id: nextId(deployments, "DEP", 2),
    client, product, version,
    stage: document.querySelector("#stage").value,
    owner, plannedDate, done, total
  });
  saveData("deployments", deployments);
  renderDeployments(deployments);
  event.target.reset();
});

renderDeployments(deployments);
