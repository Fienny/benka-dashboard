// Mock data for the UI prototype
// Will be replaced with real DB queries when PostgreSQL is connected

export const PROJECT_TYPES = [
  { code: "PJ", name: "Project" },
  { code: "STC", name: "Special Technical Conditions" },
  { code: "TO", name: "Техническое обследование" },
  { code: "TEO", name: "Технико-экономическое обоснование" },
  { code: "AO", name: "Авторский обзор" },
  { code: "EA", name: "Экспертная аналитика" },
] as const;

export const REGIONS = [
  { code: "TAS", name: "Tashkent" },
  { code: "SUR", name: "Surkhandarya" },
  { code: "SAM", name: "Samarkand" },
  { code: "BUX", name: "Bukhara" },
  { code: "FER", name: "Fergana" },
  { code: "AND", name: "Andijan" },
  { code: "NAM", name: "Namangan" },
  { code: "NAV", name: "Navoiy" },
  { code: "QAS", name: "Qashqadaryo" },
  { code: "JIZ", name: "Jizzakh" },
  { code: "SIR", name: "Sirdaryo" },
  { code: "XOR", name: "Xorazm" },
  { code: "KAR", name: "Karakalpakstan" },
] as const;

export type ProjectStatus = "active" | "completed" | "archived";

export interface Project {
  id: string;
  code: string;
  type: string;
  region: string;
  internalId: number;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  createdAt: string;
  membersCount: number;
  filesCount: number;
}

export interface ProjectFile {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  category: "document" | "photo" | "video";
  uploadedBy: string;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  role: string; // admin, engineer, viewer
  createdAt: string;
}

export const mockProjects: Project[] = [
  {
    id: "1",
    code: "PJ-TAS-1001",
    type: "PJ",
    region: "TAS",
    internalId: 1001,
    name: "Tashkent City Business Center",
    description: "Проектирование бизнес-центра в центре Ташкента",
    status: "active",
    progress: 72,
    createdAt: "2025-11-15",
    membersCount: 5,
    filesCount: 34,
  },
  {
    id: "2",
    code: "STC-SUR-2050",
    type: "STC",
    region: "SUR",
    internalId: 2050,
    name: "Surkhon Bridge Technical Conditions",
    description: "Разработка специальных технических условий для моста",
    status: "active",
    progress: 45,
    createdAt: "2026-01-10",
    membersCount: 3,
    filesCount: 18,
  },
  {
    id: "3",
    code: "TO-SAM-3012",
    type: "TO",
    region: "SAM",
    internalId: 3012,
    name: "Samarkand Historical Building Survey",
    description: "Техническое обследование исторического здания",
    status: "completed",
    progress: 100,
    createdAt: "2025-08-20",
    membersCount: 4,
    filesCount: 56,
  },
  {
    id: "4",
    code: "TEO-BUX-4400",
    type: "TEO",
    region: "BUX",
    internalId: 4400,
    name: "Bukhara Industrial Zone Feasibility",
    description: "ТЭО для промышленной зоны в Бухаре",
    status: "active",
    progress: 30,
    createdAt: "2026-02-05",
    membersCount: 6,
    filesCount: 12,
  },
  {
    id: "5",
    code: "AO-FER-5010",
    type: "AO",
    region: "FER",
    internalId: 5010,
    name: "Fergana Residential Complex Review",
    description: "Авторский надзор жилого комплекса",
    status: "active",
    progress: 60,
    createdAt: "2025-12-01",
    membersCount: 2,
    filesCount: 22,
  },
  {
    id: "6",
    code: "EA-AND-6001",
    type: "EA",
    region: "AND",
    internalId: 6001,
    name: "Andijan Water Treatment Analysis",
    description: "Экспертная аналитика системы водоочистки",
    status: "active",
    progress: 85,
    createdAt: "2025-10-12",
    membersCount: 3,
    filesCount: 41,
  },
  {
    id: "7",
    code: "PJ-QAS-7777",
    type: "PJ",
    region: "QAS",
    internalId: 7777,
    name: "Qarshi School Reconstruction",
    description: "Реконструкция школы в Карши",
    status: "archived",
    progress: 100,
    createdAt: "2025-06-15",
    membersCount: 4,
    filesCount: 78,
  },
  {
    id: "8",
    code: "STC-KAR-8100",
    type: "STC",
    region: "KAR",
    internalId: 8100,
    name: "Nukus Highway Conditions",
    description: "СТУ для автомагистрали в Нукусе",
    status: "active",
    progress: 15,
    createdAt: "2026-03-01",
    membersCount: 2,
    filesCount: 5,
  },
];

