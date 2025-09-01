"use client"

import { Form } from "@/generated/prisma"
import PreviewDialogBtn from "./PreviewDialogBtn"
import SaveFormBtn from "./SaveFormBtn"
import PublishFormBtn from "./PublishFormBtn"
import Designer from "./Designer"
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import DragOverlayWrapper from "./DragOverlayWrapper"
import useDesigner from "@/hooks/useDesigner"
import { useEffect } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { toast } from "sonner"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Confetti from 'react-confetti'

export default function FormBuilder({ form }: { form: Form }) {
    const { setElements, setSelectedElement } = useDesigner()

    // during drag, btn click does'nt work so to prevent it, add activation constraint to the elements 
    // activates element drag after 10px
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        }
    })
    // for touch screens
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 300,
            tolerance: 10,
        }
    })

    const sensors = useSensors(mouseSensor, touchSensor)

    useEffect(() => {
        const elements = JSON.parse(form.content)
        setElements(elements)
        setSelectedElement(null)
    }, [form, setElements, setSelectedElement])


    const shareUrl = `${window.location.origin}/submit/${form.shareURL}`

    if (form.published) {
        return <>
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
                numberOfPieces={300}
            />
            <div className="flex flex-col items-center justify-center h-full w-full">
                <div className="max-w-md">
                    <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">Form Published</h1>
                    <h2 className="text-2xl">Share this form</h2>
                    <h3 className="text-xl text-muted-foreground border-b pb-10">Anyone with the link can view and submit the form</h3>
                    <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
                        <Input className="w-full" readOnly value={shareUrl} />
                        <Button
                            className="mt-2 w-full"
                            onClick={() => {
                                navigator.clipboard.writeText(shareUrl)
                                toast.success("Copied", {
                                    description: "Link copied to clipboard"
                                })
                            }}
                        >Copy Link</Button>
                    </div>
                    <div className="flex justify-between">
                        <Button variant={"link"} asChild>
                            <Link href={"/"} className="gap-2">
                                <ArrowLeft />
                                Go back home
                            </Link>
                        </Button>

                        <Button variant={"link"} asChild>
                            <Link href={`/forms/${form.id}`} className="gap-2">
                                Form details
                                <ArrowRight />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    }

    return (
        <DndContext sensors={sensors}>
            <main className="flex flex-col w-full">
                <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
                    <h2 className="truncate font-medium">
                        <span className="text-muted-foreground mr-2">Form:</span>
                        {form.name}
                    </h2>
                    <div className="flex items-center gap-2">
                        <PreviewDialogBtn />
                        {!form.published && (
                            <>
                                <SaveFormBtn id={form.id} />
                                <PublishFormBtn id={form.id} />
                            </>
                        )}
                    </div>
                </nav>
                <div className="flex w-full flex-grow items-center justify-center relative">
                    <Designer />
                </div>
            </main>
            <DragOverlayWrapper />
        </DndContext>
    )
}
