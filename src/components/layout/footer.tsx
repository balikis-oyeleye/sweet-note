import React from "react";
import { Logo } from "../ui";

const Footer = () => {
  return (
    <footer className="mt-auto py-8 border-t border-accent-400">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <Logo />
        <p className="text-sm">
          © {new Date().getFullYear()} Made with ❤️ by{" "}
          <a
            href="https://github.com/balikis-oyeleye"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-underline-effect"
          >
            Ryu
          </a>
        </p>
        <div className="flex gap-6">
          <a href="#" className="hover-underline-effect">
            Terms
          </a>
          <a href="#" className="hover-underline-effect">
            Privacy
          </a>
          <a href="#" className="hover-underline-effect">
            Help
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
