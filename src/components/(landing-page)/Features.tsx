'use client';

import { BarChart3, Zap, GripVertical, Boxes } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const features = [
    {
        icon: Zap,
        title: 'Quick Form Making',
        description:
            'Build professional forms in minutes with our intuitive interface. No learning curve required.',
    },
    {
        icon: GripVertical,
        title: 'Drag & Drop',
        description:
            'Effortlessly arrange form fields by dragging and dropping. Perfect organization, every time.',
    },
    {
        icon: BarChart3,
        title: 'Dashboard Analytics',
        description:
            'Track submissions, response rates, and user behavior with beautiful, real-time analytics.',
    },
    {
        icon: Boxes,
        title: 'Rich Form Fields',
        description:
            'Text, numbers, dates, checkboxes, textareas, and more. Everything you need in one place.',
    },
];

export default function Features() {
    return (
        <section id="features" className="bg-background border-border/50 border-t py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <h2 className="mb-4 text-4xl font-bold md:text-5xl">
                        Everything you need
                    </h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                        Powerful features designed to make form creation effortless and
                        efficient
                    </p>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                        >
                            <Card className="border-border/50 hover:border-foreground/20 group bg-card/50 h-full backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                                <CardContent className="pt-8 pb-6">
                                    <motion.div
                                        className="bg-secondary group-hover:bg-accent mb-4 inline-flex rounded-lg p-3 transition-colors"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <feature.icon className="h-6 w-6" />
                                    </motion.div>
                                    <h3 className="mb-2 text-xl font-semibold">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
