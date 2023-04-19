
import React, { useState } from 'react'
import { MdOutlineSchool } from 'react-icons/md'
import {SlLocationPin} from 'react-icons/sl'
import {FaUserGraduate} from 'react-icons/fa'
import { useQuery } from '@apollo/client'
import { GET_INSTITUTES_LIST } from '@/query/InstituteQuery'


type DataType = {
    id: number,
    name: string,
    city: string
}

const InstituteForm = () => {
    const [value, setValue] = useState('');
    const [instituteId, setInstituteId] = useState(0);
    const [notFound, setNotFound] = useState(false);

    const {loading, error, data} = useQuery(GET_INSTITUTES_LIST);

    const handleClick = (institute: DataType) => {
        setValue(institute.name);
        setInstituteId(institute.id)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (instituteId === 0) {
            console.log('please choose your institute')
        }
        else {
            console.log('added ', instituteId, " ", value);
        }
    }

    if (loading) return <p>Loading ...</p>
    if (error) return <p>{error.message}</p>

  return (
    <div className="flex mt-6 justify-center gap-2 w-full">
                    <form onSubmit={handleSubmit} className='w-[25rem] rounded-lg'>
                        <div className='w-full flex gap-2 justify-between items-center bg-lc-gray-3 rounded-lg'>
                            <input 
                                className='border-lc-gray-2 focus:outline-none bg-lc-gray-3 p-3  text-lc-text-light rounded-lg w-full'
                                value={value}
                                onChange={(e) => {setValue(e.target.value);setNotFound(true)}}
                                placeholder='Select your Institute'
                                type="text"
                                id="list"
                                name="list"
                                autoComplete='off'
                            />
                           
                            <button 
                            className="bg-lc-gray-3 p-1 mr-3 flex justify-center items-center rounded transition-all">
                                <MdOutlineSchool className='text-xl text-lc-text-dark hover:scale-[1.1] transition-all hover:text-lc-text-light'/>
                            </button>
                        </div>
                        <div className="flex flex-col gap-1 mt-2 rounded">
                            {value && 
                                <div className='bg-lc-gray-1 p-2 rounded flex justify-between items-center'>
                                    <p>Can&apos;t find your institute? </p>
                                </div>
                            }
                            {data.institutes
                            .filter( (institute:any) => {
                                const searchTerm = value.toLowerCase();
                                const inst = institute.name.toLowerCase();
                                if (searchTerm  && inst !== searchTerm ) {
                                    return inst.startsWith(searchTerm) 
                                }
                            })
                            .slice(0,10)
                            .map( (institute:any) => 
                                <div className='bg-lc-gray-1 p-2 rounded flex justify-between items-center' key={institute.id} onClick={() => handleClick(institute)}>
                                    <div className=''>
                                        <p>{institute.name}</p>
                                    </div>
                                    <div className="flex flex-col justify-between items-start text-lc-text-dark">
                                        <div className="flex justify-start items-center gap-2">
                                            <SlLocationPin/>
                                            <p>{institute.city}</p>
                                        </div>
                                        <div className="flex justify-start items-center gap-2">
                                            <FaUserGraduate/>
                                            <p>{institute.student_count}</p>
                                        </div>
                                    </div>
                                </div> 
                            )}
                            {/* {!value && notFound && 
                                <p>Institute Not Found? College chutiya hai</p>
                            } */}
                            
                        </div>
                    </form>
            </div>
  )
}

export default InstituteForm
