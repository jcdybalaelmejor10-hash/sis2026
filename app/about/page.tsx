import WebView from '@/components/base/WebView';
import MobileView from '@/components/base/MobileView';
import AboutHero from '@/components/about/AboutHero';
import Mission from '@/components/about/Mission';
import Team from '@/components/about/Team';

export default function About() {
  return (
    <>
      <WebView>
        <AboutHero />
        <Mission />
        <Team />
      </WebView>
      <MobileView>
        <AboutHero />
        <Mission />
        <Team />
      </MobileView>
    </>
  );
}
