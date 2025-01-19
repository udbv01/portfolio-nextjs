import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

interface SocialIconProps {
  icon: 'facebook' | 'twitter' | 'instagram' | 'linkedin'
}

export function SocialIcon({ icon }: SocialIconProps) {
  const iconClasses = "text-black cursor-pointer transition-transform hover:scale-110"
  switch (icon) {
    case 'facebook':
      return <Facebook className={iconClasses} size={30} />
    case 'twitter':
      return <Twitter className={iconClasses} size={30} />
    case 'instagram':
      return <Instagram className={iconClasses} size={30} />
    case 'linkedin':
      return <Linkedin className={iconClasses} size={30} />
    default:
      return null
  }
}

