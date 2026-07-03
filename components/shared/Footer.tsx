import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-muted text-foreground relative pt-8 pb-4 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Link href="/" className="text-2xl font-bold text-primary mb-4 block">
              Vision
            </Link>
            <p className="text-sm opacity-80 mt-2 max-w-xs leading-relaxed">
              Dedicated to transforming company visions into reality by engineering scalable, high-performance digital solutions that drive growth and deliver exceptional user experiences.
            </p>
          </div>
          
          <div className="flex flex-col md:items-center">
            <h3 className="text-lg font-semibold mb-4 text-primary text-center">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-x-12 gap-y-2 w-fit">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <Link href={`#${link.toLowerCase()}`} className="hover:text-primary transition-colors text-sm opacity-80 hover:opacity-100">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Social Links</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/ArafatSany7" target="_blank" rel="noopener noreferrer" className="p-2 bg-accent rounded-full hover:bg-primary hover:text-primary-content transition-colors">
                <FaGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/arafatsany" target="_blank" rel="noopener noreferrer" className="p-2 bg-accent rounded-full hover:bg-primary hover:text-primary-content transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="https://web.facebook.com/arafat.sany.836467" target="_blank" rel="noopener noreferrer" className="p-2 bg-accent rounded-full hover:bg-primary hover:text-primary-content transition-colors">
                <FaFacebook size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-70">
            &copy; {new Date().getFullYear()} Arafat Sany. All rights reserved.
          </p>
          
          <a href="#home" className="mt-4 md:mt-0 p-3 bg-primary text-primary-content rounded-full shadow-lg hover:-translate-y-1 transition-transform" aria-label="Back to top">
            <ArrowUp size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
