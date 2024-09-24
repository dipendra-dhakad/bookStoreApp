import { Link,useLocation, useNavigate } from "react-router-dom"
import Login from "./Login"
import { useForm } from "react-hook-form"
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const localtion = useLocation();
  const navigate = useNavigate();
  const from = localtion.state?.from?.pathname || "/";
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      // const onSubmit = async (data) => {
      //   const userInfo ={
      //         fullname :data.fullname,
      //         email:data.email,
      //         password:data.password,
      //   }
      //  await axios.post("http://localhost:3000/user/signup",userInfo)
      //   .then((res)=>{
      //     console.log(res.data)
      //     if(res.data){
      //       alert("Signup successfully")
      //     }
      //   }).catch((err)=>{
      //     console.log(err)
      //     alert("Error: " + err)
      //     // if (err.response) {
      //     //   // console.error('Error Data:', err.response.data); // Log the error details
      //     //   alert('User Created Successfully: ' + err.response.data.message);    // Show the backend error message
      //     // } else {
      //     //   console.error('Error:', err.message);
      //     //   alert('Error: ' + err.message);
      //     // }
      //   })

      const onSubmit = async (data) => {
        const userInfo = {
            fullname: data.fullname,
            email: data.email,
            password: data.password,
        };
        
        try {
            const res = await axios.post("http://localhost:3000/user/signup", userInfo);
            console.log(res.data);
            if (res.data) {
                toast.success("Signup successfully");
                 navigate(from,{replace:true});
            }
            localStorage.setItem("Users",JSON.stringify(res.data.user));
        } catch (err) {
            console.log(err);
            toast.error("Error: " + (err.response ? err.response.data.message : err.message));
        }
    };
    
  return (
    <>
            <div className="flex h-screen items-center justify-center">
             <div  className="w-[600px]">
              <div className="modal-box">
                <form  onSubmit={handleSubmit(onSubmit)} method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <Link to={"/"}
                   className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 dark:text-black">
                    ✕
                  </Link>
                
                <h3 className="font-bold text-lg dark:text-black text-center underline">Signup</h3>
                    {/* Name */}
                    <div className="mt-4 space-y-2">
                       <span className="dark:text-black">Name</span>
                       <br/>
                       <input 
                       type="text"
                       placeholder="Enter your full name"
                       className="w-80 px-3 py-1 border rounded-md outline-none" 
                       {...register("fullname", { required: true })}
                       />
                        <br/>
                      {errors.fullname && <span className="text-sm text-red-500">This field is required</span>}

                    </div>

                     {/* Email */}
                    <div className="mt-4 space-y-2">
                       <span className="dark:text-black">Email</span>
                       <br/>
                       <input 
                       type="email"
                       placeholder="Enter your email"
                       className="w-80 px-3 py-1 border rounded-md outline-none" 
                       {...register("email", { required: true })}
                       />
                        <br/>
                       {errors.email && <span className="text-sm text-red-500">This field is required</span>}

                    </div>
      
                    {/* password */}
                    <div className="mt-4 space-y-2">
                       <span className="dark:text-black">Password</span>
                       <br/>
                       <input 
                       type="password"
                       placeholder="Enter your password"
                       className="w-80 px-3 py-1 border rounded-md outline-none " 
                       {...register("password", { required: true })}
                       />
                      <br/>
                      {errors.password && <span className="text-sm text-red-500">This field is required</span>}
                  </div>
      
                    {/* button */}
                  <div className="flex justify-around mt-4">
                     <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                       Signup
                     </button>
                     <p className="text-xl">
                         Have account?{" "}

                        <button  className="underline text-blue-500 cursor-pointer"
                           onClick={() => document.getElementById("my_modal_3").showModal()}>
                          Login
                        </button>{" "}
                        <Login/>
                      </p>
                     </div>
                     </form>
                </div>
            </div> 
        </div> 
    </>
  )
}

export default Signup
