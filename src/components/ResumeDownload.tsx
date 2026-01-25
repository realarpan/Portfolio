"use client";

import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";

export default function DownloadButton() {
  const [isDownloading, setIsDownloading] = useState(false);
  const resumeUrl = "https://cdn.xinacy.com/resume.pdf";

  async function handleDownload() {
    setIsDownloading(true);
    const response = await fetch(resumeUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Arpan's Resume.pdf";
    link.click();
    window.URL.revokeObjectURL(url);
    setIsDownloading(false);
  }
  return (
    <Button
      onClick={handleDownload}
      className="bg-[#00E676] text-black hover:bg-[#00D166]"
    >
      {isDownloading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Download className="size-4" />
      )}
      Download PDF
    </Button>
  );
}
