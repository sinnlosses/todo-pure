/**
 * このクラスはTODOアイテムの状態を保持する機能を提供する.
 * TODOアイテムはインスタンス生成時に一意に特定するためのIDが自動で付与される.
 */
export class Todo{
    /**
     * TODOアイテムの現在のIDの最大値
     * TODOアイテムの生成時に自動採番される.
     */
    private static _currentMaxId: number = 0;
    /**
     * ID.
     */
    id: number;
    /**
     * タスクが完了したかどうかを示す値
     */
    isCompleted: boolean;
    /**
     * タスクの内容
     */
    content: string;
  
    /**
     * 新しいTODOアイテムを生成する.
     * IDは自動採番される.
     * @param content タスク内容
     * @param isCompleted タスクが完了したかどうか
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