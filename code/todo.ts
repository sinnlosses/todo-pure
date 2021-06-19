/**
 * TODOアイテムの状態を管理するクラス.
 * インスタンス生成時にインスタンスを一意に特定するためのIDが自動で採番され付与される.
 */
export class Todo{
    /**
     * IDの自動採番に使用される値.
     */
    private static _currentMaxId: number = 0;
    /**
     * ID.
     */
    private readonly _id: number;
    /**
     * タスクが完了したかどうかを示す値.
     */
    private _isCompleted: boolean;
    /**
     * タスクの内容.
     */
    private readonly _content: string;
  
    /**
     * 新しいTODOタスクを生成する.
     * IDは自動採番される.
     * @param content タスク内容
     */
    constructor(content: string, isCompleted:boolean=false){
      this._id = this.numberingId();
      this._isCompleted = isCompleted;
      this._content = content;
    }
  
    /**
     * IDを採番して返す.
     * @returns 採番されたID
     */
    private numberingId(): number{
      Todo._currentMaxId++;
      return Todo._currentMaxId;
    }
  
    get id(): number{
      return this._id;
    }
  
    get content(): string{
      return this._content;
    }

    get isCompleted(): boolean{
      return this._isCompleted;
    }
    set isCompleted(value: boolean){
      this._isCompleted = value;
    }
  }