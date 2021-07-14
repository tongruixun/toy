import React, {useEffect, useState} from 'react';
import {Button, Form, Input, message, Upload} from 'antd';
import PropTypes from 'prop-types';
import SpaceBetween from '@/page/record/components/SpaceBetween';
import CustomModal from '@/page/record/components/CustomModal';
import * as api from './service';
import {
    UploadOutlined
} from '@ant-design/icons';

function Post() {

    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [visible, setVisible] = useState(false);
    const [show, setShow] = useState(false);
    const [row, setRow] = useState({});

    function onCancel() {
        form.resetFields();
        setVisible(false);
        setRow({});
    }

    function getPosts() {
        api.getPost()
            .then(data => {
                setDataSource(data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function editPost(records) {
        setRow(records);
        setVisible(true);
    }

    function handleSubmit(values) {
        api.addPost(values).then(() => {
            // getPosts();
            // onCancel();
        }).catch(err => {
            console.log(err);
        })
    }

    function onOk() {
        form.submit();
    }

    function add() {
        setVisible(true);
    }

    return (
        <div>
            <SpaceBetween add={add}/>
            <PostModal
                form={form}
                visible={visible}
                row={row}
                onOk={onOk}
                onCancel={onCancel}
                handleSubmit={handleSubmit}
                isEdit={!!(row.id || row.id === 0)}
            />
        </div>
    );
}

export default Post;

function PostModal({
                       visible,
                       onOk,
                       onCancel,
                       form,
                       handleSubmit,
                       row,
                       isEdit
                   }) {

    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (row.id || row.id === 0) {
            form.setFieldsValue(row);
        }
    }, [row]);

    function onFinish(values) {
        const formData = new FormData();
        formData.append('file',values.post[0].originFileObj);
        handleSubmit(formData);
    }

    const props = {
        accept: '.doc,.docx,.md',
        customRequest: () => {
        },
        fileList: fileList,
        onRemove: file => {
            setFileList(origin => {
                const index = origin.indexOf(file);
                const newFileList = origin.slice();
                newFileList.splice(index, 1);
                return newFileList;
            })
        },
        beforeUpload: () => {
            return new Promise((resolve) => {
                resolve();
            });
        },
        onChange: ({fileList: fl}) => {
            setFileList(fl.map(f => ({...f, status: 'done'})))
        }
    };

    const normFile = (e) => {

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

    return <CustomModal
        title={isEdit ? '编辑角色' : '添加角色'}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
    >
        <Form form={form} onFinish={onFinish}>
            <Form.Item
                name="post"
                label="post"
                valuePropName="fileList"
                getValueFromEvent={normFile}

                extra="longgggggggggggggggggggggggggggggggggg"
            >
                <Upload {...props}>
                    {
                        fileList.length >= 1 ? '' : (<Button icon={<UploadOutlined/>}>上传文件</Button>)
                    }
                </Upload>
            </Form.Item>
        </Form>
    </CustomModal>;
}

PostModal.propTypes = {
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    form: PropTypes.object,
    handleSubmit: PropTypes.func,
    row: PropTypes.object,
    isEdit: PropTypes.bool
};