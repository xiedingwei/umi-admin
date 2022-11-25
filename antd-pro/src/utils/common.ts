/**
 * 把平铺的数组结构转成树形结构
 *
 * [
 *  {id:"01", pid:"",   "name":"老王" },
 *  {id:"02", pid:"01", "name":"小张" }
 * ]
 * 上面的结构说明： 老王是小张的上级
 */
export function tranListToTreeData(list) {
  // 1. 定义两个变量
  const treeList = [], map = {}
 
  // 2. 建立一个映射关系，并给每个元素补充routes属性.
  // 映射关系: 目的是让我们能通过id快速找到对应的元素
  // 补充children：让后边的计算更方便
  list.forEach(item => {
    if (!item.routes) {
      item.routes = []
    }
    map[item.id] = item
  })
 
  // 循环
  list.forEach(item => {
    // 对于每一个元素来说，先找它的上级
    //    如果能找到，说明它有上级，则要把它添加到上级的routes中去
    //    如果找不到，说明它没有上级，直接添加到 treeList
    const parent = map[item.parentId]
    // 如果存在上级则表示item不是最顶层的数据
    if (parent) {
      parent.routes.push(item)
    } else {
      // 如果不存在上级 则是顶层数据,直接添加
      treeList.push(item)
    }
  })
  // 返回
  return treeList
}
export default function getNowFormatDate() {
    const date = new Date();
    const seperator1 = "-";
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds= date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    const currentdate = year + seperator1 + month + seperator1 + strDate+" "+hour+":"+minutes+":"+seconds;
    return currentdate;
}