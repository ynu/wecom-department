/* eslint-disable no-console */
/**
 * 企业微信API-通讯录管理-部门管理
 * https://work.weixin.qq.com/api/doc/90000/90135/90204
 */

import Debug from 'debug';
import { getToken, qyHost, WecomError } from 'wecom-common';
import axios from 'axios';

const debug = Debug('wecom-department:debug');
const warn = Debug('wecom-department:warn');

 
 
 /**
  * 创建部门
  * @param {Object} dept 部门，详见：https://work.weixin.qq.com/api/doc/90000/90135/90205
  * @returns dept
  */
 export const create = async (dept, options) => {
   const token = await getToken(options);
   
   const res = await axios.post(`${qyHost}/department/create?access_token=${token}`, dept);
   const { errcode, errmsg, id } = res.data;
   // 处理错误
   if (errcode) {
    throw new WecomError(errcode, errmsg);
   }
   return id;
 };
 
 /**
  * 更新部门
  * @param {Object} dept 部门
  * @see https://work.weixin.qq.com/api/doc/90000/90135/90206
  * @returns dept
  */
export const update = async (dept, options) => {
   const token = await getToken(options);
   const res = await axios.post(`${qyHost}/department/update?access_token=${token}`, dept);
   const { errcode, errmsg } = res.data;
   if (errcode) {
    throw new WecomError(errcode, errmsg);
   }
   return errcode;
 };
 


  /**
  * 获取指定部门及其下的子部门（以及子部门的子部门等等，递归）列表
  * https://work.weixin.qq.com/api/doc/90000/90135/90208
  * @param {String} id 父部门id
  * @returns dept
  */
  export const list = async (id, options) => {
    const token = await getToken(options);
    const res = await axios.get(`${qyHost}/department/list?access_token=${token}&id=${id}`);
    const { errcode, errmsg, department } = res.data;
    // 处理错误
    if (errcode) {
     throw new WecomError(errcode, errmsg);
    }
    return department;
  };

/**
  * 获取子部门ID列表
  * https://developer.work.weixin.qq.com/document/path/95350
  * @param {String} id 父部门id
  * @returns dept
  */
export const simplieList = async (id, options) => {
  const token = await getToken(options);
  const res = await axios.get(`${qyHost}/department/simplelist?access_token=${token}&id=${id}`);
  const { errcode, errmsg, department_id } = res.data;
  // 处理错误
  if (errcode) {
  throw new WecomError(errcode, errmsg);
  }
  return department_id;
};

/**
  * 获取单个部门详情
  * https://developer.work.weixin.qq.com/document/path/95351
  * @param {String} id 部门id
  * @returns dept
  */
export const get = async (id, options) => {
  const token = await getToken(options);
  const res = await axios.get(`${qyHost}/department/get?access_token=${token}&id=${id}`);
  const { errcode, errmsg, department } = res.data;
  // 处理错误
  if (errcode) {
  throw new WecomError(errcode, errmsg);
  }
  return department;
};
 
 /**
  * 删除部门（注：不能删除根部门；不能删除含有子部门、成员的部门）
  * https://work.weixin.qq.com/api/doc/90000/90135/90207
  * @param {String} id 部门id
  * @returns dept
  */
 export const del = async (id, options) => {
   const token = await getToken(options);
   const res = await axios.get(`${qyHost}/department/delete?access_token=${token}&id=${id}`);
   const { errcode, errmsg } = res.data;
   if (errcode) {
    throw new WecomError(errcode, errmsg);
   }
   return 0;
 };
 
 export default {
   create,
   update,
   list,
   del,
   simplieList,
   get,
 };
 