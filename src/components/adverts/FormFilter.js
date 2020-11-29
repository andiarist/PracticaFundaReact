import React from 'react';

import 'antd/dist/antd.css';
import {
  Form,
  Select,
  Input,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const FormFilter = () => {
  return (
    <>
      <Form.Item
        label="Nombre"
        name="name"
        rules={[
          {
            required: false,
            message: 'Name',
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="sale"
        label="Estado"
        rules={[
          {
            required: false,
            message: '',
          },
        ]}>
        <Radio.Group>
          <Radio.Button value="Sell">Comprar</Radio.Button>
          <Radio.Button value="Buy">Vender</Radio.Button>
          <Radio.Button value="All">Todos</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="tags"
        label="Tags"
        rules={[
          {
            required: false,
            message: '',
            type: 'array',
          },
        ]}>
        <Select mode="multiple" placeholder="">
          <Option value="lifestyle">lifestyle</Option>
          <Option value="motor">motor</Option>
          <Option value="mobile">mobile</Option>
        </Select>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}>
        <Button type="primary" htmlType="submit">
          Buscar
        </Button>
      </Form.Item>
    </>
  );
};

export default FormFilter;
