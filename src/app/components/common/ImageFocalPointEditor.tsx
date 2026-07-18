import { useRef, type PointerEvent } from "react";
import { getObjectPositionStyle, normalizeImagePosition } from "../../utils/imageFocalPoint";

type ImageFocalPointEditorProps = {
  imageUrl: string;
  positionX: number;
  positionY: number;
  onChange: (position: { x: number; y: number }) => void;
  label: string;
  disabled?: boolean;
  aspectRatio?: string | number;
};

export default function ImageFocalPointEditor({
  imageUrl,
  positionX,
  positionY,
  onChange,
  label,
  disabled = false,
  aspectRatio = "16 / 9",
}: ImageFocalPointEditorProps) {
  const activePointer = useRef<number | null>(null);
  const position = normalizeImagePosition(positionX, positionY);
  const editorDisabled = disabled || !imageUrl;

  function updateFromPointer(event: PointerEvent<HTMLDivElement>) {
    if (editorDisabled) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    onChange(
      normalizeImagePosition(
        ((event.clientX - bounds.left) / bounds.width) * 100,
        ((event.clientY - bounds.top) / bounds.height) * 100,
      ),
    );
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (editorDisabled) return;
    activePointer.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromPointer(event);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (activePointer.current === event.pointerId) updateFromPointer(event);
  }

  function finishPointer(event: PointerEvent<HTMLDivElement>) {
    if (activePointer.current !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    activePointer.current = null;
  }

  return (
    <div className={editorDisabled ? "opacity-60" : ""}>
      <span className="mb-2 block text-[13px] font-semibold text-[#294B55]">{label}</span>
      <div
        role="application"
        aria-label={label}
        aria-disabled={editorDisabled}
        className={`relative w-full select-none overflow-hidden rounded-xl border border-[#C8D5D0] bg-[#F5F7F4] ${editorDisabled ? "cursor-not-allowed" : "cursor-crosshair touch-none"}`}
        style={{ aspectRatio }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointer}
        onPointerCancel={finishPointer}
      >
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={`Pratinjau ${label.toLowerCase()}`}
              draggable={false}
              className="pointer-events-none h-full w-full object-cover"
              style={getObjectPositionStyle(position.x, position.y)}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#0D6F6B] shadow-md"
              style={{ left: `${position.x}%`, top: `${position.y}%` }}
            />
          </>
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-[13px] text-[#7C8C8A]">Unggah gambar terlebih dahulu.</div>
        )}
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-[#5F6F72]">Geser atau ketuk gambar untuk menentukan bagian yang tampil pada cover.</p>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] font-medium text-[#49636A]">Horizontal : {Math.round(position.x)}% &nbsp; Vertical : {Math.round(position.y)}%</p>
        <button
          type="button"
          onClick={() => onChange({ x: 50, y: 50 })}
          disabled={editorDisabled}
          className="min-h-10 rounded-xl border border-[#C8D5D0] px-4 text-[12px] font-semibold text-[#49636A] hover:border-[#0D6F6B] hover:text-[#0D6F6B] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Kembalikan ke Tengah
        </button>
      </div>
    </div>
  );
}
