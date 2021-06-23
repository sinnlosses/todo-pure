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
    id: number;
    /**
     * タスクが完了したかどうかを示す値.
     */
    isCompleted: boolean;
    /**
     * タスクの内容.
     */
    content: string;
  
    /**
     * 新しいTODOタスクを生成する.
     * IDは自動採番される.
     * @param content タスク内容
     */
    constructor(content: string, isCompleted:boolean=false){
      this.id = this.numberingId();
      this.isCompleted = isCompleted;
      this.content = content;
    }
  
    /**
     * IDを採番して返す.
     * @returns 採番されたID
     */
    private numberingId(): number{
      Todo._currentMaxId++;
      return Todo._currentMaxId;
    }
  }