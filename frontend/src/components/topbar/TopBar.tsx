// import ThemeToggle from "@/components/topbar/ThemeToggle";
import AboutDialog from "@/components/topbar/AboutDialog";
import TutorialDialog from "@/components/topbar/TutorialDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TopBar() {
  const [aboutDialogOpen, setAboutDialogOpen] = useState(false);
  const [tutorialDialogOpen, setTutorialDialogOpen] = useState(false);
  return (
    <div className="flex justify-between items-center max-w-6xl mx-auto p-1">
      <div className="font-bold text-lg">Fermi Chain</div>
      <div className="flex gap-4 items-center">
        {/* <ThemeToggle onToggleTheme={onToggleTheme} /> */}
        <AboutDialog open={aboutDialogOpen} onOpenChange={setAboutDialogOpen} />
        <Button onClick={() => setAboutDialogOpen(true)}>About</Button>
        <TutorialDialog
          open={tutorialDialogOpen}
          onOpenChange={setTutorialDialogOpen}
        />
        <Button onClick={() => setTutorialDialogOpen(true)}>Tutorial</Button>
      </div>
    </div>
  );
}
