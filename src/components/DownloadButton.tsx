// MyButton.tsx
import { useEffect } from "react";

interface DownloadButtonProps {
  url: string;
  buttonText?: string;
}
const DownloadButton: React.FC<DownloadButtonProps> = ({
  url,
  buttonText = "Download",
}) => {
  // ダウンロード処理を行う関数
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = url;
    a.download = url.substring(url.lastIndexOf("/") + 1);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <button
      className="mt-2 rounded bg-skin-accent px-4 py-2 text-skin-base"
      onClick={handleDownload}
    >
      {buttonText}
    </button>
  );
};

export default DownloadButton;
