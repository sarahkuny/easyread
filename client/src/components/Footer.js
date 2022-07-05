import { Icon } from '@iconify/react';

export default function Footer(){
    const handleLinkedInClick = () => {
        window.open("https://www.linkedin.com/in/sarahkuny/")
    }
    const handleGitHubClick = () => {
        window.open("https://github.com/sarahkuny")
    }
    
    return(
        <div className="w-full h-12 bg-white flex items-center justify-center font-louisgeorge">
            <span>Contact the Developer</span>
            <div className="flex mx-2 text-1xl">
                <button onClick={handleLinkedInClick} id="linkedin"><Icon className="mx-1" icon="akar-icons:linkedin-box-fill"/></button>
                <button onClick={handleGitHubClick} id="github"><Icon className="mx-1" icon="akar-icons:github-fill" /></button>
                <Icon className="mx-1" icon="clarity:email-solid" onClick={() => window.location = 'mailto:sarahkuny@icloud.com'}></Icon> 
            </div>
        </div>
    )
}