"use client";

import { useEffect, useRef, useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { useRouter, usePathname } from "next/navigation";
import { RiMenu3Fill } from "react-icons/ri";
import Link from "next/link";
import { CgNotes } from "react-icons/cg";
import { AnimatePresence, motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

import {
  ActionIcon,
  useMantineColorScheme,
  Divider,
  Button,
  Drawer,
} from "@mantine/core";
import { useMediaQuery, useWindowScroll } from "@mantine/hooks";
import { ClientProvider } from "@/provider";

import { Logo } from "../ui";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [scroll] = useWindowScroll();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const matches = useMediaQuery("(min-width: 640px)");

  const { setColorScheme, colorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  const isDark = colorScheme === "dark";

  const toggleColorScheme = () => {
    setColorScheme(isDark ? "light" : "dark");
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Close sidebar when screen size is larger than 640px
  useEffect(() => {
    if (matches) {
      setSidebarOpen(false);
    }
  }, [matches]);

  // Hide header on scroll down and show on scroll up
  useEffect(() => {
    if (scroll.y > lastScrollY.current && scroll.y > 50) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    lastScrollY.current = scroll.y;
  }, [scroll.y]);

  const isNotePage = pathname.startsWith("/notes");

  const createNewNote = () => router.push(`notes/${uuidv4()}`);

  return (
    <ClientProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-white text-black p-0.5 rounded shadow"
      >
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-20 transition-transform duration-300  backdrop-blur-lg ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "4rem",
          }}
          className="container mx-auto px-4"
        >
          <Logo />

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4">
              <Link href="/notes">
                <span className="hover-underline-effect">Notes</span>
              </Link>

              <ActionIcon
                variant="transparent"
                onClick={toggleColorScheme}
                aria-label={`Activate ${isDark ? "light" : "dark"} mode`}
                title={`Activate ${isDark ? "light" : "dark"} mode`}
                data-testid="toggle-color-scheme-button"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isDark ? (
                    <motion.div
                      key="sunny"
                      initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IoSunny className="text-xl text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IoMoon className="text-xl text-black" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </ActionIcon>

              {!isNotePage && (
                <>
                  {" "}
                  <Divider size="sm" orientation="vertical" />
                  <Button
                    variant="filled"
                    color="primary.4"
                    autoContrast
                    onClick={createNewNote}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>

            <button
              className="sm:hidden"
              onClick={toggleSidebar}
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              aria-expanded={sidebarOpen}
              aria-controls="mobile-sidebar"
              data-testid="toggle-sidebar-button"
            >
              <RiMenu3Fill className="text-2xl text-base" />
            </button>
          </div>
        </div>
      </header>

      <Drawer
        opened={sidebarOpen}
        onClose={toggleSidebar}
        position="right"
        size="xs"
      >
        <div className="flex flex-col gap-4">
          <Link href="/notes" onClick={toggleSidebar}>
            <div className="flex items-center gap-2">
              <CgNotes className="text-xl inherit" />
              <span>Notes</span>
            </div>
          </Link>

          <button
            className="flex items-center gap-3"
            onClick={toggleColorScheme}
            aria-label={`Activate ${isDark ? "light" : "dark"} mode`}
            title={`Activate ${isDark ? "light" : "dark"} mode`}
            data-testid="toggle-color-scheme-button"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.div
                  key="sunny"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <IoSunny className="text-xl inherit" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <IoMoon className="text-xl inherit" />
                </motion.div>
              )}
            </AnimatePresence>
            <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
          </button>

          {!isNotePage && (
            <Button
              variant="filled"
              color="primary.4"
              autoContrast
              onClick={createNewNote}
            >
              Get Started
            </Button>
          )}
        </div>
      </Drawer>
    </ClientProvider>
  );
};

export default Navbar;