export const mockFiles: Record<string, ProjectFile[]> = {
  "1": [
    { id: "f1", name: "architectural-plan-v2.dwg", size: 15400000, mimeType: "application/acad", category: "document", uploadedBy: "Иван Петров", createdAt: "2026-02-15" },
    { id: "f2", name: "site-photo-north.jpg", size: 3200000, mimeType: "image/jpeg", category: "photo", uploadedBy: "Алексей Ким", createdAt: "2026-02-20" },
    { id: "f3", name: "site-photo-south.jpg", size: 2800000, mimeType: "image/jpeg", category: "photo", uploadedBy: "Алексей Ким", createdAt: "2026-02-20" },
    { id: "f4", name: "foundation-report.pdf", size: 4500000, mimeType: "application/pdf", category: "document", uploadedBy: "Мария Сидорова", createdAt: "2026-03-01" },
    { id: "f5", name: "drone-survey.mp4", size: 125000000, mimeType: "video/mp4", category: "video", uploadedBy: "Алексей Ким", createdAt: "2026-03-05" },
    { id: "f6", name: "structural-calculations.xlsx", size: 890000, mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", category: "document", uploadedBy: "Иван Петров", createdAt: "2026-03-10" },
    { id: "f7", name: "client-meeting-notes.docx", size: 156000, mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", category: "document", uploadedBy: "Мария Сидорова", createdAt: "2026-03-12" },
    { id: "f8", name: "interior-render-01.png", size: 8900000, mimeType: "image/png", category: "photo", uploadedBy: "Иван Петров", createdAt: "2026-03-15" },
  ],
  "2": [
    { id: "f9", name: "geological-survey.pdf", size: 12300000, mimeType: "application/pdf", category: "document", uploadedBy: "Рустам Каримов", createdAt: "2026-01-20" },
    { id: "f10", name: "bridge-specs-draft.pdf", size: 3400000, mimeType: "application/pdf", category: "document", uploadedBy: "Рустам Каримов", createdAt: "2026-02-10" },
    { id: "f11", name: "river-crossing-photo.jpg", size: 4100000, mimeType: "image/jpeg", category: "photo", uploadedBy: "Дмитрий Ли", createdAt: "2026-02-15" },
  ],
};

export const mockUsers: User[] = [
  { id: "u1", username: "admin", password: "admin123", name: "Admin Benka", role: "admin", createdAt: "2025-01-01" },
  { id: "u2", username: "petrov", password: "petrov123", name: "Иван Петров", role: "engineer", createdAt: "2025-03-15" },
  { id: "u3", username: "sidorova", password: "sidorova123", name: "Мария Сидорова", role: "engineer", createdAt: "2025-04-20" },
  { id: "u4", username: "kim", password: "kim123", name: "Алексей Ким", role: "engineer", createdAt: "2025-05-10" },
  { id: "u5", username: "karimov", password: "karimov123", name: "Рустам Каримов", role: "engineer", createdAt: "2025-06-01" },
  { id: "u6", username: "li", password: "li123", name: "Дмитрий Ли", role: "viewer", createdAt: "2025-08-15" },
];

// Dashboard metrics
export const dashboardMetrics = {
  totalProjects: mockProjects.length,
  activeProjects: mockProjects.filter((p) => p.status === "active").length,
  completedProjects: mockProjects.filter((p) => p.status === "completed").length,
  totalFiles: mockProjects.reduce((acc, p) => acc + p.filesCount, 0),
  totalMembers: mockUsers.length,
  avgProgress: Math.round(
    mockProjects.filter((p) => p.status === "active").reduce((acc, p) => acc + p.progress, 0) /
      mockProjects.filter((p) => p.status === "active").length
  ),
};

export const projectsByType = PROJECT_TYPES.map((t) => ({
  type: t.code,
  name: t.name,
  count: mockProjects.filter((p) => p.type === t.code).length,
}));

export const projectsByRegion = REGIONS.filter((r) =>
  mockProjects.some((p) => p.region === r.code)
).map((r) => ({
  region: r.code,
  name: r.name,
  count: mockProjects.filter((p) => p.region === r.code).length,
}));

export const monthlyActivity = [
  { month: "Oct", files: 12, projects: 2 },
  { month: "Nov", files: 18, projects: 1 },
  { month: "Dec", files: 24, projects: 1 },
  { month: "Jan", files: 15, projects: 2 },
  { month: "Feb", files: 32, projects: 1 },
  { month: "Mar", files: 28, projects: 1 },
];
