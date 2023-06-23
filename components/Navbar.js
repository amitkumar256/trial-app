import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const [date, setDate] = useState();
    const router = useRouter();
  
    function getYear() {
      setDate(new Date().getFullYear());
    }
  
    useEffect(() => {
      getYear();
    }, [])
  
    const fadeIn = {
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 1,
        transition: {
          duration: 0.3
        }
      },
      exit: {
        opacity: 0,
      }
    }
  
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    return (
        <div>
            <div className='  md:px-8 px-4 mx-4   text-white xl:mx-auto bg-black max-w-[1208px]'>
                <div className='hidden lg:block'>
                <div className=' h-20 flex justify-between items-center'>
                   
                    <div>
                       <h1 className='text-2xl'>Logo</h1> 
                    </div>
                    <div className='flex '>
                        <ul className='flex gap-8 items-center'>
                            <li className='text-sm text-white hover:font-bold'><a href="#">products</a></li>
                            <li className='text-sm text-white hover:font-bold'><a href="#">our story</a></li>
                            <li className='text-sm text-white hover:font-bold'><a href="#">Home</a></li>
                            <li className='text-sm text-white hover:font-bold'><a href="#">About</a></li>



                        </ul>
                       
                            <button className='h-[41px] w-[165px] text-base rounded-[10px] hover:bg-gradient-to-br from-[#66D3E1] to-[#96FFAD] bg-white ml-16 text-black'>Log In</button>
                     
                        
                    </div>


                </div>
               
                </div>

    {/* mobile and tab */}
    <div className='lg:hidden'>
    <nav className="bg-dark  pl-2 pr-6 sm:px-4 py-2.5  w-full z-50 top-0 left-0">
    <div className="container flex flex-wrap items-center justify-between mx-auto">

                   <div>
                       <h1 className='text-2xl text-white'>Logo</h1> 
                    </div>
                    <div className='flex'>
                    <button
                onClick={() => setIsOpen(!isOpen)}
                type="button" className="mobileNavbar inline-flex relative z-[100] items-center ">
                <div className='fixed  h-3.5 w-5'>
                  <div
                    className={` h-0.5 bg-white w-5 origin-top-left ease-in duration-200 rounded-md ${isOpen ? 'rotate-45 translate-x-px' : 'rotate-0'}`}
                  />
                  <div
                    className={` h-0.5 w-5 bg-white ease-in duration-200 rounded-md mt-1 ${isOpen ? 'hidden' : 'block'}`}
                  />
                  <div
                    className={` h-0.5 w-5 bg-white ease-in duration-200  rounded-md mt-1  ${isOpen ? '-rotate-45 -translate-x-0.5 ' : 'rotate-0 '}`}
                  />
                </div>
              </button>
              {isOpen && (
                <AnimatePresence>
                    <motion.div variants={fadeIn} initial="initial" whileInView="animate" exit="exit" viewport={{ once: false }} className="fixed ease-in duration-800  w-full h-screen top-0 right-0 bg-gradient-to-br from-[#96FFAD] to-[#96FFAD] py-1 px-1 shadow-lg bg-white text-black z-50" >
                    <div className=' w-full h-full bg-black'>
                      <div className='flex flex-col h-full   '>
                        <div className="flex flex-col mx-auto mt-20 text-center font-oswald tracking-light w-10/12 z-20">
                          <div onClick={() => setIsOpen(!isOpen)} className="nav-link-container  py-2  border-b-2 border-white ">
                            <a href="#product" className="nav-link text-white ">Products</a>
                          </div>
                          <div onClick={() => setIsOpen(!isOpen)} className="nav-link-container py-4  border-b-2 border-white">
                            <a href="#story" className="nav-link  text-white">Our Story</a>
                          </div>
                          <div onClick={() => setIsOpen(!isOpen)} className="nav-link-container py-4  border-b-2 border-white ">
                            <a href="#partners" className="nav-link text-white">Home</a>
                          </div>
                          <div onClick={() => setIsOpen(!isOpen)} className="nav-link-container py-4  border-b-2 border-white ">
                            <a href="#faq" className="nav-link text-white">About</a>
                          </div>
                          <div className='pt-5'>
                            <button
                              
                              className='w-[140px] h-10 hover:bg-gradient-to-br from-[#66D3E1] to-[#96FFAD] bg-white text-black text-sm mr-4 my-auto font-bold rounded-[10px] text-center'
                            >
                              LOG IN
                            </button>
                          </div>
                          
                         
                        
                        </div>

                          
                      </div>
                    </div>
                  </motion.div>

                </AnimatePresence>
                )}

                    </div>


</div>
</nav>
    </div>

            </div>
        </div>
    )
}

export default Navbar