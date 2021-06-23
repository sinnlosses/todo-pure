import { elementIds } from "./elementIds";
import { Todo } from "./todo";
import { StorageMgr} from "./localStorage";
/**
 * TODOをリストとして管理するクラス.
 * 指定したテーブルエレメントに対してリスト表示する機能を有する.
 * 表示モードによって「すべて」、「残タスク」、「完了タスク」のフィルターが可能.
 */
export class TodoListMgr{
    /**
     * テーブル要素.
     */
    private readonly _tableElement:HTMLTableElement;
    /**
     * 表示モード.
     */
    private _showMode: elementIds;
    /**
     * TODOリスト.
     */
    private _todoList: Todo[];

    /**
     * ローカルストレージ管理.
     */
    private _todoStorage:StorageMgr;
  
    /**
     * 管理するテーブルを保持する.
     * 初期表示の表示モードは「すべて」.
     * @param tableElementId テーブルのID.ヘッダを除き行は空である必要がある.
     */
    constructor(tableElementId:string){
      this._tableElement = <HTMLTableElement>document.getElementById(tableElementId);
      this._showMode = elementIds.radioAll;
      this._todoStorage = new StorageMgr("todo-storage-key")
      const todos:Todo[] = this._todoStorage.fetch();
      this._todoList = todos;

      this.drawItems();
      this.updateFooter(this.getLeftCount());

    }
  
    /**
     * 新しいタスクを追加する.
     * @param content タスク内容
     */
    public addOne(content:string){
      const todo:Todo = new Todo(content);
      this._todoList.push(todo);
      this.drawItems();
      this.updateFooter(this.getLeftCount());
      this._todoStorage.save(this._todoList);
    }

    /**
     * 指定した表示モードにしたがって表示項目をフィルターする.
     * @param showMode 表示モード
     */
    public changeVisibleList(showMode: elementIds){
      this._showMode = showMode;
      this.drawItems();
      this._todoStorage.save(this._todoList);
    }

    /**
     * 指定したJsonファイルをタスクリストにImportする.
     * JsonオブジェクトにおけるIDは引き継がれず新規に採番される.
     * @param json Import対象
     */
    public importFile(json: string){
      const todos:Todo[] = JSON.parse(json);
      const todosToAdd:Todo[] = todos.map((todo: Todo) => {
        return new Todo(todo.content, todo.isCompleted === true);
      });
      this._todoList = this._todoList.concat(todosToAdd);
      this.drawItems();
      this.updateFooter(this.getLeftCount());
      this._todoStorage.save(this._todoList);
    }
  
    /**
     * TODOリストをJson形式にして返す.
     */
    public toJson(){
      const json:string = JSON.stringify(this._todoList);
      return json;
    }

    /**
     * タスクのステータスを更新する.
     * @param statusButton ステータスボタン
     * @param id タスクのID
     */
    private updateStatusById(statusButton: HTMLInputElement, id:number){
      this.updateStatus(id, statusButton.checked);
      this.drawItems();  
      this.updateFooter(this.getLeftCount());
      this._todoStorage.save(this._todoList);
    }

    /**
     * 指定したIDのタスクのステータスを更新する.
     * @param id タスクのID
     * @param isCompleted タスクが完了しているかどうか
     */
     private updateStatus(id:number, isCompleted:boolean){
      this._todoList.forEach(function(todo){
        if (todo.id === id){
          todo.isCompleted = isCompleted;
        }
      });
    }

    /**
     * 指定したIDが属する行を削除する.
     */
    private deleteOneById(id:number){
      this.deleteOneFromListById(id);
      this.drawItems();
      this.updateFooter(this.getLeftCount());
      this._todoStorage.save(this._todoList);
    }

    /**
     * 指定したIDのタスクを削除する.
     * @param id タスクのID
     */
     private deleteOneFromListById(id:number){
      this._todoList = this._todoList.filter(todo => todo.id !== id);
    }

    /**
     * タスクを現在の表示モードに従ってHTMLに描画する.
     */
     private drawItems(){
      // 描画前にすでに描画されているタスクを削除する.
      this.eraseAllItems();
  
      let showList: Todo[];
      if (this._showMode === elementIds.radioAll){
        showList = this._todoList;
      } else if (this._showMode === elementIds.radioLeft){
        showList = this._todoList.filter(value => !value.isCompleted);
      } else if (this._showMode === elementIds.radioComp){
        showList = this._todoList.filter(value => value.isCompleted);
      } else {
        showList = [];
      }
      showList.forEach(value => {this.drawOne(value.content, value.isCompleted, value.id);})
    }

    /**
     * 描画されたすべてのタスクをHTMLから削除する.
     */
     private eraseAllItems(){
      const rowCount:number = this._tableElement.tBodies[0].rows.length;
      for (let i = rowCount-1; i >= 0; i--){
        this._tableElement.tBodies[0].deleteRow(i);
      }
    }

    /**
     * 指定したタスクをHTMLに描画する.
     * @param content タスク内容
     * @param isCompleted 完了しているかどうか
     * @param id タスクのID
     */
     private drawOne(content:string, isCompleted:boolean, id:number):void{
      const row: HTMLTableRowElement = this._tableElement.tBodies[0].insertRow(-1);
  
      const tdStatus = row.insertCell(-1);
      const tdContent = row.insertCell(-1);
      const tdDelete = row.insertCell(-1);
  
      const checked:string = isCompleted ? "checked" : "";
      tdStatus.innerHTML = `<input type="checkbox" aria-label="Checkbox for following text input" ${checked}>`;
      tdContent.innerHTML = content;
      tdDelete.innerHTML = `<button class="btn btn-danger">delete</button>`;

      tdStatus.addEventListener("change", (e) => {
        this.updateStatusById(e.target as HTMLInputElement,id);
      });
      tdDelete.addEventListener("click", () => {
        this.deleteOneById(id);
      });
    }

    /**
     * フッターを更新する.
     * 1. 残タスクの個数を更新する.
     */
     private updateFooter(leftCount: number):void{
      const itemOrItems: string = leftCount >= 2 ? "items": "item";
      const td:HTMLTableColElement = <HTMLTableColElement>document.getElementById(elementIds.leftCount);
      td.innerHTML = `${leftCount} ${itemOrItems} left`;
    }

    /**
     * 残っているタスクの数を返す.
     * @returns 残っているタスクの数
     */
    private getLeftCount(): number{
      return this._todoList.reduce((acc, value) => {
        return acc + (value.isCompleted ? 0 : 1);
      }, 0);
    }
  }