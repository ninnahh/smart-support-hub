
const startDeployments = [
  { id: "DEP-01", client: "Колледж, учебная часть", product: "Система расписания", version: "v1.2.0", stage: "training", owner: "Иванов А.", plannedDate: "2026-11-20", done: 2, total: 3 },
  { id: "DEP-02", client: "Библиотека №5", product: "Электронный каталог", version: "v1.1.0", stage: "setup", owner: "Петрова М.", plannedDate: "2026-12-05", done: 1, total: 4 },
  { id: "DEP-03", client: "Клиника «Здоровье»", product: "Электронная запись", version: "v1.2.1", stage: "production", owner: "Сидоров К.", plannedDate: "2026-10-15", done: 5, total: 5 },
  { id: "DEP-04", client: "Школа №12", product: "Электронный журнал", version: "v1.2.1", stage: "planning", owner: "Иванов А.", plannedDate: "2027-01-15", done: 0, total: 6 }
];

const startIncidents = [
  { id: "INC-001", title: "Не открывается отчёт", priority: "high", status: "in_progress", createdAt: "2026-11-02T10:00:00", resolvedAt: null },
  { id: "INC-002", title: "Сбой входа в систему", priority: "critical", status: "resolved", createdAt: "2026-11-03T09:00:00", resolvedAt: "2026-11-03T11:30:00" },
  { id: "INC-003", title: "Неверный формат даты в таблице", priority: "medium", status: "new", createdAt: "2026-11-05T12:00:00", resolvedAt: null },
  { id: "INC-004", title: "Опечатка в названии кнопки", priority: "low", status: "resolved", createdAt: "2026-11-01T15:00:00", resolvedAt: "2026-11-02T10:00:00" },
  { id: "INC-005", title: "Долго загружается список клиентов", priority: "high", status: "resolved", createdAt: "2026-11-04T08:00:00", resolvedAt: "2026-11-04T20:00:00" },
  { id: "INC-006", title: "Не приходит письмо с подтверждением", priority: "low", status: "in_progress", createdAt: "2026-11-06T14:00:00", resolvedAt: null }
];

const startRequests = [
  { id: "REQ-001", title: "Исправить ошибку открытия отчёта", type: "corrective", status: "done", targetVersion: "v1.2.1" },
  { id: "REQ-002", title: "Поддержка новой версии браузера", type: "adaptive", status: "planned", targetVersion: "v1.3.0" },
  { id: "REQ-003", title: "Добавить экспорт отчёта в PDF", type: "perfective", status: "planned", targetVersion: "v1.3.0" },
  { id: "REQ-004", title: "Обновить устаревшую библиотеку", type: "preventive", status: "new", targetVersion: "v1.3.0" }
];

const startReleases = [
  { id: "REL-004", version: "v1.2.0", date: "2026-10-20", level: "minor", changes: ["Добавлен фильтр отчётов по датам", "Обновлён интерфейс главной страницы"] },
  { id: "REL-005", version: "v1.2.1", date: "2026-11-05", level: "patch", changes: ["Исправлено открытие отчёта", "Обновлено руководство пользователя"] }
];
