import React from 'react'
import history from '../../assets/images/history.png'
import Title from '@/components/common/Title'

const History = () => {
  return (
        <div className='flex items-center flex-col gap-16 justify-center'>
      <Title level="title40">You haven’t generated any documents yet!</Title>
        <img src={history} alt="" className='max-w-64' />
    </div>
  )
}

export default History