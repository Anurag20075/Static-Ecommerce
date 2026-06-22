import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MapPin, Clock, Mail, ArrowRight, ShieldCheck, Sparkles, Globe } from "lucide-react";

const WHATSAPP_NUMBER = "919528836338";

const serviceCards = [
  {
    title: "Concierge Care",
    subtitle: "Sizing & Styling",
    description:
      "Need help finding the perfect fit or building a complete look? Our fashion advisors are ready to assist.",
    topic: "Sizing & Styling",
  },
  {
    title: "Order Desk",
    subtitle: "Tracking & Returns",
    description:
      "Questions about shipping, delivery timelines, exchanges, or returns? We're here to help.",
    topic: "Order Assistance",
  },
  {
    title: "Wholesale",
    subtitle: "B2B & Partnerships",
    description:
      "Interested in carrying our collections in your boutique or retail store? Let's talk business.",
    topic: "Wholesale Orders",
  },
];

const brandPrinciples = [
  {
    icon: <Sparkles className="w-6 h-6 text-neutral-800" />,
    title: "Sartorial Excellence",
    description: "Every piece is thoughtfully designed, balancing timeless heritage silhouettes with modern structural elegance.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-neutral-800" />,
    title: "Conscious Luxury",
    description: "We partner with local artisans committed to ethical manufacturing, low-impact dyes, and premium sustainable textiles.",
  },
  {
    icon: <Globe className="w-6 h-6 text-neutral-800" />,
    title: "Worldwide Delivery",
    description: "Operating from the heart of Mumbai with fully insured premium international courier networks reaching across the globe.",
  },
];

