import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const footerColumns = [
  {
    title: "SHOP",
    links: [
      "Men's Collection",
      "Women's Collection",
      "New Arrivals",
      "Best Sellers",
      "Sale",
      "Gift Cards",
    ],
  },
  {
    title: "CUSTOMER CARE",
    links: [
      "Help Center",
      "Shipping & Returns",
      "Size Guide",
      "Track Order",
      "FAQs",
      "Contact Us",
    ],
  },
  {
    title: "ABOUT",
    links: [
      "Our Story",
      "Sustainability",
      "Careers",
      "Press",
      "Affiliates",
      "Stores",
    ],
  },
  {
    title: "INFO",
    links: [
      "Privacy Policy",
      "Terms of Service",
      "Cookie Policy",
      "Accessibility",
      "Refund Policy",
      "Wholesale",
    ],
  },
];

function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-16 lg:pt-20 pb-8">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-serif text-3xl tracking-[0.3em] font-bold">
                LUXORA
              </span>
              <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-xs">
                Timeless style. Premium quality. Designed for modern living.
              </p>

              <div className="mt-6 space-y-2 text-[13px] text-white/70">
                <a
                  href="mailto:hello@luxora.com"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" /> hello@luxora.com
                </a>
                <a
                  href="tel:+18001234567"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" /> +1 (800) 123-4567
                </a>
                <p className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" /> 123 Fashion Ave, NY 10001
                </p>
              </div>
            </motion.div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col, ci) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * (ci + 1) }}
            >
              <h4 className="text-[11px] tracking-[0.25em] font-semibold text-white mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13px] text-white/55 hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      {link}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
          <p className="text-[12px] text-white/50 order-2 md:order-1">
            © 2024 LUXORA. All rights reserved. Crafted with care.
          </p>

          {/* Social */}
          <div className="flex items-center gap-3 order-1 md:order-2">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white hover:bg-white/5 transition-all"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>

          {/* Payment */}
          <div className="flex items-center gap-2 order-3">
            {["VISA", "MC", "AMEX", "PAY", "GPAY"].map((p) => (
              <span
                key={p}
                className="text-[9px] font-bold tracking-wider px-2 py-1 bg-white/10 border border-white/15 rounded text-white/70"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;