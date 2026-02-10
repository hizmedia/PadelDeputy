import { Text, clx } from "@medusajs/ui"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import React from "react"
import { IoTennisball } from "react-icons/io5"

type AccordionItemProps = AccordionPrimitive.AccordionItemProps & {
  title: string
  subtitle?: string
  description?: string
  required?: boolean
  tooltip?: string
  forceMountContent?: true
  headingSize?: "small" | "medium" | "large"
  customTrigger?: React.ReactNode
  complete?: boolean
  active?: boolean
  triggerable?: boolean
  children: React.ReactNode
}

type AccordionProps =
  | (AccordionPrimitive.AccordionSingleProps &
      React.RefAttributes<HTMLDivElement>)
  | (AccordionPrimitive.AccordionMultipleProps &
      React.RefAttributes<HTMLDivElement>)

const Accordion: React.FC<AccordionProps> & {
  Item: React.FC<AccordionItemProps>
} = ({ children, ...props }) => {
  return (
    <AccordionPrimitive.Root {...props}>{children}</AccordionPrimitive.Root>
  )
}

const Item: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  description,
  children,
  className,
  headingSize = "large",
  customTrigger = undefined,
  forceMountContent = undefined,
  triggerable,
  ...props
}) => {
  return (

    <AccordionPrimitive.Item
      {...props}
      className={clx(
        "border-[#00AFB5]/30 group border-t last:mb-0 last:border-b",
        "py-4",
        className
      )}
    >
    
      <AccordionPrimitive.Header className="px-1">
        <div className="flex flex-col">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <Text className="text-[#004777] font-oswald font-bold uppercase tracking-wide text-base">
                {title}
              </Text>
            </div>
         
            <AccordionPrimitive.Trigger>
              {customTrigger || <TennisBallTrigger />}
            </AccordionPrimitive.Trigger>
          </div>
          {subtitle && (
            <Text as="span" size="small" className="mt-1 text-gray-600 font-quicksand">
              {subtitle}
            </Text>
          )}
        </div>
      </AccordionPrimitive.Header>

      <AccordionPrimitive.Content
        forceMount={forceMountContent}
        className={clx(
          "radix-state-closed:animate-accordion-close radix-state-open:animate-accordion-open radix-state-closed:pointer-events-none px-1"
        )}
      >
        <div className="inter-base-regular group-radix-state-closed:animate-accordion-close pt-3">
          {description && (
            <Text className="text-gray-700 font-quicksand mb-3">{description}</Text>
          )}
          <div className="w-full">{children}</div>
        </div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  )
}

Accordion.Item = Item

const TennisBallTrigger = () => {
  return (
    <div className="text-[#EFD28D] hover:bg-[#FF7700]/10 active:bg-[#FF7700]/20 bg-transparent rounded-full group relative p-2 transition-all duration-300">
      <IoTennisball 
        className="h-6 w-6 group-radix-state-open:rotate-180 group-radix-state-open:text-[#FF7700] transition-all duration-500 ease-in-out" 
      />
    </div>
  )
}

export default Accordion