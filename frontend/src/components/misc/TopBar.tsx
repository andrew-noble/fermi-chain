// import ThemeToggle from "@/components/topbar/ThemeToggle";
import AboutDialog from "@/components/misc/AboutDialog";
import EmailDialog from "@/components/misc/EmailDialog";
import { Button } from "@/components/display/ui/button";
import { useState } from "react";

export default function TopBar() {
  const [aboutDialogOpen, setAboutDialogOpen] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  return (
    <div className="flex justify-between items-center max-w-6xl mx-auto p-1">
      <div className="font-bold text-base sm:text-lg">Fermi Chain</div>
      <div className="flex gap-2 sm:gap-4 items-center">
        <span className="text-xs text-gray-400 font-normal hidden sm:inline">
          New question every day!
        </span>
        <span className="text-xs text-gray-400 font-normal sm:hidden">
          Daily Q!
        </span>
        {/* <ThemeToggle onToggleTheme={onToggleTheme} /> */}
        <EmailDialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen} />
        <Button
          size="sm"
          className="text-xs sm:text-sm"
          onClick={() => setEmailDialogOpen(true)}
        >
          Get Updates
        </Button>
        <AboutDialog open={aboutDialogOpen} onOpenChange={setAboutDialogOpen} />
        <Button
          size="sm"
          className="text-xs sm:text-sm"
          onClick={() => setAboutDialogOpen(true)}
        >
          About
        </Button>
      </div>
    </div>
  );
}
