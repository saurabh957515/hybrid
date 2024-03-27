import React, { useState } from "react";
import TextInput from "../Fileds/TextInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function SetPassword() {
  const location = useLocation();
  const { token, user } = location?.state;
  console.log(token, user);
  const [data, setData] = useState({
    password: "",
  });
const Navigate=useNavigate()
  // /dashboard
  const changePassword = async (e) => {
    e.preventDefault()
    const postData = await axios.post(
      `/api/auth/password-reset/${user}/${token}`,
      data
    );
    toast.success(postData?.data.message)
    setTimeout(()=>{
      Navigate("/")
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
        <form onSubmit={changePassword}>
          <div className="mb-8 text-lg font-semibold">
            Start LogIn And Enjoy Reading.....
          </div>
          <div>
            <label>Passsword</label>
            <TextInput
              handleChange={(e) =>
                setData({ ...data, password: e.target.value })
              }
              value={data?.password}
            />
          </div>
          <button
            type="submit"
            to="/dashboard"
            className="inline-flex items-center w-full px-4 py-2 text-xs font-semibold tracking-widest text-center text-white uppercase transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 dark:hover:bg-blue-400 focus:bg-blue-600 dark:focus:bg-white active:bg-blue-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 "
          >
            <div className="w-full ">Reset</div>
          </button>
          <div className="flex items-center justify-center w-full py-2">
            Go back to Login ?
            <Link to="/signup" className="ml-1 font-semibold">
              {" "}
              LogIn
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SetPassword;
