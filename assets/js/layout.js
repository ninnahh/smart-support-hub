
(function () {
  const pages = [
    { id: "dashboard", href: "index.html", icon: "📊", name: "Панель" },
    { id: "deployments", href: "deployments.html", icon: "🚀", name: "Внедрения" },
    { id: "incidents", href: "incidents.html", icon: "🧯", name: "Инциденты" },
    { id: "maintenance", href: "maintenance.html", icon: "🛠", name: "Заявки" },
    { id: "releases", href: "releases.html", icon: "📦", name: "Релизы" }
  ];
  const current = document.body.dataset.page;

  if (localStorage.getItem("theme") === "light") document.body.classList.add("light");

  const sidebar = document.querySelector("#sidebar");
  const brand = document.createElement("div");
  brand.className = "brand";
  brand.textContent = "Smart Support Hub";
  const nav = document.createElement("nav");
  pages.forEach(p => {
    const a = document.createElement("a");
    a.href = p.href;
    a.textContent = p.icon + " " + p.name;
    if (p.id === current) a.className = "active";
    nav.append(a);
  });
  sidebar.append(brand, nav);

  const topbar = document.querySelector("#topbar");
  const title = document.createElement("h1");
  title.textContent = pages.find(p => p.id === current).name;
  const right = document.createElement("div");
  right.className = "topbar-right";
  const version = document.createElement("span");
  version.className = "badge version";
  version.id = "currentVersion";
  version.textContent = getCurrentVersion(loadData("releases", startReleases));
  const themeButton = document.createElement("button");
  themeButton.id = "themeButton";
  themeButton.className = "btn secondary";
  themeButton.type = "button";
  themeButton.textContent = "🌓 Тема";
  const resetButton = document.createElement("button");
  resetButton.id = "resetButton";
  resetButton.className = "btn secondary";
  resetButton.type = "button";
  resetButton.textContent = "↺ Сброс данных";
  right.append(version, themeButton, resetButton);
  topbar.append(title, right);

 
  resetButton.addEventListener("click", () => {
    if (!confirm("Вернуть стартовые данные? Все добавленные записи будут удалены.")) return;
    ["deployments", "incidents", "requests", "releases"].forEach(key => localStorage.removeItem(key));
    location.reload();
  });

  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const theme = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", theme);
    document.dispatchEvent(new Event("themechange"));
  });
})();
