import { motion } from 'framer-motion';
import { Mail, Linkedin, FileText, ArrowUpRight, Send } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const { personal } = portfolioData;

  const contactLinks = [
    {
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
      icon: Mail,
      color: 'bg-red-50 text-red-600 hover:bg-red-100',
    },
    {
      label: 'LinkedIn',
      value: 'Connect with me',
      href: personal.linkedin,
      icon: Linkedin,
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    },
    {
      label: 'Resume',
      value: 'Download PDF',
      href: personal.resume,
      icon: FileText,
      color: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100',
    },
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-600 text-sm font-medium mb-6"
          >
            <Send size={16} />
            Let's Connect
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Let's Build Something Together
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            I'm always excited to discuss new opportunities, collaborate on interesting projects, or just chat about product management.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid md:grid-cols-3 gap-4 mb-12"
        >
          {contactLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label !== 'Email' ? '_blank' : undefined}
                rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`group p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all duration-300`}
              >
                <div className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center mb-4 transition-colors`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
                  {link.label}
                  <ArrowUpRight size={16} className="text-slate-400 group-hover:text-primary-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                <p className="text-sm text-slate-500">{link.value}</p>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center text-sm text-slate-400"
        >
          Based in the United States • Open to remote opportunities worldwide
        </motion.p>
      </div>

      {/* Simple Footer */}
      <div className="mt-24 pt-8 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} {personal.name}. Built with React & Tailwind.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-primary-600 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="text-slate-400 hover:text-primary-600 transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
