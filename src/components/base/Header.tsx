'use client'

import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

import { FC, useState } from 'react'
import { BiLogIn, BiLogOut } from 'react-icons/bi'

import { useRecoilState } from 'recoil'
import { LoginModal } from '../ui/Modal/LoginModal'
import { showFoodModalAtom } from '@/recoil/atoms/showLoginModalAtom';

const navigation = [
  { name: 'Docs', href: '/' },
  { name: 'Todos', href: '/' },
  { name: 'Report', href: '/' },
]

export const Header: FC = () => {
  const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false)
  const [ showFoodModal, setShowFoodModal ] = useRecoilState(showFoodModalAtom);
  const { data: session, status } = useSession();

  const openModal = () => {
    setShowFoodModal(true);
  };

  return (
    <>
      <header className='bg-gray-900'>
        <nav
          className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
          aria-label='Global'
        >
          <div className='flex lg:flex-1'>
            <Link href='#' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Your Company</span>
            </Link>
          </div>
          <div className='flex lg:hidden'>
            <button
              type='button'
              className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400'
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className='sr-only'>Open main menu</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='hidden lg:flex lg:gap-x-12'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className='text-sm font-semibold leading-6 text-white'
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
              {status !== 'authenticated' ? (
                <div
                  className='text-sm font-semibold leading-6 text-white cursor-pointer flex items-center'
                  onClick={openModal}
                >
                  ログイン <BiLogIn className='ml-2'/>
                </div>
                ) : (
                <div
                  className='text-sm font-semibold leading-6 text-white cursor-pointer flex items-center'
                  onClick={() => signOut()}
                >
                  ログアウト <BiLogOut className='ml-2' />
                </div>
              )}
          </div>
        </nav>
        <Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className='fixed inset-0 z-10' />
          <Dialog.Panel className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10'>
            <div className='flex items-center justify-between'>
              <Link href='/test' className='-m-1.5 p-1.5'>
                <span className='sr-only'>Your Company</span>
                <Image
                  src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                  alt=''
                  width={8}
                />
              </Link>
              <button
                type='button'
                className='-m-2.5 rounded-md p-2.5 text-gray-400'
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className='sr-only'>Close menu</span>
                <XMarkIcon className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
            <div className='mt-6 flow-root'>
              <div className='-my-6 divide-y divide-gray-500/25'>
                <div className='space-y-2 py-6'>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800'
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className='py-6'>
                  <div
                    className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800'
                    onClick={openModal}
                  >
                    Log in
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <LoginModal open={showFoodModal} setOpen={setShowFoodModal} />
    </>

  )
}
