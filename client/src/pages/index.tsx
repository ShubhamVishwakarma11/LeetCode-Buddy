import React from "react"
import Link from "next/link"

export default function Home() {
  return (
    <>
    <div className='bg-red-200'>Hello World okay</div>
    <Link href="/user"> user</Link>
    </>
  )
}
