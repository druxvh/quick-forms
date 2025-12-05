import CTA from '@/components/marketing/CTA';
import FAQ from '@/components/marketing/FAQ';
import Features from '@/components/marketing/Features';
import Footer from '@/components/marketing/Footer';
import FormFields from '@/components/marketing/FormFields';
import Hero from '@/components/marketing/Hero';
import Navbar from '@/components/marketing/Navbar';
import Pricing from '@/components/marketing/Pricing';

export default async function Home() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Hero />
            <Features />
            <FormFields />
            <Pricing />
            <FAQ />
            <CTA />
            <Footer />
        </div>
    );
}
