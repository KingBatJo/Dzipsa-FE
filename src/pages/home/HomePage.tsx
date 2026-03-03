import HomeMottoSection from '@/pages/home/components/HomeMottoSection';

const HomePage = () => {
  const motto = '깨끗하게 살자!';

  return (
    <div className="space-y-2 px-4">
      <HomeMottoSection motto={motto} />
    </div>
  );
};

export default HomePage;
