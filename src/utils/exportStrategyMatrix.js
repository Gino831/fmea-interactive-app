import * as XLSX from 'xlsx';
import { dfmeaData, changeTypesMap, tests } from '../data/dfmeaData';

/**
 * 將「變更情境與環境試驗判定策略矩陣」匯出為 Excel (.xlsx) 檔案並自動下載。
 * 矩陣涵蓋所有元件 × 變更類型的完整交叉組合，並將測試項目展開為矩陣。
 */
export function exportStrategyMatrixToExcel() {
    // 類別中文對照
    const categoryLabels = {
        module: 'Level 1 — 模組層級 (Module)',
        component: 'Level 2 — 主板與單組件層級 (Component)',
        mechanics: 'Level 3 — 機構設計層級 (Mechanics)',
    };

    // 建立所有變更類型名稱對照表
    const changeTypeNameMap = {};
    Object.values(changeTypesMap).forEach(types => {
        types.forEach(t => {
            changeTypeNameMap[t.id] = t.name;
        });
    });

    // 取得所有測試項目的 Key (作為矩陣表頭依據)
    const testKeys = Object.keys(tests);

    // 組裝列資料
    const rows = [];

    dfmeaData.forEach(comp => {
        const category = categoryLabels[comp.category] || comp.category;
        const failureDesc = (comp.failureModes || []).map(fm => fm.mode).join('；');
        const failureMechanism = (comp.failureModes || []).map(fm => fm.mechanism).join('；');
        const systemEffect = (comp.failureModes || []).map(fm => fm.systemEffect).join('；');

        const impacts = comp.changeImpacts || {};

        Object.entries(impacts).forEach(([changeTypeId, impact]) => {
            const changeTypeName = changeTypeNameMap[changeTypeId] || changeTypeId;

            // 綜合評估說明 (動態產生，並與原描述結合)
            const autoDesc = `[綜合評估] 由於變更類型為「${changeTypeName}」，結合元件特性(${comp.description})，潛在失效機制為「${failureMechanism}」，將引發「${failureDesc}」，最終導入系統影響為「${systemEffect}」`;
            const riskDesc = impact.description ? `${impact.description}\n\n${autoDesc}` : autoDesc;

            const rowData = {
                '類別': category,
                '元件名稱': comp.name,
                '元件說明': comp.description,
                '變更類型': changeTypeName,
                '風險等級': impact.riskLevel,
                '風險說明': riskDesc,
                '失效模式': failureDesc,
                '失效機制': failureMechanism,
                '系統影響': systemEffect,
            };

            // 根據測試項目填寫矩陣欄位，如果在 `impact.tests` 內，則打「●」表示需驗證
            const requiredTestNames = (impact.tests || []).map(t => t.name);
            testKeys.forEach(key => {
                const testObj = tests[key];
                rowData[testObj.name] = requiredTestNames.includes(testObj.name) ? '●' : '';
            });

            rows.push(rowData);
        });
    });

    // 建立工作表
    const ws = XLSX.utils.json_to_sheet(rows);

    // 追加空行與測試目的說明表於資料下方
    const appendRows = [
        {}, // 空白行，隔開表格與下方說明
        { '類別': '【各環境試驗項目說明】' },
        {
            '類別': '測項簡稱',
            '元件名稱': '測項名稱',
            '元件說明': '測試目的',
            '變更類型': '測試天數',
            '風險等級': '依據標準',
        }
    ];

    testKeys.forEach(key => {
        const testObj = tests[key];
        appendRows.push({
            '類別': key,
            '元件名稱': testObj.name,
            '元件說明': testObj.purpose,
            '變更類型': testObj.duration,
            '風險等級': testObj.standard,
        });
    });

    XLSX.utils.sheet_add_json(ws, appendRows, { skipHeader: true, origin: -1 });

    // 設定欄寬（基礎屬性 + 測試項目矩陣）
    const wsCols = [
        { wch: 24 }, // 類別 / 測項簡稱
        { wch: 28 }, // 元件名稱 / 測項名稱
        { wch: 50 }, // 元件說明 / 測試目的
        { wch: 26 }, // 變更類型 / 測試天數
        { wch: 14 }, // 風險等級 / 依據標準
        { wch: 65 }, // 風險說明
        { wch: 40 }, // 失效模式
        { wch: 50 }, // 失效機制
        { wch: 40 }, // 系統影響
    ];

    // 為每一個測試項目矩陣欄設定寬度
    testKeys.forEach(() => {
        wsCols.push({ wch: 10 }); // 矩陣打勾欄位，寬度較小
    });

    ws['!cols'] = wsCols;

    // 建立活頁簿
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '策略矩陣與測試說明');

    // 產生今天日期作為檔案名稱一部分
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const fileName = `DFMEA_變更情境策略矩陣_${today}.xlsx`;

    // 使用 Blob + anchor 手動觸發下載，避免瀏覽器產生 GUID 檔名
    const wbOut = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbOut], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    // 清理
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}
