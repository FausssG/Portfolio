import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import type { FormEvent, ChangeEvent } from "react";
import { translations, Language } from "../utils/translations";

export function Contact({ language = "es" as Language }: { language?: Language }) {
  const t = translations[language];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Simular envío (aquí integrarías con tu servicio de email)
    setTimeout(() => {
      console.log('Form data:', formData);
      setStatus('sent');
      setFormData((prev: any) => ({ name: '', email: '', message: '' }));
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/FausssG", label: "GitHub", color: "hover:text-violet-400" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/faustino-gnavi/", label: "LinkedIn", color: "hover:text-cyan-400" },
    { icon: Mail, href: "mailto:faustinognavi@gmail.com", label: "Email", color: "hover:text-pink-400" }
  ];

  return (
    <section id="contact" className="relative min-h-screen py-20 px-6 bg-slate-900 overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 via-transparent to-cyan-950/20" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-4" style={{ fontWeight: 700 }}>
            {language === 'es' ? 'Hablemos' : language === 'en' ? 'Let’s talk' : 'Lass uns reden'}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {language === 'es' ? '¿Tienes un proyecto en mente? Estoy disponible para nuevas oportunidades' : language === 'en' ? 'Have a project in mind? I am available for new opportunities' : 'Haben Sie ein Projekt im Kopf? Ich bin offen für neue Möglichkeiten'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  {language === 'es' ? 'Nombre' : language === 'en' ? 'Name' : 'Name'}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 transition-colors"
                  placeholder={language === 'es' ? 'Tu nombre' : language === 'en' ? 'Your name' : 'Ihr Name'}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  {language === 'es' ? 'Email' : language === 'en' ? 'Email' : 'E-Mail'}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 transition-colors"
                  placeholder={language === 'es' ? 'tu@email.com' : language === 'en' ? 'your@email.com' : 'ihre@email.com'}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">
                  {language === 'es' ? 'Mensaje' : language === 'en' ? 'Message' : 'Nachricht'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 transition-colors resize-none"
                  placeholder={language === 'es' ? 'Cuéntame sobre tu proyecto...' : language === 'en' ? 'Tell me about your project...' : 'Erzählen Sie mir von Ihrem Projekt...'}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'sending' ? (
                    <span>{language === 'es' ? 'Enviando...' : language === 'en' ? 'Sending...' : 'Wird gesendet...'}</span>
                ) : status === 'sent' ? (
                    <span>{language === 'es' ? '¡Enviado! ✓' : language === 'en' ? 'Sent! ✓' : 'Gesendet! ✓'}</span>
                ) : (
                  <>
                      <span>{language === 'es' ? 'Enviar Mensaje' : language === 'en' ? 'Send Message' : 'Nachricht senden'}</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-8">
              <h3 className="text-2xl text-white mb-4" style={{ fontWeight: 600 }}>
                {language === 'es' ? 'Conecta conmigo' : language === 'en' ? 'Connect with me' : 'Kontaktieren Sie mich'}
              </h3>
              <p className="text-gray-400">
                {language === 'es' ? 'Estoy activo en varias plataformas. No dudes en contactarme a través de cualquiera de ellas.' : language === 'en' ? 'I am active on several platforms. Feel free to reach out through any of them.' : 'Ich bin auf mehreren Plattformen aktiv. Kontaktieren Sie mich gern über eine davon.'}
              </p>
            </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                    target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={social.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300 flex flex-col items-center gap-3 ${social.color}`}
                >
                  <social.icon className="w-8 h-8" />
                  <span className="text-gray-300">{social.label}</span>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 p-6 bg-gradient-to-br from-violet-950/50 to-cyan-950/50 backdrop-blur-xl border border-violet-500/20 rounded-xl"
            >
              <p className="text-gray-300 text-center">
                💡 <span className="text-violet-300">{language === 'es' ? 'Respondo en menos de 24 horas' : language === 'en' ? 'I reply within 24 hours' : 'Ich antworte innerhalb von 24 Stunden'}</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
