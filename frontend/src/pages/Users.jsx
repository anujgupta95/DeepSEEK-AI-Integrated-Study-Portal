import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(`${apiUrl}/users`);
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Card showing total users */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Users
            <span className="ml-2 text-gray-500 text-lg">
              {loading ? "Loading..." : `(${users.length})`}
            </span>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Profile</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
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
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-24" /></TableCell>
                </TableRow>
              ))
            ) : error ? (
              <TableRow>
                <TableCell colSpan="5" className="text-center text-red-500">
                  {error}
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan="5" className="text-center text-gray-500">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={user.profilePictureUrl || "/default-avatar.png"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button size="sm" onClick={() => navigate(`/user/${user.id}`)}>
                      View Details
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
