"use client"

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SubcategoryMenu } from "./subcategory-menu";

import { useDropdownPosition } from "./use-dropdown-position";
import { CustomCatgory } from "../types";
import Link from "next/link";



interface props {
    category: CustomCatgory;
    isActive?: boolean;
    isNavigationHovered?: boolean;
};

export const CategoryDropdown = ({
    category,
    isActive,
    isNavigationHovered
}: props) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const {getDropdownPosition} = useDropdownPosition(dropdownRef);

    const onMouseEnter = () => {
        if (category.subcategories) {
            setIsOpen(true);
        }
    };

    const onMoseLeave = () => setIsOpen(false);

    const dropdownPosition = getDropdownPosition();

    const toggleDropdown = () => {
      if (category.subcategories?.docs?.length){
        setIsOpen(!isOpen);
      }
    }


  return (
<div className="relative"
   ref={dropdownRef}
   onMouseEnter={onMouseEnter}
   onMouseLeave={onMoseLeave}
   onClick={ toggleDropdown}
   >
<div className="relative">
<Button
 variant="elevated"
 className={cn("h-11 px-4 border-transparent rounded-full hover:bg-white hover:border-primary text-black",
isActive && !isNavigationHovered && " bg-white border-primary",
isOpen && "bg-white border-primary"
 )}

 >

<Link 
href={`/${category.slug === "all"} ? "" : category.slug`}
>
 {category.name}
 </Link>
</Button>
{category.subcategories && category.subcategories.length > 0 && (
  <div 
  className={cn(
    "opacity-0 absolute -bttom-3 w-0 h-0 border-l-[10px] border-r-[10px]  border-b-[10px]  border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-5",
    isOpen && "opacity-100"
)}
  />

  
)}
</div>
<SubcategoryMenu 
category={category}
isOpen={isOpen}
position={dropdownPosition}

/>
</div>
  )
}
