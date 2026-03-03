import HomeMembersSection from '@/pages/home/components/HomeMembersSection';
import HomeMottoSection from '@/pages/home/components/HomeMottoSection';

const HomePage = () => {
  const motto = '깨끗하게 살자!';
  const members = [
    { id: '1', name: '김민준' },
    { id: '2', name: '이서연' },
    { id: '3', name: '박지훈' },
    { id: '4', name: '최유진' },
    { id: '5', name: '한지민' },
    { id: '6', name: '정도윤' },
  ];

  return (
    <div className="space-y-2 px-4">
      <HomeMottoSection motto={motto} />
      <HomeMembersSection members={members} />
    </div>
  );
};

export default HomePage;
