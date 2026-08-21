import React from "react";
import Logo from "@/components/common/Logo";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const socialLinks = [
  { id: 1, name: "Facebook", url: "https://facebook.com", icon: <FaFacebookF /> },
  { id: 2, name: "LinkedIn", url: "https://linkedin.com", icon: <FaLinkedin /> },
  { id: 3, name: "Twitter", url: "https://twitter.com", icon: <FaTwitter /> },
  { id: 4, name: "GitHub", url: "https://github.com", icon: <FaGithub /> },
];

const Footer = () => {
  return (
    <footer className="bg-[#08090A] border-t border-[#262626] w-full section-padding-x pt-12 md:pt-16 pb-8">
      {/* Top Section */}
      <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-12">
        {/* Left: Logo & Description */}
        <div className="w-full lg:w-[40%] space-y-4">
          <Logo size="lg" />
          <p className="text-sm text-gray-400 leading-relaxed max-w-lg">
            CleverCV is an AI-powered resume and cover letter builder that helps you stand out with confidence. Generate tailored resumes, optimize for ATS filters, and land your dream job faster.
          </p>
        </div>

        {/* Right: Links */}
        <div className="w-full lg:w-[55%] grid grid-cols-2 sm:grid-cols-3 gap-8">
          {/* Product */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/dashboard/create-new-resume" className="hover:text-[#81FB84] transition">
                  AI Resume Builder
                </Link>
              </li>
              <li>
                <Link to="/dashboard/create-cover-letter" className="hover:text-[#81FB84] transition">
                  Cover Letter Generator
                </Link>
              </li>
              <li>
                <Link to="/ai-help" className="hover:text-[#81FB84] transition">
                  AI Career Coach
                </Link>
              </li>
              <li>
                <Link to="/price" className="hover:text-[#81FB84] transition">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-[#81FB84] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/price" className="hover:text-[#81FB84] transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#81FB84] transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/privacy-policy" className="hover:text-[#81FB84] transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/tearms-and-condition" className="hover:text-[#81FB84] transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/imprint" className="hover:text-[#81FB84] transition">
                  Imprint
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-8 border-[#262626]" />

      {/* Bottom Section */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} CleverCV AI. All rights reserved.</p>

        {/* Social Icons */}
        <div className="flex gap-3">
          {socialLinks.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="w-8 h-8 rounded-lg bg-[#141416] border border-[#262626] hover:border-[#81FB84] hover:text-[#81FB84] text-gray-400 flex items-center justify-center transition"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
