import { useRef, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { Button } from './ui/button';
import { Globe, Phone, Mail, User, FileText, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';

interface Link {
  label: string;
  url: string;
  icon: React.ReactNode;
  action?: () => void;
}

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function Links() {
  const { language } = useLanguage();
  const t = translations[language].links;

  const handleSaveContact = () => {
    const contactInfo = {
      name: 'Thomas Viejo',
      email: 'tviejo12@gmail.com',
      phone: '+33624433321',
      website: 'https://www.thomas-viejo.fr'
    };
    const vcfContent = `BEGIN:VCARD\nVERSION:3.0\nFN:${contactInfo.name}\nEMAIL:${contactInfo.email}\nTEL:${contactInfo.phone}\nURL:${contactInfo.website}\nEND:VCARD`;
    const blob = new Blob([vcfContent], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'thomas-viejo.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const links: Link[] = [
    { label: t.website, url: "https://www.thomas-viejo.fr", icon: <Globe className="w-5 h-5" /> },
    { label: t.downloadCV, url: "/documents/Thomas-Viejo-CV.pdf", icon: <FileText className="w-5 h-5" /> },
    { label: t.email, url: "mailto:tviejo12@gmail.com", icon: <Mail className="w-5 h-5" /> },
    { label: t.phone, url: "tel:+33624433321", icon: <Phone className="w-5 h-5" /> },
    { label: t.saveContact, url: "#", icon: <User className="w-5 h-5" />, action: handleSaveContact },
  ];

  // 3D tilt effect on drag only, clamped to ±30deg
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const [dragging, setDragging] = useState(false);

  function handlePointerDown(e: React.PointerEvent) {
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragging) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Clamp rotation to ±30deg
    const rotateYVal = clamp(((x - centerX) / centerX) * 30, -30, 30);
    const rotateXVal = clamp(-((y - centerY) / centerY) * 30, -30, 30);
    rotateX.set(rotateXVal);
    rotateY.set(rotateYVal);
  }

  function handlePointerUpOrLeave() {
    setDragging(false);
    animate(rotateX, 0, { type: 'spring', stiffness: 300, damping: 30 });
    animate(rotateY, 0, { type: 'spring', stiffness: 300, damping: 30 });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/5">
      <motion.div
        ref={cardRef}
        className="aspect-[9/16] w-[430px] max-w-full min-h-[765px] max-h-[95vh] bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl flex flex-col glassy-gradient relative select-none px-0 py-0 overflow-hidden"
        style={{ rotateX, rotateY, touchAction: 'none' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUpOrLeave}
        onPointerLeave={handlePointerUpOrLeave}
      >
        <div className="flex flex-col h-full w-full flex-1">
          {/* Profile Row */}
          <div className="flex flex-row items-center gap-8 px-8 pt-12 pb-4 min-h-[140px]">
            <div className="relative flex-shrink-0">
              <img
                src="/images/thomas.jpg"
                alt="Thomas Viejo"
                className="w-28 h-28 rounded-full object-cover border-4 border-primary shadow-lg ring-4 ring-primary/30"
              />
            </div>
            <div className="flex flex-col justify-center flex-1 min-w-0">
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 text-left leading-tight break-words whitespace-normal">
                Thomas Viejo
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground font-medium text-left leading-snug break-words whitespace-normal">
                {t.subtitle}
              </p>
            </div>
          </div>
          {/* Button Group Centered */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex flex-col gap-4 px-8 pb-10 pt-2 w-full">
              {links.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`w-full h-14 flex flex-row items-center gap-3 rounded-full bg-white/20 dark:bg-black/20 border border-white/20 hover:bg-primary/20 hover:text-primary transition-colors shadow-md text-lg font-semibold ${link.action ? 'font-bold text-white bg-primary/90 hover:bg-primary' : ''}`}
                  onClick={link.action}
                  asChild={!link.action}
                >
                  {link.action ? (
                    <button type="button" className="flex flex-row items-center gap-3 w-full">
                      <span className="flex items-center">{link.icon}</span>
                      <span className="flex-1 text-left">{link.label}</span>
                    </button>
                  ) : (
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-3 w-full">
                      <span className="flex items-center">{link.icon}</span>
                      <span className="flex-1 text-left">{link.label}</span>
                      <ExternalLink className="w-4 h-4 ml-auto opacity-50" />
                    </a>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      <style>{`
        .glassy-gradient {
          background: linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.18) 100%);
        }
        @media (max-width: 600px) {
          .w-\[430px\] { width: 100% !important; }
          .aspect-\[9\/16\] { aspect-ratio: 1/1 !important; }
          .px-8 { padding-left: 0.5rem !important; padding-right: 0.5rem !important; }
        }
      `}</style>
    </div>
  );
}

export default Links;
