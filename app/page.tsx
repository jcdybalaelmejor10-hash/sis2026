import WebView from '@/components/base/WebView';
import MobileView from '@/components/base/MobileView';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Apoyo from '@/components/home/Apoyo';
import CTA from '@/components/home/CTA';

export default function Home() {
  return (
    <>
      <WebView>
        <Hero />
        <Features />
        <Apoyo />
        <CTA />
      </WebView>
      <MobileView>
        <Hero />
        <Features />
        <Apoyo />
        <CTA />
      </MobileView>
    </>
  );
}
