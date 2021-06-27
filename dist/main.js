/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./code/elementIds.ts":
/*!****************************!*\
  !*** ./code/elementIds.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"elementIds\": () => (/* binding */ elementIds)\n/* harmony export */ });\n/**\n * HTML内に記述したID群の列挙.\n * HTML内に記述された要素のうち、取得可能性のあるもののみ記述している.\n * ID値の追加、変更と同時に本列挙体を更新すること.\n */\nconst elementIds = {\n    /**\n     * タスク入力欄\n     */\n    input: \"input\",\n    /**\n     * 追加ボタン\n     */\n    addItemButton: \"add-item-button\",\n    /**\n     * ファイル入力\n     */\n    inputFile: \"input-file\",\n    /**\n     * Importボタン\n     */\n    importButton: \"import-button\",\n    /**\n     * TODOリスト\n     */\n    tableItems: \"table-items\",\n    /**\n     * 残タスクラベル\n     */\n    leftCount: \"left-count\",\n    /**\n     * ラジオボタンAll\n     */\n    radioAll: \"radio-all\",\n    /**\n     * ラジオボタンLeft\n     */\n    radioLeft: \"radio-left\",\n    /**\n     * ラジオボタンComp\n     */\n    radioComp: \"radio-comp\",\n    /**\n     * ファイルExport\n     */\n    exportButton: \"export-button\"\n};\n\n\n//# sourceURL=webpack://todo-app/./code/elementIds.ts?");

/***/ }),

/***/ "./code/localStorageMgr.ts":
/*!*********************************!*\
  !*** ./code/localStorageMgr.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"localStorageMgr\": () => (/* binding */ localStorageMgr)\n/* harmony export */ });\n/**\n * このクラスは以下の機能を提供する.\n * 1. ローカルストレージにオブジェクトを保存する機能\n * 2. ローカルストレージからオブジェクトを取得する機能\n */\nclass localStorageMgr {\n    /**\n     * オブジェクトの保存または取得に使用するキーを指定してインスタンスを生成する.\n     * @param localStorageKey オブジェクトの保存先キー情報\n     */\n    constructor(localStorageKey) {\n        this._localStorageKey = localStorageKey;\n    }\n    /**\n     * ローカルストレージからデータを取得する.\n     * インスタンス生成時に指定したキーが存在しない場合,空の配列を返す.\n     * @returns キーに対応するローカルストレージの値\n     */\n    fetch() {\n        const values = JSON.parse(localStorage.getItem(this._localStorageKey) || '[]');\n        return values;\n    }\n    /**\n     * 指定したオブジェクトの値をローカルストレージに保存する.\n     * @param values ローカルストレージに保存するオブジェクトの値\n     */\n    save(values) {\n        localStorage.setItem(this._localStorageKey, JSON.stringify(values));\n    }\n}\n\n\n//# sourceURL=webpack://todo-app/./code/localStorageMgr.ts?");

/***/ }),

