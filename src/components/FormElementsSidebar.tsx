"use client"

import { SidebarBtnElement } from './SidebarBtnElement'
import { FormElements } from './FormElements'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export default function FormElementsSidebar() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Elements</p>
        <Button
          // size={"icon"}
          variant={"ghost"}
        >
        </Button>
      </div>
      <Separator className='mb-4' />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
        <SidebarBtnElement formElement={FormElements.TextField} />
        <SidebarBtnElement formElement={FormElements.TitleField} />
        <SidebarBtnElement formElement={FormElements.SubTitleField} />
        <SidebarBtnElement formElement={FormElements.ParagraphField} />
        <SidebarBtnElement formElement={FormElements.SeparatorField} />
        <SidebarBtnElement formElement={FormElements.SpacerField} />
        <SidebarBtnElement formElement={FormElements.NumberField} />
        <SidebarBtnElement formElement={FormElements.TextAreaField} />
        <SidebarBtnElement formElement={FormElements.DateField} />
        <SidebarBtnElement formElement={FormElements.SelectField} />
      </div>
    </div>
  )
}
