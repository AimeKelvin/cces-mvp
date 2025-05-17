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

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center px-4",
        className
      )}
      {...props}
    >
      <Card2 className="w-full max-w-md rounded-2xl shadow-none">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold text-blue-700">Jambo</CardTitle>
          <CardDescription className="text-gray-500">
            Log in to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                   className="border border-gray-400 text-black focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
                />
              </div>
              <div className="grid gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required  className="border border-gray-400 text-black focus:border-blue-500 focus:ring-blue-500 focus:ring-1"/>
              </div>
            </div>

            <div className="space-y-3">
              <Button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700">
                Login
              </Button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <a href="/government/signup" className="text-blue-700 font-medium hover:underline">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card2>
    </div>
  );
}
