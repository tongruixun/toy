import React from 'react';
import PropTypes from 'prop-types';
import * as Excel from 'xlsx';

function ExcelInput({ onChange }) {

  function onImportExcel(file) {
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
            data = data.concat(Excel.utils.sheet_to_json(workbook.Sheets[sheet], { header: 1 }));
            break; // 如果只取第一张表，就取消注释这行
          }
        }
        onChange(data);
      } catch (e) {
        // 这里可以抛出文件类型错误不正确的相关提示
        console.log('文件类型不正确');
      }
    };
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0]);
  }

  return <input type='file' accept='.xlsx, .xls' onChange={onImportExcel}/>;
}

export default ExcelInput;

ExcelInput.propTypes = {
  onChange: PropTypes.func
};




