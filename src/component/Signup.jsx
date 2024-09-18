import { FaPhoneAlt } from "react-icons/fa";
import { CiMobile3 } from "react-icons/ci";
import { LiaDigitalTachographSolid } from "react-icons/lia";
import { GrMapLocation } from "react-icons/gr";
import { FaCakeCandles } from "react-icons/fa6";
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import SuccessAlert2 from "./alert";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
export default function Signup() {
  const { stroteTokenInLS } = useAuth();
  const navigate = useNavigate();
  const [reado, setReado] = useState("");
  const [dAlert, setDAlert] = useState({
    bodercolor: "border-[#ff0000]",
    txtcolor: "text-[#ff0000]",

    bgcolor: "bg-[#ff0000]",
    icon: "bg-[#0c2e0c]",
    headtitle: "Failed server Error",
    msg: "Please  angain later",
  });

  let name, valiue, pass, passC;
  const [value, setValue] = useState({
    startDate: new Date(),
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setUser({ ...user, DOB: newValue });
  };
  const [autoclose, setAutoclose] = useState(false);
  const [passmatch, setPassmatch] = useState(false);
  const [user, setUser] = useState({
    Fname: "",
    Lname: "",
    Email: "",
    Password: "",
    CPassword: "",
    OTP: "",
  });
  const onChangeInput = (event) => {
    // console.log(event);
    name = event.target.name;
    valiue = event.target.value;
    setUser({
      ...user,
      [name]: valiue,
    });
    console.log(user);
    // execpt password Cpassword and city
  };
  const otpGenerate = async (event) => {
    event.preventDefault();
    try {
      if (user.Email !== "") {
        // setBClr("bg-gray-400 cursor-not-allowed ")
        // setReado("disabled");
        // setTimeout(() => {
        //   // setBClr("bg-blue-500 hover:bg-blue-600")
        //   setReado("");
        // }, 60000);
        //  mobile use change the ip

        // const otpres = await axios.post("http://192.168.1.208:3001/otp", user);
        // pc use
        const otpres = await axios.post(`${import.meta.env.VITE_APP_API_URL}/otp`, user);
        if (otpres.data === "done") {
          setDAlert({
            bodercolor: "border-[#00ff00]",
            txtcolor: "text-[#00ff00]",

            bgcolor: "bg-[#00ff00]",
            icon: "bg-[#0c2e0c]",
            headtitle: "OTP send Successfully ",
            msg: "check your mail box",
          });
          setAutoclose(true);
          setTimeout(() => {
            setAutoclose(false);
          }, 6000);
        }
      } else {
        console.log("email is mt");
        setDAlert({
          bodercolor: "border-[#ffff00]",
          txtcolor: "text-[#ffff00]",

          bgcolor: "bg-[#ffff00]",
          icon: "bg-[#0c2e0c]",
          headtitle: "Enter email",
          msg: "please enter email",
        });
        setAutoclose(true);
        setTimeout(() => {
          setAutoclose(false);
        }, 6000);
        // setTitles('enter Email');
        // setTimeout(() => {

        //   setTitles("");
        // }, 3000);
      }
    } catch (error) {
      setDAlert({
        bodercolor: "border-[#ff0000]",
        txtcolor: "text-[#ff0000]",

        bgcolor: "bg-[#ff0000]",
        icon: "bg-[#0c2e0c]",
        headtitle: "server Error",
        msg: "try again later",
      });
      setAutoclose(true);
      setTimeout(() => {
        setAutoclose(false);
      }, 6000);
      console.log(error + " otpgenerate api from signin page");
    }
  };

  const matchpass = () => {
    pass = document.getElementById("Password").value;
    passC = document.getElementById("PasswordC").value;

    setUser({ ...user, Password: pass, CPassword: passC }); // here we set pass.. Cpass..

    if (pass === passC) {
      setPassmatch(true);
    } else {
      setPassmatch(false);
    }
  };
  const signup = async (event) => {
    event.preventDefault();
    try {
      if (passmatch) {
        // const res = await axios.post("http://"+/*192.168.1.208*/"localhost:3001/form", user)
        //  mobile use change the ip

        // const res = await axios.post("http://192.168.1.208:3001/form", user);
        // const respons = await axios.post("${import.meta.env.VITE_APP_API_URL}/api/users/register", user);
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/users/register`,user);
        console.log(res.data);
        
        console.log(res.data, res.data.message);
        console.log(res.data, res.data.message);
        // console.log(res.data.keyPattern);
        if (res.data.message === "success") {
          setDAlert({
            bodercolor: "border-[#00ff00]",
            txtcolor: "text-[#00ff00]",

            bgcolor: "bg-[#00ff00]",
            icon: "bg-[#0c2e0c]",
            headtitle: "Successfully Registered",
            msg: "Now you can login",
          });
          setAutoclose(true);
          setTimeout(() => {
            setAutoclose(false);
          }, 3000);
          stroteTokenInLS(res.data.token);
          navigate("/");
          //   setSwicth(false);
          //   setLg("shadowinner bg-white  font-semibold text-xl transition-all duration-300 rounded-es-[45px]");
          //   setSg(" bg-gray-200 text-black font-normal text-base transition-all duration-300 rounded-ee-[45px] ")
          // alert("successfully submited"+res.data);
        } else if (res.data.message === "invalid") {
          setDAlert({
            bodercolor: "border-[#ff0000]",
            txtcolor: "text-[#ff0000]",

            bgcolor: "bg-[#ff0000]",
            icon: "bg-[#0c2e0c]",
            headtitle: "invailid OTP",
            msg: "try again",
            
          });
          setAutoclose(true);
          setTimeout(() => {
            setAutoclose(false);
          }, 6000);
          return 
        } 
         else if (res.data.message === "invailid_pass") {
          setDAlert({
            bodercolor: "border-[#ff0000]",
            txtcolor: "text-[#ff0000]",

            bgcolor: "bg-[#ff0000]",
            icon: "bg-[#0c2e0c]",
            headtitle: "Minimum length 8 Must have @&NT*S7",
            msg: "try again",
          });
          setAutoclose(true);
          setTimeout(() => {
            setAutoclose(false);
          }, 6000);
        } else {
          if (res.data.code === 11000 && res.data.keyPattern.Email) {
            setDAlert({
              bodercolor: "border-[#ffff00]",
              txtcolor: "text-[#ffff00]",

              bgcolor: "bg-[#ffff00]",
              icon: "bg-[#0c2e0c]",
              headtitle: "Email already exists",
              msg: "Use different email or Login",
            });
            setAutoclose(true);
            setTimeout(() => {
              setAutoclose(false);
            }, 6000);
          }  else {
            setDAlert({
              bodercolor: "border-[#ff0000]",
              txtcolor: "text-[#ff0000]",

              bgcolor: "bg-[#ff0000]",
              icon: "bg-[#0c2e0c]",
              headtitle: "server Error",
              msg: "try again later",
            });
            setAutoclose(true);
            setTimeout(() => {
              setAutoclose(false);
            }, 6000);
          }
        }
      } else {
        setDAlert({
          bodercolor: "border-[#ffff00]",
          txtcolor: "text-[#ffff00]",

          bgcolor: "bg-[#ffff00]",
          icon: "bg-[#0c2e0c]",
          headtitle: "pass not match",
          msg: "re-Enter the password",
        });
        setAutoclose(true);
        setTimeout(() => {
          setAutoclose(false);
        }, 6000);
        // setTitles("password not match");
      }
    } catch (error) {
      console.log(error + "registration api from signin page");

      setDAlert({
        bodercolor: "border-[#ff0000]",
        txtcolor: "text-[#ff0000]",

        bgcolor: "bg-[#ff0000]",
        icon: "bg-[#0c2e0c]",
        headtitle: "server Error",
        msg: "try again later",
      });
      setAutoclose(true);
      setTimeout(() => {
        setAutoclose(false);
      }, 6000);
      //   setTitles("Server Error");

      //   setTimeout(() => {
      //     setTitleslog('');
      //   }, 3000);
    }
  };
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return navigate("/");
  }

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          {autoclose && <SuccessAlert2 dAlert={dAlert}></SuccessAlert2>}
          <form onSubmit={signup} className="w-full max-w-md">
            <div className="flex items-center justify-center mt-6">
              <Link
                to="/signup"
                className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-[#19444a] dark:border-[#19444a] dark:text-white"
              >
                sign in
              </Link>
              <Link
                to="/login"
                className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"
              >
                login
              </Link>
            </div>

            <div className=" flex items-center mt-8">
              <div className="relative flex items-center">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>

                <input
                  type="text"
                  className="block w-full py-3 mr-1 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Frist Name"
                  name="Fname"
                  value={user.Fname}
                  pattern="[A-Za-z]+"
                  title="only aphabets allow"
                  onChange={onChangeInput}
                  required
                />
              </div>
              <div className="relative flex items-center">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>

                <input
                  type="text"
                  className="block w-full ml-1 py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Last Name"
                  name="Lname"
                  value={user.Lname}
                  pattern="[A-Za-z]+"
                  title="only aphabets allow"
                  onChange={onChangeInput}
                  required
                />
              </div>
            </div>
            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>

              <input
                type="email"
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Email address"
                id="email"
                name="Email"
                value={user.Email}
                onChange={onChangeInput}
                required
              />
            </div>

            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>

              <input
                type="password"
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
                id="Password"
                onChange={matchpass}
                name="Password"
                value={user.Password}
                pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d)(?!.*\s).{8,}$"
                title="Password must be between 8 and 100 characters, contain at least one uppercase letter, one lowercase letter, two digits, and no spaces."
                
                required
              />
            </div>

            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>

              <input
                type="text"
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Confirm Password"
                id="PasswordC"
                onChange={matchpass}
                name="CPassword"
                value={user.CPassword}
                required
              />
            </div>
            <div className=" flex items-center mt-8 justify-between">
              <div className="relative flex items-center">
                <span className="absolute">
                  <LiaDigitalTachographSolid className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
                </span>

                <input
                  type="text"
                  className="block w-full py-3 mr-1 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="OTP"
                  id="otp"
                  name="OTP"
                  value={user.OTP}
                  onChange={onChangeInput}
                  pattern="[0-9]{1,6}"
                  title="required 6 digit number "
                  maxLength="6"
                />
              </div>
              <div className="relative flex items-center justify-center">
                <button
                  onClick={otpGenerate}
                  disabled={reado}
                  className="w-full px-6 py-3  text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#00a76d] rounded-lg hover:bg-[#00a76de4] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  get OTP
                </button>
              </div>
            </div>

            <div className="mt-6">
              <input
                type="submit"
                value="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#19444a] rounded-lg hover:bg-[#19444ae6]  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              />

              <div className="mt-6 text-center ">
                <a
                  href="/login"
                  className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                >
                  Already have an account?
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
