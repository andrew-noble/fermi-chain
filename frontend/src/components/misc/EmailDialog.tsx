import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/display/ui/dialog";
import { Button } from "@/components/display/ui/button";

interface EmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EmailDialog({ open, onOpenChange }: EmailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Stay Updated</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Get notified when we add new features or daily questions.
          </p>
          <form
            action="https://formsubmit.co/a414ff318e530d2fd6566095b8fec383"
            method="POST"
            className="flex gap-2"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80"
            >
              Notify Me
            </button>
            <input
              type="hidden"
              name="_subject"
              value="New Fermi Chain Subscriber"
            />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="hidden"
              name="_autoresponse"
              value="Thanks for subscribing to Fermi Chain updates! We'll keep you posted on new features and daily questions."
            />
            <input
              type="hidden"
              name="_redirect"
              value="https://fermichain.com/thanks"
            />
          </form>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
