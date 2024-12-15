"use client";
import { useContext, createContext, useState } from "react";
import Image from "next/image";

// Define types for context and props
interface SidebarContextType {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Image
            src="\svg\SenateNameLogo.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt="Logo"
            width={200}
            height={200}
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg  hover:bg-gray-100"
          >
            {/* Replace these with your custom icons */}
            {expanded ? (
              <Image
                src="/svg/SidebarCloseIcon.svg" // Custom Open icon
                alt="Close Sidebar"
                width={24}
                height={24}
              />
            ) : (
              <Image
                src="\svg\SidebarOpenIcon.svg" // Custom Close icon
                alt="Open Sidebar"
                width={24}
                height={24}
              />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            {/* Sidebar Items */}
            <SidebarItem
              icon={
                <Image
                  src="/svg/SidebarDashboardIcon.svg"
                  alt="Home"
                  width={24}
                  height={24}
                />
              }
              text="Dashboard"
              active={true}
            />
            <SidebarItem
              icon={
                <Image
                  src="\svg\SidebarDeviceManagementIcon.svg"
                  alt="Profile"
                  width={24}
                  height={24}
                />
              }
              text="Device Management"
              active={false}
            />
            <SidebarItem
              icon={
                <Image
                  src="\svg\SidebarUserManagementIcon.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              }
              text="User Management"
              active={false}
            />
            <SidebarItem
              icon={
                <Image
                  src="\svg\SidebarMyProfileIcon.svg"
                  alt="Notifications"
                  width={24}
                  height={24}
                />
              }
              text="My Profile"
              active={false}
            />
            <SidebarItem
              icon={
                <Image
                  src="/svg/SidebarNotificationsIcon.svg"
                  alt="Notifications"
                  width={24}
                  height={24}
                />
              }
              text="Notifications"
              active={false}
            />
          </ul>
        </SidebarContext.Provider>

        <div className=" flex p-3  ">
          <Image
            src="/svg/SidebarLogoutIcon.svg" // Update with the correct path
            alt="Logout Icon"
            className="w-10 h-10 rounded-md"
            height={200}
            width={200}
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all border-orange-400 rounded-lg ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4 ">
              <h4 className="font-semibold">Logout</h4>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  alert?: boolean;
}

export function SidebarItem({ icon, text, active, alert }: SidebarItemProps) {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("SidebarContext must be used within a Sidebar");
  }

  const { expanded } = context;

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      } text-base font-medium leading-5`} 
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
