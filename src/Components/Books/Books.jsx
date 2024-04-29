/** @format */

import axios from "axios";
import React, { useEffect, useState, Fragment } from "react";
import _ from "lodash";
import PopUp from "../Fileds/PopUp";
import AddBook from "./AddBooks/AddBook";
import TextInput from "../Fileds/TextInput";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import Datepicker from "react-tailwindcss-datepicker";
import { Popover, Transition, Menu } from "@headlessui/react";
import WhiteButton from "../Fileds/WhiteButton";
import { useNavigate } from "react-router-dom";
import { storedToken } from "../Helper";
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
          <div className="flex items-center justify-between">
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
                    <FunnelIcon className="w-6 h-6 text-gray-300 dark:text-white" />
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
                        <div className="flex flex-col p-2 text-base font-medium text-gray-400 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 w-44 dark:text-white">
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

              <div className="items-center w-full">
                <Datepicker
                  useRange={dateRange}
                  primaryColor="blue"
                  asSingle={!dateRange}
                  inputClassName="border border-gray-500 dark:border-white w-full py-1.5 text-opacity-80 pr-10 px-2 rounded-lg dark:bg-gray-800 dark:text-white"
                  value={searchOptions?.dateOptions}
                  onChange={(date) => {
                    setSearchOptions((pre) => ({
                      ...pre,
                      dateOptions: date,
                    }));
                  }}
                />
              </div>
              <div className="relative pt-2 text-gray-600 grow">
                <TextInput
                  value={searchOptions?.title}
                  handleChange={(e) =>
                    setSearchOptions((pre) => ({
                      ...pre,
                      title: e.target.value,
                    }))
                  }
                  className="h-10 px-5 pr-16 border-gray-300 rounded-lg dark:text-white C dark:border-white dark:bg-gray-800 border-1 focus:outline-none"
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
            <div className="text-right mr-4">
              <PopUp
                title={
                  <WhiteButton className="border-gray-400">
                    <p className="text-base text-gray-900 dark:text-white">
                      Add Book
                    </p>
                  </WhiteButton>
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
          </div>
        </>
      )}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 text-gray-900 bg-white p-4 w-full dark:bg-gray-800 dark:text-white">
        {books?.map((book, index) => (
          <div key={index} className='border-2 space-y-2 bg-white dark:bg-gray-800 rounded-md'>
            <div className='flex items-center justify-between px-5 pt-5'>
              <div className="font-semibold capitalize">{book?.title}</div>
              <div className='cursor-pointer'>
                <Menu as="div" className="dropdown relative">
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
                    <Menu.Items className="dropdown-body l-0 absolute w-28 bg-white shadow rounded-lg space-y-4 p-4">
                      <Menu.Item>
                        <div
                          className="text-sm font-semibold text-latisGray-700 capitalize"
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
                          className="text-sm font-semibold text-latisGray-700 capitalize"
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
                          className="text-sm font-semibold text-latisGray-700 capitalize"
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
            <div className='h-68 px-4 border-1 border-green-500'>
              <img
                className="object-fill h-[350px] border rounded-lg"
                src={`http://localhost:8000/${book?.coverImage}`}
                alt={book?.title}
              />
            </div>
            <div className='gap-x-4 w-full pb-5 flex p-5'>
              <div onClick={() => changeBookFilter(book?._id, { inWatchList: book?.inWatchList, isComplete: !book?.isComplete })} className="flex items-center justify-center cursor-pointer">
                <span>
                  {book?.isComplete ? <CheckCircleIcon className='h-12 w-12 text-green-400' /> : <CiAlarmOn className='h-12 w-12 text-green-400' />}


                </span>
              </div>
              <div onClick={() => changeBookFilter(book?._id, { inWatchList: !book?.inWatchList, isComplete: book?.isComplete })} className="flex items-center justify-center cursor-pointer">
                <span>
                  {book?.inWatchList ? <BiBookmarkPlus className="h-12 w-12 text-blue-500" /> : <BookmarkIcon className="h-12 w-12 text-blue-500" />}
                </span>
              </div>
            </div>
          </div>

          // <div
          //   key={index}
          //   className="relative block max-w-sm p-6 overflow-hidden bg-center bg-cover rounded-lg shadow-lg h-96 dark:bg-neutral-700"
          //   style={{
          //     backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(http://localhost:8000/${book?.coverImage})`,
          //   }}
          // >
          //   <h5 className="absolute text-xl font-medium leading-tight text-white capitalize dark:opacity-75 top-2 left-2 dark:text-neutral-50">
          //     {book?.title}
          //   </h5>
          //   <div className="absolute grid grid-cols-3 gap-2 bottom-2 right-2 ">
          //     <WhiteButton
          // onClick={() => {
          //   if (book?.book) {
          //     navigate("/readbook", { state: { bookData: book?.book } });
          //     dispatch(setCurrentByName("Start..."));
          //   }
          // }}
          //       className="text-sm dark:opacity-75"
          //     >
          //       Read
          //     </WhiteButton>

          //     <WhiteButton
          //       className="text-sm dark:opacity-75"
          // onClick={() => {
          //   setIsBookAdd(true);
          //   setIsEdit(true);
          //   setSelectedBook(book);
          // }}
          //     >
          //       Edit
          //     </WhiteButton>
          //     <WhiteButton
          //       className="text-sm dark:opacity-75"
          // onClick={() => {
          //   deleteBook(book?._id)
          // }}
          //     >
          //       Delete
          //     </WhiteButton>
          //   </div>
          // </div>
        ))}
      </div>
    </div>
  );
}
