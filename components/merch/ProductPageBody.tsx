"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Slate } from "@/components/ui/Slate";
import { Accordion } from "@/components/merch/Accordion";
import { useCart } from "@/components/layout/CartProvider";
import {
  merchItems as merchItemsEn,
  merchCopy as merchCopyEn,
  formatPrice,
  type MerchItem,
} from "@/lib/content/merch";
import { merchItems as merchItemsKri, merchCopy as merchCopyKri } from "@/lib/content/merch.kri";
import { useTranslated } from "@/lib/content/useTranslated";

// `item` is the server-resolved English product (guaranteed to exist — the
// page already 404s otherwise); this only needs to swap in the same-slug
// Krio version when that language is active.
export function ProductPageBody({ item }: { item: MerchItem }) {
  const merchItems = useTranslated(merchItemsEn, merchItemsKri);
  const copy = useTranslated(merchCopyEn, merchCopyKri);
  const translated = merchItems.find((p) => p.slug === item.slug) ?? item;

  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);

  // Reset gallery/selection state when navigating between products —
  // otherwise leftover state (e.g. image index 3) could point past the
  // next product's shorter image list.
  useEffect(() => {
    setActiveImage(0);
    setSize(null);
    setQuantity(1);
    setSizeError(false);
    setAdded(false);
  }, [translated.slug]);

  const outOfStock = translated.stockQuantity <= 0;
  const requiresSize = !!translated.sizes?.length;

  function handleAddToCart() {
    if (requiresSize && !size) {
      setSizeError(true);
      return;
    }
    addItem(
      { slug: translated.slug, name: translated.name, price: translated.price, size: size ?? undefined },
      quantity,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="pt-28 pb-20 md:pt-32 md:pb-28">
      <Container>
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.03em] text-current/50">
          <Link href="/" className="focus-ring hover:text-accent-text">
            {copy.breadcrumbHome}
          </Link>
          <span aria-hidden>/</span>
          <Link href="/merch" className="focus-ring hover:text-accent-text">
            {copy.breadcrumbMerch}
          </Link>
          <span aria-hidden>/</span>
          <span className="text-current/80">{translated.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div className="min-w-0">
            <div className="flex gap-4">
              <div className="hidden w-20 shrink-0 flex-col gap-3 sm:flex">
                {translated.images.map((angle, i) => (
                  <button
                    key={angle}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`Show ${angle} view`}
                    aria-current={i === activeImage}
                    className={clsx(
                      "border transition-colors",
                      i === activeImage ? "border-accent-fill" : "border-border-subtle hover:border-border-strong",
                    )}
                  >
                    <Slate label={`${translated.name} — ${angle}`} variant="photo" aspect="aspect-[4/5]" grainOpacity={0.05} />
                  </button>
                ))}
              </div>
              <div className="flex-1">
                <Slate
                  key={activeImage}
                  label={`${translated.name} — ${translated.images[activeImage]}`}
                  variant="photo"
                  aspect="aspect-[4/5]"
                  grainOpacity={0.05}
                />
              </div>
            </div>

            {/* Mobile: horizontal thumbnail scroller under the main image. */}
            <div className="mt-3 flex gap-3 overflow-x-auto sm:hidden">
              {translated.images.map((angle, i) => (
                <button
                  key={angle}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`Show ${angle} view`}
                  aria-current={i === activeImage}
                  className={clsx(
                    "w-16 shrink-0 border transition-colors",
                    i === activeImage ? "border-accent-fill" : "border-border-subtle",
                  )}
                >
                  <Slate label={`${translated.name} — ${angle}`} variant="photo" aspect="aspect-[4/5]" grainOpacity={0.05} />
                </button>
              ))}
            </div>
          </div>

          {/* Info panel */}
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.03em] text-accent-text">
              {translated.category}
            </span>
            <h1 className="mt-2 font-display text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-5xl">
              {translated.name}
            </h1>
            <p className="mt-3 font-mono text-lg">{formatPrice(translated.price)}</p>
            <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-current/65 sm:text-base">
              {translated.description}
            </p>

            {requiresSize && (
              <div className="mt-8">
                <span className="font-mono text-xs uppercase tracking-[0.03em] text-current/60">
                  {copy.selectSize}
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {translated.sizes!.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setSize(s);
                        setSizeError(false);
                      }}
                      aria-pressed={size === s}
                      className={clsx(
                        "focus-ring flex h-11 w-11 items-center justify-center border font-mono text-xs uppercase transition-colors",
                        size === s
                          ? "border-accent-fill bg-accent-fill text-accent-fill-ink"
                          : "border-border-strong hover:border-accent-text hover:text-accent-text",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {sizeError && (
                  <p className="mt-2 font-body text-xs text-red-500">{copy.selectSizePrompt}</p>
                )}
              </div>
            )}

            <div className="mt-8">
              <span className="font-mono text-xs uppercase tracking-[0.03em] text-current/60">
                {copy.quantity}
              </span>
              <div className="mt-3 flex w-fit items-center border border-border-strong">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={outOfStock}
                  className="focus-ring flex h-11 w-11 items-center justify-center text-current/70 transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
                >
                  −
                </button>
                <span className="w-10 text-center font-mono text-sm">{quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => Math.min(translated.stockQuantity, q + 1))}
                  disabled={outOfStock}
                  className="focus-ring flex h-11 w-11 items-center justify-center text-current/70 transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={outOfStock}
              className={clsx(
                "focus-ring mt-8 w-full border px-7 py-3.5 font-body text-sm font-semibold uppercase tracking-[0.08em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-40",
                added
                  ? "border-accent-fill bg-accent-fill text-accent-fill-ink"
                  : "border-foreground bg-foreground text-background hover:border-accent-fill hover:bg-accent-fill hover:text-accent-fill-ink",
              )}
            >
              {outOfStock ? copy.outOfStock : added ? copy.addedToCart : copy.addToCart}
            </button>

            <div className="mt-10">
              {translated.careInstructions && (
                <Accordion title={copy.careInstructions}>{translated.careInstructions}</Accordion>
              )}
              {translated.details && <Accordion title={copy.moreDetails}>{translated.details}</Accordion>}
              <Accordion title={copy.returnsGuarantee}>{copy.returnsDefault}</Accordion>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
