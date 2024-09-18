import { useState } from "react";
import { Link, useNavigate,redirect } from "react-router-dom";
import { BiLock } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi2";
import axios from "axios";
import SuccessAlert2 from "./alert";
import { useAuth } from "../store/auth";


export default function Login() {
  const navigate=useNavigate();
  let name, valiue;
  const [dAlert,setDAlert]= useState({
    bodercolor:"border-[#ff0000]",
    txtcolor:"text-[#ff0000]",
    
    bgcolor:"bg-[#ff0000]",
    icon:"bg-[#0c2e0c]",
    headtitle:"Failed server Error",
    msg:"Please  angain later",

})
const apiUrl = import.meta.env.VITE_APP_API_URL;
console.log(apiUrl);
const {stroteTokenInLS}=useAuth();
const [autoclose ,setAutoclose]=useState(false)
    const [user, setUser] = useState({      
        Email: "", 
        userPassword: "",       
      });
      const onChangeInput = (event) => {
        // console.log(event);
        name = event.target.name;
        valiue = event.target.value;
        setUser({ 
          ...user, [name]: valiue
         });
        console.log(user)
        // execpt password Cpassword and city
      }
      const login=async(event)=>{
        // event.preventDefualt()
        event.preventDefault();
        try {
          console.log(user)
          // alert( user.userPassword)
          const response= await axios.post(`${import.meta.env.VITE_APP_API_URL}/login`,user)
          console.log(response);
          console.log(response.data.message==="wrong password");
          console.log(response.data);
          if(response.data.message==="success"){
            // alert(response.data)
            // <Navigate to="/" />
            console.log(response.data.token);
            navigate("/select");
            stroteTokenInLS(response.data.token)
          }else if(response.data.message==="wrong"){
            setDAlert({bodercolor:"border-[#ff0000]",
              txtcolor:"text-[#ff0000]",
              
              bgcolor:"bg-[#ff0000]",
              icon:"bg-[#0c2e0c]",
              headtitle:"invailid password",
              msg:"try again",
          })
          setAutoclose(true);
          setTimeout(() => {
            setAutoclose(false)
          }, 6000);

          }else{
            setDAlert({bodercolor:"border-[#ff0000]",
              txtcolor:"text-[#ff0000]",
              
              bgcolor:"bg-[#ff0000]",
              icon:"bg-[#0c2e0c]",
              headtitle:"user not exist",
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
            headtitle:"something went wrong ",
            msg:"please try again later",
        })
        setAutoclose(true);
        setTimeout(() => {
          setAutoclose(false)
        }, 6000);
          
        }
      }
      const {isLoggedIn}=useAuth();
      
        if(isLoggedIn){
          return navigate('/')
        }
      
    return (
            <>

<section className="bg-white dark:bg-gray-900">
    <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
    {autoclose &&
        <SuccessAlert2 dAlert={dAlert}></SuccessAlert2>
      }
        <form className="w-full max-w-md" onSubmit={login} >
            <div className="flex justify-center mx-auto">
                <img className="w-auto h-7 sm:h-8" src="/image/quiz-multicolor.png" alt=""/>
            </div>
            
            <div className="flex items-center justify-center mt-6">
                <Link to="/signup" className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300">
                    sign in
                </Link>

                <Link to="/login" className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-[#19444a] dark:border-[#19444a] dark:text-white">
                    login
                </Link>
            </div>

            <div className="relative flex items-center mt-8">
                <span className="absolute">
                    <HiOutlineUser  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"/>
                  
                </span>

                <input name="Email" value={user.Email} required onChange={onChangeInput} type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username"/>
            </div>

            

            <div className="relative flex items-center mt-4">
                <span className="absolute">
                   
                <BiLock className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
                </span>
                
                <input type="password" name="userPassword" value={user.userPassword} required onChange={onChangeInput} className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirm Password"/>
            </div>

            <div className="mt-6">
                <button  type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#19444a] rounded-lg hover:bg-[#19444ae6] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">Login
                 </button>
                <div className="mt-6 text-center ">
                    <Link to="#" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                       {/* ${apiUrl && <>{apiUrl}</> } */}
                       {apiUrl}
                    </Link>
                </div>
            </div>
        </form>
    </div>
</section>
            </>
        )

    
}
