import Axios from 'axios'
import clsx from 'clsx'
import React, { useState } from 'react'
import { BsInfoCircle } from 'react-icons/bs'
import { IoMdCloseCircle } from 'react-icons/io'
import  { RiUploadCloudFill } from 'react-icons/ri'

type FileState = {
    file: File,
    setFile: () => void
}

type InstituteLogoFormProps = {
    updateLogoUrl: (url:string) => void
}

const InstituteLogoForm = ({updateLogoUrl}: InstituteLogoFormProps) => {
    const [file, setFile] = useState<FileState | null>(null);

    const handleRemoveImage = (e: React.FormEvent) => {
        e.preventDefault();
        setFile(null);
    }

    const uploadImage = (e:React.FormEvent) => {
        e.preventDefault();
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file as any);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

        Axios.post("https://api.cloudinary.com/v1_1/dk4vunizw/image/upload", formData)
        .then((res) => {
            updateLogoUrl(res.data.secure_url);
            console.log(res);
        })
        .catch( (err) => {
            console.log(err);
        })
        
        console.log(file);
    }

  return (
    <div className='mt-6 rounded p-1'>
        <div className="text-xs mb-2 text-lc-text-dark flex items-center gap-2">
                <BsInfoCircle/>
                <p>Optional</p>
        </div>
        <div className="flex items-center justify-between gap-2">
            {file ? 
                <div className="flex justify-start items-center">
                    <div className='min-w-[18rem] flex justify-between items-center bg-lc-gray-3 text-lc-text-dark rounded-lg'>
                        <p className='p-2'>{(file as any)?.name} - {((file as any)?.size /1000).toFixed(2)}kB</p>
                        <button onClick={handleRemoveImage} className='text-lc-red p-3 text-xl rounded'
                        > <IoMdCloseCircle/> </button>
                    </div>
                </div>
            : 
                <div className="flex justify-start items-center">
                    <label 
                        htmlFor="logo"
                        className='w-[18rem] bg-lc-gray-3 text-lc-text-dark hover:cursor-pointer p-2 text-center rounded-lg'    
                    >Select Logo</label>
                    <input 
                        id="logo"
                        type='file' 
                        accept='image/*'
                        className='opacity-0 w-1 h-1 absolute'
                        onChange={(e:React.FormEvent) => {setFile((e.target as any).files[0])}}
                    />
                </div>
            }
            
            <button 
                onClick={uploadImage}
                className={clsx(file && " bg-lc-gray-3 text-lc-text-dark hover:cursor-pointer",
                    "flex gap-1 justify-between items-center p-2 text-center rounded-lg"
                )}
            >
                <RiUploadCloudFill/>
                <p>Upload</p>   
            </button>
        </div>
            
    </div>
  )
}

export default InstituteLogoForm