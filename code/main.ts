import {elementIds} from "./elementIds";
import { TodoListMgr } from "./todoListMgr";

/**
 * 画面ロード時のインスタンス生成とイベント設定.
 */
 window.onload = () => {

  const todoListMgr:TodoListMgr = new TodoListMgr(elementIds.tableItems);

  // 追加ボタン押下イベント
  const addItemButton: HTMLInputElement = <HTMLInputElement>document.getElementById(elementIds.addItemButton);
  addItemButton.addEventListener("click", (e) => {
    addOne(todoListMgr);
  });

  // Importボタン押下イベント
  const importButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById(elementIds.importButton);
  importButton.addEventListener("click", () => {
    importFile(todoListMgr);
  });

  // Allラジオボタンの状態変更イベント
  const radioAll: HTMLInputElement = <HTMLInputElement>document.getElementById(elementIds.radioAll);
  radioAll.addEventListener("change", (e) => {
    changeVisibleList(todoListMgr, e.target as HTMLInputElement);
  });

  // Leftラジオボタンの状態変更イベント
  const radioLeft: HTMLInputElement = <HTMLInputElement>document.getElementById(elementIds.radioLeft);
  radioLeft.addEventListener("change", (e) => {
    changeVisibleList(todoListMgr, e.target as HTMLInputElement);
  });

  // Compラジオボタンの状態変更イベント
  const radioComp: HTMLInputElement = <HTMLInputElement>document.getElementById(elementIds.radioComp);
  radioComp.addEventListener("change", (e) => {
    changeVisibleList(todoListMgr, e.target as HTMLInputElement);
  });

  // Exportボタン押下イベント
  const exportButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById(elementIds.exportButton);
  exportButton.addEventListener("click", () => {
    exportFile(todoListMgr);
  });
}

/**
 * TODOアイテムを1つ追加する.
 * タスクの内容が未入力の場合は何もしない.
 * @param todoListMgr タスク管理オブジェクト
 */
function addOne(todoListMgr: TodoListMgr):void{
  const inputTodoElement: HTMLInputElement = <HTMLInputElement>document.getElementById(elementIds.input);
  const content: string = inputTodoElement.value;

  if (content === ""){
    return;
  }

  todoListMgr.addOne(content);

  // アイテム追加後は再度入力できるよう値をリセットする.
  inputTodoElement.value = "";

}

/**
 * 表示モードを変更する.
 * @param todoListMgr タスク管理オブジェクト
 * @param chkBox チェックボックス
 */
 function changeVisibleList(todoListMgr:TodoListMgr, chkBox:HTMLInputElement): void{
  if (!chkBox.checked){
    return;
  }
  todoListMgr.changeVisibleList(chkBox.id as elementIds);
}

/**
 * ファイルのImportを行う.
 * ファイルが未入力の場合何もしない.
 * @param todoListMgr タスク管理オブジェクト
 */
function importFile(todoListMgr:TodoListMgr){
  const fileElement: HTMLInputElement = <HTMLInputElement>document.getElementById(elementIds.inputFile);

  // ファイル要素が未定義または未入力の場合は何もしない
  if (fileElement == null || fileElement.files == null || fileElement.files[0] == null){
    return;
  }
  const file:Blob = fileElement.files[0];

  const reader = new FileReader();
  reader.onload = () => {
    try{
      todoListMgr.importFile(reader.result as string);
    }catch(e){
      alert("ファイルの形式が正しくありません。")
    }
  };
  reader.readAsText(file);
}

/**
 * タスクをファイルに出力する.
 * @param todoListMgr タスク管理オブジェクト
 */
function exportFile(todoListMgr:TodoListMgr){

  const text:string = todoListMgr.toJson();
  const blob = new Blob([text], {"type":"application/json"});
  window.URL = window.URL || window.webkitURL;
  
  const link: HTMLLinkElement = <HTMLLinkElement>document.getElementById(elementIds.exportButton);
  link.href = window.URL.createObjectURL(blob);

  const now:Date = new Date();
  link.setAttribute("download", `export_${now.getFullYear()}${now.getMonth()}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}.json`);
}