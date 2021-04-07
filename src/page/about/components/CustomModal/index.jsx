import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

function CustomModal({
  children,
  title,
  visible,
  onOk,
  onCancel,
  okText,
  cancelText,
  ...restProp
}) {
  return <Modal
    title={title}
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
    okText={okText}
    cancelText={cancelText}
    {...restProp}
  >
    {children}
  </Modal>;
}

export default CustomModal;

CustomModal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  okText: PropTypes.string,
  cancelText: PropTypes.string
};

CustomModal.defaultProps = {
  okText: '确定',
  cancelText: '取消'
};
