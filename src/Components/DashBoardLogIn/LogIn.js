import React, { useState } from "react";
import TextInput from "../Fileds/TextInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function LogIn() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const Navigate=useNavigate()
  // /dashboard
  const logIn = async (e) => {
    e.preventDefault();
    const postData = await axios.post("/auth/login", data);
    toast.success(postData?.data?.message);
    setTimeout(()=>{
      Navigate("/dashboard")
    },[1500])
  };

  return (
    <div className="flex w-full h-screen divi">
      <div className="flex justify-center w-1/2 my-auto ">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="w-full"
          alt="Sample image"
        />
      </div>
      <div className="justify-center w-1/2 px-8 my-auto ">
        <form onSubmit={logIn}>
          <div className="mb-8 text-lg font-semibold">
            Start LogIn And Enjoy Reading.....
          </div>
          <div>
            <label>UserName</label>
            <TextInput
              handleChange={(e) =>
                setData({ ...data, username: e.target.value })
              }
              value={data?.username}
            />
          </div>
          <div>
            <label>Password</label>
            <TextInput
              handleChange={(e) =>
                setData({ ...data, password: e.target.value })
              }
              value={data?.password}
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                className="w-8 h-5 rounded-lg"
                type="checkbox"
                value=""
                id="exampleCheck2"
              />
              <label
                className="inline-block ps-[0.15rem] hover:cursor-pointer"
                htmlFor="exampleCheck2"
              >
                Remember me
              </label>
            </div>

            <Link to="resetpassword" className="font-semibold">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            to="/dashboard"
            className="inline-flex items-center w-full px-4 py-2 text-xs font-semibold tracking-widest text-center text-white uppercase transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 dark:hover:bg-blue-400 focus:bg-blue-600 dark:focus:bg-white active:bg-blue-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 "
          >
            <div className="w-full ">LogIn</div>
          </button>
          <div className="flex items-center justify-center w-full py-2">
            Don't have an Accont ?
            <Link to="/signup" className="ml-1 font-semibold">
              {" "}
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
