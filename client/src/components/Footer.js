import { SocialIcon } from 'react-social-icons'



export const Footer = () => {
    return (

        <footer className="left-0 z-20 w-full p-2 bg-gradient-to-br from-neutral-950 to-neutral-800 border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 ml-3">© 2023 <a href="https://flowbite.com/" className="hover:underline">AmplifyNash™</a>. All Rights Reserved.</span>
            <ul className="flex items-center justify-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0 mr-3">

                <li className='mt-3 mr-4'>
                    <SocialIcon url="www.facebook.com" />

                </li>
                <li className='mt-3 mr-4'>
                    <SocialIcon url="www.instagram.com" />
                </li>
                <li className='mt-3 mr-4'>
                    <SocialIcon url="www.x.com" />
                </li>
                <li className='mt-3 mr-4'>
                    <SocialIcon url="www.email.com" />
                </li>
            </ul>
        </footer>



    );
};




