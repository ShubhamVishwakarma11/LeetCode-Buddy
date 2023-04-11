import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import ProblemProgress from './ProblemProgress'

const Profile = () => {

    const [url, setUrl] = useState<string>('');
    const [username, setUsername] = useState<any>();
    /**
     * Get current URL
     */
    useEffect(() => {
        const queryInfo = {active: true, lastFocusedWindow: true};

        chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
            const url = tabs[0].url!;
            setUrl(url);
        });

        chrome.storage.local.get(["user"]).then((result) => {
            setUsername(result.user);
        });


        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
              console.log(sender.tab ?
                          "from a content script:" + sender.tab.url :
                          "from the extension");
                setUsername(request.greeting);
                chrome.storage.local.set({ 'user': request.greeting }).then(() => {
                    console.log("Value is set to " + request.greeting);
                });
                sendResponse(`found username ${request.greeting}`);
            }
        );

    }, []);

    


  return (
    <div className="flex flex-col justify-center items-center gap-4">
        <div className='flex flex-col justify-center items-center w-full py-4 px-8 bg-lc-gray-1 rounded-lg'>
            <div className="flex justify-center gap-4">
                <Image src='/images/avatar.png' width={100} height={100} alt="avatar"/>
                <div className="">
                    <h1 className='text-xl'>Shubham Vishwakarma</h1>
                    <p className='text-md text-lc-text-dark'> pikachu_65 </p>
                    <p className='text-md text-lc-text-dark'>Rank: 696969 </p>
                    <p>{url}</p>
                    <p>username: {username}</p>
                </div>
            </div>
        </div>
        <div className='w-full p-4 bg-lc-gray-1 rounded-lg'>
            <p className='text-lc-text-dark text-sm'>Solved Problems</p>
            <div className="flex justify-center items-center gap-6 mt-4">

                {/* circular progress bar  */}
                <div className="shrink-1 relative max-h-[100px] max-w-[100px] z-base">
                    <svg className="h-full w-full origin-center -rotate-90 transform" viewBox="0 0 100 100">
                        <circle fill="none" cx="50px" cy="50px" r="46" strokeWidth="3" strokeLinecap="round" stroke="currentColor" 
                        className="w-[100px] text-lc-gray-3"></circle>
                        <circle fill="none" cx="50px" cy="50px" r="46" strokeWidth="5" strokeLinecap="round" stroke="currentColor" 
                        className="cursor-pointer text-lc-orange drop-shadow-[0_2px_4px_rgba(255,161,22,0.2)]" strokeDasharray="18.448501540229422 270.57802259003154" strokeDashoffset="0"></circle>
                    </svg>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-default text-center">
                        <div>
                            <div className="text-[24px] font-medium text-lc-text-light dark:text-dark-label-1">165
                            </div>
                            <div className="whitespace-nowrap text-xs text-lc-text-dark dark:text-dark-label-3">Solved
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex flex-col justify-center gap-4 pb-4">
                    <ProblemProgress difficulty='Easy' color="green"/>
                    <ProblemProgress difficulty='Medium' color="orange"/>
                    <ProblemProgress difficulty='Hard' color="red"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile