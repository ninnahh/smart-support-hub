let releases = loadData("releases", startReleases);

function renderReleases() {
  const box = document.querySelector("#releaseList");
  box.innerHTML = "";
  const sorted = [...releases].sort((a, b) => versionToNumber(b.version) - versionToNumber(a.version));
  sorted.forEach(item => {
    const card = document.createElement("article");
    card.className = "card release";
    const title = document.createElement("h3");
    title.textContent = item.version + " · " + item.date + " ";
    title.append(makeBadge(item.level, "version"));
    const list = document.createElement("ul");
    item.changes.forEach(text => {
      const li = document.createElement("li");
      li.textContent = text;
      list.append(li);
    });
    card.append(title, list);
    box.append(card);
  });
  updateHint();
}

function updateHint() {
  const level = document.querySelector("#level").value;
  const current = getCurrentVersion(releases);
  document.querySelector("#nextVersionHint").textContent =
    `Текущая версия: ${current}. Следующая версия (${level}): ${getNextVersion(current, level)}`;
}

document.querySelector("#level").addEventListener("change", updateHint);

document.querySelector("#releaseForm").addEventListener("submit", event => {
  event.preventDefault();
  const changes = document.querySelector("#relChanges").value
    .split("\n").map(line => line.trim()).filter(line => line !== "");
  const date = document.querySelector("#relDate").value || new Date().toISOString().slice(0, 10);
  if (changes.length === 0) {
    alert("Опишите хотя бы одно изменение");
    return;
  }
  const level = document.querySelector("#level").value;
  releases.push({
    id: nextId(releases, "REL", 3),
    version: getNextVersion(getCurrentVersion(releases), level),
    date: date,
    level: level,
    changes: changes
  });
  saveData("releases", releases);
  document.querySelector("#currentVersion").textContent = getCurrentVersion(releases);
  renderReleases();
  event.target.reset();
});

renderReleases();
