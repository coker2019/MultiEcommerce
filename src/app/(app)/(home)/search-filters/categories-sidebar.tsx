import { CustomCatgory } from "../types";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";


import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";



interface props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CustomCatgory;
}

export const CategoriesSidebar = ({ 
    open,
    onOpenChange,
    data,
 }: props) => {

  const router = useRouter();

    const [parentCategories, setParentCategories] = useState<CustomCatgory[] | null>(null);
    const [selectedCategory, setSelectedCategories] = useState<CustomCatgory[] | null>(null);

// if have parent categories, show those, otherwise show root catgories
const currentCateories = parentCategories ?? data ?? [];

const handleOpenChange = (open: boolean) => {
  setSelectedCategories(null);
  setParentCategories(null);
  onOpenChange(open);

}

const handleCategoryClick = (category: CustomCatgory) => {
  if (category.subcategories && category.subcategories.length > 0) {
    setParentCategories(category.subcategories as CustomCatgory[]);
    setSelectedCategories(category);
  } else {
    // this a leaf categoty (no subcategories)

    if (parentCategories && selectedCategory) {
      // Thia is a subcategory- navigate to /category/suncategory

      router.push(`/${selectedCategory.slug}/${category.slug}`);
    } else {
      // This is a main category- navigate to /category
      if (category.slug === "all") {
        router.push("/");

      }else {
        router.push(`/${category.slug}`);
      }
    }

    handleOpenChange(false);


  }

}

const handleBackClick = () => {
  if (parentCategories) {
    setParentCategories(null);
    setSelectedCategories(null);
  }
}

const backgroundColor = selectedCategory?.color || "white";

return(
  <Sheet open={open} onOpenChange={handleOpenChange}>
    <SheetContent
    side="left"
    className="p-0 transition-none"
    style={{backgroundColor}}
    >

        <SheetHeader className="p-4 border-b">

            <SheetTitle>
                Categories
            </SheetTitle>

        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
            onClick={handleBackClick}
            className="w-full text-left p-4 hover:bg-black hover:text-white flex
            items-center text-base font-medium"
            >
              <ChevronLeftIcon className="size-4 mr-2" />
              Back
            </button>

          )}

          {currentCateories.map( (category) => (
            <button 
            key={category.slug}
            onClick={() => handleCategoryClick(category)}
             className="w-full text-left p-4 hover:bg-black hover:text-white
            flex justify-between items-center text-base font-medium cursor-pointer"
            >
             {category.name}
             {category.subcategories && category.subcategories.length > 0 && (
              <ChevronRightIcon className="size-4" />
             )}

            </button>
          ))}


          
        </ScrollArea>

    </SheetContent>

  </Sheet>
)
};
