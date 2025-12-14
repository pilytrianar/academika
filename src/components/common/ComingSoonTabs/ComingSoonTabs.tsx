import Image from 'next/image';

const ComingSoonTabs = () => {
  return (
    <div className='flex items-center justify-center'>
      <Image src='/img/coming-soon.svg' alt='Coming soon' width={500} height={500} />
    </div>
  );
};

export default ComingSoonTabs;
