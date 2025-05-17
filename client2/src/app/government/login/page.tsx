import { LoginForm } from "@/components/customs/gov/login-form"

export default function Page() {
  return (
    <div className="flex max-h-screen min-h-svh w-full items-center justify-center p-6 bg-gradient-to-br from-green-100 to-white md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
