/* eslint-disable no-unused-vars */
import React from 'react'
import FilterCard from './FilterCard'
import Navbar from './shared/Navbar'
import { Spa } from '@mui/icons-material';

const jobArray = [1,2,3,4,5,6,7,8];


const Jobs = () => {
  return (
    <div>
        <Navbar/>
        <div className=' max-w-7xl mx-auto mt-5'>
            <div className=' flex gap-5'>
                <div className=' w-20%'>
                    <FilterCard/>

                </div>
                {
                       jobArray.length <= 0 ? <span>job not found</span> : (
                        div>
                       )
                }

            </div>

        </div>
    </div>
  )
}

export default Jobs