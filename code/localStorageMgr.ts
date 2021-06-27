
/**
 * このクラスは以下の機能を提供する.
 * 1. ローカルストレージにオブジェクトを保存する機能
 * 2. ローカルストレージからオブジェクトを取得する機能
 */
export class localStorageMgr {

  /**
   * オブジェクトの保存先キー情報
   */
  private _localStorageKey:string;

  /**
   * オブジェクトの保存または取得に使用するキーを指定してインスタンスを生成する.
   * @param localStorageKey オブジェクトの保存先キー情報
   */
  constructor(localStorageKey:string){
    this._localStorageKey = localStorageKey;
  }

  /**
   * ローカルストレージからデータを取得する.
   * インスタンス生成時に指定したキーが存在しない場合,空の配列を返す.
   * @returns キーに対応するローカルストレージの値
   */
  fetch() {
    const values = JSON.parse(localStorage.getItem(this._localStorageKey) || '[]')
    return values
  }
  /**
   * 指定したオブジェクトの値をローカルストレージに保存する.
   * @param values ローカルストレージに保存するオブジェクトの値
   */
  save (values:any) {
    localStorage.setItem(this._localStorageKey, JSON.stringify(values))
  }
}
