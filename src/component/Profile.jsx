import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { BsBank2 } from "react-icons/bs";
import withAuth from "./privatepage/";
import { CiEdit } from "react-icons/ci";
import {
  MdDashboard,
  MdPerson,
  MdTableChart,
  MdNotifications,
  MdLogin,
  MdAppRegistration,
  MdSearch,
  MdMenu,
  MdExpandMore,
  MdOutlineAccountBalance,
  MdOutlinePeople,
  MdOutlineWork,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { useAuth } from "../store/auth";
import axios from "axios";

const userKeys = {
  Fname: "First Name",
  Lname: "Last Name",

  Email: "Email",


};
function Topics({ user }) {
  return (
    <>
      {user && user.Topics && Array.isArray(user.Topics) ? (
        user.Topics.map((topic) => (
          <label
            className={`cursor-pointer px-[13px] truncate rounded-[4px] border my-[5px] p-2 m-2 bg-[#191D23] text-[#E7EAEE]`}
            key={topic.topicName}
          >
            {topic.topicName}
            {console.log(topic.topicName)}
          </label>
        ))
      ) : (
        <p>No topics available</p>
      )}
    </>
  );
}
function Profile() {
  const [lastFourItem, setLastFourItems] = useState();
  const [data, setData] = useState();
  const [dataA, setDataA] = useState();
  let my_data;
  const token = Cookies.get("token");
  useEffect(() => {
    if(user.Topics){
    const topi= user.Topics.map((topic)=> topic.topicName)
    setData(topi)}
  }, []);
  const { user } = useAuth();
  console.log(user)

  console.log(data)

  function UserTable({ user }) {

    return (
      <tbody>
        {Object.keys(userKeys).map((key) => (
          <tr key={key}>
            <td className="py-3 px-2 border-b border-blue-gray-50">
              <div className="flex items-center gap-4">
                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                  {userKeys[key]}
                </p>
              </div>
            </td>
            <td className="py-3 px-2 border-b border-blue-gray-50">
              <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">
                {user[key]}
              </p>
            </td>
          </tr>
        ))}
        <tr >
            <td className="py-3 px-2 border-b border-blue-gray-50">
              <div className="flex items-center gap-4">
                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                 Topics
                </p>
              </div>
            </td>
            
            <td className="py-3 px-2 border-b border-blue-gray-50">
            <Topics user={user}/>
               
           </td>
          </tr>

      </tbody>
      
    );
  }

  const userToken = user._id;
  console.log("tokenuser" + userToken);
  return (
    <div className="min-h-screen bg-gray-50/50 flex justify-center items-center p-24">
     
        <div className="container w-[70%] h-full rounded-[50px] overflow-hidden p-10   bg-white  shadow-lg    transform   duration-200 easy-in-out">
          <div className=" h-32 overflow-hidden">
            <img
              className="  w-full h-28"
              src="./image/quiz-multicolor.png"
              alt=""
            />
          </div>
          <div className="flex justify-center px-5  -mt-12">
            <img
              className="h-32 w-32 bg-white p-2 rounded-full   "
              src="https://cdn-icons-png.freepik.com/512/9967/9967422.png"
              alt=""
            />
          </div>
          <div className=" ">
            <div className="text-center px-14">
              <h2 className="text-gray-800 text-3xl font-bold">
                {user.Fname + user.Lname}
              </h2>
              <Link
                className="text-gray-400 mt-2 hover:text-blue-500"
                to="https://www.instagram.com/immohitdhiman/"
                target="BLANK()"
              >
                {user.Email}
              </Link>
              {/* <p className="mt-2 text-gray-500 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p> */}
            </div>
            <hr className="mt-6" />

            <div className="p-6 w-full px-0 pt-0 pb-2">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="border-b border-blue-gray-50 py-3 px-2 text-left">
                      <p className=" antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                    name
                      </p>
                    </th>
                    <th className="border-b border-blue-gray-50 py-3 px-2 text-left">
                      <p className="antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                     Value
                      </p>
                    </th>
                  </tr>
                </thead>

                <UserTable user={user} />
                
              </table>
              <div className="w-full my-4 flex justify-center items-center ">
                
                  <Link to='/pay'  className="cursor-pointer relative px-[25px] truncate rounded-[23px] border-[#191D23] border-2 my-[5px] p-2 pr-10 m-2 hover:bg-[#191d2333]  text-[#191D23]"> Edit Topics <CiEdit className="absolute top-3 cursor-pointer  right-4   " size={19} /></Link>
                </div>
            </div>
          </div>
        </div>


 
    </div>
  );
}

export default withAuth(Profile);
