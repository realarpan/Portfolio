"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StripeIcon, EthereumIcon, PaytmIcon } from "@/icons";
import Link from "next/link";
import { Heart, Copy, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function FloatingDonateButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-8 right-8 size-14 rounded-full bg-black/20 backdrop-blur-sm border border-pink-500/30 text-white shadow-lg hover:bg-black/30 hover:border-pink-500/50 transition-all duration-300 z-50 group"
          size="icon"
        >
          <Heart className="size-6 text-pink-400 group-hover:text-white transition-all duration-300" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xs bg-black/95 backdrop-blur-2xl border border-zinc-800/50 shadow-2xl p-0">
        <div className="p-4">
          <DialogHeader className="text-center mb-4">
            <DialogTitle className="text-lg font-medium text-white flex items-center justify-center gap-2">
              <Heart className="size-4 text-pink-400" />
              Donate
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-2">
            <Button
              variant="ghost"
              className="flex justify-center items-center gap-1 p-3 rounded-lg bg-zinc-900/50 hover:bg-zinc-800/50 transition-all duration-200 w-full"
              asChild
            >
              <Link
                href="https://www.codecademy.com/404-error-page"
                target="_blank"
              >
                <StripeIcon className="size-4 text-[#635BFF]" />
                <span className="text-white text-sm font-medium">Stripe</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="flex justify-center items-center gap-1 p-3 rounded-lg bg-zinc-900/50 hover:bg-zinc-800/50 transition-all duration-200 w-full"
              asChild
            >
              <Link href="https://pay.oxapay.com/12590716" target="_blank">
                <EthereumIcon className="size-4 text-[#627EEA]" />
                <span className="text-white text-sm font-medium">Crypto</span>
              </Link>
            </Button>
            <UPISection />
          </div>

          <p className="text-center text-xs text-zinc-500 mt-4">
            "No one has ever become poor from giving." – Anne Frank
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function UPISection() {
  const upiNumber = "Currently Unavailable";
  const upiID = "Currently Unavailable";
  const [copyingStates, setCopyingStates] = useState<{
    [key: string]: "idle" | "copying" | "copied";
  }>({});

  const copyToClipboard = async (text: string, label: string) => {
    const key = `${label}-${text}`;
    setCopyingStates((prev) => ({ ...prev, [key]: "copying" }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await navigator.clipboard.writeText(text);
      setCopyingStates((prev) => ({ ...prev, [key]: "copied" }));
      toast.success(`${label} copied to clipboard`);

      setTimeout(() => {
        setCopyingStates((prev) => ({ ...prev, [key]: "idle" }));
      }, 2000);
    } catch (err) {
      setCopyingStates((prev) => ({ ...prev, [key]: "idle" }));
      toast.error(`Failed to copy ${label}`);
    }
  };

  const getCopyIcon = (text: string, label: string) => {
    const key = `${label}-${text}`;
    const state = copyingStates[key] || "idle";

    switch (state) {
      case "copying":
        return <Loader2 className="size-3 text-zinc-400 animate-spin" />;
      case "copied":
        return <Check className="size-3 text-green-400" />;
      default:
        return (
          <Copy className="size-3 text-zinc-400 group-hover:text-white transition-colors" />
        );
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="upi" className="border-none">
        <Button
          asChild
          variant="ghost"
          className="p-3 rounded-t-lg bg-zinc-900/50 hover:bg-zinc-800/50 transition-all duration-200 hover:no-underline w-full [&>svg:last-child]:text-white [&>svg:last-child]:opacity-70"
        >
          <AccordionTrigger className="flex items-center justify-center gap-1 flex-1 [&>svg]:ml-auto">
            <PaytmIcon className="size-4 text-[#00baf2]" />
            <span className="text-white text-sm font-medium">UPI</span>
          </AccordionTrigger>
        </Button>
        <AccordionContent className="pb-0">
          <div className="mt-0 p-2 rounded-b-lg bg-zinc-800/30 border-t border-zinc-700/50">
            <button
              onClick={() => copyToClipboard(upiNumber, "UPI Number")}
              className="w-full flex items-center justify-between p-2 rounded hover:bg-zinc-700/50 transition-all duration-200 group"
            >
              <div className="text-left">
                <div className="font-medium text-xs text-white">UPI Number</div>
                <div className="text-zinc-400 text-xs font-mono">
                  {upiNumber}
                </div>
              </div>
              {getCopyIcon(upiNumber, "UPI Number")}
            </button>

            <div className="h-px bg-zinc-700/50 my-1" />

            <button
              onClick={() => copyToClipboard(upiID, "UPI ID")}
              className="w-full flex items-center justify-between p-2 rounded hover:bg-zinc-700/50 transition-all duration-200 group"
            >
              <div className="text-left">
                <div className="font-medium text-xs text-white">UPI ID</div>
                <div className="text-zinc-400 text-xs font-mono">{upiID}</div>
              </div>
              {getCopyIcon(upiID, "UPI ID")}
            </button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
