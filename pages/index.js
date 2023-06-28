import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import SuperSimpleOne from '@/components/SuperSimpleOne'
import SuperTwo from '@/components/SuperTwo'
import SuperSimpleThree from '@/components/SuperSimpleThree'
import UseKonva from './UseKonva'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <div>
    {/* <Navbar/> */}
    {/* <SuperSimpleOne/> */}
    {/* <SuperTwo/> */}
    {/* <SuperSimpleThree/> */}
    <UseKonva/>
      
    
   </div>
  )
}
