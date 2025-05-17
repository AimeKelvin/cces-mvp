"use client";

import { cn } from "@/lib/utils";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center px-4",
        className
      )}
      {...props}
    >
      <Card2 className="w-full max-w-md rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold text-blue-700">Jambo</CardTitle>
          <CardDescription className="text-gray-500">
            Create your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="name">Organization or Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ministry of Finance"
                  required
                   className="border border-gray-400 text-black focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="border border-gray-400 text-black focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
                  required
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="category">Public Service Category</Label>
                <Select required>
                  <SelectTrigger id="category"  className="border border-gray-400 text-black focus:border-blue-500 focus:ring-blue-500 focus:ring-1">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="w-64 bg-white">
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="tax">Tax & Revenue</SelectItem>
                    <SelectItem value="justice">Justice & Law</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required  className="border border-gray-400 text-black focus:border-blue-500 focus:ring-blue-500 focus:ring-1"/>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" required  className="border border-gray-400 text-black focus:border-blue-500 focus:ring-blue-500 focus:ring-1"/>
              </div>
            </div>

            <div className="space-y-3">
              <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Sign Up
              </Button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/government/login" className="text-blue-700 font-medium hover:underline">
                Log in
              </a>
            </div>
          </form>
        </CardContent>
      </Card2>
    </div>
  );
}
