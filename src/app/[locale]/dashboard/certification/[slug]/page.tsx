"use client"
import React from 'react'

import { useParams } from 'next/navigation'

const Page = () => {

  const { slug } = useParams()
  console.log(slug)
  
  return (
    <div>Page</div>
  )
}

export default Page