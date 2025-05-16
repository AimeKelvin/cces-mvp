import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative w-full min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/com.png"
          alt="Community issue reporting background"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      <div className="relative w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            <span className="block">Report Issues, Build Community</span>
          </h1>
          <p className="mt-3 text-base text-white/90 sm:mt-5 sm:text-lg md:text-xl sm:max-w-xl sm:mx-auto lg:mx-0">
            Report public issues quickly and track their progress in real-time. Help us create safer, cleaner, and more responsive neighborhoods.
          </p>
          <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
            <Button
              asChild
              className="w-full sm:w-auto px-8 py-3 text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              <Link href="/report">Report Issue</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto px-8 py-3 text-base font-medium rounded-md text-white bg-transparent border border-white hover:bg-white/10"
            >
              <Link href="/track">Track Progress</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}