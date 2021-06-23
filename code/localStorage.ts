// https://jp.vuejs.org/v2/examples/todomvc.html

/**
 * ローカルストレージを使用するためのクラス
 */
export class StorageMgr {

  /**
   * ローカルストレージのキー
   */
  private _storageKey:string;
  /**
   * 
   * @param storageKey キー
   */
  constructor(storageKey:string){
    this._storageKey = storageKey;
  }

  /**
   * キーを指定してローカルストレージからデータを取得する.
   * @returns 
   */
  fetch() {
    const values = JSON.parse(localStorage.getItem(this._storageKey) || '[]')
    return values
  }
  /**
   * ローカルストレージにデータを出力する.
   * @param values 
   */
  save (values:any) {
    localStorage.setItem(this._storageKey, JSON.stringify(values))
  }
}
