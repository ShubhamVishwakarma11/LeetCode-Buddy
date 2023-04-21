import React, { useState } from 'react'
import { MdOutlineSchool } from 'react-icons/md'
import {SlLocationPin} from 'react-icons/sl'
import {FaUserGraduate} from 'react-icons/fa'
import {HiBuildingLibrary} from 'react-icons/hi2'
import { useMutation, useQuery } from '@apollo/client'
import { GET_INSTITUTES_LIST } from '@/query/InstituteQuery'
import { SET_INSTITUTE } from '@/mutations/instituteMutation'
import { GET_USER_DETAIL } from '@/query/UserQuery'
import { useUserContext } from '@/hooks/useUserContext'


type DataType = {
    id: number,
    name: string,
    city: string
}

const InstituteForm = () => {
    const {user} = useUserContext();

    const [value, setValue] = useState('');
    const [instituteId, setInstituteId] = useState(0);
    const [notFound, setNotFound] = useState(false);

    const {loading, error, data} = useQuery(GET_INSTITUTES_LIST);
    
    const [setInstitute] = useMutation(SET_INSTITUTE, {
        variables: {username: user, instituteId: instituteId},
        refetchQueries: [{query: GET_USER_DETAIL, variables: {username: user}}]
    })

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
            setInstitute();
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
                                <div className='bg-lc-gray-1 p-2 rounded flex justify-between gap-2 items-center' key={institute.id} onClick={() => handleClick(institute)}>
                                    <div className="flex justify-start gap-2 items-center">
                                        <HiBuildingLibrary className='text-7xl p-2 text-lc-text-dark'/>
                                        <div className="flex flex-col gap-1 items-start justify-center w-full">
                                            <p className='text-lg w-[16rem]'>{institute.name}</p>
                                            <div className="flex justify-start gap-1 items-center">
                                                <SlLocationPin className='text-xs'/>
                                                <p className='text-xs'>Location: {institute.city}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center gap-1">
                                        <FaUserGraduate className='text-md text-lc-text-dark'/>
                                        <p className='text-lg text-lc-text-dark' >{institute.student_count}</p>
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
