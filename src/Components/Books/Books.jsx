/** @format */

import axios from "axios";
import React, { useEffect, useState, Fragment } from "react";
import _ from "lodash";
import PopUp from "../Fileds/PopUp";
import AddBook from "./AddBooks/AddBook";
import TextInput from "../Fileds/TextInput";
import { ClockIcon, FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import Datepicker from "react-tailwindcss-datepicker";
import { Popover, Transition, Menu } from "@headlessui/react";
import WhiteButton from "../Fileds/WhiteButton";
import { useNavigate } from "react-router-dom";
import classNames, { storedToken } from "../Helper";
import { useDispatch } from "react-redux";
import { setCurrentByName } from "../../store/Slices/NavigationSlice";
import { deleteById, editRoute, getRoute } from "../../UseApi";
import { CheckCircleIcon, CheckIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { BiBookmarkPlus } from "react-icons/bi";
import { CiAlarmOn } from "react-icons/ci";
export default function Books({ oldbooks = [], searchAuthor = "", isAuthor }) {
  const navigate = useNavigate();
  const [books, setBooks] = useState(oldbooks);
  const [searchOptions, setSearchOptions] = useState({
    title: "",
    author: searchAuthor,
    dateOptions: {
      startDate: "",
      endDate: "",
    },
  });
  const [isBookAdd, setIsBookAdd] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const [authorOptions, setAuthorOptions] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [dateRange, setDateRange] = useState(false);
  useEffect(() => {
    getData();
  }, [isBookAdd]);

  function getData() {
    const data = getRoute("/api/book", searchOptions).then((res) => {
      if (res.data) {
        setBooks(res.data.books);
        setAuthorOptions(res.data.searchOptions);
        setErrors({});
      } else {
        setErrors(res.errors)
      }
    });
  }

  function deleteBook(id) {
    const data = deleteById(`/api/book/${id}`).then(res => {
      if (res.data) {
        setErrors({});
        getData();
      } else {
        setErrors(res.errors);
      }
    })
  }

  function editBook(id, book) {
    const data = editRoute(`/api/book/${id}`, book).then(res => {
      if (res.data) {
        getData();
        setIsBookAdd(false);
      } else {
        setErrors(res.errors);
      }
    })
  }

  function changeBookFilter(id, book) {
    const data = editRoute(`/api/book/isfilter/${id}`, book).then(res => {
      if (res.data) {
        getData();
        setIsBookAdd(false);
      } else {
        setErrors(res.errors);
      }
    })
  }

  function onClose() {
    setIsBookAdd((pre) => !pre);
    setIsEdit(false);
  }

  return (
    <div className="bg-white dark:bg-gray-800">
      {!isAuthor && (
        <>
          <div className="flex items-center px-8 justify-between">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                getData();
              }}
              className="flex items-center w-3/4 px-8 mx-auto space-x-2 "
            >
              <div>
                <Popover className="relative top-1">
                  <Popover.Button>
                    <FunnelIcon className="w-6 h-6 text-gray-900 dark:text-white" />
                  </Popover.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Popover.Panel className="absolute z-10 mt-2">
                      {({ close }) => (
                        <div className="flex flex-col p-2 text-base font-medium text-gray-400 bg-white border border-gray-300 dark:border-gray-500  rounded-lg dark:bg-gray-800 w-44 dark:text-white">
                          <div
                            onClick={() => {
                              setDateRange(true);
                              close();
                            }}
                            className="cursor-pointer"
                          >
                            By the Range
                          </div>
                          <div
                            onClick={() => {
                              setDateRange(false);
                              close();
                            }}
                            className="cursor-pointer"
                          >
                            By the SingleDate
                          </div>
                        </div>
                      )}
                    </Popover.Panel>
                  </Transition>
                </Popover>
              </div>

                <Datepicker
                  useRange={dateRange}
                  primaryColor="blue"
                  asSingle={!dateRange}
                  inputClassName="border border-gray-500 dark:border-gray-500 w-full py-1.5 text-opacity-80 pr-10 px-2 rounded-lg dark:bg-gray-800 dark:text-white"
                  value={searchOptions?.dateOptions}
                  onChange={(date) => {
                    setSearchOptions((pre) => ({
                      ...pre,
                      dateOptions: date,
                    }));
                  }}
                />
              <div className="relative pt-2 text-gray-600 grow">
                <TextInput
                  value={searchOptions?.title}
                  handleChange={(e) =>
                    setSearchOptions((pre) => ({
                      ...pre,
                      title: e.target.value,
                    }))
                  }
                  className="h-10 px-5 pr-16 border-gray-300 rounded-lg dark:text-white dark:border-gray-500 dark:bg-gray-800 border-1 focus:outline-none"
                  type="search"
                  placeholder="Search"
                />
                <button
                  type="submit"
                  className="absolute top-0 right-0 mt-5 mr-4"
                >
                  <MagnifyingGlassIcon
                    onClick={(e) => {
                      getData();
                    }}
                    className="w-5 h-5 dark:text-white dark:opacity-80"
                  />
                </button>
              </div>
            </form>
            <PopUp
                title={
                  <p className="text-base text-gray-500 font-semibold border-gray-300 border px-3 py-1.5 rounded-md  dark:text-white">
                  Add Book
                </p>
                }
                setIsOpen={onClose}
                isOpen={isBookAdd}
              >
                <AddBook
                  bookErrors={errors}
                  onClose={onClose}
                  isBookAdd={isBookAdd}
                  editBook={editBook}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                  selectedBook={selectedBook}
                  authorOptions={authorOptions}
                />
              </PopUp>
          </div>
        </>
      )}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 text-gray-900 bg-white p-4 w-full dark:bg-gray-800 dark:text-white">
        {books?.map((book, index) => (
          <div key={index} className='border-2 dark:border dark:border-gray-500 space-y-2 bg-white dark:bg-gray-800 rounded-md'>
            <div className='flex items-center justify-between px-5 pt-5'>
              <div className="font-semibold capitalize">{book?.title}</div>
              <div className='cursor-pointer'>
                <Menu as="div" className="relative ">
                  <div>
                    <Menu.Button className="relative flex text-sm rounded-full focus:outline-none">
                      <EllipsisHorizontalIcon className="h-6 w-6" aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-500"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >

                    <Menu.Items className="absolute right-0 z-10 w-48 py-1 origin-top-right bg-white rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        <div
                          className={classNames(
                            "block px-4 py-2 text-sm text-gray-900 font-semibold"
                          )}
                          onClick={() => {
                            if (book?.book) {
                              navigate("/readbook", { state: { bookData: book?.book } });
                              dispatch(setCurrentByName("Start..."));
                            }
                          }}
                        >
                          Read
                        </div>
                      </Menu.Item>
                      <Menu.Item>
                        <div
                          className={classNames(
                            "block px-4 py-2 text-sm text-gray-900 font-semibold"
                          )}
                          onClick={() => {
                            setIsBookAdd(true);
                            setIsEdit(true);
                            setSelectedBook(book);
                          }}
                        >
                          Edit
                        </div>
                      </Menu.Item>
                      <Menu.Item>
                        <div
                          className={classNames(
                            "block px-4 py-2 text-sm text-gray-900 font-semibold"
                          )}
                          onClick={() => {
                            deleteBook(book?._id);
                          }}
                        >
                          Delete
                        </div>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
            <div className='h-68 px-4 border-1  dark:border-0  '>
              <img
                className="object-fill h-[350px] border dark:border-0 rounded-lg"
                src={`http://localhost:8000/${book?.coverImage}`}
                alt={book?.title}
              />
              {/* <ClockIcon className="w-5 h-5 " /> */}
            </div>
            <div className='gap-x-4 w-full flex py-3'>
              <div onClick={() => changeBookFilter(book?._id, { inWatchList: book?.inWatchList, isComplete: !book?.isComplete })} className="capitalize text-lg items-center justify-center px-5 cursor-pointer flex">
                <span>
                  {book?.isComplete ? "Completed" : "Remaining"} {book?.isComplete ? <CheckCircleIcon className='h-10 w-10 text-green-400 inline' /> : <ClockIcon className='h-10 w-10 text-red-400 inline' />}
                </span>
              </div>
              <div onClick={() => changeBookFilter(book?._id, { inWatchList: !book?.inWatchList, isComplete: book?.isComplete })} className="capitalize text-lg items-center justify-center cursor-pointer flex">
                <span>
                  {book?.inWatchList ? "Add To" : "Remove From"}   {book?.inWatchList ? <BiBookmarkPlus className="h-10 w-10 text-blue-500 inline" /> : <BookmarkIcon className="h-10 w-10 text-blue-500 inline" />}
                </span>
              </div>
            </div>
          </div>

          // <div
          //   key={index}
          //   className="relative block p-3 overflow-hidden bg-center bg-cover rounded-lg shadow-lg h-96 dark:bg-neutral-700"
          //   style={{
          //     backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(http://localhost:8000/${book?.coverImage})`,
          //   }}
          // >
          //   <h5 className=" text-xl flex justify-between font-medium leading-tight text-white capitalize dark:opacity-75 dark:text-neutral-50">
          //     {book?.title}
          //     <Menu as="div" className="relative ">
          //       <div>
          //         <Menu.Button className="relative flex text-sm rounded-full focus:outline-none">
          //           <EllipsisHorizontalIcon className="h-6 w-6" aria-hidden="true" />
          //         </Menu.Button>
          //       </div>
          //       <Transition
          //         as={Fragment}
          //         enter="transition ease-out duration-500"
          //         enterFrom="transform opacity-0 scale-95"
          //         enterTo="transform opacity-100 scale-100"
          //         leave="transition ease-in duration-75"
          //         leaveFrom="transform opacity-100 scale-100"
          //         leaveTo="transform opacity-0 scale-95"
          //       >

          //         <Menu.Items className="absolute right-0 z-10 w-48 py-1 origin-top-right bg-white rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
          //           <Menu.Item>
          //             <div
          //               className={classNames(
          //                 "block px-4 py-2 text-sm text-gray-900 font-semibold"
          //               )}
          //               onClick={() => {
          //                 if (book?.book) {
          //                   navigate("/readbook", { state: { bookData: book?.book } });
          //                   dispatch(setCurrentByName("Start..."));
          //                 }
          //               }}
          //             >
          //               Read
          //             </div>
          //           </Menu.Item>
          //           <Menu.Item>
          //             <div
          //               className={classNames(
          //                 "block px-4 py-2 text-sm text-gray-900 font-semibold"
          //               )}
          //               onClick={() => {
          //                 setIsBookAdd(true);
          //                 setIsEdit(true);
          //                 setSelectedBook(book);
          //               }}
          //             >
          //               Edit
          //             </div>
          //           </Menu.Item>
          //           <Menu.Item>
          //             <div
          //               className={classNames(
          //                 "block px-4 py-2 text-sm text-gray-900 font-semibold"
          //               )}
          //               onClick={() => {
          //                 deleteBook(book?._id);
          //               }}
          //             >
          //               Delete
          //             </div>
          //           </Menu.Item>
          //         </Menu.Items>
          //       </Transition>
          //     </Menu>
          //   </h5>
          //   <div className="absolute  w-full bottom-2 flex right-2">
          //     <div onClick={() => changeBookFilter(book?._id, { inWatchList: book?.inWatchList, isComplete: !book?.isComplete })} className="capitalize text-white text-lg items-center justify-center px-5 cursor-pointer flex">
          //       <span>
          //         {book?.isComplete ? "Completed" : "Remaining"} {book?.isComplete ? <CheckCircleIcon className='h-10 w-10 text-green-400 inline' /> : <ClockIcon className='h-10 w-10 text-red-400 inline' />}
          //       </span>
          //     </div>
          //     <div onClick={() => changeBookFilter(book?._id, { inWatchList: !book?.inWatchList, isComplete: book?.isComplete })} className="capitalize text-white text-lg items-center justify-center cursor-pointer flex">
          //       <span>
          //         {book?.inWatchList ? "Add To" : "Remove From"}   {book?.inWatchList ? <BiBookmarkPlus className="h-10 w-10 text-blue-500 inline" /> : <BookmarkIcon className="h-10 w-10 text-blue-500 inline" />}
          //       </span>
          //     </div>
          //   </div>
          // </div>
        ))}
      </div>
    </div>
  );
}
