import { useEffect, useState } from 'react';

import RoundedBadge from '@/components/common/RoundedBadge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import level1Image from '@/assets/image/home/level-1.png';
import level2Image from '@/assets/image/home/level-2.png';
import level3Image from '@/assets/image/home/level-3.png';
import level4Image from '@/assets/image/home/level-4.png';
import level5Image from '@/assets/image/home/level-5.png';

type DashboardSectionProps = {
  score: number;
  delayTaskCount: number;
  ruleWarningCount: number;
  isLoading?: boolean;
};

type HouseLevel = 1 | 2 | 3 | 4 | 5;

type HouseLevelInfo = {
  imageSrc: string;
  message: string;
};

const LOADED_LEVEL_IMAGE_SRC = new Set<string>();

const HOUSE_LEVEL_INFO: Record<HouseLevel, HouseLevelInfo> = {
  1: {
    imageSrc: level1Image,
    message:
      '깜빡한 약속들이 모여 먼지가 집보다 커졌어요!\n어서 힘을 모아 다시 반짝이는 정원을\n되찾아주세요.',
  },
  2: {
    imageSrc: level2Image,
    message:
      '먼지가 의욕을 잃고 거미줄에 쌓였어요.\n덩치가 더 커지기 전에 우리집의 규칙을\n한번 더 확인할까요?',
  },
  3: {
    imageSrc: level3Image,
    message: '화목한 우리집이에요!\n서로를 배려하는 따스한 마음이 전해지네요',
  },
  4: {
    imageSrc: level4Image,
    message:
      '먼지 이웃들도 놀러 왔어요!\n이 반짝이는 정원을 계속 유지해 볼까요?',
  },
  5: {
    imageSrc: level5Image,
    message: '화목한 우리집이에요!\n서로를 배려하는 따스한 마음이 전해지네요',
  },
};

const getLevelByScore = (score: number): HouseLevel => {
  if (score >= 4.5) return 5;
  if (score >= 3.5) return 4;
  if (score >= 2.5) return 3;
  if (score >= 1.5) return 2;
  return 1;
};

type HouseStatusCardProps = {
  score: number;
  delayTaskCount: number;
  ruleWarningCount: number;
  isLoading: boolean;
};

const HouseStatusCard = ({
  score,
  delayTaskCount,
  ruleWarningCount,
  isLoading,
}: HouseStatusCardProps) => {
  const level = getLevelByScore(score);
  const levelInfo = HOUSE_LEVEL_INFO[level];
  const [isImageLoaded, setIsImageLoaded] = useState(
    LOADED_LEVEL_IMAGE_SRC.has(levelInfo.imageSrc)
  );
  const shouldShowImageSkeleton = isLoading || !isImageLoaded;

  useEffect(() => {
    if (LOADED_LEVEL_IMAGE_SRC.has(levelInfo.imageSrc)) {
      setIsImageLoaded(true);
      return;
    }

    setIsImageLoaded(false);

    const image = new Image();
    image.src = levelInfo.imageSrc;
    image.onload = () => {
      LOADED_LEVEL_IMAGE_SRC.add(levelInfo.imageSrc);
      setIsImageLoaded(true);
    };
    image.onerror = () => setIsImageLoaded(true);
  }, [levelInfo.imageSrc]);

  return (
    <div className="relative aspect-345/365 w-full overflow-hidden rounded-[24px]">
      {shouldShowImageSkeleton && (
        <Skeleton className="absolute inset-0 z-3 rounded-[24px] bg-zinc-300/70" />
      )}

      <img
        src={levelInfo.imageSrc}
        alt={`우리집 ${level}단계 이미지`}
        className={cn(
          'h-full w-full object-contain transition-opacity duration-200',
          shouldShowImageSkeleton ? 'opacity-0' : 'opacity-100'
        )}
        draggable={false}
        onLoad={() => {
          LOADED_LEVEL_IMAGE_SRC.add(levelInfo.imageSrc);
          setIsImageLoaded(true);
        }}
      />

      <div
        className={cn(
          'absolute inset-0 z-[2] flex flex-col gap-2 p-5 transition-opacity duration-200',
          isImageLoaded ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div className="flex gap-2">
          {isLoading ? (
            <>
              <Skeleton className="h-[22px] w-20 rounded-[8px] bg-black/15" />
              <Skeleton className="h-[22px] w-20 rounded-[8px] bg-black/15" />
            </>
          ) : (
            <>
              <RoundedBadge className="bg-[rgba(45,0,0,0.2)] font-bold text-white">
                놓친 할 일 {delayTaskCount}건
              </RoundedBadge>
              <RoundedBadge className="bg-[rgba(45,0,0,0.2)] font-bold text-white">
                놓친 규칙 {ruleWarningCount}건
              </RoundedBadge>
            </>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-6 w-[72%] bg-black/15" />
            <Skeleton className="h-6 w-[68%] bg-black/15" />
          </div>
        ) : (
          <p
            className={cn(
              'text-base font-bold break-keep whitespace-pre-line',
              level <= 2 ? 'text-zinc-200' : 'text-zinc-800'
            )}
          >
            {levelInfo.message}
          </p>
        )}
      </div>
    </div>
  );
};

const DashboardSection = ({
  score,
  delayTaskCount,
  ruleWarningCount,
  isLoading = false,
}: DashboardSectionProps) => {
  return (
    <section className="p-[15px]">
      <HouseStatusCard
        score={score}
        delayTaskCount={delayTaskCount}
        ruleWarningCount={ruleWarningCount}
        isLoading={isLoading}
      />
    </section>
  );
};

export default DashboardSection;
