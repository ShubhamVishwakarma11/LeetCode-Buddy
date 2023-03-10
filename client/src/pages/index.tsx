import React, { useEffect, useState } from "react"
import Link from "next/link"
import Profile from "@/components/Home/Profile"


export default function Home() {

  return (
    <div className="flex flex-col justify-center items-center p-4 w-full h-full bg-lc-gray-2 text-white">
      <Profile/>
    </div>
  )
}
