import { Footer } from '@/src/components/common/footer';
import { Hero } from '@/src/components/common/hero';
import { Navbar } from '@/src/components/common/navbar';
import { PainPoints } from '@/src/components/common/pain-points';
import { ProcessTimeline } from '@/src/components/common/process-timeline';
import { ServicesGrid } from '@/src/components/common/services-grid';
import { ValueProposition } from '@/src/components/common/value-proposition';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <PainPoints />
      <ValueProposition />
      <ServicesGrid />
      <ProcessTimeline />
      <Footer />
    </main>
  );
}
