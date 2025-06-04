
import { Code, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Templates", href: "#templates" },
      { name: "Pricing", href: "#pricing" },
      { name: "Changelog", href: "#changelog" }
    ],
    community: [
      { name: "Discord", href: "#discord" },
      { name: "Forum", href: "#forum" },
      { name: "Blog", href: "#blog" },
      { name: "Events", href: "#events" }
    ],
    resources: [
      { name: "Documentation", href: "#docs" },
      { name: "Tutorials", href: "#tutorials" },
      { name: "API Reference", href: "#api" },
      { name: "Help Center", href: "#help" }
    ],
    company: [
      { name: "About", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Press", href: "#press" },
      { name: "Contact", href: "#contact" }
    ]
  };

  return (
    <footer className="bg-brand-gray text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-brand-purple to-brand-cyan rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold">CodeSpace</span>
            </div>
            <p className="text-brand-light mb-6 leading-relaxed">
              The ultimate online IDE where developers create, collaborate, and deploy amazing projects. Join millions of coders worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#twitter" className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#github" className="w-10 h-10 bg-brand-purple rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity">
                <Github className="h-5 w-5" />
              </a>
              <a href="#linkedin" className="w-10 h-10 bg-brand-cyan rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#email" className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-orange">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-brand-light hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-purple">Community</h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-brand-light hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-cyan">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-brand-light hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-orange">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-brand-light hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-light mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-brand-light mb-4 md:mb-0">
            © 2024 CodeSpace. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#privacy" className="text-brand-light hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="text-brand-light hover:text-white transition-colors">Terms of Service</a>
            <a href="#cookies" className="text-brand-light hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
