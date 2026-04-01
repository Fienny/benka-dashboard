"use client";

import { useState } from "react";
import { mockUsers, mockProjects } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  UserPlus,
  Shield,
  Users,
  Settings,
  Edit,
  Trash2,
  FolderKanban,
} from "lucide-react";

const ROLES = ["Admin", "Engineer", "Viewer"];

const roleColors: Record<string, string> = {
  Admin: "bg-red-100 text-red-700",
  Engineer: "bg-blue-100 text-blue-700",
  Viewer: "bg-zinc-100 text-zinc-600",
};

export default function AdminPage() {
  const [userSearch, setUserSearch] = useState("");

  const filteredUsers = mockUsers.filter(
    (u) =>
      userSearch === "" ||
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Panel</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage users, roles, and project assignments
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg p-2 bg-blue-50">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Users</p>
                <p className="text-xl font-bold">{mockUsers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg p-2 bg-red-50">
                <Shield className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Admins</p>
                <p className="text-xl font-bold">
                  {mockUsers.filter((u) => u.roles.includes("Admin")).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg p-2 bg-emerald-50">
                <Settings className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Engineers</p>
                <p className="text-xl font-bold">
                  {mockUsers.filter((u) => u.roles.includes("Engineer")).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg p-2 bg-violet-50">
                <FolderKanban className="h-4 w-4 text-violet-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Projects</p>
                <p className="text-xl font-bold">{mockProjects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-2" />
            Users
          </TabsTrigger>
          <TabsTrigger value="roles">
            <Shield className="h-4 w-4 mr-2" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="assignments">
            <FolderKanban className="h-4 w-4 mr-2" />
            Project Assignments
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-9"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
              />
            </div>
            <Dialog>
              <DialogTrigger>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <Input placeholder="Full name" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input placeholder="email@benka.uz" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Password</label>
                    <Input type="password" placeholder="••••••••" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Role</label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Create User</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {user.roles.map((role) => (
                          <Badge
                            key={role}
                            variant="secondary"
                            className={roleColors[role] || ""}
                          >
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.createdAt}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Roles Tab */}
        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">System Roles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Admin",
                  desc: "Full access to all features including user management, role assignment, and project configuration",
                  users: mockUsers.filter((u) => u.roles.includes("Admin")).length,
                  color: "bg-red-100 text-red-700",
                },
                {
                  name: "Engineer",
                  desc: "Can work on assigned projects, upload/download files, update progress",
                  users: mockUsers.filter((u) => u.roles.includes("Engineer")).length,
                  color: "bg-blue-100 text-blue-700",
                },
                {
                  name: "Viewer",
                  desc: "Read-only access to assigned projects and their files",
                  users: mockUsers.filter((u) => u.roles.includes("Viewer")).length,
                  color: "bg-zinc-100 text-zinc-600",
                },
              ].map((role) => (
                <div
                  key={role.name}
                  className="flex items-center justify-between border rounded-lg p-4"
                >
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className={`${role.color} text-sm px-3 py-1`}>
                      {role.name}
                    </Badge>
                    <div>
                      <p className="text-sm text-muted-foreground">{role.desc}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {role.users} user(s) assigned
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Project Assignments</CardTitle>
                <Button size="sm">Assign User to Project</Button>
              </div>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div>
                        <p className="font-mono text-sm font-semibold">{project.code}</p>
                        <p className="text-xs text-muted-foreground">{project.name}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{project.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm">{project.membersCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Manage Members
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
