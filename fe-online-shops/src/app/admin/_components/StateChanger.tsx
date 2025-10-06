import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

enum orderStatusType {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
}

type PropsType = {
  saveChange: () => void;
  statusHandler: (_orderStatus: orderStatusType) => void;
  orderStatus: orderStatusType;
};

export function StateChanger({
  saveChange,
  statusHandler,
  orderStatus,
}: PropsType) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="secondary">Change delivery state</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change delivery state</DialogTitle>
          </DialogHeader>
          <div className="flex my-6 justify-evenly">
            <Button variant="secondary" onClick={() => statusHandler(orderStatusType.PENDING)}>
              {orderStatusType.PENDING}
            </Button>
            <Button variant="secondary" onClick={() => statusHandler(orderStatusType.DELIVERED)}>
              {orderStatusType.DELIVERED}
            </Button>
            <Button variant="secondary" onClick={() => statusHandler(orderStatusType.CANCELLED)}>
              {orderStatusType.CANCELLED}
            </Button>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={saveChange}>
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
