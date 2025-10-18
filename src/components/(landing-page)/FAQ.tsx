"use client"

import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "Do I need any coding experience to use Quick Forms?",
        answer:
            "Nope! Quick Forms is designed for everyone. You can create and share fully functional forms just by adding fields and adjusting their order — no technical skills required.",
    },
    {
        question: "How long does it take to create a form?",
        answer:
            "You can make your first form in just a few minutes. The builder keeps things simple and focused so you can go from blank to shareable form faster than ever.",
    },
    {
        question: "How can I share my forms with others?",
        answer:
            "Once your form is ready, you’ll get a public link that you can copy and share anywhere — via email, WhatsApp, social media, or directly with your audience.",
    },
    {
        question: "Can I track responses or see submissions?",
        answer:
            "Yes! Every submission is stored securely in your dashboard. You can view all responses in one place and export them when needed.",
    },
    {
        question: "Is there a limit on how many forms I can create?",
        answer:
            "The free version includes a generous limit on how many forms and responses you can create. Paid plans will unlock more forms, responses, and extra features in the future.",
    },
    {
        question: "Is my data safe and private?",
        answer:
            "Absolutely. All your form data is stored safely and only accessible to you. We prioritize security and privacy at every step.",
    },
    {
        question: "Can I customize the look of my forms?",
        answer:
            "Currently, forms use a clean, default layout designed for clarity and ease of use. Visual customization options will be added in future updates.",
    },
    {
        question: "Can I use Quick Forms for business or personal use?",
        answer:
            "Yes! Whether you're collecting feedback, registrations, or simple contact details — Quick Forms works great for both personal and business needs.",
    },
    {
        question: "Are new features being added soon?",
        answer:
            "Yes — we're actively improving Quick Forms! Future updates will include custom themes, AI form generation, integrations, and more advanced analytics.",
    },
]

export default function FAQ() {
    return (
        <section id="faq" className="py-24 bg-background border-t border-border/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to know about Quick Forms
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-4xl mx-auto"
                >
                    <Accordion
                        type="single"
                        collapsible
                        className="space-y-5">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <AccordionItem
                                    value={`item-${index}`}
                                    className="border-t border-border/50 hover:border-foreground/20 transition-colors"
                                >
                                    <AccordionTrigger className="text-left hover:no-underline">
                                        <span className="font-semibold">{faq.question}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
};
