import { useState } from "react";

interface ContentImageProps {
  imagePath: string;
  alt?: string;
  mode?: "standard" | "pixelart" | "mcskin";
  mask?: boolean;
  maskAlertTitle?: string;
  maskAlertDesc?: string;
}

const ContentImage: React.FC<ContentImageProps> = ({
  imagePath,
  alt = "",
  mode = "standard",
  mask = false,
  maskAlertTitle = "閲覧注意",
  maskAlertDesc = "この画像には見る人を選ぶ内容が含まれています",
}) => {
  const [isMasked, setIsMasked] = useState(mask);

  const handleUnmask = () => {
    setIsMasked(false);
  };

  const baseStyles = "max-w-full h-auto";
  const pixelArtStyles = "image-rendering-pixelated";

  let imageStyles = baseStyles;

  if (mode === "pixelart") {
    imageStyles += ` ${pixelArtStyles}`;
  }

  return (
    <div className="relative w-full">
      {isMasked ? (
        <div
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center bg-black text-white"
          onClick={handleUnmask}
        >
          <h2 className="text-lg font-bold">{maskAlertTitle}</h2>
          <p className="text-sm">{maskAlertDesc}</p>
        </div>
      ) : (
        <>
          {mode === "mcskin" ? (
            <div className="flex flex-col items-center">
              <img src={imagePath} alt={alt} className={imageStyles} />
              <button
                onClick={() => (window.location.href = imagePath)}
                className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
              >
                ダウンロード
              </button>
            </div>
          ) : (
            <img src={imagePath} alt={alt} className={imageStyles} />
          )}
        </>
      )}
    </div>
  );
};

export default ContentImage;
