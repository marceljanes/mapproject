'use client'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react';



const MapComponent = dynamic(() => import("../components/MapComponentHistory"), { ssr:false })




export default function Home() {
  const [data, setData] = useState([]);



  return (
    <div className="flex min-h-screen flex-col">      
      <div className="p-5 h-90 text-stone-800 bg-stone-300 text-lg font-bold">History</div>
      <MapComponent />
      
      
      
       
      
    </div>
  )
}