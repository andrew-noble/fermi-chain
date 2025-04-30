// import ThemeToggle from "@/components/topbar/ThemeToggle";
import AboutDialog from "@/components/misc/AboutDialog";
import TutorialDialog from "@/components/misc/TutorialDialog";
import { Button } from "@/components/display/ui/button";
import { useState } from "react";

export default function TopBar() {
  const [aboutDialogOpen, setAboutDialogOpen] = useState(false);
  const [tutorialDialogOpen, setTutorialDialogOpen] = useState(false);
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
        <AboutDialog open={aboutDialogOpen} onOpenChange={setAboutDialogOpen} />
        <Button
          size="sm"
          className="text-xs sm:text-sm"
          onClick={() => setAboutDialogOpen(true)}
        >
          About
        </Button>
        <TutorialDialog
          open={tutorialDialogOpen}
          onOpenChange={setTutorialDialogOpen}
        />
        <Button
          size="sm"
          className="text-xs sm:text-sm"
          onClick={() => setTutorialDialogOpen(true)}
        >
          Tutorial
        </Button>
      </div>
    </div>
  );
}
