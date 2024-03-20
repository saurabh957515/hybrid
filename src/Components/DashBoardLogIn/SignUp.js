import React, { useState } from "react";
import TextInput from "../Fileds/TextInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function SignUp() {
  const [data, setData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
  });
  const Navigate = useNavigate();
  // /dashboard
  const sigingUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/signup", data);
      localStorage.setItem("token", response?.data?.token);
      toast.success(response?.data?.message);
      setTimeout(() => {
        Navigate("/");
      }, [1500]);u
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full h-screen sm:flex divi">
      <div className="flex justify-center my-auto sm:w-1/2 ">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="w-full"
          alt="Sample image"
        />
      </div>
      <div className="justify-center px-8 my-auto sm:w-1/2 ">
        <form onSubmit={sigingUp}>
          <div className="mb-8 text-lg font-semibold">
            Register YourSelf to get Benifits of Reading.....
          </div>
          <div>
            <label>Name</label>
            <TextInput
              handleChange={(e) => setData({ ...data, name: e.target.value })}
              value={data?.name}
            />
          </div>
          <div>
            <label>Email</label>
            <TextInput
              type="email"
              handleChange={(e) => setData({ ...data, email: e.target.value })}
              value={data?.email}
            />
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

          <button
            type="submit"
            to="/dashboard"
            className="inline-flex items-center w-full px-4 py-2 text-xs font-semibold tracking-widest text-center text-white uppercase transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 dark:hover:bg-blue-400 focus:bg-blue-600 dark:focus:bg-white active:bg-blue-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 "
          >
            <div className="w-full ">Register</div>
          </button>
          <div className="flex items-center justify-center w-full py-2">
            Go back to LogIn ?
            <Link to="/" className="ml-1 font-semibold">
              {" "}
              Go Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
