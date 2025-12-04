'use client';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Logo from '../Logo';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    const { isSignedIn } = useUser();

    // for conditionally adding border on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth < 640) {
                setScrolled(window.scrollY > 90);
                return;
            } // only apply on screens >=640px (mobiles)

            setScrolled(window.scrollY > 120);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={cn(
                'fixed top-0 right-0 left-0 z-50 transition-all duration-200',

                scrolled
                    ? 'border-border/50 border-b backdrop-blur-xl'
                    : 'border-b border-transparent',
            )}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex h-14 items-center justify-between">
                    <motion.div
                        className="flex items-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Logo isAuthed={!!isSignedIn} />
                    </motion.div>

                    <div className="flex items-center gap-6">
                        <a
                            href="#features"
                            className="text-muted-foreground hover:text-foreground hidden text-sm font-medium transition-colors md:inline"
                        >
                            Features
                        </a>
                        <a
                            href="#fields"
                            className="text-muted-foreground hover:text-foreground hidden text-sm font-medium transition-colors md:inline"
                        >
                            Fields
                        </a>
                        <a
                            href="#pricing"
                            className="text-muted-foreground hover:text-foreground hidden text-sm font-medium transition-colors md:inline"
                        >
                            Pricing
                        </a>
                        {!isSignedIn ? (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="hidden md:inline"
                            >
                                <Button
                                    asChild
                                    size="sm"
                                    className="bg-primary text-primary-foreground hover:bg-primary/80 shadow-lg transition-all duration-300 hover:shadow-xl"
                                >
                                    <Link href={'/sign-up'}>Get Started</Link>
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center"
                            >
                                <UserButton />
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
