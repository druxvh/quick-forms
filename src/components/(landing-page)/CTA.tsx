"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function CTA() {

    const { isSignedIn } = useUser();

    return (
        <section className="py-24 bg-secondary/20 relative overflow-hidden border-t border-border/50">
            {/* Subtle pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)] bg-[size:3rem_3rem]" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to build your first form?
                    </h2>
                    <p className="text-xl text-muted-foreground mb-10">
                        Join the creators using Quick Forms to simplify their workflows.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>

                            <Button
                                asChild
                                size="lg"
                                className="bg-primary text-primary-foreground hover:bg-primary/70 text-lg px-8 shadow-lg rounded-full"
                            >
                                <Link href={isSignedIn ? "/dashboard" : "/sign-up"} >
                                    Start for Free
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </motion.div>
                        <span className="text-primary/80">— create your first form now.</span>
                    </div>
                </motion.div>
            </div >
        </section >
    );
};
