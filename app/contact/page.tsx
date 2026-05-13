import WebView from '@/components/base/WebView';
import MobileView from '@/components/base/MobileView';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';

export default function Contact() {
  return (
    <>
      <WebView>
        <ContactHero />
        <ContactForm />
        <ContactInfo />
      </WebView>
      <MobileView>
        <ContactHero />
        <ContactForm />
        <ContactInfo />
      </MobileView>
    </>
  );
}
