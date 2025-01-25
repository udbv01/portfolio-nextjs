interface SocialIconProps {
  icon: 'github' | 'email' | 'instagram' | 'whatsapp';
}

export function SocialIcon({ icon }: SocialIconProps) {
  const iconClasses = "cursor-pointer transition-transform hover:scale-110";
  
  const iconLinks = {
    github: "https://github.com/udbv01",
    email: "mailto:ubaid.basnukaev@gmx.de",
    instagram: "https://instagram.com/udbv01",
    whatsapp: "https://wa.me/491739807961"
  };

  return (
    <a href={iconLinks[icon]} target="_blank" rel="noopener noreferrer">
      {icon === 'github' && <img src="/icons/github.svg" alt="GitHub" className={iconClasses} />}
      {icon === 'email' && <img src="/icons/mail.svg" alt="Email" className={iconClasses} />}
      {icon === 'instagram' && <img src="/icons/instagram.svg" alt="Instagram" className={iconClasses} />}
      {icon === 'whatsapp' && <img src="/icons/message.svg" alt="WhatsApp" className={iconClasses} />}
    </a>
  );
}
