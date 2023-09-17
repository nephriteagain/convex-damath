import { IoMdSettings } from 'react-icons/io'

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import Restart from './Restart'
import Exit from './Exit'

export default function LocalSettings({showRules, showModal}: {showRules: () => void, showModal: () => void}) {
    return (
        <Sheet>
        <SheetTrigger asChild>
          <Button variant={null}
              className="absolute top-2 left-2 hover:scale-125 hover:rotate-90  transition-all duration-150"
          >
              <span className="text-3xl">
                  <IoMdSettings />
              </span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className="flex flex-col gap-4 w-[280px] bg-customNeutral">
             
             <Button variant="default"
                 className="bg-customSec max-w-[200px] text-lg shadow-sm drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150"
                 onClick={showRules}
             >
                 Show Rules
             </Button>
            <Restart showModal={showModal} />
            <Exit />
        </SheetContent>
      </Sheet>
    )
}