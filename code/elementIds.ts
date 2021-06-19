/**
 * HTML内に記述したID群の列挙.
 * HTML内に記述された要素のうち、取得可能性のあるもののみ記述している.
 * ID値の追加、変更と同時に本列挙体を更新すること.
 */
export const elementIds = {
    /**
     * タスク入力欄
     */
    input: "input",
    /**
     * 追加ボタン
     */
    addItemButton: "add-item-button",
    /**
     * ファイル入力
     */
    inputFile: "input-file",
    /**
     * Importボタン
     */
    importButton:"import-button",
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
    exportButton: "export-button"
  } as const;
export type elementIds = typeof elementIds[keyof typeof elementIds];