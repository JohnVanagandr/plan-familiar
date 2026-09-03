import { Button } from '@/components/ui';

export const HeaderSection = ({
  icon = '',
  title = '',
  description = '',
  image = '',
  className = '',
  buttonSection = false,
  buttonText = ''
}) => {
  return (
    <div className={`w-full h-fit rounded-2xl bg-white/50 px-5 pt-4 pb-0 flex flex-col-reverse gap-4 items-start sm:items-center relative sm:flex-row sm:h-50 ${className}`}>

      {image && <img src={image} alt="" className="h-full" />}

      <div className="w-fit pr-10">
        <h1 className="w-full lg:w-full text-4xl flex gap-2 text-(--color_naranja) font-bold">
          {icon}
          {title}
        </h1>
        {description && <p className="text-(--color_azul) text-start">{description}</p>}
      </div>

      {buttonSection && <Button className='absolute! right-2 top-2 lg:-top-5'>{buttonText}</Button>}

    </div>
  );
};

export default HeaderSection;