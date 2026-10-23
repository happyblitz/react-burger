import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

type TModalProps = {
  title: string;
  onClose: () => void;
  children: React.JSX.Element;
};

export const Modal = ({ title, children, onClose }: TModalProps): React.JSX.Element => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return (): void => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className="text text_type_main-large">{title}</h2>
          <div onClick={onClose} className={styles.modalCloseBtn}>
            <CloseIcon type="primary" />
          </div>
        </div>
        <div>{children}</div>
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    document.body
  );
};
