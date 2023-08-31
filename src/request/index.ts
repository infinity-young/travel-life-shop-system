import axios from 'axios';
import { BATH_PATH } from '../config/requestConfig';

export function getRequest(path: string, params?: Record<string, any>) {
  const requestParams = {
    token: token,
    ...params
  };
  const fullPath = BATH_PATH + path;
  const searchParams = new URLSearchParams(requestParams);
  return new Promise((resolve, reject) => {
    axios
      .get(fullPath, { params: searchParams })
      .then((response) => {
      //   const re={
      //     "success": true,
      //     "data": [
      //         {
      //             "productCategoryId": 23,
      //             "shopId": 1,
      //             "productCategoryName": "套房",
      //             "priority": 200,
      //             "createTime": null
      //         },
      //         {
      //             "productCategoryId": 24,
      //             "shopId": 1,
      //             "productCategoryName": "大床房",
      //             "priority": 100,
      //             "createTime": null
      //         },
      //         {
      //             "productCategoryId": 25,
      //             "shopId": 1,
      //             "productCategoryName": "双床房",
      //             "priority": 50,
      //             "createTime": null
      //         }
      //     ],
      //     "errorMsg": null,
      //     "errorCode": 0
      // }
      // resolve(re)
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
//token 已经放入store中可以上层可以从store中取
const token =	 "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0dXNlcm5hbWUiLCJpYXQiOjE2OTI4OTk2MzMsImV4cCI6MTY5Mjg5OTY3M30.t6RC8kayNReFZhgLOGqkiUVOQb1a0YIq6uBMKIbZwM0"

export function postRequestJson(path:string,params?){
  const fullPath=BATH_PATH+path;
  return new Promise((resolve,reject)=>{
    axios.post(fullPath,JSON.stringify(params), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(
     (response)=>{
      console.log('======='+JSON.stringify(response))
      resolve(response)
     }
    ).catch(
     (error)=>{
      reject(error)
     }
    );
  })
}
export function postRequest(path:string,params?){
  const fullPath=BATH_PATH+path;
  return new Promise((resolve,reject)=>{
    axios.post(fullPath,params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'json'
    }).then(
     (response)=>{
      console.log('======='+JSON.stringify(response))
      resolve(response)
     }
    ).catch(
     (error)=>{
      reject(error)
     }
    );
  })
}


export function getKaptchaRequest(path:string){
  const fullPath=BATH_PATH+path;
    return new Promise((resolve,reject)=>{
        axios.get(fullPath,{
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer token'
          },
          responseType: 'text' // 设置响应类型为text
        })
        .then((response)=>{ 
          const data=response?.data||"{}"
          const vuekaptchaData=JSON.parse(data)
          const base64Str = vuekaptchaData.vuekaptchaImg; // 将返回的数据解码为base64字符串
          const url = 'data:image/png;base64,' + base64Str;
          const kaptchaCode=vuekaptchaData.vuekaptchaCode;
          const kaptchaData={
            url:url,
            kaptchaCode:kaptchaCode
          }
          resolve(kaptchaData);
        })
        .catch((error)=>{reject(error)})
    })
}

