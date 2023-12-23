'use client'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react';
import Link from 'next/link'
 



const MapComponent = dynamic(() => import("./components/MapComponentTraffic"), { ssr:false })





export default function Home() {
  const [data, setData] = useState([]);


  useEffect(() => {
    fetch('/data/stops.json') // Assuming the file is in the public folder
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData); // Slice the first five items
        
      });
    
  }, []);

  



  return (
    <div className="flex min-h-screen flex-col">      
      <div className="p-5 h-90 text-stone-800 bg-stone-300 text-lg font-bold">Public Transport in Berlin animated</div>
      <Link href="/history"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs">History</button></Link>
      <MapComponent data={data} />
      {data && data.map((item, index) => (
        
          
          <span key={index} className="text-xs">{item.stop_name}</span>
       
      ))}
      
       
      
    </div>
  )
}
