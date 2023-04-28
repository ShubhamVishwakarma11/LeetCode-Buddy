import { useUserContext } from '@/hooks/useUserContext'
import { ADD_INSTITUTE, SET_INSTITUTE } from '@/mutations/instituteMutation'
import { GET_USER_DETAIL } from '@/query/UserQuery'
import { useMutation } from '@apollo/client'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {BsInfoCircle} from 'react-icons/bs'
import {IoIosArrowDropdown} from 'react-icons/io'
import InstituteLogoForm from './InstituteLogoForm'

interface formDataType {
    name: string
    city: string
}

const initValues = {
    name: "",
    city: ""
}


const cityData = [
    {city: "Vadodara", state: "Gujarat"},
    {city: "Nagpur", state: "Maharashtra"},
    {city: "New Delhi", state: "Delhi"},
    {city: "Pune", state: "Maharashtra"},
    {city: "Rourkela", state: "Odisha"},
]

const NewInstituteForm = () => {
    const router = useRouter();
    const {user} = useUserContext();

    const [formData, setFormData] = useState<formDataType>(initValues);
    const [showDropDown, setShowDropDown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [logoUrl, setLogoUrl] = useState("");

    const [addInstitute] = useMutation(ADD_INSTITUTE, {
        variables: {username: user, name: formData.name, city: formData.city, logo: logoUrl},
        refetchQueries: [{query: GET_USER_DETAIL, variables: {username: user}}],
        onCompleted: () => {
            router.push('institute');
        }
    })


    useEffect(()=> {
        if (!formData.city) {
            setShowDropDown(false);
        } 
    }, [formData])

    const handleClick = (item: any) => {
        setFormData({name: formData.name, city: item.city});
        setShowDropDown(false)!;
    }

    const handleChange = (e: any) => {
        setFormData({city: e.target.value, name: formData.name}); 
        if (formData.city) setShowDropDown(true);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const data:any = await addInstitute();
        console.log(data);
        console.log(logoUrl);
        // router.push('/institute');
    }

    const updateLogoUrl = (url: string) => {
        setLogoUrl(url);
    }


  return (
    <div className="flex mt-6 justify-center gap-2 w-full">
                    <form onSubmit={handleSubmit}  className='w-[25rem] rounded-lg'>
                        <div className='w-full flex gap-2 justify-between items-center bg-lc-gray-3 rounded-lg'>
                            <input 
                                className='border-lc-gray-2 focus:outline-none bg-lc-gray-3 p-3  text-lc-text-light rounded-lg w-full'
                                value={formData?.name}
                                onChange={(e) => {setFormData({name: e.target.value, city: formData?.city})}}
                                placeholder='Full Name of the College'
                                type="text"
                                id="college-name"
                                name="college-name"
                                autoComplete='off'
                            />
                        </div>
                        {formData.name &&
                            <div className="text-xs mt-2 text-lc-text-dark flex items-center gap-2">
                                <BsInfoCircle/>
                                <p>Please add the full name of your college.</p>
                            </div>
                        }
                        <div className='w-full mt-6 flex gap-2 justify-between items-center bg-lc-gray-3 rounded-lg'>
                            <input 
                                className='border-lc-gray-2 focus:outline-none bg-lc-gray-3 p-3  text-lc-text-light rounded-lg w-full'
                                value={formData?.city}
                                onChange={handleChange}
                                placeholder='Select City'
                                type="text"
                                id="city"
                                name="city"
                                autoComplete='off'
                            />
                            
                            <button className="bg-lc-gray-3 p-1 mr-3 flex justify-center items-center rounded transition-all"
                            onClick={(e) => {e.preventDefault();setShowDropDown(!showDropDown)}}>
                                <IoIosArrowDropdown className={clsx('text-xl text-lc-text-dark hover:scale-[1.1] transition-all hover:text-lc-text-light',
                                    `${showDropDown && "rotate-180"}`, `${!showDropDown && "rotate-0"}`
                                )}/>
                            </button>
                        </div>
                        <div className="flex flex-col gap-1 mt-2 rounded absolute">
                            {cityData
                            .filter( (item:any) => {
                                const searchTerm = formData.city.toLowerCase();
                                const city = item.city.toLowerCase();
                                if (showDropDown) {
                                    return city.startsWith(searchTerm) 
                                }
                            })
                            .slice(0,10)
                            .map( (item:any) => 
                                <div className='bg-lc-gray-1 p-2 rounded flex justify-between gap-2 items-center' key={item.city} onClick={() => handleClick(item)}>
                                    {item.city}, {item.state}
                                </div> 
                            )}
                            
                        </div>

                        <InstituteLogoForm updateLogoUrl={updateLogoUrl}/>

                        <button 
                            type='submit' 
                            className='w-full bg-lc-gray-3 hover:bg-lc-gray-1 h-12 rounded-lg mt-6'
                            disabled={formData.name && formData.city ? false: true}
                        > 
                            {loading ? "Adding ... " : "Add Institute"}
                        </button>
                        
                    </form>
            </div>
  )
}

export default NewInstituteForm