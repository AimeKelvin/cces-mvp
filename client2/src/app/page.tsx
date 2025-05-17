"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChooseRole() {
  const router = useRouter();
  const [selected, setSelected] = useState<"citizen" | "government" | null>(null);

  const handleSelect = (role: "citizen" | "government") => {
    setSelected(role);
    localStorage.setItem("userRole", role);

    setTimeout(() => {
      router.push(`/${role}`);
      if (role === "government") {
        router.push(`/${role}/login`);
      }
    }, 1000); // wait for animation
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full text-center space-y-10"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">Choose Your Role</h1>
        <p className="text-gray-600 text-lg">Select whether you’re a citizen or a government official</p>

        <div className="relative grid sm:grid-cols-2 gap-8 mt-10">
          <motion.div
            layout
            onClick={() => handleSelect("citizen")}
            animate={
              selected === "citizen"
                ? { scale: 1.1, zIndex: 10 }
                : selected
                ? { opacity: 0.3, scale: 0.9 }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`cursor-pointer p-8 rounded-xl border hover:shadow-2xl bg-white transition-all ${
              selected === "citizen" ? "ring-4 ring-green-400" : ""
            }`}
          >
            <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Citizen</h2>
            <p className="text-gray-500">Submit complaints and track your reports.</p>
          </motion.div>

          <motion.div
            layout
            onClick={() => handleSelect("government")}
            animate={
              selected === "government"
                ? { scale: 1.1, zIndex: 10 }
                : selected
                ? { opacity: 0.3, scale: 0.9 }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`cursor-pointer p-8 rounded-xl border hover:shadow-2xl bg-white transition-all ${
              selected === "government" ? "ring-4 ring-blue-400" : ""
            }`}
          >
            <ShieldCheck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Government</h2>
            <p className="text-gray-500">Manage and resolve citizen reports efficiently.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
