import AppContext from '@components/utils/AppContext'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useContext } from 'react'

import MenuItems from './MenuItems'

const Navbar: FC = () => {
  const { currentUser, staffMode } = useContext(AppContext)

  interface NavItemProps {
    url: string
    name: string
    current: boolean
  }

  const NavItem = ({ url, name, current }: NavItemProps) => {
    return (
      <Link href={url} prefetch={false}>
        <a href={url} aria-current={current ? 'page' : undefined}>
          <Disclosure.Button
            className={clsx(
              'w-full text-left px-2 md:px-3 py-1 rounded-md font-black cursor-pointer text-sm tracking-wide',
              {
                'text-black dark:text-white bg-gray-200 dark:bg-gray-800':
                  current,
                'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800':
                  !current
              }
            )}
          >
            {name}
          </Disclosure.Button>
        </a>
      </Link>
    )
  }

  const NavItems = () => {
    const { pathname } = useRouter()

    return (
      <>
        <NavItem
          url="/projects"
          name="Top Reviews"
          current={pathname == '/projects'}
        />
        <NavItem
          url="/create/profile"
          name="Create Profile"
          current={pathname == '/create/profile'}
        />
      </>
    )
  }

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-10 w-full bg-white border-b dark:bg-gray-900 dark:border-b-gray-700/80"
    >
      {({ open }) => (
        <>
          <div className="container px-5 mx-auto max-w-screen-xl">
            <div className="flex relative justify-between items-center h-14 sm:h-16">
              <div className="flex justify-start items-center">
                <Disclosure.Button className="inline-flex justify-center items-center mr-4 text-gray-500 rounded-md sm:hidden focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
                <Link href="/" prefetch={false}>
                  <a href="/">
                    <div className="text-3xl font-black">
                      <img
                        className="w-8"
                        width={20}
                        src={
                          'https://raw.githubusercontent.com/callmediddy/OneReview/main/assets/logo_solo.png'
                        }
                      />
                    </div>
                  </a>
                </Link>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex items-center space-x-4">
                    <NavItems />
                  </div>
                </div>
              </div>
              <div className="flex gap-8 items-center">
                <MenuItems />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="flex flex-col p-3 space-y-2">
              <NavItems />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
