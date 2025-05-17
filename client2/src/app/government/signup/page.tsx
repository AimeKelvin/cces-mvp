import { SignupForm } from "@/components/customs/gov/sign-up"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full max-h-screen items-center justify-center p-6 bg-gradient-to-br from-blue-100 to-white md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  )
}
