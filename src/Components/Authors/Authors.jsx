/** @format */

import React, { useEffect, useState, useRef } from "react";
import PopUp from "../Fileds/PopUp";
import TextInput from "../Fileds/TextInput";
import PrimaryButton from "../Fileds/PrimaryButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import WhiteButton from "../Fileds/WhiteButton";
import classNames from "../Helper";
import { deleteById, editRoute, getRoute, postRoute } from "../../UseApi";
import moment from "moment";

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState();
  const [error, setError] = useState({});
  const [selectedAuthor, setSelectedAuthor] = useState({});
  const [book, setBook] = useState({});
  const [authorName, setAuthorName] = useState("");
  const [openPanel, setOpenPanel] = useState(null);
  const refModel = useRef(null);
  async function onSubmit(e) {
    e.preventDefault();
    if (isEdit) {
      const data = editRoute(`/api/author/${selectedAuthor?._id}`, {
        name: authorName,
      }).then((res) => {
        if (res.data) {
          setIsEdit(false);
          setIsOpen(false);
        }
      });
    } else {
      const data = await postRoute("/api/author", { name: authorName });
      setIsOpen(false);
      toast.success("Author Successfully Saved !", {});
      setAuthorName("");
    }
  }

  function getAuthors() {
    const data = getRoute("/api/author").then((res) => {
      if (res.data) {
        setAuthors(res.data.authors);
      }
    });
  }

  async function deleteAuthor(id) {
    const data = deleteById(`/api/author/${id}`).then((res) => {
      if (res.data) {
        getAuthors();
        setAuthorName("");
        toast.success("Author Deleted !!");
      } else {
        console.log(res.errors);
        setError(res.errors);
      }
    });
  }
  useEffect(() => {
    getAuthors();
  }, [isOpen]);

  const togglePanel = (panel) => {
    if (openPanel) {
      if (
        openPanel.key !== panel.key &&
        openPanel.open
      ) {
        openPanel.close();
      }
    } else if (refModel.current.key !== panel.key) {
      refModel.current.close()
      refModel.current = null
    }
    setOpenPanel({
      ...panel,
      open: !panel.open,
    });
  };
  return (
    <div className="relative h-full ">
      <div className=" w-full h-[80vh] p-5 ">
        <div className="flex items-center justify-between">
          <form className="flex items-center w-3/4 px-8 mx-auto space-x-2 ">
            <div className="relative pt-2 text-gray-600 grow">
              <TextInput
                className="h-10 px-5 pr-16 text-white border-gray-300 rounded-lg C dark:border-gray-500 dark:bg-gray-800 border-1 focus:outline-none"
                type="search"
                placeholder="Search"
              />
              <button
                type="submit"
                className="absolute top-0 right-0 mt-5 mr-4"
              >
                <MagnifyingGlassIcon className="w-5 h-5 dark:text-white dark:opacity-80" />
              </button>
            </div>
          </form>
          <PopUp
            title={
              <p className="text-base text-gray-500 font-semibold border-gray-300 border px-3 py-1.5 rounded-md  dark:text-white">
                Add Author
              </p>
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          >
            <form onSubmit={onSubmit}>
              <label>Name</label>
              <TextInput
                handleChange={(e) => setAuthorName(e.target.value)}
                value={authorName}
              />
              <PrimaryButton>Submit</PrimaryButton>
            </form>
          </PopUp>
        </div>
        <div className="flex flex-col w-full h-full space-y-2.5">
          {authors?.map((author, index) => (
            <Disclosure defaultOpen={index == 0} className="w-full" key={index}>
              {(panel) => {
                if (!index) {
                  refModel.current = { ...panel, key: index };
                }
                return (
                  <>
                    <Disclosure.Button
                      onClick={() => togglePanel({ ...panel, key: index })}
                      as="div"
                    >
                      <div className="px-2 mx-auto text-lg font-medium text-gray-500 dark:border-gray-500 dark:text-white custom-border">
                        <div className="flex justify-between w-full">
                          <span>
                            {index + 1} {author?.name}
                          </span>
                          <div className="flex space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setAuthorName(author?.name);
                                setIsOpen(true);
                                setIsEdit(true);
                                setSelectedAuthor(author);
                              }}
                            >
                              <PencilSquareIcon className="w-6 h-6 text-blue-500" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteAuthor(author?._id);
                              }}
                            >
                              <TrashIcon className="w-6 h-6 text-red-500 " />
                            </button>
                            <button>
                              <ChevronDownIcon
                                className={classNames(
                                  panel.open ? "rotate-180" : "",
                                  "h-5 w-5"
                                )}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="ml-2 text-sm font-semibold text-red-500 capitalize">
                        {error[`${author?.name}`]}
                      </p>
                    </Disclosure.Button>
                    <Disclosure.Panel className="flex w-full bg-white dark:bg-gray-800 dark:border-gray-500">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-500">
                        <thead className="text-gray-900 bg-white dark:bg-gray-800 dark:text-white">
                          <tr>
                            <th
                              scope="col"
                              className="w-12 px-3 py-5 text-sm font-semibold text-left capitalize"
                            >
                              No
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-5 text-sm font-semibold text-left capitalize w-72"
                            >
                              Title
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-5 text-sm font-semibold text-left capitalize w-72"
                            >
                              DateAdded
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-5 text-sm font-semibold text-left capitalize w-52"
                            >
                              Total Pages
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-5 text-sm font-semibold text-left capitalize w-52"
                            >
                              Description
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-5 text-sm font-semibold text-left capitalize w-52"
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-900 divide-y-2 dark:text-white dark:divide-gray-500">
                          {author?.books?.length > 0 ? (
                            author?.books?.map((book, index) => (
                              <tr key={index}>
                                <td
                                  scope="col"
                                  className="w-12 px-3 py-5 text-sm font-normal text-left capitalize"
                                >
                                  {index + 1}
                                </td>
                                <td
                                  scope="col"
                                  className="px-3 py-5 text-sm font-normal text-left capitalize w-72"
                                >
                                  {book?.title}
                                </td>
                                <td
                                  scope="col"
                                  className="px-3 py-5 text-sm font-normal text-left capitalize w-72"
                                >
                                  Title
                                  {moment(book?.publishDate).format(
                                    "dd-mm-yyyy"
                                  )}
                                </td>
                                <td
                                  scope="col"
                                  className="px-3 py-5 text-sm font-normal text-left capitalize w-52"
                                >
                                  {book?.pageCount}
                                </td>
                                <td
                                  scope="col"
                                  className="px-3 py-5 text-sm font-normal text-left capitalize w-52"
                                >
                                  {book?.description}
                                </td>
                                <td
                                  scope="col"
                                  className="px-3 py-5 text-sm font-normal text-left capitalize w-52"
                                >
                                  status
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr className="text-center border-gray-500 dark:border-b">
                              <td className="p-4" colSpan="9">
                                <div className="m-12 text-center">
                                  <h3 className="mt-2 text-sm font-medium">
                                    No Book Found From This Author
                                  </h3>
                                  <p className="mt-1 text-sm text-gray-500">
                                    Please Add A Book To This Author.
                                  </p>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </Disclosure.Panel>
                  </>
                );
              }}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Authors;
