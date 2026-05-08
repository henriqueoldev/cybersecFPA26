import { ArrowRightIcon } from '@phosphor-icons/react';
import ClippyImg from '../assets/clippy-660806820.png';
import Btn from './Btn';

export default function Card() {
    return (
        <div className="border-4 rounded-xl p-8 border-secondary bg-dark-green text-white max-w-252">
            <div className='bg-Matrix p-10 border-secondary border-4 rounded-xl gap-5 flex flex-col'>
                <div className='flex items-center justify-center gap-10'>
                    <div>
                        <img className='max-w-64' src={ClippyImg} alt="" />
                    </div>
                    <div className='w-1/2 text-2xl text-justify bg-dark-green-50 p-3 rounded-xl'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum fugiat nostrum quidem similique assumenda numquam sint perspiciatis, deserunt rem sapiente mollitia, recusandae voluptas doloribus id adipisci hic voluptatem! Doloribus, aliquid?</p>
                    </div>
                </div>
                <div className='flex items-center justify-end w-full'>
                    <Btn Icon={ArrowRightIcon} Text='Próximos' Size={32} />
                </div>
            </div>
        </div>
    )
}