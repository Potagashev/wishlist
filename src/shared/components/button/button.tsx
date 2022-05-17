import React, { ReactNode } from "react";
import { ButtonVariant } from "../../interfaces/ButtonVariant";
import { ButtonTypes } from "../../interfaces/ButtonVariant";

import classes from "./button.module.scss";

interface IProps {
  onClick?: (e: React.MouseEvent) => void | undefined;
  children: string | number | ReactNode;
  variant: ButtonVariant | null;
  active?: boolean | undefined;
  disabled?: boolean;
  background?: string;
  type?: ButtonTypes;
}

const Button: React.FC<IProps> = ({
  onClick,
  children,
  variant,
  disabled,
  background,
  type,
}) => {
  const switchButtonClasses = (variant: ButtonVariant | null): string => {
    switch (variant) {
      case ButtonVariant.default:
        return buttonClasses.default;

      case ButtonVariant.rounded:
        return buttonClasses.rounded;

      case ButtonVariant.pagination:
        return buttonClasses.pagination;

      case ButtonVariant.disabled:
        return buttonClasses.disabled;

      case ButtonVariant.submit:
        return buttonClasses.submit;

      default:
        return buttonClasses.default;
    }
  };
  const buttonClasses = {
    pagination: `${classes.buttonDefault} ${classes.paginateButton}`,
    default: classes.buttonDefault,
    disabled: `${classes.buttonDefault} ${classes.disabled}`,
    rounded: `${classes.buttonDefault} ${classes.rounded}`,
    submit: `${classes.buttonDefault} ${classes.submit}`,
  };
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={switchButtonClasses(variant)}
      style={{
        pointerEvents: disabled ? "none" : "all",
        background: background,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
