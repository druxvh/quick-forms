import CTA from '@/components/(landing-page)/CTA'
import FAQ from '@/components/(landing-page)/FAQ'
import Features from '@/components/(landing-page)/Features'
import Footer from '@/components/(landing-page)/Footer'
import FormFields from '@/components/(landing-page)/FormFields'
import Hero from '@/components/(landing-page)/Hero'
import Navbar from '@/components/(landing-page)/Navbar'
import Pricing from '@/components/(landing-page)/Pricing'
import React from 'react'

export default async function Home() {
    return (
        <div className='min-h-screen'>
            <Navbar />
            <Hero />
            <Features />
            <FormFields />
            <Pricing />
            <FAQ />
            <CTA />
            <Footer />
        </div>
    )
}
