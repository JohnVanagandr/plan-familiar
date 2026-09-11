import { Button } from '@/components/ui';
import { useNavigate } from 'react-router-dom';

export const HeaderSection = ({
  icon = '',
  title = '',
  description = '',
  image = '',
  className = '',
  buttonSection = false,
  buttonText = '',
  buttonUrl = '',
  onButtonClick = null,
}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else if (buttonUrl) {
      navigate(buttonUrl);
    }
  };

  return (
    <div className={`w-full h-fit rounded-2xl bg-white/50 px-5 pt-4 pb-0 flex flex-col-reverse gap-4 items-start sm:items-center relative sm:flex-row sm:h-50 ${className}`}>

      {image && <img src={image} alt="" className="h-full" />}

      <div className="w-fit pr-10">
        <h1 className="w-full lg:w-full text-4xl flex gap-2 text-(--color_naranja) font-bold">
          {icon}
          {title}
        </h1>
        {description && <p className="text-(--color_azul) text-start pb-4">{description}</p>}
      </div>

      {buttonSection && (
        <Button className='absolute! right-2 top-2 lg:-top-5' onClick={handleClick}>
          {buttonText}
        </Button>
      )}

    </div>
  );
};

export default HeaderSection;