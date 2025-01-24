import ContactSection from '@/components/Contact-Section';
import HeroSection from '@/components/HeroSection';
import { ProjectSection } from '@/components/ProjectSection';
import { SkillsSection } from '@/components/SkillsSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <SkillsSection />
      <ProjectSection />
      <ContactSection />
    </>
  );
}
