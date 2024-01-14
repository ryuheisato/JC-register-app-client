import Link from 'next/link';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (...pathSegments: string[]) => {
    if (router.query.semesterId) {
      const basePath = `/semesters/${router.query.semesterId}`;
      const fullPath = [basePath, ...pathSegments].join('/');
      router.push(fullPath);
    }
  };

  const isSpecifiedRoute = (): boolean => {
    const specifiedRoutes = ['/', '/semesters'];
    return specifiedRoutes.includes(router.pathname);
  };

  return (
    <header className='text-slate-700 body-font border-b-2 border-b-slate-500'>
      <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
        <Link
          href='/'
          className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'
        >
          <span className='ml-4 font-bold text-2xl italic'>
            {isSpecifiedRoute() ? 'ジャパチャプ！' : 'Winter 2023'}
          </span>
        </Link>
        {!isSpecifiedRoute() && (
          <nav className='md:ml-auto flex flex-wrap items-center text-base justify-center'>
            <Link href='/semesters' className='mr-5 hover:text-gray-900'>
              セメスター選択
            </Link>
            <button
              className='mr-5 hover:text-gray-900'
              onClick={() => handleNavigation('members')}
            >
              メンバー一覧
            </button>
            <button
              onClick={() => handleNavigation('members', 'register')}
              className='mr-5 hover:text-gray-900'
            >
              メンバー登録
            </button>
            <button
              onClick={() => handleNavigation('events')}
              className='mr-5 hover:text-gray-900'
            >
              イベントリスト
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
