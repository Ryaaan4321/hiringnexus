// components/Header.tsx
import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

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
      <div className="container flex ">
        <span className=" text-slate-950 md:text-8xl   sm:text-4xl sm:whitespace-nowrap sm:overflow-hidden sm:text-ellipsis iphone_se">Fccsss Fccsss</span>
      </div>
      
      {/* Middle section - Navigation */}
      <nav className="flex gap-8">
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
          Customers
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
      <div className="relative border-black">
        <input
          type="text"
          placeholder="Search..."
          className="pl-3 pr-8 py-2 text-sm border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 w-48"
        />
        {/* <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 absolute right-2.5 top-2.5" /> */}
      </div>
    </header>
  );
}