/**
 * HTML内に記述したID群の列挙.
 * HTML内に記述された要素のうち、取得可能性のあるもののみ記述している.
 * ID値の追加、変更と同時に本列挙体を更新すること.
 */
const elementIds = {
  /**
   * タスク入力欄
   */
  input: "input",
  /**
   * ファイル入力
   */
  inputFile: "input-file",
  /**
   * TODOリスト
   */
  tableItems: "table-items",
  /**
   * 残タスクラベル
   */
  leftCount: "left-count",
  /**
   * ラジオボタンAll
   */
  radioAll: "radio-all",
  /**
   * ラジオボタンLeft
   */
  radioLeft: "radio-left",
  /**
   * ラジオボタンComp
   */
  radioComp: "radio-comp",
  /**
   * ファイルExport
   */
  export: "export"
} as const;
type elementIds = typeof elementIds[keyof typeof elementIds];

/**
 * TODOをリストとして管理するクラス.
 * 指定したテーブルエレメントに対してリスト表示する機能を有する.
 * 表示モードによって「すべて」、「残タスク」、「完了タスク」のフィルターが可能.
 */
 class TodoListMgr{
  /**
   * テーブル要素.
   */
  private readonly _tableElement:HTMLTableElement;
  /**
   * 表示モード.
   */
  showMode: elementIds;
  /**
   * TODOリスト.
   */
  private todoList: Todo[];

  /**
   * 管理するテーブルを保持する.
   * 初期表示の表示モードは「すべて」.
   * @param tableElementId テーブルのID.ヘッダを除き行は空である必要がある.
   */
  constructor(tableElementId:string){
    this._tableElement = <HTMLTableElement>document.getElementById(tableElementId);
    this.showMode = elementIds.radioAll;
    this.todoList = new Array();
  }

  /**
   * 新しいタスクを追加する.
   * @param content タスク内容
   */
  addItem(content:string){
    const todo:Todo = new Todo(content);
    this.todoList.push(todo);
  }

  /**
   * 指定したIDのタスクのステータスを更新する.
   * @param id タスクのID
   * @param isCompleted タスクが完了しているかどうか
   */
  updateStatus(id:number, isCompleted:boolean){
    this.todoList.forEach(function(todo){
      if (todo.id === id){
        todo.isCompleted = isCompleted;
      }
    });
  }

  /**
   * 指定したIDのタスクを削除する.
   * @param id タスクのID
   */
  deleteItem(id:number){
    this.todoList = this.todoList.filter(todo => todo.id !== id);
  }

  /**
   * 残っているタスクの数を返す.
   * @returns 残っているタスクの数
   */
  getLeftCount(): number{
    return this.todoList.reduce((acc, value) => {
      return acc + (value.isCompleted ? 0 : 1);
    }, 0);
  }

  /**
   * タスクを現在の表示モードに従ってHTMLに描画する.
   */
  drawItems(){
    // 重複してタスクが表示されてしまうため描画前にすでに描画されているタスクを削除する.
    this.eraseAllItems();

    let showList: Todo[];
    if (this.showMode === elementIds.radioAll){
      showList = this.todoList;
    } else if (this.showMode === elementIds.radioLeft){
      showList = this.todoList.filter(value => !value.isCompleted);
    } else if (this.showMode === elementIds.radioComp){
      showList = this.todoList.filter(value => value.isCompleted);
    } else {
      showList = [];
    }
    showList.forEach(value => {this.showItem(value.content, value.isCompleted, value.id);})
  }

  /**
   * 指定したファイルをImportする.
   * @param file Import対象
   */
  importFile(file: string){
    const todos: string[] = file.split("\n");
    const todosToAdd:Todo[] = todos.map((todo) => {
      const splitedTodo:string[] = todo.split(",");
      return new Todo(splitedTodo[0], splitedTodo[1] === "true");
    });
    this.todoList = this.todoList.concat(todosToAdd);
    this.drawItems();
  }

  /**
   * TODOリストをCsv形式にして返す.
   */
  toCsvString(){
    const text:string[] = this.todoList.map((todo) => todo.content + "," + todo.isCompleted);
    return text.join("\n");
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
  private showItem(content:string, isCompleted:boolean, id:number):void{
    const row: HTMLTableRowElement = this._tableElement.tBodies[0].insertRow(-1);

    const tdStatus = row.insertCell(-1);
    const tdContent = row.insertCell(-1);
    const tdDelete = row.insertCell(-1);

    const checked:string = isCompleted ? "checked" : "";
    tdStatus.innerHTML = `<input type="checkbox" aria-label="Checkbox for following text input" onchange="updateTodo(this,${id})" ${checked}>`;
    tdContent.innerHTML = content;
    tdDelete.innerHTML = `<button class="btn btn-danger" onclick="deleteItem(${id})">delete</button>`;
  }
}
const todoListMgr:TodoListMgr = new TodoListMgr(elementIds.tableItems);

/**
 * TODOアイテムの状態を管理するクラス.
 * インスタンス生成時にインスタンスを一意に特定するためのIDが自動で採番され付与される.
 */
 class Todo{
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
  isCompleted: boolean;
  /**
   * タスクの内容.
   */
  private readonly _content: string;

  /**
   * 新しいTODOタスクを生成する.
   * IDは自動採番される.
   * タスクは未完了状態で生成する.
   * @param content タスク内容
   */
  constructor(content: string, isCompleted:boolean=false){
    this._id = this.numberingId();
    this.isCompleted = isCompleted;
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
}

/**
 * TODOアイテムを1つ追加する.
 * タスクの内容が未入力の場合は何もしない.
 */
function addItem():void{
  const inputTodoElement: HTMLInputElement = <HTMLInputElement>document.getElementById(elementIds.input);
  const content: string = inputTodoElement.value;

  if (content === ""){
    return;
  }

  todoListMgr.addItem(content);
  todoListMgr.drawItems();

  updateFooter();

  // アイテム追加後は再度入力できるよう値をリセットする.
  inputTodoElement.value = "";

}

/**
 * 指定したIDが属する行を削除する.
 */
function deleteItem(id:number){
  todoListMgr.deleteItem(id);
  todoListMgr.drawItems();
  updateFooter();
}

/**
 * ファイルのImportを行う.
 */
function importFile(){
  const fileElement: HTMLInputElement = <HTMLInputElement>document.getElementById(elementIds.inputFile);
  if (fileElement == null || fileElement.files == null || fileElement.files[0] == null){
    return;
  }
  const file:Blob = fileElement.files[0];

  const reader = new FileReader();
  reader.onload = () => {
    todoListMgr.importFile(reader.result as string);
  }
  reader.readAsText(file);
}

/**
 * タスクをファイルに出力する.
 */
function exportFile(){
  const text:string = todoListMgr.toCsvString();
  const blob = new Blob([text], {"type":"application/octet-stream"});
  window.URL = window.URL || window.webkitURL;
  
  const link: HTMLLinkElement = <HTMLLinkElement>document.getElementById(elementIds.export);
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", "export.txt");
}

/**
 * タスクのステータスを更新する.
 * @param statusButton ステータスボタン
 * @param id タスクのID
 */
function updateTodo(statusButton: HTMLInputElement, id:number){
  todoListMgr.updateStatus(id, statusButton.checked);
  todoListMgr.drawItems();
  updateFooter();

}

/**
 * 表示モードを変更する.
 * @param chkBox チェックボックス
 */
function changeVisibleList(chkBox:HTMLInputElement): void{
  if (!chkBox.checked){
    return;
  }
  todoListMgr.showMode = chkBox.id as elementIds;
  todoListMgr.drawItems();
}

/**
 * フッターを更新する.
 * 1. 残タスクの個数を更新する.
 */
function　updateFooter():void{
  const leftCount:number = todoListMgr.getLeftCount();
  const itemOrItems: string = leftCount >= 2 ? "items": "item";
  const td:HTMLTableColElement = <HTMLTableColElement>document.getElementById(elementIds.leftCount);
  td.innerHTML = `${leftCount} ${itemOrItems} left`;
}