/***/ "./code/main.ts":
/*!**********************!*\
  !*** ./code/main.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _elementIds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elementIds */ \"./code/elementIds.ts\");\n/* harmony import */ var _todoListMgr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todoListMgr */ \"./code/todoListMgr.ts\");\n\n\n/**\n * 画面ロード時のインスタンス生成とイベント設定.\n */\nwindow.onload = () => {\n    const todoListMgr = new _todoListMgr__WEBPACK_IMPORTED_MODULE_1__.TodoListMgr(_elementIds__WEBPACK_IMPORTED_MODULE_0__.elementIds.tableItems);\n    // 追加ボタン押下イベント\n    const addItemButton = document.getElementById(_elementIds__WEBPACK_IMPORTED_MODULE_0__.elementIds.addItemButton);\n    addItemButton.addEventListener(\"click\", (e) => {\n        addOne(todoListMgr);\n    });\n    // Importボタン押下イベント\n    const importButton = document.getElementById(_elementIds__WEBPACK_IMPORTED_MODULE_0__.elementIds.importButton);\n    importButton.addEventListener(\"click\", () => {\n        importFile(todoListMgr);\n    });\n    // Allラジオボタンの状態変更イベント\n    const radioAll = document.getElementById(_elementIds__WEBPACK_IMPORTED_MODULE_0__.elementIds.radioAll);\n    radioAll.addEventListener(\"change\", (e) => {\n        changeVisibleList(todoListMgr, e.target);\n    });\n    // Leftラジオボタンの状態変更イベント\n    const radioLeft = document.getElementById(_elementIds__WEBPACK_IMPORTED_MODULE_0__.elementIds.radioLeft);\n    radioLeft.addEventListener(\"change\", (e) => {\n        changeVisibleList(todoListMgr, e.target);\n    });\n    // Compラジオボタンの状態変更イベント\n    const radioComp = document.getElementById(_elementIds__WEBPACK_IMPORTED_MODULE_0__.elementIds.radioComp);\n    radioComp.addEventListener(\"change\", (e) => {\n        changeVisibleList(todoListMgr, e.target);\n    });\n    // Exportボタン押下イベント\n    const exportButton = document.getElementById(_elementIds__WEBPACK_IMPORTED_MODULE_0__.elementIds.exportButton);\n    exportButton.addEventListener(\"click\", () => {\n        exportFile(todoListMgr);\n    });\n};\n/**\n * TODOアイテムを1つ追加する.\n * タスクの内容が未入力の場合は何もしない.\n * @param todoListMgr タスク管理オブジェクト\n */\nfunction addOne(todoListMgr) {\n    const inputTodoElement = document.getElementById(_elementIds__WEBPACK_IMPORTED_MODULE_0__.elementIds.input);\n    const content = inputTodoElement.value;\n    if (content === \"\") {\n        return;\n    }\n    todoListMgr.addOne(content);\n    // アイテム追加後は再度入力できるよう値をリセットする.\n    inputTodoElement.value = \"\";\n}\n/**\n * 表示モードを変更する.\n * @param todoListMgr タスク管理オブジェクト\n * @param chkBox チェックボックス\n */\nfunction changeVisibleList(todoListMgr, chkBox) {\n    if (!chkBox.checked) {\n        return;\n    }\n    todoListMgr.changeVisibleList(chkBox.id);\n}\n/**\n * ファイルのImportを行う.\n * ファイルが未入力の場合何もしない.\n * @param todoListMgr タスク管理オブジェクト\n */\nfunction importFile(todoListMgr) {\n    const fileElement = document.getElementById(_elementIds__WEBPACK_IMPORTED_MODULE_0__.elementIds.inputFile);\n    // ファイル要素が未定義または未入力の場合は何もしない\n    if (fileElement == null || fileElement.files == null || fileElement.files[0] == null) {\n        return;\n    }\n    const file = fileElement.files[0];\n    const reader = new FileReader();\n    reader.onload = () => {\n        try {\n            todoListMgr.importFile(reader.result);\n        }\n        catch (e) {\n            alert(\"ファイルの形式が正しくありません。\");\n        }\n    };\n    reader.readAsText(file);\n}\n/**\n * タスクをファイルに出力する.\n * @param todoListMgr タスク管理オブジェクト\n */\nfunction exportFile(todoListMgr) {\n    const text = todoListMgr.toJson();\n    const blob = new Blob([text], { \"type\": \"application/json\" });\n    window.URL = window.URL || window.webkitURL;\n    const link = document.getElementById(_elementIds__WEBPACK_IMPORTED_MODULE_0__.elementIds.exportButton);\n    link.href = window.URL.createObjectURL(blob);\n    const now = new Date();\n    link.setAttribute(\"download\", `export_${now.getFullYear()}${now.getMonth()}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}.json`);\n}\n\n\n//# sourceURL=webpack://todo-app/./code/main.ts?");

/***/ }),

/***/ "./code/todo.ts":
/*!**********************!*\
  !*** ./code/todo.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Todo\": () => (/* binding */ Todo)\n/* harmony export */ });\n/**\n * TODOアイテムの状態を管理するクラス.\n * インスタンス生成時にインスタンスを一意に特定するためのIDが自動で採番され付与される.\n */\nclass Todo {\n    /**\n     * 新しいTODOタスクを生成する.\n     * IDは自動採番される.\n     * @param content タスク内容\n     */\n    constructor(content, isCompleted = false) {\n        this.id = this.numberingId();\n        this.isCompleted = isCompleted;\n        this.content = content;\n    }\n    /**\n     * IDを採番して返す.\n     * @returns 採番されたID\n     */\n    numberingId() {\n        Todo._currentMaxId++;\n        return Todo._currentMaxId;\n    }\n}\n/**\n * IDの自動採番に使用される値.\n */\nTodo._currentMaxId = 0;\n\n\n//# sourceURL=webpack://todo-app/./code/todo.ts?");

