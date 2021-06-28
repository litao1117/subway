import crypto from 'crypto-js'
import {Base64} from 'js-base64'

import {faultModel} from './fault'
let faultmodel = new faultModel();

// 计算签名。
function computeSignature(accessKeySecret, canonicalString) {
  return crypto.enc.Base64.stringify(crypto.HmacSHA1(canonicalString, accessKeySecret));
}

const date = new Date();
date.setHours(date.getHours() + 1);
const policyText = {
  expiration: date.toISOString(), // 设置policy过期时间。
  conditions: [
    // 限制上传大小。
    ["content-length-range", 0, 1024 * 1024 * 1024],
  ],
};

function getFormDataParams() {
  return new Promise((resolve, reject) => {
    let credentials;
    faultmodel.getFormData((res) => {
      console.log(res)
      if(res.code === 200) {
        credentials = res.data.sts;
        const policy = Base64.encode(JSON.stringify(policyText)) // policy必须为base64的string。
        const signature = computeSignature(credentials.access_Key_Secret, policy)
        const formData = {
          OSSAccessKeyId: credentials.access_Key_Id,
          signature,
          policy,
          'x-oss-security-token': credentials.security_Token 
        }
        resolve(formData);
      } else {
        reject(res)
      }
    })
  })
}

export {getFormDataParams}