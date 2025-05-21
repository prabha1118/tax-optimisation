
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface HowItWorksProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const HowItWorks = ({ isOpen, onClose }: HowItWorksProps = {}) => {
  const [open, setOpen] = useState(isOpen || false);
  
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen && onClose) {
      onClose();
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <a 
          href="#" 
          onClick={(e) => { 
            e.preventDefault(); 
            setOpen(true); 
          }} 
          className="text-info-blue text-sm hover:underline"
        >
          How it works?
        </a>
      </PopoverTrigger>
      <PopoverContent 
        className="w-96 bg-white text-foreground p-5 shadow-lg rounded-lg"
        align="start"
        sideOffset={5}
      >
        <p className="text-black">
          Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh semper mattis scelerisque tellus. 
          Vel mattis diam duis morbi tellus dui consectetur.
          <a href="#" className="text-info-blue block mt-2 hover:underline">Know More</a>
        </p>
      </PopoverContent>
    </Popover>
  );
};

export default HowItWorks;
