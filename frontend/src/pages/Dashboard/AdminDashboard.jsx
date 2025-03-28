import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const apiUrl = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(`${apiUrl}/users`);
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter((user) => user.role.toLowerCase() === filter.toLowerCase())
      );
    }
  }, [filter, users]);

  const instructorCount = users.filter(
    (user) => user.role.toLowerCase() === "instructor"
  ).length;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2 text-xl font-bold">
              <span>Users</span>
              <span className="text-gray-500 text-lg">
                {loading ? "Loading..." : `(${users.length})`}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xl font-bold">
              <span>Instructors</span>
              <span className="text-gray-500 text-lg">
                {loading ? "Loading..." : `(${instructorCount})`}
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Dropdown Filter */}
      <div className="mb-4 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Filter: {filter}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["All", "Student", "Instructor", "Admin"].map((role) => (
              <DropdownMenuItem key={role} onClick={() => setFilter(role)}>
                {role}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Profile</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="w-10 h-10 rounded-full" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-24" /></TableCell>
                </TableRow>
              ))
            ) : error ? (
              <TableRow>
                <TableCell colSpan="6" className="text-center text-red-500">
                  {error}
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan="6" className="text-center text-gray-500">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={user.profilePictureUrl || "/default-avatar.png"}
                        alt={user.name}
                      />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button size="sm" onClick={() => navigate(`/user/${user.id}`)} >
                      View Details
                    </Button>
                    <Button size="sm" className="ms-1" onClick={() => confirm(`Send reminder to ${user.name}?`)} >
                      Send Reminder
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
