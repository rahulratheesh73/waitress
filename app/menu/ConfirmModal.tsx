// ...existing code...
"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface ConfirmModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  message?: string;
  onConfirm?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  customDiv?: React.ReactNode;
  data?: Array<{ id?: string; name?: string; qty?: number; price?: number }>;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open = false,
  onOpenChange,
  title = "Confirm",
  message = "Are you sure?",
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  data = [],
}) => {
  const items = Array.isArray(data) ? data : [];
  const total = items.reduce(
    (sum, it) => sum + (it.qty || 0) * (it.price || 0),
    0
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>

        <div className="max-h-72 overflow-auto py-2">
          {items.length === 0 ? (
            <p className="text-sm text-slate-500">No items selected.</p>
          ) : (
            <ul className="space-y-3">
              {items.map((it, idx) => (
                <li
                  key={it.id ?? idx}
                  className="flex items-center justify-between border-b pb-2 last:border-b-0"
                >
                  <div>
                    <div className="font-medium text-slate-900">
                      {it.name} {it.qty ? `x ${it.qty}` : ""}
                    </div>
                    <div className="text-xs text-slate-500">
                      {it.price !== undefined
                        ? `$${((it.qty || 0) * it.price).toFixed(2)}`
                        : ""}
                    </div>
                  </div>
                  <div className="text-sm text-slate-700">
                    {it.price !== undefined ? `$${it.price.toFixed(2)}` : ""}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4 mb-2 flex items-center justify-between">
          <div className="text-sm text-slate-500">Total</div>
          <div className="text-lg font-semibold">${total.toFixed(2)}</div>
        </div>

        <DialogFooter>
          <button
            onClick={() => onOpenChange?.(false)}
            className="rounded-md border px-3 py-2"
          >
            {cancelLabel}
          </button>

          <button
            hidden={!confirmLabel}
            onClick={() => {
              onConfirm?.();
              onOpenChange?.(false);
            }}
            className="ml-2 rounded-md bg-primary px-3 py-2 text-white"
          >
            {confirmLabel}
          </button>
        </DialogFooter>

        <DialogClose className="sr-only" />
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(ConfirmModal);
//