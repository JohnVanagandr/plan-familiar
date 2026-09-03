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
    <div className={`w-full h-50 rounded-2xl bg-white/50 px-5 pt-4 flex gap-4 items-center ${className}`}>

      {image && <img src={image} alt="" className="h-full" />}

      <div className="w-fit">
        <h1 className="w-full text-4xl flex gap-2 text-white">
          {icon && <i className={icon + " text-(--color_naranja)"}></i>}
          {title}
        </h1>
        {description && <p className="text-(--color_azul) text-start">{description}</p>}
      </div>

      {buttonSection && <Button variant='accent'>{buttonText}</Button>}

    </div>
  );
};

export default HeaderSection;