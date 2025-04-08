import Link from 'next/link';
export default function Header() {
  //   const router = useRouter();

  // Determine active tab based on current route
  //   const getActiveTab = () => {
  //     if (router.pathname.includes('/customers')) return 'customers';
  //     if (router.pathname.includes('/products')) return 'products';
  //     if (router.pathname.includes('/settings')) return 'settings';
  //     return 'overview';
  //   };

  //   const activeTab = getActiveTab();

  return (
    <header className=" flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200 font-sans">
      {/* Left section - User name */}
      <div className="container flex">
        <span className=" text-slate-900 md:text-8xl   sm:text-4xl sm:whitespace-nowrap sm:overflow-hidden sm:text-ellipsis iphone_se">HiringNexus</span>
      </div>

      {/* Middle section - Navigation */}
      <nav className="flex gap-8 hideelm">
        <Link
          href="/dashboard"
          className={`transition-colors text-slate-600 text-3xl font-light`}
        >
          Overview
        </Link>
        <Link
          href="/customers"
          className={`transition-colors text-slate-600 text-3xl font-light`}
        >
          Users
        </Link>
        <Link
          href="/products"
          className={`transition-colors text-slate-600 text-3xl font-light`}
        >
          Products
        </Link>
        <Link
          href="/settings"
          className={`transition-colors text-slate-600 text-3xl font-light`}
        >
          Settings
        </Link>
      </nav>

      {/* Right section - Search */}
      <div className="relative border-black hideelm">
        <input
          type="text"
          placeholder="Search..."
          className="pl-3 pr-8 py-2 text-sm border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 w-48"
        />
        {/* <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 absolute right-2.5 top-2.5" /> */}
      </div>
      <div className='flex ml-11 hidehamburger'>
        <svg width="70" height="70" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4.5C2 4.22386 2.22386 4 2.5 4H12.5C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H2.5C2.22386 5 2 4.77614 2 4.5ZM7 7.5C7 7.22386 7.22386 7 7.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H7.5C7.22386 8 7 7.77614 7 7.5ZM4 10.5C4 10.2239 4.22386 10 4.5 10H12.5C12.7761 10 13 10.2239 13 10.5C13 10.7761 12.7761 11 12.5 11H4.5C4.22386 11 4 10.7761 4 10.5Z" fill="currentColor"></path></svg>
      </div>
    </header>
  );
}