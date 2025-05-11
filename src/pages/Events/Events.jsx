
import React,{useState} from 'react'
import Layout from '../../components/Layout';
import { FaSearch } from 'react-icons/fa';

const Events = () => {
    const [search,setSearch]= useState("");
    const event=[
        {
            id:1,
            title:"Event 1",
            date:'2025-04-16',
            Description:"event 1 description"
        },
        {
            id:1,
            title:"Event 1",
            date:'2025-04-16',
            Description:"event 1 description"
        },
        {
            id:1,
            title:"Event 1",
            date:'2025-04-16',
            Description:"event 1 description"
        },
        {
            id:1,
            title:"Event 1",
            date:'2025-04-16',
            Description:"event 1 description"
        },

    ]
  return (
    <Layout  title="Events">
        <div className='p-6' >
            <h1 className='text-lg font-bold mb-4'>events</h1>
           
        </div>
        <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search the date..."
                    className="w-full md:w-1/3 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className='text-gray-600'
                  
                    

                    </div>
                  
                
    </Layout>
  )
}

export default Events