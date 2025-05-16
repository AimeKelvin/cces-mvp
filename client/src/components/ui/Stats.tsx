"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
};

const stats: Stat[] = [
  { label: "Complaints Submitted", value: 12500 },
  { label: "Resolved Cases", value: 9860 },
  { label: "Institutions Onboard", value: 18 },
  { label: "Avg Resolution Time (days)", value: 3 },
];

const useCountUp = (end: number, startWhenVisible: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startWhenVisible) return;

    let start = 0;
    const duration = 1000; // 2s
    const stepTime = Math.max(Math.floor(duration / end), 20);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [end, startWhenVisible]);

  return count;
};

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="w-full bg-gray-50 py-16" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Our Impact So Far</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const count = useCountUp(stat.value, isInView);
            return (
              <div key={idx} className="p-6">
                <p className="text-4xl font-bold text-green-600">
                  {count.toLocaleString()}
                  {stat.suffix || ""}
                </p>
                <p className="mt-2 text-gray-700 text-md">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
