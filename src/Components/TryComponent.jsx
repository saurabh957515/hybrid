import { Menu, Transition } from '@headlessui/react'
import { CheckCircleIcon, CheckIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import React, { Fragment } from 'react'

function TryComponent() {
    return (
        <div className='p-12 bg-gray-200 h-full'>
            <div className=' w-64 bg-white rounded-md p-3'>
                <div className='flex items-center justify-between'>
                    <div>Good Book</div>
                    <div className='cursor-pointer'>  <Menu as="div" className="dropdown relative">
                        <Menu.Button className="dropdown-btn">
                            <span className="sr-only">Open options</span>
                            <EllipsisHorizontalIcon className="h-6 w-6" aria-hidden="true" />
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="dropdown-body l-0 absolute w-28 bg-white  shadow rounded-lg space-y-4 p-4">
                                <Menu.Item>
                                    <div className="text-sm font-semibold text-latisGray-700 capitalize">Read</div>
                                </Menu.Item>
                                <Menu.Item>
                                    <div className="text-sm font-semibold text-latisGray-700 capitalize">Edit</div>
                                </Menu.Item>
                                <Menu.Item>
                                    <div className="text-sm font-semibold text-latisGray-700 capitalize">Delete</div>
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu></div>
                </div>
                <div className='h-60'></div>
                <div className='flex items-center justify-between'>
                    <div>
                        {/* <div className='bg-green-400 rounded-xl p-1'>
                        <CheckIcon className='h-8 w-8 text-bold text-white mx-auto'/>
                        </div> */}
                        <CheckCircleIcon className='h-10 w-10 text-green-400 ' />
                    </div>
                    <div>WatchList</div>
                </div>
            </div>
        </div>
    )
}

export default TryComponent
