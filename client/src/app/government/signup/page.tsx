"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerGovernmentUser } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card2,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SignupPage() {
  const router = useRouter();

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [category, setcategory] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!category) {
      setError("Please select a Public Service Category");
      return;
    }

    setLoading(true);
    try {
      await registerGovernmentUser({
        name,
        email,
        password,
        category,
      });
      router.push("/government/login");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-white p-6 md:p-10">
      <div className="w-full max-w-md">
        <Card2 className="rounded-2xl shadow-none">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold text-blue-700">Jambo</CardTitle>
            <CardDescription className="text-gray-500">
              Create your account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="username">category or Full Name</Label>
                  <Input
                    id="username"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    required
                    placeholder="e.g. Ministry of Health"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label>Public Service Category</Label>
                  <Select onValueChange={setcategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="education">education</SelectItem>
                      <SelectItem value="roads">road</SelectItem>
                      <SelectItem value="health">health</SelectItem>
                      <SelectItem value="water">water</SelectItem>
                      <SelectItem value="security">security</SelectItem>
                      {/* Add more as needed */}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && <p className="text-red-600 text-sm text-center">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Sign Up"}
              </Button>

              <div className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{" "}
                <a href="/government/login" className="text-blue-700 font-medium hover:underline">
                  Log in
                </a>
              </div>
            </form>
          </CardContent>
        </Card2>
      </div>
    </div>
  );
}
