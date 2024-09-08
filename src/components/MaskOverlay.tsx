interface MaskOverlayProps {
  maskAlertTitle: string;
  maskAlertDesc: string;
  boxId: string;
}

const MaskOverlay: React.FC<MaskOverlayProps> = ({
  maskAlertTitle,
  maskAlertDesc,
  boxId,
}) => {
  return (
    <>
      <style>
        {`
          #${boxId}:checked + label {
            display: none;
            }
            #${boxId}:checked ~ .checked {
            display: flex;
          }
          `}
      </style>
      <div className="relative w-full">
        {/* チェックボックスを表示しないで使う */}
        <input type="checkbox" id={boxId} className="hidden" />

        {/* マスク表示部分 */}
        <label
          htmlFor={boxId}
          className="absolute z-30 flex h-64 w-full cursor-pointer flex-col items-center justify-center bg-skin-accent text-skin-base"
        >
          <p className="text-lg font-bold">{maskAlertTitle}</p>
          <p className="text-sm">{maskAlertDesc}</p>
        </label>
      </div>
    </>
  );
};

export default MaskOverlay;
