"use client";

import { MagicCard } from "@/components/ui/magic-card";
import { Button } from "@mantine/core";
import Link from "next/link";
import { BiBookOpen, BiEdit, BiSave } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

export default function Home() {
  const features = [
    {
      icon: BiEdit,
      title: "Simple Editing",
      description:
        "Clean, distraction-free interface that lets you focus on your thoughts and ideas.",
    },
    {
      icon: BiSave,
      title: "Auto Saving",
      description:
        "Never worry about losing your notes again with automatic saving as you type.",
    },
    {
      icon: BiBookOpen,
      title: "Organized Library",
      description:
        "Keep all your notes organized in one place and easily searchable.",
    },
  ];

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      id="main-content"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,var(--color-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-grid)_1px,transparent_1px)] bg-[size:6rem_4rem]" />

      {/* Background Radial */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_800px_at_100%_200px,var(--color-radial),transparent)]" />

      {/* Content */}
      <div className="flex flex-col items-center justify-center h-screen max-h-[800px] px-4 text-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Capture Your <span className="text-primary-400">Ideas,</span> <br />
            Organize Your <span className="text-accent-400">Thoughts</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mt-4">
            A beautiful and simple way to take notes, organize your thoughts,
            and keep track of your ideas. Write, edit, and access your notes
            from anywhere.
          </p>
          <div className="flex gap-4 pt-6 justify-center items-center">
            <Link href="/notes">
              <Button
                component="div"
                size="lg"
                variant="filled"
                color="primary.4"
                autoContrast
                rightSection={<BsArrowRight size={18} />}
              >
                Start Taking Notes
              </Button>
            </Link>
            <Button variant="outline" size="lg" autoContrast color="accent.4">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Simplify Your <span className="text-primary-400">Note-Taking</span>{" "}
          Experience
        </h2>

        <div className="grid sm:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, description }) => (
            <MagicCard
              key={title}
              className="border border-accent-400/20 rounded-lg p-6 transition duration-300 "
            >
              <div>
                <div className="bg-primary-400/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Icon className="text-primary-400" size={20} />
                </div>
                <h3 className="text-xl font-bold  mb-3">{title}</h3>
                <p>{description}</p>
              </div>
            </MagicCard>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-accent-400/40 to-primary-400/40 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Taking Notes?
          </h2>
          <p className="max-w-2xl mx-auto mb-8">
            Begin your note-taking journey today. Capture your ideas, organize
            your thoughts, and boost your productivity.
          </p>

          <Link href="/notes">
            <Button
              component="div"
              size="lg"
              variant="filled"
              color="primary.4"
              autoContrast
              rightSection={<BsArrowRight size={18} />}
            >
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
