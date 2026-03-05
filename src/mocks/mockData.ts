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
  // 오늘
  {
    id: 't1',
    title: '주방 가전용품 청소',
    dueAt: '2026-03-06T09:00:00',
    assigneeId: '1',
    memo: '전자레인지 안쪽까지 청소',
    completed: true,
  },
  {
    id: 't2',
    title: '분리수거',
    dueAt: '2026-03-06T10:30:00',
    assigneeId: '2',
    memo: '플라스틱/캔 분리',
    completed: true,
  },
  {
    id: 't3',
    title: '화장실 청소',
    dueAt: '2026-03-06T15:00:00',
    assigneeId: '3',
    memo: '',
    completed: false,
  },
  {
    id: 't4',
    title: '거실 바닥 물걸레',
    dueAt: '2026-03-06T18:00:00',
    assigneeId: '4',
    memo: '',
    completed: true,
  },

  // 예정
  {
    id: 't5',
    title: '식자재 장보기',
    dueAt: '2026-03-07T19:00:00',
    assigneeId: '1',
    memo: '우유/계란/과일',
    completed: false,
  },
  {
    id: 't6',
    title: '세탁기 필터 청소',
    dueAt: '2026-03-08T11:00:00',
    assigneeId: '2',
    memo: '',
    completed: false,
  },

  // 지난 (놓친 할 일)
  {
    id: 't7',
    title: '현관 신발 정리',
    dueAt: '2026-03-04T19:00:00',
    assigneeId: '3',
    memo: '',
    completed: false,
  },
  {
    id: 't8',
    title: '화분에 물 주기',
    dueAt: '2026-03-05T10:00:00',
    assigneeId: '1',
    memo: '',
    completed: false,
  },
];
