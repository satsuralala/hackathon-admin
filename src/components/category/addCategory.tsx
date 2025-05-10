// components/NewCategoryDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface NewCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewCategoryDialog({
  open,
  onOpenChange,
}: NewCategoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Шинэ ангилал нэмэх</DialogTitle>
          <DialogDescription>
            Энд шинэ ангиллын мэдээллийг оруулна уу.
          </DialogDescription>
        </DialogHeader>
        {/* Your form fields */}
        <input
          type="text"
          placeholder="Ангиллын нэр"
          className="w-full border p-2 rounded"
        />
      </DialogContent>
    </Dialog>
  );
}
