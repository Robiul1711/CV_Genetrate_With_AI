import React from 'react'
import { JobIcon } from '../AllIcons/HomeIcons'

const whyChoose = [
    {
        id: 1,
        icon: <JobIcon />,
        title: 'Create resumes that get interviews',
        desc: 'Backed by data, designed for results'
    },
    {
        id: 2,
        icon: <JobIcon />,
        title: 'Create resumes that get interviews',
        desc: 'Backed by data, designed for results'
    },
    {
        id: 3,
        icon: <JobIcon />,
        title: 'Create resumes that get interviews',
        desc: 'Backed by data, designed for results'
    },
    {
        id: 4,
        icon: <JobIcon />,
        title: 'Create resumes that get interviews',
        desc: 'Backed by data, designed for results'
    },
    {
        id: 5,
        icon: <JobIcon />,
        title: 'Create resumes that get interviews',
        desc: 'Backed by data, designed for results'
    },
    {
        id: 6,
        icon: <JobIcon />,
        title: 'Create resumes that get interviews',
        desc: 'Backed by data, designed for results'
    },
    {
        id: 7,
        icon: <JobIcon />,
        title: 'Create resumes that get interviews',
        desc: 'Backed by data, designed for results'
    },
    {
        id: 8,
        icon: <JobIcon />,
        title: 'Create resumes that get interviews',
        desc: 'Backed by data, designed for results'
    },
    {
        id: 9,
        icon: <JobIcon />,
        title: 'Create resumes that get interviews',
        desc: 'Backed by data, designed for results'
    }

]
const CleverCV = () => {
  return (
    <div className='pb-28'>
         <div className="flex flex-col items-center text-center">
        <h1 className="text-[48px] font-bold">Why Choose Clever CV?</h1>
        <p className="text-xl text-[#9B9B9B] pt-2 ">
      Build resumes that get interviews – backed by data, designed for results.
        </p>
      </div>
      <div className='mt-20 grid grid-cols-3 gap-6'>
        {
            whyChoose.map((item) => (
                <div key={item.id} className='p-4 rounded-2xl border border-[#262626]'>
                    <span>
                    {item.icon}
                    </span>
                    <h1 className='text-xl font-bold mt-10'>{item.title}</h1>
                    <p className='text-lg text-[#9B9B9B] pt-2'>{item.desc}</p>
                </div>
            ))
        }
        {/* <div className='p-4 rounded-2xl border border-[#262626]'>
            <span>

            <JobIcon/>
            </span>
            <h1 className='text-xl font-bold mt-10'>Create resumes that get interviews</h1>
            <p className='text-lg text-[#9B9B9B] pt-2'>Backed by data, designed for results</p>
        </div> */}
      </div>
    </div>
  )
}

export default CleverCV
