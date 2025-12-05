'use client';

import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Spotlight } from '../ui/spotlight-new';
import { cn } from '@/lib/utils';

export default function Hero() {
    const { isSignedIn } = useUser();

    return (
        <section className="text-foreground relative flex min-h-screen items-center justify-center overflow-hidden">
            {/* Subtle grid pattern */}
            <div
                className={cn(
                    'absolute inset-0',
                    'bg-size-[50px_50px]',
                    'bg-[linear-gradient(to_right,rgba(15,15,15,.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,15,15,.07)_1px,transparent_1px)]',
                    'dark:bg-[linear-gradient(to_right,rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.04)_1px,transparent_1px)]',
                )}
            />
            {/* Radial gradient for the container to give a faded look */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white mask-[radial-gradient(ellipse_at_center,transparent_10%,black)] dark:bg-black"></div>
            <Spotlight />

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="group relative mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2"
                    >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 via-blue-100 to-green-400 blur-sm" />
                        <div className="bg-secondary absolute inset-px rounded-full" />
                        <div className="relative z-10 flex items-center gap-2">
                            <Sparkles className="text-foreground h-4 w-4" />
                            <span className="text-foreground text-sm font-medium">
                                Lightning-fast form creation
                            </span>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-6 text-6xl font-bold tracking-tight md:text-8xl"
                    >
                        Build Forms in
                        <br />
                        <span className="from-foreground to-foreground/60 bg-gradient-to-r bg-clip-text text-transparent italic">
                            Seconds
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-muted-foreground mx-auto mb-12 max-w-2xl text-xl md:text-2xl"
                    >
                        Create stunning, Modern forms in seconds — without code. Collect
                        responses, share instantly.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                asChild
                                size="lg"
                                className="bg-primary text-primary-foreground hover:bg-primary/70 px-8 text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                            >
                                <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
                                    Get Started for Free
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </motion.div>
                        <span className="text-primary/80">
                            — no setup, just start building.
                        </span>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="text-muted-foreground mt-8 text-sm"
                    >
                        <span className="hidden sm:inline">No credit card required</span>
                        {' · '}
                        <span>Instant form creation</span>
                        {' · '}
                        <span>Ready to share instantly</span>
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
