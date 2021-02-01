import React, { useState } from 'react';
import Tipos from 'prop-types';

import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';

function ConfirmButton({ acceptAction, confirmProps, ...buttonProps }) {
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    acceptAction();
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  const { message } = confirmProps;
  return (
    <>
      <Button type="primary" onClick={showModal} {...buttonProps} />

      <Modal
        title="Delete Advert"
        visible={modalVisible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        {...confirmProps}>
        <p>{message}</p>
      </Modal>
    </>
  );
}

ConfirmButton.propTypes = {
  acceptAction: Tipos.func,
  confirmProps: Tipos.object,
};

export default ConfirmButton;
