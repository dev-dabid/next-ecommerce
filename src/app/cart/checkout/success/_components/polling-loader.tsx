"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function PollingLoader() {
  const router = useRouter();
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (attempts >= 10) {
      router.push("/cart");
      return;
    }

    const interval = setInterval(() => {
      setAttempts((prev) => prev + 1);

      router.refresh();
    }, 1500);

    return () => clearInterval(interval);
  }, [router, attempts]);

  return <div></div>;
}
