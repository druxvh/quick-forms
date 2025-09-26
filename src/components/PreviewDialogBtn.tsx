// "use client"

import { useDesignerElements } from "@/hooks/use-designer"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"
import { FormElements } from "@/types/form"

export default function PreviewDialogBtn() {
    const elements = useDesignerElements()
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    disabled={elements.length === 0}
                    variant={"outline"}>Preview</Button>
            </DialogTrigger>
            <DialogContent className="min-w-screen h-screen max-h-screen max-w-full flex flex-col grow p-0 gap-0">
                <DialogTitle asChild>
                    <div className="px-4 py-2 border-b">
                        <p className="text-lg font-bold text-muted-foreground">Form preview</p>
                        <p className="text-sm
                     text-muted-foreground">This is how your form will look like to your users.</p>
                    </div>
                </DialogTitle>
                <div className="bg-background flex flex-col grow items-center justify-center p-4 overflow-y-auto">

                    <div className="max-w-2xl outline flex flex-col gap-4 grow  h-full w-full p-8 overflow-y-auto">
                        {elements.map((element) => {
                            const FormComponent = FormElements[element.type].formComponent

                            return <FormComponent key={element.id} elementInstance={element} />
                        })}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
