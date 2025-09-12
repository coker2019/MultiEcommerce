import { Category } from "@/payload-types";
import Link from "next/link";
import { CustomCatgory } from "../types";

interface props {
    category: CustomCatgory;
    isOpen: boolean;
    position: {top: number; left: number};

}

export const SubcategoryMenu = ({
 category,
 isOpen,
 position,
}: props) => {
 if (!isOpen || !category.subcategories || category.subcategories.length === 0) {
    return null;
 }

 const backgroundColor = category.color || "#F5F5F5";

 return (
    <div className="fixed z-100"
    style={{
        top: position.top,
        left: position.left,
    }}
    >
        {/* Invisible bridge  to maintain hover */}
        <div className="h-3 w-60" />
        <div
        style={{backgroundColor}} 
        className="w-60 shadow-[4px_4px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px] text-black 
        rounded-md overflow-hidden broder" >

         <div>
            {category.subcategories?.map( (Subcategory: Category) => (
                <Link
                 key={Subcategory.slug}
                 href={`/${category.slug}/${Subcategory.slug}`}
                 className="w-full text-left p-4
                  flex justify-between hover:bg-black hover:text-white items-center
                  underline font-medium"
                 >
                    {Subcategory.name}

                </Link>
            ))}
         </div>

        </div>

    </div>
 )
}