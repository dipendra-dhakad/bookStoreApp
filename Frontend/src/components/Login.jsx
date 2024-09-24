import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const onSubmit = async (data) => {
        const userInfo = {
            email: data.email,
            password: data.password,
        };
        
        try {
            const res = await axios.post("http://localhost:3000/user/login", userInfo);
            console.log(res.data);
            if (res.data) {
                toast.success("Login successfully");
                document.getElementById("my_modal_3").close();
                 setTimeout(()=>{  
                  window.location.reload();
                  localStorage.setItem("Users",JSON.stringify(res.data.user));
                 },1000);
                
            }
           
        } catch (err) {
            console.log(err);
            toast.error("Error: " + (err.response ? err.response.data.message : err.message));
            setTimeout(()=>{},2000);
        }
    };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">

           {/* if there is a button in form, it will close the modal */}
           <button  
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 dark:text-black "
            onClick={()=>document.getElementById("my_modal_3").close()}>
              ✕
            </button>
          <form  onSubmit={handleSubmit(onSubmit)} method="dialog">
           
          
          
          <h3 className="font-bold text-lg  text-center underline dark:text-black">Login</h3>
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
                 className="w-80 px-3 py-1 border rounded-md outline-none"
                 {...register("password", { required: true })}
                 />
                 <br/>
                 {errors.password && <span className="text-sm text-red-500">This field is required</span>}
              </div>
 
              {/* button */}
              <div className="flex justify-around mt-6">
                 <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                    Login
                 </button>
                 <p className="text-xl">
                    Not registered?{" "}
                    <Link to ={"/signup"} className="underline text-blue-500 cursor-pointer">
                        Signup
                    </Link>{" "}
                 </p>
              </div>
              </form>
        </div>
      </dialog>
    </div>
  );
};

export default Login;
