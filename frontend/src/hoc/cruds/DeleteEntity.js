import React, { useState } from 'react';
import DeleteModal from '@core/modals/DeleteModal';
import { showError, showSuccess } from '@utils/helpers';
import DeleteButton from '@core/buttons/atoms/DeleteButton';
import { useTranslation } from 'react-i18next';
import useHasPermission from '@hooks/useHasPermission';

const DeleteEntity = ({ service, id, onDeleted, permission }) => {
  const canAccess = useHasPermission(permission);
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = () => {
    service
      .destroy(id)
      .then(() => {
        showSuccess(t('deletedSuccessfully'));
        onDeleted();
        closeModal();
      })
      .catch((err) => {
        showError(err.response.data.message);
      });
  };
  if (!canAccess) {
    return null;
  }
  return (
    <div>
      <DeleteButton onClick={() => setShowModal(true)} />
      <DeleteModal
        show={showModal}
        title={`${t('areYouSure')}`}
        onClose={closeModal}
        onSubmit={onSubmit}>
        <div className="text-lg my-3 ml-5">
          <span>{t('areYouSureYouWantToDeleteThisEntity')}</span>
        </div>
      </DeleteModal>
    </div>
  );
};

export default DeleteEntity;
