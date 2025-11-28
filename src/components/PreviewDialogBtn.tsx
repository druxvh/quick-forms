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
                    disabled={elements.length === 0 || !elements}
                    variant={"outline"}
                    className="text-xs sm:text-sm cursor-pointer"
                >
                    Preview
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-full h-dvh max-h-screen flex flex-col gap-0 p-0 border-none z-50">
                <DialogHeader className="truncate min-h-fit">
                    <DialogTitle asChild>
                        <div className="px-4 py-2 border-b">
                            <p className="text-base sm:text-lg truncate text-left font-bold text-muted-foreground leading-tight">Form preview</p>
                            <p className="mt-2 text-pretty text-xs sm:text-sm text-left text-muted-foreground leading-tight">
                                This is how your form will look like to your users.
                            </p>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <div className="max-w-2xl flex flex-col gap-4 grow  h-full w-full px-4 py-8 overflow-y-auto mx-auto">
                    {elements.map((element) => {
                        const FormComponent = FormElements[element.type].formComponent

                        return <FormComponent key={element.id} elementInstance={element} />
                    })}
                    <div className="cursor-not-allowed py-5">
                        <Button disabled className="p-4 w-full">Submit</Button>
                    </div>
                </div>
                {/* </div> */}
            </DialogContent>
        </Dialog>
    )
}
