import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";

export default function Home() {
    
  return (
    <main className="h-screen">
      <MaxWidthWrapper>
        <h1 className="text-4xl font-bold text-center mt-8">Hello World</h1>
        <p className="text-center mt-4">This is a Next.js with Tailwind CSS starter template.</p>
      </MaxWidthWrapper>
    </main>
  );
}
