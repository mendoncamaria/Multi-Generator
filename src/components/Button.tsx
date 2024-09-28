import React from 'react';

interface ButtonProps {
  HandleButtonClick: () => void;
  buttonLabel: string;
  buttonStyle: string;
}

const Button: React.FC<ButtonProps> = ({
  HandleButtonClick,
  buttonLabel,
  buttonStyle,
}) => {
  return (
    <button className={buttonStyle} onClick={HandleButtonClick}>
      {buttonLabel}
    </button>
  );
};

export default Button;
