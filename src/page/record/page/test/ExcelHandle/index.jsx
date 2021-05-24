import React, { useState } from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function ExcelHandle() {

  const [anFileList, setAnFileList] = useState([]);

  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange: this.handleChange,
    multiple: true,
  };

  return <Upload {...props} fileList={anFileList}>
    <Button icon={<UploadOutlined/>}>Upload</Button>
  </Upload>;
}

export default ExcelHandle;
