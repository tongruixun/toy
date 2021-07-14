import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Button, Space} from 'antd';
import {DownOutlined, UpOutlined} from '@ant-design/icons';
import showdown from 'showdown'
import styles from './index.less';

function ItemInput(props) {
    const {
        label,
        ...restProps
    } = props;
    return <Form.Item label={label} {...restProps}>
        <Input style={{width: 240}}/>
    </Form.Item>;
}

ItemInput.propTypes = {
    label: PropTypes.string
};

function ExpandableSearch(props) {

    const {search} = props;
    const [expand, setExpand] = useState('展开');
    const [htmlStr, setHtmlStr] = useState('');

    function renderSearch() {
        return search.map((item, index) => {
            if (expand === '展开' && index > 2) return null;
            return <ItemInput key={item.name} {...item}/>;
        });
    }

    function renderEmptyTag() {
        let len = search.length;
        if (expand === '展开' && len > 2) return null;
        let num = 3 - (len % 4);
        return search.map((_, index) => {
            let key = index + num;
            if (index < num) {
                return <i key={key}/>;
            }
            return null;
        });
    }

    function onFinish(values) {
        console.log(values);
    }

    function parseMarkDown() {
        const coverter = new showdown.Converter();
        const htmlText = coverter.makeHtml('## 一、主键ID使用雪花算法，传给前端精度丢失\r\n\r\n\r\n\r\n#### 一、原因\r\n\r\n雪花算法存数据库使用Long类型长度是19位，前端js  Number类型是16位，因此引起精度丢失\r\n\r\n\r\n\r\n#### 二、解决方案\r\n\r\n一、使用注解\r\n\r\n```java\r\n/**\r\n* 防止精度丢失\r\n*/\r\n@JsonSerialize(using = ToStringSerializer.class)\r\nprivate Long id;\r\n```\r\n\r\n二、全局配置类\r\n\r\n```java\r\n@Configuration\r\npublic class JacksonConfig {\r\n\r\n  @Bean\r\n  @Primary\r\n  @ConditionalOnMissingBean(ObjectMapper.class)\r\n  public ObjectMapper jacksonObjectMapper(Jackson2ObjectMapperBuilder builder)\r\n  {\r\n    ObjectMapper objectMapper = builder.createXmlMapper(false).build();\r\n\r\n    // 全局配置序列化返回 JSON 处理\r\n    SimpleModule simpleModule = new SimpleModule();\r\n    //JSON Long ==> String\r\n    simpleModule.addSerializer(Long.class, ToStringSerializer.instance);\r\n    objectMapper.registerModule(simpleModule);\r\n    return objectMapper;\r\n  }\r\n\r\n}\r\n```\r\n\r\n')
        setHtmlStr(htmlText);
    }

    return <Form onFinish={onFinish} layout='inline' className={styles.formWrap}>
        {
            renderSearch()
        }
        {
            renderEmptyTag()
        }
        <Space className={styles.handleBtn}>
            <Button htmlType='submit'>查询</Button>
            <Button onClick={parseMarkDown}>重置</Button>
            <Button
                type='link'
                onClick={() => {
                    setExpand(expand === '收起' ? '展开' : '收起');
                }}
            >
                {expand} {expand === '收起' ? <UpOutlined/> : <DownOutlined/>}
            </Button>
        </Space>
        <div dangerouslySetInnerHTML={{__html: htmlStr}}/>
    </Form>;
}

ExpandableSearch.propTypes = {
    search: PropTypes.arrayOf(PropTypes.object)
};

function Home() {

    const search = [
        {
            name: 'tag1',
            label: '公司标签1'
        },
        {
            name: 'tag2',
            label: '公司标签2'
        },
        {
            name: 'tag3',
            label: '公司标签3'
        },
        {
            name: 'tag4',
            label: '公司标签4'
        },
        {
            name: 'tag5',
            label: '公司标签5'
        },
        {
            name: 'tag6',
            label: '公司标签6'
        }
    ];

    return <>
        <ExpandableSearch search={search}/>
        <br/>
        <form action="http://localhost:9002/post/fileUpload" method="post" encType="multipart/form-data">
            <div>
                <label htmlFor="file">单文件</label>
                <input type="file" name="file" id="file"/>
            </div>
            {/*<div>*/}
            {/*  <label htmlFor="files">多文件</label>*/}
            {/*  <input type="file" name="files" multiple id="files"/>*/}
            {/*</div>*/}
            <div>
                <button type="submit">提交</button>
            </div>
        </form>
    </>;
}

export default Home;
