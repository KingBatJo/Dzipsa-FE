import AppButton from '@/components/common/AppButton';

type SectionActionButtonsProps = {
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
  isCollapsed: boolean;
  canToggleCollapse: boolean;
  onToggleCollapse: () => void;
  loadMoreLabel?: string;
  loadingLabel?: string;
  collapseLabel?: string;
};

const SectionActionButtons = ({
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  isCollapsed,
  canToggleCollapse,
  onToggleCollapse,
  loadMoreLabel = '더보기',
  loadingLabel = '불러오는 중...',
  collapseLabel = '접기',
}: SectionActionButtonsProps) => {
  const showLoadMore =
    isCollapsed || Boolean(hasNextPage) || isFetchingNextPage;
  const showCollapse = canToggleCollapse && !isCollapsed;

  if (!showLoadMore && !showCollapse) return null;

  return (
    <div className="mt-1 flex items-center justify-end gap-2">
      {showLoadMore && (
        <AppButton
          className="h-10 rounded-[10px] border border-zinc-200 bg-white px-4 hover:border-zinc-300 hover:bg-zinc-200 active:border-zinc-400 active:bg-zinc-300"
          onClick={onLoadMore}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? loadingLabel : loadMoreLabel}
        </AppButton>
      )}

      {showCollapse && (
        <AppButton
          className="h-10 rounded-[10px] border border-zinc-200 bg-white px-4 hover:border-zinc-300 hover:bg-zinc-200 active:border-zinc-400 active:bg-zinc-300"
          onClick={onToggleCollapse}
        >
          {collapseLabel}
        </AppButton>
      )}
    </div>
  );
};

export default SectionActionButtons;
