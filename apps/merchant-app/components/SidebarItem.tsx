"use client"

import { usePathname, useRouter } from "next/navigation"

interface SidebarItemType{
    href : string,
    title : string,
    icon : React.ReactNode
}
export const SidebarItem = ({href, title, icon} : SidebarItemType) => {
    const router = useRouter();
    const pathName = usePathname();
    const selected = pathName === href;

    const handleRoute = () => {
        router.push(href);
    }
    return (
        <div className={`flex cursor-pointer p-2 pl-8 ${selected ? "text-[#6a51a6]" : "text-slate-500"}`} onClick={handleRoute}>
            <div className="pr-2">
                {icon}
            </div>
            <div className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}>
                {title}
            </div>
        </div>
    )
}