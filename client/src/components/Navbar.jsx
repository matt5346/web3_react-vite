import { useState, useContext } from 'react';

import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose  } from 'react-icons/ai';
import { FiExternalLink  } from 'react-icons/fi';
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from '../utils/shortenAddress';

import logo from '../../images/logo.png';

const NavbarItem = ({ title, classProps }) => {
    return (
        <a href="https://faucet.egorfine.com/" target="_blank">
            <li className={`transition ease-in-out md:flex rounded-full py-2 px-7 mx-4 cursor-pointer hover:text-[#2546bd] hover:bg-white ${classProps}`}>
                {title}
                <FiExternalLink className='animate-bounce' fontSize={14}/>
            </li>
        </a>
    )
}

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(this);
    const { currentAccount, connectWallet } = useContext(TransactionContext);
    return (
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <div className="md:flex-[0.5] flex-initial justify-center items-center">
                <img src={logo} alt="logo" className="w-32 cursor-pointer"/>
            </div>
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                {["Get free Ropsten ethereum"].map((item, index) => (
                    <NavbarItem key={item + index} title={item} classProps="my-2 text-lg"/>
                ))}
                    {!currentAccount ?
                    (<li onClick={connectWallet} className="transition ease-in-out bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">Login</li>)
                    : (<li className="transition ease-in-out bg-[#2952e3] py-2 px-7 mx-4 rounded-full">{shortenAddress(currentAccount)}</li>)}
            </ul>
            <div className="flex realative">
                {toggleMenu ?
                    <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)}/>
                    : <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)}/>}
                {toggleMenu && (
                    <ul
                        className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2x1 md:hidden list-none flex flex-col justify-stat items-end rounded-md blue-glassmorphism text-white animate-slide-in"
                    >
                        <li className="text-xl w-full my-2">
                            <AiOutlineClose onClick={() => setToggleMenu(false)} />
                        </li>
                        {["Get free Ropsten ethereum"].map((item, index) => (
                            <NavbarItem key={item + index} title={item} classProps="my-2 text-lg"/>
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
