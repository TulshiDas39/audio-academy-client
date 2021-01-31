export class ArrayUtil{
    static UpdateItem<T>(arr:T[],updatedItem: T,key?: keyof T,indexOfUpdatedItem?:number):T[]{
        let index = -1;
        if(key) index = arr.findIndex(item=>item[key] === updatedItem[key]);
        else if(indexOfUpdatedItem) index = indexOfUpdatedItem;
        else return arr;
        return [
          ...arr.slice(0,index),updatedItem,
          ...arr.slice(index+1)
        ]
    }
    static AddItemToIndex<T>(arr:T[],index:number,item:T){
      return [
        ...arr.slice(0,index),item,
        ...arr.slice(index+1)
      ]
    }
}