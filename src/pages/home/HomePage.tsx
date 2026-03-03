import HomeMembersSection from '@/pages/home/components/HomeMembersSection';
import HomeMottoSection from '@/pages/home/components/HomeMottoSection';

const HomePage = () => {
  const motto = '깨끗하게 살자!';
  const members = [
    { name: '짱구', id: '1' },
    { name: '철수', id: '2' },
    { name: '유리', id: '3' },
    { name: '맹구', id: '4' },
  ];

  return (
    <div className="space-y-2 px-4">
      <HomeMottoSection motto={motto} />
      <HomeMembersSection members={members} />
    </div>
  );
};

export default HomePage;
