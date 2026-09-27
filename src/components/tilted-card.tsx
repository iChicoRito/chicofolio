"use client";

import { type MouseEvent, type ReactNode, useRef } from "react";

import Image from "next/image";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

import GlareHover from "@/components/glare-hover";
import { cn } from "@/lib/utils";

// Adapted from React Bits TiltedCard (JS-CSS): typed, next/image, Tailwind instead of the CSS file,
// spans so it can sit inside a <button>, and no tilt when the visitor prefers reduced motion.
const springValues = { damping: 30, stiffness: 100, mass: 2 };

// Pass imageSrc/altText/sizes for a single image, or children for custom content (e.g. light/dark images).
type TiltedCardProps = {
  imageSrc?: string;
  altText?: string;
  sizes?: string;
  children?: ReactNode;
  captionText?: string;
  className?: string;
  glareClassName?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
};

export default function TiltedCard({
  imageSrc,
  altText,
  sizes,
  children,
  captionText,
  className,
  glareClassName = "rounded-xl bg-muted/50",
  scaleOnHover = 1.05,
  rotateAmplitude = 12,
}: TiltedCardProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const lastY = useRef(0);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(0, springValues);
  const rotateY = useSpring(0, springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateCaption = useSpring(0, { stiffness: 350, damping: 30, mass: 1 });

  function handleMouse(e: MouseEvent<HTMLSpanElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    if (reduceMotion) return;

    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
    rotateCaption.set(-(offsetY - lastY.current) * 0.6);
    lastY.current = offsetY;
  }

  function handleMouseEnter() {
    if (!reduceMotion) scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateCaption.set(0);
  }

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: hover-only visual effect; the parent button handles interaction
    <span
      ref={ref}
      className={cn("relative block size-full perspective-[800px]", className)}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.span className="relative block size-full transform-3d" style={{ rotateX, rotateY, scale }}>
        <GlareHover glareOpacity={0.35} className={glareClassName}>
          {children ??
            (imageSrc ? (
              <Image src={imageSrc} alt={altText ?? ""} fill sizes={sizes} className="object-cover" />
            ) : null)}
        </GlareHover>
      </motion.span>

      {captionText ? (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 z-10 hidden rounded-md bg-popover px-2.5 py-1 text-popover-foreground text-xs shadow-md sm:block"
          style={{ x, y, opacity, rotate: rotateCaption }}
        >
          {captionText}
        </motion.span>
      ) : null}
    </span>
  );
}
