"use client";

import { useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
// import { mockProjects, mockFiles, type ProjectFile } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Upload,
  Search,
  FileText,
  Image as ImageIcon,
  Video,
  Download,
  Trash2,
  Eye,
  FolderOpen,
  Grid3X3,
  List,
} from "lucide-react";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

function getCategoryIcon(category: string) {
  switch (category) {
    case "photo":
      return <ImageIcon className="h-4 w-4 text-emerald-600" />;
    case "video":
      return <Video className="h-4 w-4 text-purple-600" />;
    default:
      return <FileText className="h-4 w-4 text-blue-600" />;
  }
}

function getFileExtColor(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return "bg-red-100 text-red-700";
    case "dwg":
      return "bg-orange-100 text-orange-700";
    case "xlsx":
    case "xls":
      return "bg-green-100 text-green-700";
    case "docx":
    case "doc":
      return "bg-blue-100 text-blue-700";
    case "jpg":
    case "jpeg":
    case "png":
      return "bg-emerald-100 text-emerald-700";
    case "mp4":
    case "mov":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-zinc-100 text-zinc-600";
  }
}

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<any>(null);
  // type ProjectFile = any;

  const [files, setFiles] = useState<ProjectFile[]>([]);

  useEffect(() => {
    fetch(`/api/projects/${projectId}`)
      .then((res) => res.json())
      .then((data) => setProject(data));

    fetch(`/api/files?projectId=${projectId}`)
      .then((res) => res.json())
      .then((data) => setFiles(data));
  }, [projectId]);

  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "grid">("list");
  const [tab, setTab] = useState("all");
  const [dragActive, setDragActive] = useState(false);

  const filteredFiles = files.filter((f) => {
    const matchSearch = search === "" || f.name.toLowerCase().includes(search.toLowerCase());
    const matchTab = tab === "all" || f.category === tab;
    return matchSearch && matchTab;
  });

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("projectId", projectId);

    await fetch("/api/files", {
      method: "POST",
      body: formData,
    });
    const res = await fetch(`/api/files?projectId=${projectId}`);
    const data = await res.json();
    setFiles(data);

    alert("File uploaded!");
  }, []);

  // if (!project) {
  //   return (
  //     <div className="text-center py-20">
  //       <FolderOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
  //       <h2 className="text-lg font-semibold">Project not found</h2>
  //       <Link href="/projects" className="text-sm text-primary underline mt-2 inline-block">
  //         Back to projects
  //       </Link>
  //     </div>
  //   );
  // }
  if (!project) {
    return (
      <div className="text-center py-20">
        <p>Loading...</p>
      </div>
    );
  }

  const docCount = files.filter((f) => f.category === "document").length;
  const photoCount = files.filter((f) => f.category === "photo").length;
  const videoCount = files.filter((f) => f.category === "video").length;

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight font-mono">
                {project.code}
              </h1>
              <Badge
                variant="secondary"
                className={
                  project.status === "active"
                    ? "bg-emerald-100 text-emerald-700"
                    : project.status === "completed"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-zinc-100 text-zinc-600"
                }
              >
                {project.status}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">{project.name}</p>
          </div>
          <input
            type="file"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const formData = new FormData();
              formData.append("file", file);
              formData.append("projectId", projectId);
              await fetch("/api/files", {
                method: "POST",
                body: formData,
              });
              const res = await fetch(`/api/files?projectId=${projectId}`);
              const data = await res.json();
              setFiles(data);
              alert("Uploaded!");
            }}
          />
        </div>
      </div>

      {/* Project Info Cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{project.progress}%</p>
            <p className="text-xs text-muted-foreground">Progress</p>
            <Progress value={project.progress} className="h-1.5 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{docCount}</p>
            <p className="text-xs text-muted-foreground">Documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{photoCount}</p>
            <p className="text-xs text-muted-foreground">Photos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{videoCount}</p>
            <p className="text-xs text-muted-foreground">Videos</p>
          </CardContent>
        </Card>
      </div>

      {/* Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/20"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
        <p className="text-sm text-muted-foreground">
          Drag and drop files here, or{" "}
          <button className="text-primary underline">browse</button>
        </p>
        <p className="text-xs text-muted-foreground/60 mt-1">
          Supports documents, photos, and videos
        </p>
      </div>

      {/* File Manager */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-base">Files</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search files..."
                  className="pl-9 h-9 w-[200px]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex border rounded-md">
                <button
                  className={`p-1.5 ${view === "list" ? "bg-muted" : ""}`}
                  onClick={() => setView("list")}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  className={`p-1.5 ${view === "grid" ? "bg-muted" : ""}`}
                  onClick={() => setView("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All ({files.length})</TabsTrigger>
              <TabsTrigger value="document">Documents ({docCount})</TabsTrigger>
              <TabsTrigger value="photo">Photos ({photoCount})</TabsTrigger>
              <TabsTrigger value="video">Videos ({videoCount})</TabsTrigger>
            </TabsList>

            <TabsContent value={tab} className="mt-0">
              {view === "list" ? (
                <FileListView files={filteredFiles} />
              ) : (
                <FileGridView files={filteredFiles} />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function FileListView({ files }: { files: ProjectFile[] }) {
  if (files.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        No files found
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Uploaded by</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file) => {
          const ext = file.name.split(".").pop()?.toUpperCase() || "";
          return (
            <TableRow key={file.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getCategoryIcon(file.category)}
                  <span className="text-sm font-medium">{file.name}</span>
                  <Badge
                    variant="secondary"
                    className={`text-[10px] px-1.5 ${getFileExtColor(file.name)}`}
                  >
                    {ext}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-sm capitalize text-muted-foreground">
                {file.category}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatFileSize(file.size)}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {file.uploadedBy}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {file.createdAt}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function FileGridView({ files }: { files: ProjectFile[] }) {
  if (files.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        No files found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {files.map((file) => {
        const ext = file.name.split(".").pop()?.toUpperCase() || "";
        return (
          <div
            key={file.id}
            className="border rounded-lg p-3 hover:shadow-sm transition-shadow cursor-pointer group"
          >
            <div className="flex items-center justify-center h-16 mb-2 rounded bg-muted/50">
              {file.category === "photo" ? (
                <ImageIcon className="h-8 w-8 text-emerald-500/60" />
              ) : file.category === "video" ? (
                <Video className="h-8 w-8 text-purple-500/60" />
              ) : (
                <FileText className="h-8 w-8 text-blue-500/60" />
              )}
            </div>
            <p className="text-xs font-medium truncate">{file.name}</p>
            <div className="flex items-center justify-between mt-1">
              <Badge
                variant="secondary"
                className={`text-[10px] px-1 ${getFileExtColor(file.name)}`}
              >
                {ext}
              </Badge>
              <span className="text-[10px] text-muted-foreground">
                {formatFileSize(file.size)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
