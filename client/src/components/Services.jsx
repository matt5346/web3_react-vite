import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className='flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl'>
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className='ml-5 flex flex-col flex-1'>
      <h1 className='mt-2 text-white text-lg'>{title}</h1>
      <p className='mt-2 text-white text-lg  md:w-9/12'>{subtitle}</p>
    </div>
  </div>
)

const Services = () => {
    return (
      <div className='flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services'>
        <div className='flex mf:flex-row flex-col items-center justify-between md:p-29 py-12 px-4'>
          <div className='flex-1 flex flex-col justify-start items-center'>
            <h1 className='text-white text-3xl sm:text-5xl py-2 text-gradient'>
              We doing our best <br/> to provide services.
            </h1>
          </div>
        </div>
        <div className='lex-1 flex flex-col justify-start items-center'>
          <ServiceCard
            color="bg-[#2952E3]"
            icon={<BsShieldFillCheck fontSize={21} className='text-white' />}
            title="Security Guaranteed"
            subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          />
          <ServiceCard
            color="bg-[#89455F]"
            icon={<BiSearchAlt fontSize={21} className='text-white' />}
            title="Best rates"
            subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          />
          <ServiceCard
            color="bg-[#F84550]"
            icon={<RiHeart2Fill fontSize={21} className='text-white' />}
            title="Fastest transactions"
            subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          />
        </div>
      </div>
    );
}

export default Services;
