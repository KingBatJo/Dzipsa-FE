import type { Member } from '@/types/member';
import type { Todo } from '@/types/todo';

export const PROFILE_IMAGE = 'https://github.com/shadcn.png'; // 임시

export const mockMembers: Member[] = [
  { id: '1', name: '김민준', profileImage: PROFILE_IMAGE },
  {
    id: '2',
    name: '이서연',
    profileImage: 'https://github.com/sindresorhus.png',
  },
  {
    id: '3',
    name: '박지훈',
    profileImage: 'https://api.dicebear.com/7.x/personas/svg?seed=Kim',
  },
  {
    id: '4',
    name: '최유진',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  },
  // { id: '5', name: '한지민', profileImage: PROFILE_IMAGE },
  // { id: '6', name: '정도윤', profileImage: PROFILE_IMAGE },
];

export const mockTodoList: Todo[] = [
  {
    id: '1',
    title: '주방 가전용품 청소',
    dueDate: '2026-03-05T09:00:00',
    assigneeId: '1',
    memo: '전자레인지 안쪽까지 청소',
  },
  {
    id: '2',
    title: '화장실 청소',
    dueDate: '2026-03-05T15:00:00',
    assigneeId: '1',
    memo: '',
  },
  {
    id: '3',
    title: '할 일이 어마어마어마어마어마어마어마어마하게 많아요',
    dueDate: '2026-03-05T18:00:00',
    assigneeId: '1',
    memo: '',
  },
];
