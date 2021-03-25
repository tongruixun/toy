---
title: SheetJS解析Excel
date: 2021-03-25 14:24:22
tags: excel
---

# SheetJs

## 一、SheetJs（js-xlsx）简介

由SheetJS出品的js-xlsx是一款非常方便的只需要纯JS即可读取和导出excel的工具库，功能强大，支持格式众多，支持xls、xlsx、ods(一种OpenOffice专有表格文件格式)等十几种格式。本文全部都是以xlsx格式为例


## 二、使用(在React中使用)

#### 一、安装

```shell
npm install xlsx --save
```

#### 二、使用示例

```javascript
import * as Excel from 'xlsx';

function FunctionTest() {

    function onImportExcel(file ) {
        const { files } = file.target;
        const fileReader = new FileReader();

        fileReader.onload = event => {
            try {
                const { result } = event.target;
                // 以二进制流方式读取得到整份excel表格对象
                const workbook = Excel.read(result, { type: 'binary' });
                let data = []; // 存储获取到的数据
                // 遍历每张工作表进行读取（这里默认只读取第一张表）
                for (const sheet in workbook.Sheets) {
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        // 利用 sheet_to_json 方法将 excel 转成 json 数据
                        data = data.concat(Excel.utils.sheet_to_json(workbook.Sheets[sheet]));
                        // break; // 如果只取第一张表，就取消注释这行
                    }
                }
                console.log(data);
            } catch (e) {
                // 这里可以抛出文件类型错误不正确的相关提示
                console.log('文件类型不正确');
                return;
            }
        };
        // 以二进制方式打开文件
        fileReader.readAsBinaryString(files[0]);
    }

    return <div>
        <input type='file' accept='.xlsx, .xls' onChange={onImportExcel} />
    </div>
}

export default FunctionTest;
```

## 三、文档说明

#### 一、工具内导出格式`XLSX.utils.sheet_to_json`

`XLSX.utils.sheet_to_json(ws[,option])`
ws工作表对象
第二个参数`option`可选，
```javascript
option = {
    raw: true,
    range: ws['!ref'],
    // header 控制输出格式
    // header: 1                 时生成二维数组
    // header: "A"               Row object keys are literal column labels
    // header: array of strings  Use specified strings as keys in row objects
    // header: (default)         Read and disambiguate first row as keys
    // header 控制输出格式
    header: '', 
    dateNF: 'FMT 14',
    defval: '',
    blankrows: '**'
}
```


## 链接

> https://github.com/SheetJS/sheetjs