import { Footer } from "@/components";
import { Button } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <main className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] px-4 text-center min-h-[500px]">
        <div className="max-w-md">
          <Image
            src="/assets/not-found.svg"
            alt="Not Found Illustration"
            width={250}
            height={250}
            className="mx-auto mb-6"
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-base mb-4">
            Page Not Found
          </h1>
          <p className="text-base mb-6">
            Sorry, we couldn’t find the page you were looking for.
          </p>
          <Link href="/">
            <Button
              component="div"
              variant="filled"
              color="primary.4"
              size="md"
              autoContrast
            >
              Go Home
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
