import assert from 'assert';
import cache from 'memory-cache';

import { create, del, list, simplieList, get, update } from '../index.mjs';
const { CORP_ID, SECRET, TEST_PARENT_ID } = process.env;

const options = {
  corpId: CORP_ID,
  secret: SECRET,
};
let deptid;
describe('wecom-department 测试', function() {
  after(() => cache.clear());
  this.timeout(100000);
  it('create 创建部门', async () => {
    const res = await create({
      parentid: TEST_PARENT_ID,
      name: 'test',
    }, options);
    assert.ok(res);
    deptid = res;
  });
  it('list 获取部门列表', async () => {
    const res = await list(TEST_PARENT_ID, options);
    assert.ok(res.length);
  });
  it('simpleList 获取子部门ID列表', async () => {
    const res = await simplieList(TEST_PARENT_ID, options);
    assert.ok(res.length);
  });
  it('update 更新部门', async () => {
    const res = await update({
      name: 'test2',
      id: deptid,
    }, options);
    assert.equal(res, 0);
  });
  it('get 获取单个部门详情', async () => {
    const res = await get(deptid, options);
    assert.ok(res);
    assert.equal(res.name, 'test2');
  });
  it('del 删除部门', async () => {
    const res = await del(deptid, options);
    assert.equal(res, 0);
  });
});