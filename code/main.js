"use strict";
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
};
/**
 * TODOをリストとして管理するクラス.
 * 指定したテーブルエレメントに対してリスト表示する機能を有する.
 * 表示モードによって「すべて」、「残タスク」、「完了タスク」のフィルターが可能.
 */
class TodoListMgr {
    /**
     * 管理するテーブルを保持する.
     * 初期表示の表示モードは「すべて」.
     * @param tableElementId テーブルのID.ヘッダを除き行は空である必要がある.
     */
    constructor(tableElementId) {
        this._tableElement = document.getElementById(tableElementId);
        this.showMode = elementIds.radioAll;
        this.todoList = new Array();
    }
    /**
     * 新しいタスクを追加する.
     * @param content タスク内容
     */
    addItem(content) {
        const todo = new Todo(content);
        this.todoList.push(todo);
    }
    /**
     * 指定したIDのタスクのステータスを更新する.
     * @param id タスクのID
     * @param isCompleted タスクが完了しているかどうか
     */
    updateStatus(id, isCompleted) {
        this.todoList.forEach(function (todo) {
            if (todo.id === id) {
                todo.isCompleted = isCompleted;
            }
        });
    }
    /**
     * 指定したIDのタスクを削除する.
     * @param id タスクのID
     */
    deleteItem(id) {
        this.todoList = this.todoList.filter(todo => todo.id !== id);
    }
    /**
     * 残っているタスクの数を返す.
     * @returns 残っているタスクの数
     */
    getLeftCount() {
        return this.todoList.reduce((acc, value) => {
            return acc + (value.isCompleted ? 0 : 1);
        }, 0);
    }
    /**
     * タスクを現在の表示モードに従ってHTMLに描画する.
     */
    drawItems() {
        // 重複してタスクが表示されてしまうため描画前にすでに描画されているタスクを削除する.
        this.eraseAllItems();
        let showList;
        if (this.showMode === elementIds.radioAll) {
            showList = this.todoList;
        }
        else if (this.showMode === elementIds.radioLeft) {
            showList = this.todoList.filter(value => !value.isCompleted);
        }
        else if (this.showMode === elementIds.radioComp) {
            showList = this.todoList.filter(value => value.isCompleted);
        }
        else {
            showList = [];
        }
        showList.forEach(value => { this.showItem(value.content, value.isCompleted, value.id); });
    }
    /**
     * 指定したファイルをImportする.
     * @param file Import対象
     */
    importFile(file) {
        const todos = file.split("\n");
        const todosToAdd = todos.map((todo) => {
            const splitedTodo = todo.split(",");
            return new Todo(splitedTodo[0], splitedTodo[1] === "true");
        });
        this.todoList = this.todoList.concat(todosToAdd);
        this.drawItems();
    }
    /**
     * TODOリストをCsv形式にして返す.
     */
    toCsvString() {
        const text = this.todoList.map((todo) => todo.content + "," + todo.isCompleted);
        return text.join("\n");
    }
    /**
     * 描画されたすべてのタスクをHTMLから削除する.
     */
    eraseAllItems() {
        const rowCount = this._tableElement.tBodies[0].rows.length;
        for (let i = rowCount - 1; i >= 0; i--) {
            this._tableElement.tBodies[0].deleteRow(i);
        }
    }
    /**
     * 指定したタスクをHTMLに描画する.
     * @param content タスク内容
     * @param isCompleted 完了しているかどうか
     * @param id タスクのID
     */
    showItem(content, isCompleted, id) {
        const row = this._tableElement.tBodies[0].insertRow(-1);
        const tdStatus = row.insertCell(-1);
        const tdContent = row.insertCell(-1);
        const tdDelete = row.insertCell(-1);
        const checked = isCompleted ? "checked" : "";
        tdStatus.innerHTML = `<input type="checkbox" aria-label="Checkbox for following text input" onchange="updateTodo(this,${id})" ${checked}>`;
        tdContent.innerHTML = content;
        tdDelete.innerHTML = `<button class="btn btn-danger" onclick="deleteItem(${id})">delete</button>`;
    }
}
const todoListMgr = new TodoListMgr(elementIds.tableItems);
/**
 * TODOアイテムの状態を管理するクラス.
 * インスタンス生成時にインスタンスを一意に特定するためのIDが自動で採番され付与される.
 */
class Todo {
    /**
     * 新しいTODOタスクを生成する.
     * IDは自動採番される.
     * タスクは未完了状態で生成する.
     * @param content タスク内容
     */
    constructor(content, isCompleted = false) {
        this._id = this.numberingId();
        this.isCompleted = isCompleted;
        this._content = content;
    }
    /**
     * IDを採番して返す.
     * @returns 採番されたID
     */
    numberingId() {
        Todo._currentMaxId++;
        return Todo._currentMaxId;
    }
    get id() {
        return this._id;
    }
    get content() {
        return this._content;
    }
}
/**
 * IDの自動採番に使用される値.
 */
Todo._currentMaxId = 0;
/**
 * TODOアイテムを1つ追加する.
 * タスクの内容が未入力の場合は何もしない.
 */
function addItem() {
    const inputTodoElement = document.getElementById(elementIds.input);
    const content = inputTodoElement.value;
    if (content === "") {
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
function deleteItem(id) {
    todoListMgr.deleteItem(id);
    todoListMgr.drawItems();
    updateFooter();
}
/**
 * ファイルのImportを行う.
 */
function importFile() {
    const fileElement = document.getElementById(elementIds.inputFile);
    if (fileElement == null || fileElement.files == null || fileElement.files[0] == null) {
        return;
    }
    const file = fileElement.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        todoListMgr.importFile(reader.result);
    };
    reader.readAsText(file);
}
/**
 * タスクをファイルに出力する.
 */
function exportFile() {
    const text = todoListMgr.toCsvString();
    const blob = new Blob([text], { "type": "application/octet-stream" });
    window.URL = window.URL || window.webkitURL;
    const link = document.getElementById(elementIds.export);
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "export.txt");
}
/**
 * タスクのステータスを更新する.
 * @param statusButton ステータスボタン
 * @param id タスクのID
 */
function updateTodo(statusButton, id) {
    todoListMgr.updateStatus(id, statusButton.checked);
    todoListMgr.drawItems();
    updateFooter();
}
/**
 * 表示モードを変更する.
 * @param chkBox チェックボックス
 */
function changeVisibleList(chkBox) {
    if (!chkBox.checked) {
        return;
    }
    todoListMgr.showMode = chkBox.id;
    todoListMgr.drawItems();
}
/**
 * フッターを更新する.
 * 1. 残タスクの個数を更新する.
 */
function updateFooter() {
    const leftCount = todoListMgr.getLeftCount();
    const itemOrItems = leftCount >= 2 ? "items" : "item";
    const td = document.getElementById(elementIds.leftCount);
    td.innerHTML = `${leftCount} ${itemOrItems} left`;
}
