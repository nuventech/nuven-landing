import { Hero } from '@/src/components/home/Hero';
import { PainPoints } from '@/src/components/home/PainPoints';
import { ProcessTimeline } from '@/src/components/home/ProcessTimeline';
import { ServicesGrid } from '@/src/components/home/ServicesGrid';
import { ValueProposition } from '@/src/components/home/ValueProposition';

export default function Home() {
  return (
    <main>
      <Hero />
      <PainPoints />
      <ValueProposition />
      <ServicesGrid />
      <ProcessTimeline />
    </main>
  );
}
