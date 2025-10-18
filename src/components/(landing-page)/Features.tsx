"use client"

import { BarChart3, Zap, GripVertical, Boxes } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const features = [
    {
        icon: Zap,
        title: "Quick Form Making",
        description: "Build professional forms in minutes with our intuitive interface. No learning curve required.",
    },
    {
        icon: GripVertical,
        title: "Drag & Drop",
        description: "Effortlessly arrange form fields by dragging and dropping. Perfect organization, every time.",
    },
    {
        icon: BarChart3,
        title: "Dashboard Analytics",
        description: "Track submissions, response rates, and user behavior with beautiful, real-time analytics.",
    },
    {
        icon: Boxes,
        title: "Rich Form Fields",
        description: "Text, numbers, dates, checkboxes, textareas, and more. Everything you need in one place.",
    },
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-background border-t border-border/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Everything you need
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Powerful features designed to make form creation effortless and efficient
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                        >
                            <Card className="border-border/50 hover:border-foreground/20 hover:shadow-xl transition-all duration-300 group h-full bg-card/50 backdrop-blur-sm">
                                <CardContent className="pt-8 pb-6">
                                    <motion.div
                                        className="mb-4 inline-flex p-3 rounded-lg bg-secondary group-hover:bg-accent transition-colors"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <feature.icon className="h-6 w-6" />
                                    </motion.div>
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
