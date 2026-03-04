import type { Member } from '@/types/member';
import MembersSection from '@/pages/home/components/MembersSection';
import MottoSection from '@/pages/home/components/MottoSection';

const PROFILE_IMAGE = 'https://github.com/shadcn.png'; // 임시

const HomePage = () => {
  const motto = '깨끗하게 살자!';
  const mockMembers: Member[] = [
    { id: '1', name: '김민준', profileImage: PROFILE_IMAGE },
    { id: '2', name: '이서연', profileImage: PROFILE_IMAGE },
    { id: '3', name: '박지훈', profileImage: PROFILE_IMAGE },
    { id: '4', name: '최유진', profileImage: PROFILE_IMAGE },
    // { id: '5', name: '한지민', profileImage: PROFILE_IMAGE },
    // { id: '6', name: '정도윤', profileImage: PROFILE_IMAGE },
  ];

  return (
    <div className="space-y-2 px-4">
      <MottoSection motto={motto} />
      <MembersSection members={mockMembers} />
    </div>
  );
};

export default HomePage;
