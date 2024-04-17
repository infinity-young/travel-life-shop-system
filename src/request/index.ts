import axios from 'axios';
import { BATH_PATH } from '../config/requestConfig';
import store from '../stores/index'


export function getRequest(path: string, params?: Record<string, any>) {
  const token = store.getters['common/getToken']
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
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function postRequestJson(path:string,params?){
  const fullPath=BATH_PATH+path;
  const token = store.getters['common/getToken']

  return new Promise((resolve,reject)=>{
    axios.post(fullPath,JSON.stringify(params), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization':  token
      }
    }).then(
     (response)=>{
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
  const token = store.getters['common/getToken']
  return new Promise((resolve,reject)=>{
    axios.post(fullPath,params, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization':  token
      },
      responseType: 'json'
    }).then(
     (response)=>{
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
  const token = store.getters['common/getToken']
    return new Promise((resolve,reject)=>{
        axios.get(fullPath,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization':  token
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

