"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/components/layout/CartProvider";
import { merchCopy as merchCopyEn, formatPrice } from "@/lib/content/merch";
import { merchCopy as merchCopyKri } from "@/lib/content/merch.kri";
import { useTranslated } from "@/lib/content/useTranslated";

function QuantityStepper({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="flex items-center border border-border-strong">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(quantity - 1)}
        className="focus-ring flex h-7 w-7 items-center justify-center text-current/70 transition-colors hover:bg-surface"
      >
        −
      </button>
      <span className="w-6 text-center font-mono text-xs">{quantity}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(quantity + 1)}
        className="focus-ring flex h-7 w-7 items-center justify-center text-current/70 transition-colors hover:bg-surface"
      >
        +
      </button>
    </div>
  );
}

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const copy = useTranslated(merchCopyEn, merchCopyKri);
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-ink/60"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
            role="dialog"
            aria-label={copy.yourCart}
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-sm flex-col border-l border-border-subtle bg-background"
          >
            <div className="flex items-center justify-between border-b border-border-subtle p-6">
              <h2 className="font-display text-xl font-black uppercase tracking-tight">{copy.yourCart}</h2>
              <button
                type="button"
                aria-label="Close cart"
                onClick={onClose}
                className="focus-ring flex h-8 w-8 items-center justify-center border border-border-strong text-current transition-colors hover:border-accent-fill hover:bg-accent-fill hover:text-accent-fill-ink"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <p className="font-body text-sm text-current/55">{copy.emptyCart}</p>
              ) : (
                <ul className="flex flex-col gap-6">
                  {items.map((line) => (
                    <li key={`${line.slug}::${line.size ?? ""}`} className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-sm font-bold uppercase tracking-tight">{line.name}</p>
                        {line.size && (
                          <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.03em] text-current/50">
                            {copy.size}: {line.size}
                          </p>
                        )}
                        <p className="mt-1 font-mono text-xs text-current/60">{formatPrice(line.price)}</p>
                        <div className="mt-2 flex items-center gap-3">
                          <QuantityStepper
                            quantity={line.quantity}
                            onChange={(next) => updateQuantity(line.slug, line.size, next)}
                          />
                          <button
                            type="button"
                            onClick={() => removeItem(line.slug, line.size)}
                            className="focus-ring font-mono text-[11px] uppercase tracking-[0.03em] text-current/50 hover:text-accent-text"
                          >
                            {copy.remove}
                          </button>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-current/80">
                        {formatPrice(line.price * line.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-border-subtle p-6">
              <div className="flex items-center justify-between font-mono text-sm">
                <span className="uppercase tracking-[0.03em] text-current/60">{copy.subtotal}</span>
                <span className="font-bold">{formatPrice(subtotal)}</span>
              </div>
              <button
                type="button"
                disabled
                className="mt-4 w-full border border-border-strong bg-transparent px-5 py-3.5 font-body text-sm font-semibold uppercase tracking-[0.08em] text-foreground/50 disabled:cursor-not-allowed"
              >
                {copy.checkout}
              </button>
              <p className="mt-2 text-center font-body text-xs text-current/45">{copy.checkoutComingSoon}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
