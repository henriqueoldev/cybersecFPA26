import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react';
import ClippyImg from '../assets/clippy-660806820.png';
import Logo from '../assets/image 5.png'
import Btn from './Btn';
import ProgressBar from './ProgressBar';
import type { JSX } from 'react';

type Props = {
    CardContent: JSX.Element;
    Fallback: (msg:string) => void;
    Progress: number;
    Points: number;
}

export default function Card({CardContent, Fallback, Progress, Points} : Props) {
    let previousBtn: JSX.Element = <></>;
    let btnDivClasses = 'flex items-center justify-between w-full gap-5'

    if (Progress > 1) {
        previousBtn = <Btn IconLeft Fallback={() => Fallback('previous')} Icon={ArrowLeftIcon} Text='Anterior' Size={32} />
    } else {
        previousBtn = <></>
        btnDivClasses += ' justify-end'
    }

    return (
        <div className="border-4 rounded-xl p-8 border-secondary bg-dark-green text-white max-w-252">
            <div>
                <img className='absolute max-w-[40%] z-2 bg-dark-green border-secondary border-r-4 border-b-4 p-3 pt-0 pr-16 rounded-br-full' src={Logo} alt="" />
            </div>
            <div className='bg-Matrix p-10 border-secondary border-4 rounded-xl gap-5 flex flex-col'>
                <div className='flex items-center justify-around'>
                    <div className='flex justify-center items-center h-100'>
                        <img id='Clippy' className='xl:max-w-64 max-w-48' src={ClippyImg} alt="" />
                    </div>
                    <div className='w-1/2 min-w-50 xl:min-w-100 xl:text-2xl flex flex-col gap-5'>
                        <div>
                            <ProgressBar points={Points} progress={Progress}></ProgressBar>
                        </div>
                        <div className='backdrop-blur-[2px] text-md bg-dark-green-50 p-5 rounded-xl'>
                            {CardContent}
                        </div>
                        <div className={btnDivClasses}>
                            {previousBtn}
                            <Btn Fallback={() => Fallback('next')} Icon={ArrowRightIcon} Text='Próximo' Size={32} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}