/***/ }),

/***/ "./code/todoListMgr.ts":
/*!*****************************!*\
  !*** ./code/todoListMgr.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TodoListMgr\": () => (/* binding */ TodoListMgr)\n/* harmony export */ });\n/* harmony import */ var _elementIds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elementIds */ \"./code/elementIds.ts\");\n/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo */ \"./code/todo.ts\");\n/* harmony import */ var _localStorageMgr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./localStorageMgr */ \"./code/localStorageMgr.ts\");\n\n\n\n/**\n * TODOをリストとして管理するクラス.\n * 指定したテーブルエレメントに対してリスト表示する機能を有する.\n * 表示モードによって「すべて」、「残タスク」、「完了タスク」のフィルターが可能.\n */\nclass TodoListMgr {\n    /**\n     * 管理するテーブルを保持する.\n     * 初期表示の表示モードは「すべて」.\n     * @param tableElementId テーブルのID.ヘッダを除き行は空である必要がある.\n     */\n    constructor(tableElementId) {\n        this._tableElement = document.getElementById(tableElementId);\n        this._showMode = _elementIds__WEBPACK_IMPORTED_MODULE_0__.elementIds.radioAll;\n        this._todoList = new Array();\n        this._todoStorage = new _localStorageMgr__WEBPACK_IMPORTED_MODULE_2__.localStorageMgr(\"todo-storage-key\");\n        const todos = this._todoStorage.fetch();\n        this.importObj(todos);\n    }\n    /**\n     * 新しいタスクを追加する.\n     * @param content タスク内容\n     */\n    addOne(content) {\n        const todo = new _todo__WEBPACK_IMPORTED_MODULE_1__.Todo(content);\n        this._todoList.push(todo);\n        this.drawItems();\n        this.updateFooter(this.getLeftCount());\n        this._todoStorage.save(this._todoList);\n    }\n    /**\n     * 指定した表示モードにしたがって表示項目をフィルターする.\n     * @param showMode 表示モード\n     */\n    changeVisibleList(showMode) {\n        this._showMode = showMode;\n        this.drawItems();\n        this._todoStorage.save(this._todoList);\n    }\n    /**\n     * 指定したJsonファイルをタスクリストにImportする.\n     * JsonオブジェクトにおけるIDは引き継がれず新規に採番される.\n     * @param json Import対象\n     */\n    importFile(json) {\n        const todos = JSON.parse(json);\n        const todosToAdd = todos.map((todo) => {\n            return new _todo__WEBPACK_IMPORTED_MODULE_1__.Todo(todo.content, todo.isCompleted === true);\n        });\n        this._todoList = this._todoList.concat(todosToAdd);\n        this.drawItems();\n        this.updateFooter(this.getLeftCount());\n        this._todoStorage.save(this._todoList);\n    }\n    /**\n     * 指定したTODOをタスクリストにImportする.\n     * オブジェクトにおけるIDは引き継がれず新規に採番される.\n     * @param todos Import対象\n     */\n    importObj(todos) {\n        const todosToAdd = todos.map((todo) => {\n            return new _todo__WEBPACK_IMPORTED_MODULE_1__.Todo(todo.content, todo.isCompleted === true);\n        });\n        this._todoList = this._todoList.concat(todosToAdd);\n        this.drawItems();\n        this.updateFooter(this.getLeftCount());\n        this._todoStorage.save(this._todoList);\n    }\n    /**\n     * TODOリストをJson形式にして返す.\n     */\n    toJson() {\n        const json = JSON.stringify(this._todoList);\n        return json;\n    }\n    /**\n     * タスクのステータスを更新する.\n     * @param statusButton ステータスボタン\n     * @param id タスクのID\n     */\n    updateStatusById(statusButton, id) {\n        this.updateStatus(id, statusButton.checked);\n        this.drawItems();\n        this.updateFooter(this.getLeftCount());\n        this._todoStorage.save(this._todoList);\n    }\n    /**\n     * 指定したIDのタスクのステータスを更新する.\n     * @param id タスクのID\n     * @param isCompleted タスクが完了しているかどうか\n     */\n    updateStatus(id, isCompleted) {\n        this._todoList.forEach(function (todo) {\n            if (todo.id === id) {\n                todo.isCompleted = isCompleted;\n            }\n        });\n    }\n    /**\n     * 指定したIDが属する行を削除する.\n     */\n    deleteOneById(id) {\n        this.deleteOneFromListById(id);\n        this.drawItems();\n        this.updateFooter(this.getLeftCount());\n        this._todoStorage.save(this._todoList);\n    }\n    /**\n     * 指定したIDのタスクを削除する.\n     * @param id タスクのID\n     */\n    deleteOneFromListById(id) {\n        this._todoList = this._todoList.filter(todo => todo.id !== id);\n    }\n    /**\n     * タスクを現在の表示モードに従ってHTMLに描画する.\n     */\n    drawItems() {\n        // 描画前にすでに描画されているタスクを削除する.\n        this.eraseAllItems();\n        let showList;\n        if (this._showMode === _elementIds__WEBPACK_IMPORTED_MODULE_0__.elementIds.radioAll) {\n            showList = this._todoList;\n        }\n        else if (this._showMode === _elementIds__WEBPACK_IMPORTED_MODULE_0__.elementIds.radioLeft) {\n            showList = this._todoList.filter(value => !value.isCompleted);\n        }\n        else if (this._showMode === _elementIds__WEBPACK_IMPORTED_MODULE_0__.elementIds.radioComp) {\n            showList = this._todoList.filter(value => value.isCompleted);\n        }\n        else {\n            showList = [];\n        }\n        showList.forEach(value => { this.drawOne(value.content, value.isCompleted, value.id); });\n    }\n    /**\n     * 描画されたすべてのタスクをHTMLから削除する.\n     */\n    eraseAllItems() {\n        const rowCount = this._tableElement.tBodies[0].rows.length;\n        for (let i = rowCount - 1; i >= 0; i--) {\n            this._tableElement.tBodies[0].deleteRow(i);\n        }\n    }\n    /**\n     * 指定したタスクをHTMLに描画する.\n     * @param content タスク内容\n     * @param isCompleted 完了しているかどうか\n     * @param id タスクのID\n     */\n    drawOne(content, isCompleted, id) {\n        const row = this._tableElement.tBodies[0].insertRow(-1);\n        const tdStatus = row.insertCell(-1);\n        const tdContent = row.insertCell(-1);\n        const tdDelete = row.insertCell(-1);\n        const checked = isCompleted ? \"checked\" : \"\";\n        tdStatus.innerHTML = `<input type=\"checkbox\" aria-label=\"Checkbox for following text input\" ${checked}>`;\n        tdContent.innerHTML = content;\n        tdDelete.innerHTML = `<button class=\"btn btn-danger\">delete</button>`;\n        tdStatus.addEventListener(\"change\", (e) => {\n            this.updateStatusById(e.target, id);\n        });\n        tdDelete.addEventListener(\"click\", () => {\n            this.deleteOneById(id);\n        });\n    }\n    /**\n     * フッターを更新する.\n     * 1. 残タスクの個数を更新する.\n     */\n    updateFooter(leftCount) {\n        const itemOrItems = leftCount >= 2 ? \"items\" : \"item\";\n        const td = document.getElementById(_elementIds__WEBPACK_IMPORTED_MODULE_0__.elementIds.leftCount);\n        td.innerHTML = `${leftCount} ${itemOrItems} left`;\n    }\n    /**\n     * 残っているタスクの数を返す.\n     * @returns 残っているタスクの数\n     */\n    getLeftCount() {\n        return this._todoList.reduce((acc, value) => {\n            return acc + (value.isCompleted ? 0 : 1);\n        }, 0);\n    }\n}\n\n\n//# sourceURL=webpack://todo-app/./code/todoListMgr.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./code/main.ts");
/******/ 	
/******/ })()
;