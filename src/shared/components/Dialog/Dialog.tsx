import React, { ReactNode, useEffect, useState } from "react";

import { Button } from "../index";
import { ButtonVariant } from "../../interfaces/ButtonVariant";

import closeIcon from "../../assets/static/icons/closeIcon.svg";

import classes from "./dialog.module.scss";

interface IProps {
  open: boolean;
  children: ReactNode | undefined;
  onClose: (e: React.MouseEvent) => void;
  title?: string;
  overwrite?: boolean;
}

const Dialog: React.FC<IProps> = ({
  open,
  children,
  onClose,
  title,
  overwrite,
}): JSX.Element | null => {
  useEffect(() => {
    if (open) {
      setIsReadyToAnimate(true);
    }

    if (!open) {
      setIsReadyToAnimate(false);
    }
  }, [open]);

  const [isReadyToAnimate, setIsReadyToAnimate] = useState<boolean>(false);

  const handleOnContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!open) {
    return null;
  }

  return (
    <div
      className={
        isReadyToAnimate ? `${classes.modal} ${classes.active}` : classes.modal
      }
      onClick={onClose}
      style={{ zIndex: overwrite ? 1000 : 100 }}
    >
      <div
        className={
          open
            ? `${classes.modalContent} ${classes.active}`
            : classes.modalContent
        }
        onClick={handleOnContentClick}
      >
        <div className={classes.modalHeader}>
          <h2>{title}</h2>
          <Button onClick={onClose} variant={ButtonVariant.rounded}>
            <img src={closeIcon} />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
