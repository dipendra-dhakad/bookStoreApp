// import React from 'react'
import { useEffect, useState } from "react"
import Cards from "../components/Cards"
import {Link} from "react-router-dom"
import axios from "axios";

function Course(){

  const [book,setbook] = useState([]);

  useEffect(()=>{
  
    const getBook = async()=>{
      try {
          const res = await axios.get("http://localhost:3000/book");
          console.log(res.data)
          setbook(res.data)
      } catch (error) {
        console.log(error);
        
      }
    }
    getBook();
  },[])
  return (
    <>
       <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
          <div className="mt-28 items-center justify-center  text-center">
            <h1 className="text-2xl font-bold md:text-4xl ">
                 We are delighted to have you {" "}
                <span className="text-pink-500">here! :)</span> 
                </h1>
                <p className="mt-12">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Accusamus eveniet officia debitis culpa sint ex at, quis 
                    blanditiis impedit aliquid excepturi consectetur quos,
                     esse tenetur corporis repellendus omnis numquam autem dignissimos 
                     accusantium natus beatae. Libero eos alias, unde facilis nihil magni, pariatur, voluptates 
                     molestiae commodi ex animi velit sequi ipsam.
                </p>
                <Link to="/">
                  <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
                    Back
                 </button>
                </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
              {
                book.map((item)=>(
                    <Cards key ={item.id} item={item}/>
                ))
              }
          </div>

        </div> 
    </>
  )
}

export default Course
