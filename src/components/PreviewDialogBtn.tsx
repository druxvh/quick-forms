"use client"

import { useDesignerElements } from "@/hooks/use-designer"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { FormElements } from "@/types/form"

export default function PreviewDialogBtn() {

    const elements = useDesignerElements()

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    disabled={elements.length === 0}
                    variant={"outline"}
                >
                    Preview
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-full h-screen max-h-screen gap-0 p-0 border-none">
                <DialogHeader className="truncate">
                    <DialogTitle asChild>
                        <div className="px-4 py-2 border-b">
                            <p className="text-lg truncate text-left font-bold text-muted-foreground">Form preview</p>
                            <p className="text-sm truncate text-left text-muted-foreground">
                                This is how your form will look like to your users.
                            </p>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <div className="bg-background flex flex-col grow items-center justify-center overflow-y-auto">

                    <div className="max-w-2xl flex flex-col gap-4 grow  h-full w-full px-4 py-8 overflow-y-auto">
                        {elements.map((element) => {
                            const FormComponent = FormElements[element.type].formComponent

                            return <FormComponent key={element.id} elementInstance={element} />
                        })}
                        <div className="cursor-not-allowed">
                            <Button disabled className="p-4 w-full">Submit</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
