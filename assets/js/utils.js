
const settings = {
  slaHours: { critical: 4, high: 8, medium: 24, low: 72 }
};

const slaNames = { on_track: "В срок", breached: "Нарушен", met: "Решён вовремя" };
const stageNames = { planning: "Планирование", setup: "Настройка", training: "Обучение", production: "Эксплуатация" };
const priorityNames = { critical: "Критический", high: "Высокий", medium: "Средний", low: "Низкий" };
const incidentStatusNames = { new: "Новый", in_progress: "В работе", resolved: "Решён" };
const typeNames = { corrective: "Корректирующее", adaptive: "Адаптивное", perfective: "Совершенствующее", preventive: "Профилактическое" };
const requestStatusNames = { new: "Новая", planned: "Запланирована", done: "Выполнена" };

function getSlaState(incident, settings, now = Date.now()) {
  const hours = settings.slaHours[incident.priority];
  const created = new Date(incident.createdAt).getTime();
  const deadline = created + hours * 60 * 60 * 1000;
  if (incident.status === "resolved") {
    const resolved = new Date(incident.resolvedAt).getTime();
    return resolved <= deadline ? "met" : "breached";
  }
  return now > deadline ? "breached" : "on_track";
}


function getSlaDeadline(incident, settings) {
  const hours = settings.slaHours[incident.priority];
  return new Date(new Date(incident.createdAt).getTime() + hours * 60 * 60 * 1000);
}

function getSlaPercent(incidents, settings) {
  const resolved = incidents.filter(item => item.status === "resolved");
  if (resolved.length === 0) return 100;
  const met = resolved.filter(item => getSlaState(item, settings) === "met");
  return Math.round((met.length / resolved.length) * 100);
}

function getNextVersion(current, level) {
  const parts = current.replace("v", "").split(".").map(Number);
  if (level === "major") return `v${parts[0] + 1}.0.0`;
  if (level === "minor") return `v${parts[0]}.${parts[1] + 1}.0`;
  return `v${parts[0]}.${parts[1]}.${parts[2] + 1}`;
}

function versionToNumber(v) {
  const p = v.replace("v", "").split(".").map(Number);
  return p[0] * 1000000 + p[1] * 1000 + p[2];
}

function getCurrentVersion(releases) {
  if (!releases.length) return "v1.0.0";
  return releases.reduce((a, b) => (versionToNumber(b.version) > versionToNumber(a.version) ? b : a)).version;
}


function nextId(list, prefix, width) {
  const max = list.reduce((m, item) => {
    const n = parseInt(item.id.split("-")[1], 10);
    return Number.isNaN(n) ? m : Math.max(m, n);
  }, 0);
  return prefix + "-" + String(max + 1).padStart(width, "0");
}

function formatDate(value) {
  return new Date(value).toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}


function makeCell(text, className) {
  const cell = document.createElement("td");
  cell.textContent = text;
  if (className) cell.className = className;
  return cell;
}

function makeBadge(text, className) {
  const span = document.createElement("span");
  span.className = "badge " + className;
  span.textContent = text;
  return span;
}
