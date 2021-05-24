import { deviceApi } from '@/page/record/service';

export function generateId(type, number) {
  const generateIdPromise = [];
  for (let i = 0; i < number; i++) {
    generateIdPromise.push(deviceApi.getGenerateId(type));
  }

  return new Promise((resolve) => {
    Promise.all(generateIdPromise)
      .then(res => {
        resolve(res.map(item => item.data));
      });
  });
}

export function numberToHex(value) {
  let result = value;

  result = Number(result)
    .toString(16)
    .toLocaleUpperCase();

  if (result.length % 2 === 1) {
    result = `0${result}`;
  }

  return result;
}
