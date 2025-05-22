"use client"; // Error boundaries must be Client Components

import { Footer } from "@/components";
import { Button } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <main className="flex flex-col items-center justify-center h-screen px-4 text-center">
        <div className="max-w-md">
          <Image
            src="/assets/error.svg"
            alt="Error occurred"
            width={250}
            height={250}
            className="mx-auto mb-6"
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-base mb-4">
            Something Went Wrong
          </h1>
          <p className="text-base mb-6">
            {error.message ?? "An unexpected error occurred."}
          </p>

          <div className="flex justify-center gap-4 flex-col sm:flex-row max-w-xl mx-auto">
            <Link href="/" className="w-full">
              <Button
                variant="outline"
                component="div"
                color="accent.4"
                autoContrast
                w="100%"
              >
                Go Home
              </Button>
            </Link>
            <Button
              variant="filled"
              onClick={() => reset()}
              color="primary.4"
              autoContrast
              w="100%"
            >
              Try Again
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