const faqs = [
  {
    q: "How do I find my perfect size?",
    a: "We provide detailed size guides on every product page. If you need personalized assistance, our team can guide you interactively over WhatsApp.",
  },
  {
    q: "What is your return policy?",
    a: "Returns and exchanges are accepted within 14 days of delivery for eligible unused products in original packaging.",
  },
  {
    q: "Do you offer international shipping?",
    a: "Yes, we ship worldwide. Shipping rates and regional delivery times are dynamically calculated during checkout.",
  },
  {
    q: "How should I care for my garments?",
    a: "Always follow the integrated care label. Premium garments are generally best maintained through professional dry cleaning or ultra-delicate hand washing.",
  },
];

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleWhatsAppClick = (topic) => {
    const message = `Hello Maison Aurelia, I have a question regarding: ${topic}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-neutral-900 overflow-hidden relative font-sans antialiased">
      {/* Aesthetic Ambient Background Glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-emerald-100/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/2 right-0 w-[700px] h-[700px] bg-amber-50/40 blur-[180px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative h-[85vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1496747611176-843222e1e57c"
          alt="Maison Aurelia Editorial Tailoring"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 filter contrast-[1.02]"
        />
        <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[2px]" />

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <p className="uppercase tracking-[0.5em] text-white/80 text-xs font-semibold mb-6">
                Maison Aurelia — Atelier
              </p>

              <h1 className="font-serif text-6xl md:text-8xl text-white font-light tracking-tight leading-[0.95]">
                Fashion
                <br />
                <span className="italic font-normal">Concierge</span>
              </h1>

              <p className="mt-8 text-lg text-white/90 font-light max-w-xl leading-relaxed">
                Experience bespoke virtual assistance. From custom sizing calibrations to curated wardrobe styling, our dedicated luxury advisors are directly accessible via WhatsApp.
              </p>

              <button
                onClick={() => handleWhatsAppClick("General Inquiry")}
                className="mt-10 bg-neutral-900 text-white border border-neutral-800 hover:bg-white hover:text-neutral-900 px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-xl group"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                <span className="text-sm font-medium tracking-wider uppercase">Start Conversation</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Narrative Section (NEW Section 1) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-28 border-b border-neutral-200/60">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 space-y-6">
            <p className="uppercase tracking-[0.3em] text-xs font-semibold text-neutral-400">
              The House of Aurelia
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-neutral-900 leading-tight">
              Crafting a modern legacy in <span className="italic">contemporary design</span>.
            </h2>
            <p className="text-neutral-600 font-light leading-relaxed">
              Founded on the pillars of sculptural refinement and exceptional textile integrity, Maison Aurelia redefines luxury ready-to-wear. Every silhouette represents an ongoing study of form, proportion, and quiet confidence.
            </p>
            <p className="text-neutral-600 font-light leading-relaxed">
              We operate intentionally at the intersection of traditional craftsmanship and digital convenience, providing our global patrons an intimate boutique experience anywhere in the world.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <img 
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b" 
                alt="Atelier detailing" 
                className="w-full h-80 object-cover rounded-2xl shadow-md filter grayscale hover:grayscale-0 transition-all duration-700" 
              />
            </div>
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f" 
                alt="Premium apparel silhouette" 
                className="w-full h-96 object-cover rounded-2xl shadow-lg" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="uppercase tracking-[0.3em] text-xs font-semibold text-neutral-400 mb-3">Tailored Channels</p>
          <h2 className="font-serif text-4xl font-light tracking-tight">How may we direct you?</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {serviceCards.map((card) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative overflow-hidden rounded-[24px] bg-white border border-neutral-100 shadow-sm hover:shadow-md p-8 flex flex-col justify-between group"
            >
              <div>
                <p className="uppercase tracking-[0.2em] text-[11px] font-semibold text-neutral-400 mb-3">
                  {card.subtitle}
                </p>
                <h3 className="font-serif text-2xl font-light mb-4 text-neutral-900 group-hover:text-neutral-700 transition-colors">
                  {card.title}
                </h3>
                <p className="text-neutral-500 font-light text-sm leading-relaxed mb-8">
                  {card.description}
                </p>
              </div>
              <button
                onClick={() => handleWhatsAppClick(card.topic)}
                className="w-full bg-neutral-50 text-neutral-900 py-3.5 rounded-full font-medium text-xs tracking-wider uppercase border border-neutral-200/80 hover:bg-neutral-950 hover:text-white transition-all duration-300 shadow-sm"
              >
                Connect to Assistant
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Principles / Value Proposition (NEW Section 2) */}
      <section className="bg-neutral-100/50 border-y border-neutral-200/50 py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-12">
            {brandPrinciples.map((principle, index) => (
              <div key={index} className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  {principle.icon}
                </div>
                <h4 className="font-serif text-xl font-normal text-neutral-900">{principle.title}</h4>
                <p className="text-neutral-500 font-light text-sm leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Communications & Inquiry Form Hub */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-28 grid lg:grid-cols-12 gap-16 items-start">
        {/* Contact Info Ledger */}
        <div className="lg:col-span-5 space-y-12">
          <div>
            <h3 className="uppercase tracking-[0.2em] text-xs font-semibold text-neutral-400 mb-4">
              The Atelier
            </h3>
            <div className="flex gap-4 items-start text-neutral-700 font-light text-sm leading-relaxed">
              <MapPin size={18} className="mt-0.5 text-neutral-400 shrink-0" />
              <p>
                123 Aurelia Avenue, Suite 400
                <br />
                Colaba Fashion District
                <br />
                Mumbai, MH 400001, India
              </p>
            </div>
          </div>

          <div>
            <h3 className="uppercase tracking-[0.2em] text-xs font-semibold text-neutral-400 mb-4">
              Hours of Operation
            </h3>
            <div className="flex gap-4 items-start text-neutral-700 font-light text-sm leading-relaxed">
              <Clock size={18} className="mt-0.5 text-neutral-400 shrink-0" />
              <div className="space-y-1">
                <p><span className="font-normal text-neutral-900">Mon – Fri:</span> 11:00 – 19:00 IST</p>
                <p><span className="font-normal text-neutral-900">Saturday:</span> 11:00 – 18:00 IST</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="uppercase tracking-[0.2em] text-xs font-semibold text-neutral-400 mb-4">
              Digital Post
            </h3>
            <div className="flex gap-4 items-center text-neutral-700 font-light text-sm">
              <Mail size={18} className="text-neutral-400 shrink-0" />
              <a href="mailto:care@maisonaurelia.com" className="hover:text-neutral-500 underline underline-offset-4 transition-colors">
                care@maisonaurelia.com
              </a>
            </div>
          </div>
        </div>

        {/* Dynamic Form Desk */}
        <div className="lg:col-span-7 relative overflow-hidden rounded-[24px] bg-white shadow-sm border border-neutral-200/60 p-8 md:p-12">
          <div className="relative z-10">
            <h3 className="font-serif text-3xl font-light mb-2">Leave a Message</h3>
            <p className="text-neutral-400 font-light text-sm mb-8">
              For complex styling orders or custom production questions. Expect a direct reply inside 24 hours.
            </p>

            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-52 flex items-center justify-center text-center"
              >
                <div>
                  <h4 className="font-serif text-2xl font-light text-neutral-900">Thank you for writing.</h4>
                  <p className="text-neutral-500 font-light text-sm mt-2">
                    A Maison Aurelia concierge advisor will correspond shortly.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="border border-neutral-200 focus-within:border-neutral-900 rounded-xl px-4 py-3 transition-colors bg-neutral-50/50">
                    <input
                      type="text"
                      required
                      placeholder="First Name"
                      className="w-full text-sm font-light outline-none bg-transparent placeholder-neutral-400 text-neutral-900"
                    />
                  </div>

                  <div className="border border-neutral-200 focus-within:border-neutral-900 rounded-xl px-4 py-3 transition-colors bg-neutral-50/50">
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      className="w-full text-sm font-light outline-none bg-transparent placeholder-neutral-400 text-neutral-900"
                    />
                  </div>
                </div>

                <div className="border border-neutral-200 focus-within:border-neutral-900 rounded-xl px-4 py-3 transition-colors bg-neutral-50/50">
                  <textarea
                    rows="4"
                    required
                    placeholder="How can we assist you today?"
                    className="w-full text-sm font-light outline-none bg-transparent placeholder-neutral-400 text-neutral-900 resize-none"
                  />
                </div>

                <button className="bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs tracking-wider uppercase px-8 py-4 rounded-full flex items-center gap-2 shadow-md transition-all duration-200">
                  Submit Inquiry
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Animated FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 py-28 border-t border-neutral-200/60">
        <h2 className="font-serif text-4xl text-center font-light tracking-tight mb-16">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full px-8 py-6 flex justify-between items-center text-left transition-colors hover:bg-neutral-50/40"
                >
                  <span className="font-medium text-neutral-800 text-sm tracking-wide">{faq.q}</span>
                  <div className="text-neutral-400 ml-4 shrink-0">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-6 text-neutral-500 font-light text-sm leading-relaxed border-t border-neutral-50/50 pt-2">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Urgent Callout Section */}
      <section className="relative bg-neutral-950 text-white py-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-900/20 blur-[150px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center px-6">
          <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight">
            Need Immediate Assistance?
          </h2>

          <p className="mt-4 text-neutral-400 font-light text-base max-w-md mx-auto">
            Connect directly with an active atelier coordinator for real-time service updates.
          </p>

          <button
            onClick={() => handleWhatsAppClick("Customer Support")}
            className="mt-10 bg-white text-neutral-950 font-semibold text-xs tracking-wider uppercase px-8 py-4 rounded-full shadow-lg hover:bg-neutral-100 transition-colors duration-200"
          >
            Chat Live via WhatsApp
          </button>
        </div>
      </section>

      {/* Footer Ecosystem */}
      <footer className="bg-neutral-950 border-t border-neutral-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif text-2xl font-light tracking-wide">Maison Aurelia</h3>
            <p className="text-neutral-500 font-light text-xs">© 2026 All Rights Reserved.</p>
          </div>

          <div className="flex gap-8 uppercase tracking-widest text-[11px] font-medium text-neutral-400">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Pinterest</a>
            <a href="#" className="hover:text-white transition-colors">TikTok</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Fixed Complete Official SVG Path for WhatsApp Vector Icon
const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M12.031 6c-3.313 0-6 2.691-6 6.004 0 1.308.423 2.519 1.142 3.511l-.746 2.731 2.793-.732a5.955 5.955 0 0 0 2.811.7c3.313 0 6-2.691 6-6.004S15.344 6 12.031 6zm3.87 8.528c-.16.447-.799.818-1.21 1.01-.334.156-.773.284-1.246.12-.317-.11-1.353-.523-2.583-1.624-1.02-.912-1.708-2.04-1.908-2.384-.2-.342-.021-.528.15-.7l.447-.525c.163-.192.217-.321.325-.536.109-.214.055-.4-.027-.573-.082-.174-.731-1.761-.998-2.41-.264-.64-.533-.55-.731-.56l-.625-.01c-.214 0-.565.081-.861.404-.296.324-1.131 1.107-1.131 2.7 0 1.59 1.157 3.128 1.318 3.344.162.215 2.277 3.478 5.517 4.88.771.334 1.373.534 1.84.683.775.244 1.48.21 2.037.127.622-.093 1.907-.78 2.179-1.535.27-.753.27-1.4.19-1.535-.08-.136-.296-.215-.616-.376z" />
  </svg>
);

export default Contact;