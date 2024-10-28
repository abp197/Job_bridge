/* eslint-disable no-unused-vars */
import React from 'react'
import FilterCard from './FilterCard'
import Navbar from './shared/Navbar'
import { Filter } from 'lucide-react'

const Jobs = () => {
  return (
    <div>
        <Navbar/>
        <div className=' max-w-7xl mx-auto mt-5'>
            <div className=' flex gap-5'>
                <div className=' w-20%'>
                    <Filter

                </div>

            </div>

        </div>
    </div>
  )
}

export default Jobs