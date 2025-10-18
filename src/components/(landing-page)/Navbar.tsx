"use client"

import { cn } from '@/lib/utils';
import { Button } from '../ui/button'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import { useEffect, useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    const { isSignedIn, isLoaded } = useUser();

    // for conditionally adding border on scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 190);
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn("fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl transition-all duration-300",

                scrolled ? "border-b border-border/50" : "border-b border-transparent")}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex h-14 items-center justify-between">
                    <motion.div
                        className="flex items-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <FileText className="h-5 w-5" />
                        <Link href={'/'} className="text-lg font-semibold tracking-tight">Quick Forms</Link>
                    </motion.div>

                    <div className="hidden md:flex items-center gap-6">
                        <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Features
                        </a>
                        <a href="#fields" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Fields
                        </a>
                        {!isLoaded && (
                            <span>...</span>
                        )}
                        {!isSignedIn
                            ?
                            (
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300">
                                        <Link href={"/sign-up"}>
                                            Get Started
                                        </Link>
                                    </Button>
                                </motion.div>
                            )
                            :
                            (
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='flex items-center justify-center'>
                                    <UserButton />
                                </motion.div>
                            )}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
