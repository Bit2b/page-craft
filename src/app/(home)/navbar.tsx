import Link from 'next/link';
import Image from 'next/image';
import { UserButton, OrganizationSwitcher } from '@clerk/nextjs'
import { SearchInput } from './searchInput';

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-full w-full">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={36} height={36} />
        </Link>
        <h1 className="text-xl font-semibold font-mono">Page Craft</h1>
      </div>
      <SearchInput />
      <div className="flex items-center gap-3 pl-6">
        <OrganizationSwitcher
          afterCreateOrganizationUrl='/'
          afterLeaveOrganizationUrl='/'
          afterSelectOrganizationUrl='/'
          afterSelectPersonalUrl='/' />
        <UserButton />
      </div>
    </nav>
  );
};