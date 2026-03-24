import { Camera, ImagePlus, Images, Minus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import AppButton from '@/components/common/AppButton';
import BottomSheet from '@/components/common/BottomSheet';

type TodoCompleteSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmComplete?: (proofImageFile?: File) => void;
  isSubmitting?: boolean;
};

const IMAGE_ACCEPT = 'image/jpeg,image/png,image/webp';
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const TodoCompleteSheet = ({
  open,
  onOpenChange,
  onConfirmComplete,
  isSubmitting,
}: TodoCompleteSheetProps) => {
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelectImage = (file?: File) => {
    if (!file) return;

    const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(
      file.type
    );

    if (!isValidType) {
      setErrorMessage('JPG, PNG, webp 파일만 첨부할 수 있어요.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage('이미지 용량은 최대 10MB까지 첨부할 수 있어요.');
      return;
    }

    setErrorMessage('');
    setSelectedFile(file);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(undefined);
      return;
    }

    const nextPreviewUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(nextPreviewUrl);

    return () => URL.revokeObjectURL(nextPreviewUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (open) return;

    setSelectedFile(undefined);
    setPreviewUrl(undefined);
    setErrorMessage('');
  }, [open]);

  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title="할 일 완료하기"
      description="사진 첨부 후 할 일을 완료할 수 있는 바텀시트"
    >
      <div className="px-5 pt-8 pb-[15px]">
        <h2 className="text-lg leading-[1.3] font-semibold text-black">
          완료방법을 선택해주세요 !
        </h2>
        <p className="mt-[5px] text-xs leading-[1.3] font-semibold text-zinc-400">
          사진을 등록하지않으면 바로 완료됩니다 .
        </p>
      </div>

      <div className="px-5">
        <div className="relative flex h-50 items-center justify-center overflow-hidden rounded-[24px] bg-zinc-200">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="인증 사진 미리보기"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center">
              <ImagePlus className="h-10 w-10 text-zinc-300" />
              <p className="mt-2 text-center text-xs leading-[1.3] font-semibold text-zinc-600">
                인증샷 한 장으로 완벽하게 마무리해보세요.
              </p>
              <p className="mt-1 text-center text-[10px] leading-[1.3] font-medium text-zinc-500">
                JPG((jpeg)), PNG, webp 파일만 가능 (최대 10MB)
              </p>
            </div>
          )}

          {previewUrl && (
            <button
              type="button"
              aria-label="첨부한 사진 제거"
              onClick={() => {
                setSelectedFile(undefined);
                setErrorMessage('');
              }}
              className="absolute top-[15px] right-[14px] flex size-6 items-center justify-center rounded-[12px] bg-zinc-100 shadow-[0px_1px_6px_0px_rgba(0,0,0,0.25)]"
            >
              <Minus className="h-4 w-4 text-zinc-600" />
            </button>
          )}
        </div>

        {errorMessage && (
          <p className="mt-2 text-xs font-medium text-red-500">
            {errorMessage}
          </p>
        )}
      </div>

      <div className="px-5 pt-[15px]">
        <div className="flex items-center gap-1">
          <AppButton
            className="flex-1 border border-zinc-400 bg-white text-zinc-800"
            onClick={() => cameraInputRef.current?.click()}
          >
            <span className="flex items-center justify-center gap-2">
              <Camera className="h-[17px] w-[17px]" />
              <span>카메라</span>
            </span>
          </AppButton>

          <AppButton
            className="flex-1 border border-zinc-400 bg-white text-zinc-800"
            onClick={() => galleryInputRef.current?.click()}
          >
            <span className="flex items-center justify-center gap-2">
              <Images className="h-[17px] w-[17px]" />
              <span>갤러리</span>
            </span>
          </AppButton>
        </div>
      </div>

      <div className="p-5">
        <AppButton
          className="bg-black text-white"
          onClick={() => onConfirmComplete?.(selectedFile)}
          disabled={isSubmitting}
        >
          {selectedFile ? '등록 하기' : '완료 하기'}
        </AppButton>
      </div>

      <input
        ref={cameraInputRef}
        type="file"
        accept={IMAGE_ACCEPT}
        capture="environment"
        className="hidden"
        onChange={(event) => handleSelectImage(event.target.files?.[0])}
      />

      <input
        ref={galleryInputRef}
        type="file"
        accept={IMAGE_ACCEPT}
        className="hidden"
        onChange={(event) => handleSelectImage(event.target.files?.[0])}
      />
    </BottomSheet>
  );
};

export default TodoCompleteSheet;
