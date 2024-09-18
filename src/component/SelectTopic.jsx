import axios from "axios";
import React, { useState,useEffect,} from "react"
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useAuth  } from "../store/auth";
import Cookies from "js-cookie";
import SuccessAlert2 from "./alert";
import { useNavigate } from "react-router-dom";
import withAuth from "./privatepage"


 function SelectTopic(){
    const {user, FetchUserData}=useAuth();
    const navigate=useNavigate();
const [autoclose ,setAutoclose]=useState(false)

const [dAlert,setDAlert]= useState({
  bodercolor:"border-[#ff0000]",
  txtcolor:"text-[#ff0000]",
  
  bgcolor:"bg-[#ff0000]",
  icon:"bg-[#0c2e0c]",
  headtitle:"Failed server Error",
  msg:"Please  angain later",

})


 const {Email}=user;

 
let token=Cookies.get("token")



const Checkbox = ({ isChecked, label, checkHandler, index }) => {
  
  return (
    <>
      <input
        type="checkbox"
        id={`checkbox-${index}`}
        checked={isChecked}
        onChange={checkHandler}
        hidden
      />
      <label className={`cursor-pointer  px-[13px] truncate rounded-[4px] border  my-[5px] p-2 m-2 ${isChecked? `bg-[#191D23] text-[#E7EAEE]`:`text-[#191D23] bg-[#E7EAEE]`}  `} htmlFor={`checkbox-${index}`}>{label}</label>
      </>
  )
}

const [Topics, setTopics] = useState( [
  { name: "HTML", checked: true },
  { name: "React Native", checked: false },
  { name: "MERN", checked: false },
  { name: "Programming Logic", checked: false },
  { name: "Java", checked: false },
  { name: "C Programming", checked: false },
])
const updateCheckStatus = index => {
  
  setTopics(
    Topics.map((Topic, currentIndex) =>
      currentIndex === index
        ? { ...Topic, checked: !Topic.checked }
        : Topic
    )
  )
}
// useEffect(() => {
//   FetchUserData()
//   }
// , [Topics])
const onSubmit=async()=>{
  event.preventDefault()
  try {
  console.log("hell")
  
  let newarray=Topics.filter((topic)=>{
    if(topic.checked){
      {
        return {topicName: topic.name}
      }
    }
  })
    console.log(newarray[0])
    if(!newarray[0]){
      console.log("empty")
      setDAlert({bodercolor:"border-[#ff0000]",
        txtcolor:"text-[#ff0000]",
        
        bgcolor:"bg-[#ff0000]",
        icon:"bg-[#0c2e0c]",
        headtitle:"select at least one",
        msg:"try again",
    })
    setAutoclose(true);
    setTimeout(() => {
      setAutoclose(false)
    }, 6000);
    return 
    }
    const topics=newarray.map((item)=>{
      return  {topicName: item.name}
    })
    const response= await axios.post(`${import.meta.env.VITE_APP_API_URL}/select`,{topics},
      {headers: {
      'Authorization': `Bearer ${token}`
    }})
     if(response.data.message==="success"){
      setDAlert({ bodercolor: "border-[#00ff00]",
        txtcolor: "text-[#00ff00]",

        bgcolor: "bg-[#00ff00]",
        icon: "bg-[#0c2e0c]",
        headtitle:"successfully selected",
        msg:"now you can give test",
    })
    FetchUserData()
    navigate("/");
    setAutoclose(true);
 
    setTimeout(() => {
      setAutoclose(false)
    
      

    }, 1000);

     }else{
      setDAlert({bodercolor:"border-[#ff0000]",
        txtcolor:"text-[#ff0000]",
        
        bgcolor:"bg-[#ff0000]",
        icon:"bg-[#0c2e0c]",
        headtitle:"something went wrong",
        msg:"try again",
    })
    setAutoclose(true);
    setTimeout(() => {
      setAutoclose(false)
    }, 6000);
     }
    } catch (error) {
      setDAlert({bodercolor:"border-[#ff0000]",
        txtcolor:"text-[#ff0000]",
        
        bgcolor:"bg-[#ff0000]",
        icon:"bg-[#0c2e0c]",
        headtitle:"something went wrong",
        msg:"try again",
    })
    setAutoclose(true);
    setTimeout(() => {
      setAutoclose(false)
    }, 6000);
      console.log(error)
    }
}
const selectAll = () => {
  setTopics(Topics.map(Topic => ({ ...Topic, checked: true })))
}
const unSelectAll = () => {
  setTopics(Topics.map(Topic => ({ ...Topic, checked: false })))
}
  
    return (<>
<div className="font-manrope flex h-screen w-full items-center justify-center">
{autoclose &&
        <SuccessAlert2 dAlert={dAlert}></SuccessAlert2>
      }
  <form onSubmit={onSubmit} className="mx-auto  box-border w-[365px] border bg-white p-4">
    <div className="flex items-center justify-between">
      <span className="text-[#64748B]">Select Topic </span>
      <div className="cursor-pointer border rounded-[4px]">
        
      </div>
    </div>

    <div className="mt-6">
      <div className="font-semibold">You can choose multiple options ?</div>
      <div><div className="mt-1 w-full h-auto rounded-[4px] border focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 p-4 flex flex-wrap"  > {Topics.map((Topic, index) => (
        <Checkbox
          key={Topic.name}
          isChecked={Topic.checked}
          checkHandler={() => updateCheckStatus(index)}
          label={Topic.name}
          index={index}
        />
      ))}
       </div></div>
    
    </div>

    

    

    <div className="mt-6">
      <button onClick={onSubmit} className="w-full cursor-pointer rounded-[4px] bg-[#1f2937] px-3 py-[6px] text-center font-semibold text-white">Submit</button>
    </div>
  </form>
</div></>)}
export default withAuth(SelectTopic);
