import DownloadButton from "./DownloadButton";
import MaskOverlay from "./MaskOverlay";

interface ContentImageProps {
  imagePath: string;
  alt?: string;
  mode?: "standard" | "pixelart" | "mcskin";
  mask?: boolean;
  maskAlertTitle?: string;
  maskAlertDesc?: string;
  downloadButtonText?: string;
}

const ContentImage: React.FC<ContentImageProps> = ({
  imagePath,
  alt = "",
  mode = "standard",
  mask = false,
  maskAlertTitle = "閲覧注意",
  maskAlertDesc = "この画像には見る人を選ぶ内容が含まれています",
}) => {
  const baseStyles = "max-w-full h-auto";
  const pixelArtStyles = "image-rendering-pixelated";

  let imageStyles = baseStyles;

  if (mode === "pixelart" || mode === "mcskin") {
    imageStyles += ` ${pixelArtStyles}`;
  }
  return (
    <div className="relative w-full">
      {mask ? (
        <MaskOverlay
          maskAlertDesc={maskAlertDesc}
          maskAlertTitle={maskAlertTitle}
          boxId={
            imagePath.substring(imagePath.lastIndexOf("/") + 1).split(".")[0]
          }
        />
      ) : null}
      <>
        <div className="relative z-20 flex h-64 w-full cursor-pointer flex-col items-center justify-center">
          {mode === "mcskin" ? (
            <div className="flex flex-col items-center">
              <img src={imagePath} alt={alt} className={imageStyles} />
              <DownloadButton url={imagePath} />
            </div>
          ) : (
            <img src={imagePath} alt={alt} className={imageStyles} />
          )}
        </div>
      </>
    </div>
  );
};
export default ContentImage;
