"use client"

import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Spotlight } from '../ui/spotlight-new';

export default function Hero() {

    const { isSignedIn } = useUser();

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-background text-foreground overflow-hidden">
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

            <Spotlight />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 relative group"
                    >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 via-blue-100 to-green-400 blur-sm" />
                        <div className="absolute inset-px rounded-full bg-secondary" />
                        <div className="relative z-10 flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-foreground" />
                            <span className="text-sm font-medium text-foreground">Lightning-fast form creation</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-bold tracking-tight mb-6"
                    >
                        Build Forms in
                        <br />
                        <span className="italic bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">Seconds</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
                    >
                        Create stunning, Modern forms in seconds — without code.
                        Collect responses, share instantly.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                asChild
                                size="lg"
                                className="bg-primary text-primary-foreground hover:bg-primary/70 text-lg px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
                                    Get Started for Free
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </motion.div>
                        <span className='text-primary/80'>
                            — no setup, just start building.
                        </span>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="text-sm text-muted-foreground mt-8"
                    >
                        <span className='hidden sm:inline'>No credit card required</span>
                        {" · "}
                        <span>Instant form creation</span>
                        {" · "}
                        <span>Ready to share instantly</span>
                    </motion.p>
                </div>
            </div>
        </section >
    )
}
