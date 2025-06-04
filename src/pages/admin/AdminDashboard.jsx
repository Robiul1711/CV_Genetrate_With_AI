import React from 'react'
import dashboard from '../../assets/images/dashboard.png'
import hi from '../../assets/images/hi.png'
import Title from '@/components/common/Title'
import { CreateCoverLetterIcon, CreateNewResumeIcon, UpdateExistingResumeIcon } from '@/components/AllIcons/DashboardAllIcons'
import { icons } from 'lucide-react'

const data=[
  {
    id:1,
    title:"Create New Resume",
    descript:"Let AI help you craft a job-winning resume from zero",
    icons:<CreateNewResumeIcon/>
  },
  {
    id:2,
    title:"Update Existing Resume",
    descript:"Upload your current resume and let AI enhance it for success.",
    icons:<UpdateExistingResumeIcon/>
  },
  {
    id:3,
    title:"Create Cover Letter",
    descript:"Personalized letters matched to your resume and target job.",
    icons:<CreateCoverLetterIcon/>
  }
]
const AdminDashboard = () => {
  return (
    <div>
      <div className='bg-[#0E0E10] p-5 lg:p-8 rounded-[8px] flex gap-6 justify-between'>
<div className='flex flex-col gap-6'>
  <div className='flex items-center gap-4'>
<Title level="title28">Welcome to Your Clever CV Dashboard!</Title>
    <img src={hi} alt="" />
  </div>
<Title level="title20">Craft, Optimize, Impress, Land Your Dream Job — All in One Smart Platform</Title>
</div>
<div className='hidden md:block'>
  <img src={dashboard} alt="" className='w-full' />
</div>
      </div>
<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6'>
  {
    data.map((item, index)=>(
      <div key={index} className='bg-[#0E0E10] p-6 md:p-10 lg:p-16 rounded-[16px] flex flex-col gap-3 lg:gap-6 items-center text-center justify-center'>
        <span>{item.icons}</span>
        <Title level="title32">{item.title}</Title>
        <Title level="title16">{item.descript}</Title>
      </div>
    ))
  }
</div>
     
    </div>
  )
}

export default AdminDashboard