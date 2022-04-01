import {Fragment, useEffect, useState} from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const DropDown = (props) => {
    const { options, selectedOption, handleClick} = props
    return (
        <Menu as="div" className="z-50 relative inline-block text-left">
            <div>
                <Menu.Button data-testid="menu-button" className="inline-flex justify-center w-auto rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    {selectedOption}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right overflow-scroll h-auto max-h-20 relative right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {
                            options.map((option)=>{
                                return(
                                    <Menu.Item onClick={handleClick} name={option.id}>
                                        {({ active }) => (
                                            <a href="#" className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                            >
                                                {option.name}
                                            </a>
                                        )}
                                    </Menu.Item>
                                )
                            })
                        }
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default DropDown
