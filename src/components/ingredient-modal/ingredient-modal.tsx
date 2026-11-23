import { useLoaderData, useNavigate } from 'react-router-dom';

import { InrgedientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';

import type { TIngredient } from '@/utils/types';

export const IngredientModal = (): React.JSX.Element => {
  const navigate = useNavigate();
  const ingredient: TIngredient = useLoaderData();

  const handleClose = (): void => {
    void navigate('/');
  };

  return (
    <Modal title="Детали ингредиента" onClose={handleClose}>
      <InrgedientDetails ingredient={ingredient} />
    </Modal>
  );
};
