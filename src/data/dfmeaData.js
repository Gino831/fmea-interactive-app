// 常用的環境試驗對應清單 (依據 IEC 60068, EN 50155, MIL-STD 等標準)
export const tests = {
  basicFunction:      { id: 'basicFunction',      name: 'Basic Function test',                    standard: 'General',            purpose: '確認基礎電信號與模組是否可正常被系統辨識並初步運作。',                                       duration: '1 天' },
  highLowTempStorage: { id: 'highLowTempStorage',  name: 'High/Low Temperature Storage',           standard: 'IEC 60068-2-1/2',    purpose: '高低溫儲存測試，驗證非開機狀態下材料是否變形剝離。',                                         duration: '2 天' },
  highTempOperation:  { id: 'highTempOperation',   name: 'High Temperature Operation',             standard: 'IEC 60068-2-2',      purpose: '高溫長時間運作，驗證過熱降頻與散熱能力。',                                                  duration: '2 天' },
  highTempOnOff:      { id: 'highTempOnOff',       name: 'High Temperature Power ON/OFF',          standard: 'IEC 60068-2-2',      purpose: '高溫開關機，驗證熱機狀態下的開機突波與重啟穩定度。',                                         duration: '1 天' },
  lowTempOnOff:       { id: 'lowTempOnOff',        name: 'Low Temperature Power ON/OFF',           standard: 'IEC 60068-2-1',      purpose: '低溫環境下的冷開機與持續啟閉測試。',                                                        duration: '2.5 天' },
  tempCycle:          { id: 'tempCycle',           name: 'Temperature Cycle',                      standard: 'IEC 60068-2-14',     purpose: '冷熱交替誘發熱膨脹係數 (CTE) 失配導致微裂紋或焊點異常。',                                    duration: '2 天' },
  highTempHighHumidity:{ id: 'highTempHighHumidity',name: 'High Temp High Humidity (HTHH)',        standard: 'IEC 60068-2-78',     purpose: '高溫高濕度運作，驗證內部絕緣、IC作動極限與金屬生鏽。',                                       duration: '4 天' },
  sineVib:            { id: 'sineVib',             name: 'Sine Vibration (正弦振動)',               standard: 'IEC 60068-2-6',      purpose: '找尋機殼機構或基板的共振點(Resonance)，驗證剛性。',                                          duration: '1 天' },
  randomVib:          { id: 'randomVib',           name: 'Random Vibration (隨機振動 - 裸機)',      standard: 'IEC 60068-2-64',     purpose: '模擬產品使用環境的寬頻震動，驗證模組與接頭鎖固強度。',                                       duration: '1 天' },
  shockHalfSine:      { id: 'shockHalfSine',       name: 'Shock Test (Half-sine 衝擊)',             standard: 'IEC 60068-2-27',     purpose: '模擬跌落或強烈撞擊對元件造成的瞬間最大應力破壞。',                                          duration: '1 天' },
  pkgVib:             { id: 'pkgVib',              name: 'Packaging Vibration (包裝振動)',          standard: 'ISTA 1A/2A',         purpose: '含彩盒外箱之運輸顛簸模擬，驗證緩衝材吸震力。',                                              duration: '1 天' },
  pkgDrop:            { id: 'pkgDrop',             name: 'Packaging Drop (包裝落下)',               standard: 'ISTA 1A/2A',         purpose: '模擬物流搬運摔落，驗證紙箱與緩衝包材保護力。',                                              duration: '0.5 天' },
  ipCode:             { id: 'ipCode',              name: 'Ingress Protection (IP 測試)',            standard: 'IEC 60529',          purpose: '驗證機殼密封度、防水(水柱/浸泡)與防塵能力。',                                               duration: '2 天' },
  saltMist:           { id: 'saltMist',            name: 'Salt Mist Test (鹽霧測試)',               standard: 'IEC 60068-2-11/52',  purpose: '暴露於鹽水噴霧中，驗證金屬機殼、螺絲、連接器之抗腐蝕電鍍能力。',                            duration: '2-4 天' },
  altitude:           { id: 'altitude',            name: 'Altitude Test (高空測試)',                standard: 'IEC 60068-2-13',     purpose: '模擬 2000–5000m 低氣壓環境（腔體溫控 25°C、產品通電操作狀態）。主要驗證電解電容因外部氣壓降低導致內外壓差增大、安全閥提前開啟之失效風險（ESR 上升 / 電解液滲漏）。散熱鰭片變更時亦驗證低氣壓下自然對流衰退對 Tj 裕量之影響。',              duration: '1 天' },
};

export const riskLevelDefs = {
  High: {
    functionalImpact: '將導致系統徹底死機 (BSOD)、資料毀損流失、電源燒斷、或是關鍵安全防護失效 (IP 破功)。',
    userImpact: '完全無法操作設備，面臨安全威脅。將引發嚴重客訴、大規模退貨與品牌信任度崩盤。',
    labAction: '必須執行完整的極端環境與動態打擊測試 (NPI等級)。'
  },
  Medium: {
    functionalImpact: '引起局部功能降級 (效能降頻)、讀寫偶發延遲，但能透過保護機制重啟恢復。',
    userImpact: '體驗下降或操作卡頓，需要重啟或聯繫客服，但不致於造成資料永久損失。',
    labAction: '可豁免部分時效過長測試，但保留基礎功能與單一維度的溫震應力篩選。'
  },
  Low: {
    functionalImpact: '完全無功能性影響，或影響極微乎其微。',
    userImpact: '日常操作中完全無法察覺任何差異，無實質不便。',
    labAction: '僅需進行基本功能驗證即可過關放行，免進環境實驗室排程。'
  }
};

// 依據不同層級 (Level) 定義專屬變更類型
export const changeTypesMap = {
  module: [
    { id: 'diff_vendor',    name: '不同 Vendor (廠牌)',                       description: '雖然規格一致，但主控晶片、材料清單(BOM)、或生產製程不同。' },
    { id: 'diff_spec',      name: '不同規格 (Spec Change)',                   description: '容量、傳輸速率、瓦數等關鍵特性升級或變更。' },
    { id: 'hardware_rev',   name: '硬體進版 (Hardware Rev. Update) 同 Vendor', description: '原廠內部設計優化、FW/HW 版本升級。' }
  ],
  component: [
    { id: 'pin2pin',         name: 'Pin-to-pin 替換',                        description: '同規格、同封裝尺寸、脚位完全相容之替換料 (Alternative)。' },
    { id: 'capacity_change', name: '容量變更 (同廠牌/規格)',                  description: '同廠牌、同規格、同封裝，僅儲存容量 (Capacity) 大小不同。' },
    { id: 'non_pin2pin',     name: '非 Pin-to-pin (規格/封裝異動)',            description: '電阻值、耐壓值不同，或是封裝尺寸如 0402 改為 0603。' },
    { id: 'plating_change',  name: '電鍍層/接點材質變更',                     description: '金手指、連接器接觸端子(Pin)之鍍金厚度數值、底層打底用鎳層厚度變動。' },
    { id: 'layout_adj',      name: 'Layout 位置調整',                        description: '元件本體不變，但 PCB 走線/打孔變更或擺放座標移動。' },
    { id: 'add_pcb_coating', name: '增加 PCB Coating (無改有)',               description: '原本無防護的 PCBA，為了防潮抗腐而新增三防漆 (Conformal Coating) 或點膠塗液保護。' }
  ],
  mechanics: [
    { id: 'assembly',        name: '組裝結構變更',                            description: '卡榫、螺絲鎖孔數量位置、外殼結合處對接設計變化。' },
    { id: 'thermal_mech',    name: '散熱結構 (Thermal) 變更',                 description: '散熱鰭片方向/高度、導熱矽膠墊 (Thermal Pad) 材質 (Material) 或厚度 (Thickness) 更動。' },
    { id: 'cable_routing',   name: 'Cable routing 走線變更',                  description: '內部排線、同軸線繞管與綁線固定方式調整。' },
    { id: 'mounting',        name: '安裝結構 (Mounting) 變更',                description: '系統鎖附至牆面/機櫃的支架、滑軌或減震墊設計變動。' },
    { id: 'pkg_size',        name: '外箱尺寸變更',                            description: '外部包裝紙箱長寬高或紙質(如 3層改 5層)變動。' },
    { id: 'pkg_cushion',     name: '緩衝材質變更',                            description: '內部包材由 EPE 改為紙塑，或緩衝件厚度與造型變更。' },
    { id: 'pkg_print',       name: '外箱印刷變更',                            description: '外箱標籤位置、油墨顏色、文字排版等外觀與法規宣告變化。' },
    { id: 'mech_length',     name: '長度變更',                                description: '五金鎖固牙長或線材/排線總長度之變動。' },
    { id: 'mech_material',   name: '材質變更',                                description: '金屬本體材質、表面處理鍍層、或線材披覆絕緣材料替換。' },
    { id: 'mech_screw_angle',name: '螺絲角度變更',                            description: '平頭、沉頭、傘頭等螺絲頭部角度設計變動。' },
    { id: 'mech_print',      name: '系統外觀印刷變更',                        description: '系統金屬或塑膠機殼表面的 Logo、文字標示網印與雷雕等外觀變動。' }
  ]
};

export const dfmeaData = [
  // ==========================================
  // 【 模組元件 (Module Level) 】
  // ==========================================
  {
    id: 'ssd',
    name: 'SSD 固態硬碟模組',
    category: 'module',
    description: '整合 NAND Flash 顆粒與主控晶片的大容量儲存裝置。',
    failureModes: [
      { mode: 'Flash 讀寫異常與控制器熱當機', mechanism: '主控於密集讀寫下過熱導致熱降頻；NAND Flash 晶粒內部邏輯錯誤或 FW 時序衝突。', systemEffect: '系統藍屏 (BSOD)、資料流失或無法開機。' }
    ],
    changeImpacts: {
      'diff_vendor': {
        riskLevel: 'High',
        description: '新廠牌可能帶有未知相容性與韌體時序問題。',
        tests: [tests.basicFunction, tests.lowTempOnOff, tests.highTempOnOff, tests.highTempHighHumidity, tests.tempCycle, tests.highLowTempStorage],
        testRationale: {
          basicFunction:       { failureCause: '新廠牌韌體時序與主控指令集差異，可能導致系統無法識別裝置', detectionMethod: '全功能讀寫壓力測試 + 系統裝置識別確認', necessity: '必驗 (Gate Test)' },
          lowTempOnOff:        { failureCause: '低溫下不同廠牌 FW 冷啟動初始化時序可能不符主板預設，引發開機失敗', detectionMethod: '低溫連續開關機循環，確認 FW 初始化穩定', necessity: '必驗' },
          highTempOnOff:       { failureCause: '熱機狀態下新廠牌的熱保護觸發閾值可能不同，引發非預期重啟', detectionMethod: '高溫重啟循環，監測開機突波與重啟穩定度', necessity: '必驗' },
          highTempHighHumidity:{ failureCause: '新廠牌 NAND 顆粒耐溫濕能力未經系統驗證，高溫高濕加速腐蝕失效', detectionMethod: '高溫高濕持續讀寫運作，監測效能與錯誤率', necessity: '必驗' },
          tempCycle:           { failureCause: '不同廠牌封裝材料 CTE 差異，冷熱交替下焊點疲勞開裂風險不同', detectionMethod: '溫度循環後讀寫功能確認 + 目視焊點', necessity: '必驗' },
          highLowTempStorage:  { failureCause: '新廠牌材料儲存極限溫度未經本系統驗證，可能引發材料變形', detectionMethod: '高低溫儲存後開機功能確認 + 外觀目視', necessity: '必驗' },
        }
      },
      'diff_spec': {
        riskLevel: 'High',
        tests: [tests.basicFunction, tests.lowTempOnOff, tests.highTempOperation, tests.highTempHighHumidity],
        testRationale: {
          basicFunction:       { failureCause: '新容量/速率規格需系統 BIOS 能正確識別並訓練，否則無法開機', detectionMethod: '系統容量識別 + 讀寫效能基準測試', necessity: '必驗 (Gate Test)' },
          lowTempOnOff:        { failureCause: '更高速規格的主控在低溫下初始化時序更嚴格，易引發冷啟動失敗', detectionMethod: '低溫冷開機確認高速初始化穩定性', necessity: '必驗' },
          highTempOperation:   { failureCause: '更高規格持續讀寫功耗更高，高溫下提前觸發熱降頻甚至鎖死', detectionMethod: '連續讀寫同時監測溫度與速率，確認無降頻異常', necessity: '必驗' },
          highTempHighHumidity:{ failureCause: '新規格主控耐溫濕能力需重新確認，高濕加速氧化腐蝕', detectionMethod: '高溫高濕持續運作監測讀寫功能', necessity: '必驗' },
        }
      },
      'hardware_rev': {
        riskLevel: 'Medium',
        description: '需確認供應商的 PCN (產品變更通知) 幅度。',
        tests: [tests.basicFunction, tests.tempCycle, tests.highTempOperation],
        testRationale: {
          basicFunction:     { failureCause: 'PCN 幅度未知，FW 版本更新後基本讀寫相容性需再確認', detectionMethod: '讀寫功能驗證 + 系統識別確認', necessity: '必驗 (Gate Test)' },
          tempCycle:         { failureCause: '硬體微調可能改變 CTE 匹配，焊點耐熱疲勞需重確認', detectionMethod: '溫度循環後功能確認 + 目視焊點', necessity: '條件必驗' },
          highTempOperation: { failureCause: 'FW 優化可能修改熱管理演算法，新版本降頻策略需驗證', detectionMethod: '高溫持續運作，監測降頻閾值是否符合規格', necessity: '條件必驗' },
        }
      }
    }
  },

  {
    id: 'ram',
    name: 'RAM 記憶體模組',
    category: 'module',
    description: 'SODIMM / RDIMM 等高速存取記憶體。',
    failureModes: [
      { mode: '高速訊號時序 (Timing) 失配與微動磨損', mechanism: '阻抗不匹配或隨機微震使金手指表面鍍金層剝落。', systemEffect: '無預警重啟、ECC 錯誤頻發。' }
    ],
    changeImpacts: {
      'diff_vendor': {
        riskLevel: 'High',
        tests: [tests.basicFunction, tests.highTempHighHumidity, tests.tempCycle, tests.highTempOnOff],
        testRationale: {
          basicFunction:       { failureCause: '不同廠牌 DDR 控制器時序(CL/RCD/RP)可能不符主板 SPD 預設，導致記憶體訓練失敗', detectionMethod: '記憶體識別 + Memtest 壓力測試', necessity: '必驗 (Gate Test)' },
          highTempHighHumidity:{ failureCause: '新廠牌顆粒在高溫高濕下金手指氧化速率不同，加速接觸失效', detectionMethod: '高溫高濕後插拔測試 + 訊號品質確認', necessity: '必驗' },
          tempCycle:           { failureCause: '不同廠牌 PCBA 板材 CTE 差異，溫度循環後錫球開裂機率', detectionMethod: '溫度循環後功能確認 + 目視金手指', necessity: '必驗' },
          highTempOnOff:       { failureCause: '新廠牌在高溫熱機下開機突波可能觸發不同保護機制，引發非預期重啟', detectionMethod: '高溫開關機確認穩定性', necessity: '必驗' },
        }
      },
      'diff_spec': {
        riskLevel: 'High',
        tests: [tests.basicFunction, tests.tempCycle, tests.highTempOperation],
        testRationale: {
          basicFunction:     { failureCause: '頻率/容量提升需主板 BIOS 能正確識別和訓練新規格，否則無法開機', detectionMethod: '系統識別 + 容量確認 + 記憶體壓力測試', necessity: '必驗 (Gate Test)' },
          tempCycle:         { failureCause: '更高密度顆粒在溫度循環下 CTE 失配應力更大，焊點耐久性需確認', detectionMethod: '溫度循環後目視 + 功能確認', necessity: '必驗' },
          highTempOperation: { failureCause: '更高頻率運作功耗與溫升更大，需確認散熱不超過規格限制', detectionMethod: '高溫持續讀寫監測溫度與效能', necessity: '必驗' },
        }
      },
      'hardware_rev': {
        riskLevel: 'Medium',
        tests: [tests.basicFunction, tests.lowTempOnOff, tests.tempCycle],
        testRationale: {
          basicFunction: { failureCause: '內部設計優化後，基本功能相容性需確認', detectionMethod: '功能識別 + 記憶體壓力測試', necessity: '必驗 (Gate Test)' },
          lowTempOnOff:  { failureCause: '硬體修訂可能調整上電時序，低溫下更敏感', detectionMethod: '低溫冷開機穩定性確認', necessity: '條件必驗' },
          tempCycle:     { failureCause: '確認硬體版本變更後焊點耐候性維持', detectionMethod: '溫度循環後目視 + 功能確認', necessity: '條件必驗' },
        }
      }
    }
  },

  {
    id: 'rf',
    name: 'RF 無線通訊模組',
    category: 'module',
    description: 'Wi-Fi / 5G / 藍牙 等射頻通訊收發模組。',
    failureModes: [
      { mode: '射頻發射功率衰減與頻飄', mechanism: '環境濕氣滲入造成遮蔽材料氧化阻值上升；因溫度震盪使石英震盪器偏移。', systemEffect: '通訊距離嚴重衰減、掉包、斷線。' }
    ],
    changeImpacts: {
      'diff_vendor': {
        riskLevel: 'High',
        tests: [tests.basicFunction, tests.highTempHighHumidity, tests.tempCycle, tests.highLowTempStorage],
        testRationale: {
          basicFunction:       { failureCause: '新廠牌天線匹配電路與驅動程式可能差異，確認基本訊號收發正常', detectionMethod: 'RF 功能測試 + 訊號強度與連線率量測', necessity: '必驗 (Gate Test)' },
          highTempHighHumidity:{ failureCause: '新廠牌石英震盪器與金屬遮蔽罩在高溫高濕下頻率漂移加速', detectionMethod: '高溫高濕持續通訊，監測頻率偏移與掉包率', necessity: '必驗' },
          tempCycle:           { failureCause: '不同廠牌遮蔽罩焊接 CTE 差異，冷熱交替下射頻接地面可能產生裂縫', detectionMethod: '溫度循環後 RF 功能 + 頻率偏移量測', necessity: '必驗' },
          highLowTempStorage:  { failureCause: '新廠牌儲存極限溫度範圍未確認，材料在極端溫度下可能變形', detectionMethod: '高低溫儲存後目視 + RF 功能確認', necessity: '必驗' },
        }
      },
      'diff_spec': {
        riskLevel: 'High',
        tests: [tests.basicFunction, tests.highTempHighHumidity, tests.tempCycle, tests.highTempOperation],
        testRationale: {
          basicFunction:       { failureCause: '新頻段/協議需驅動與韌體配合，確認系統可正確識別和建立連線', detectionMethod: '多頻段/協議功能測試 + 吞吐量量測', necessity: '必驗 (Gate Test)' },
          highTempHighHumidity:{ failureCause: '新頻段元件在高溫高濕下阻抗變化不同，影響頻率穩定性', detectionMethod: '高溫高濕持續 RF 效能監測', necessity: '必驗' },
          tempCycle:           { failureCause: '新規格模組元件 CTE 特性需重新確認，焊點耐久性', detectionMethod: '溫度循環後 RF 頻率與功率確認', necessity: '必驗' },
          highTempOperation:   { failureCause: '更高傳輸速率功耗更大，高溫下散熱與降頻確認', detectionMethod: '高溫持續傳輸，監測速率與溫度', necessity: '必驗' },
        }
      },
      'hardware_rev': {
        riskLevel: 'Low',
        tests: [],
        testRationale: {}
      }
    }
  },

  // ==========================================
  // 【 主板與基礎元件 (Motherboard / Component) 】
  // ==========================================
  {
    id: 'ic',
    name: '主動元件 (IC 晶片/控制器)',
    category: 'component',
    description: 'MCU 控制微處理器、電源管理 IC 等。',
    failureModes: [
      { mode: '打線脫落 (Wire Bond Lift) 或銲點疲勞', mechanism: '封裝內熱膨脹係數(CTE)不匹配，經過高低溫循環產生剪應力。', systemEffect: '訊號斷路或控制功能失效。' }
    ],
    changeImpacts: {
      'pin2pin': {
        riskLevel: 'Medium',
        description: '即便規格相容，不同製程的 IC 在極端溫度下會有不同表現。',
        tests: [tests.basicFunction, tests.lowTempOnOff, tests.highTempOperation, tests.highTempHighHumidity],
        testRationale: {
          basicFunction:       { failureCause: '不同製程 IC 電氣特性差異可能使周邊電路行為不同，需確認功能正常', detectionMethod: '完整功能驗證 + 訊號 Timing 量測', necessity: '必驗 (Gate Test)' },
          lowTempOnOff:        { failureCause: '不同製程 IC 在低溫下啟動時序(Startup Sequence)可能差異', detectionMethod: '低溫冷開機確認控制器初始化正常', necessity: '必驗' },
          highTempOperation:   { failureCause: '不同廠牌 IC 的 TJ max 和熱阻(Θja)不同，高溫下降頻策略不同', detectionMethod: '高溫持續運作監測 IC 溫度與功能', necessity: '必驗' },
          highTempHighHumidity:{ failureCause: '不同封裝材料的吸濕率不同，高溫高濕下離子遷移速率差異', detectionMethod: '高溫高濕後完整功能確認', necessity: '條件必驗' },
        }
      },
      'non_pin2pin': {
        riskLevel: 'High',
        description: '需重新設計周邊電路，等同新板認證。',
        tests: [tests.basicFunction, tests.lowTempOnOff, tests.highTempOperation, tests.highTempHighHumidity, tests.tempCycle],
        testRationale: {
          basicFunction:       { failureCause: '全新電路設計等同新板，最基本功能驗收關卡', detectionMethod: '完整功能 + 訊號完整性(SI)測試', necessity: '必驗 (設計驗收 Gate)' },
          lowTempOnOff:        { failureCause: '全新電路設計在低溫下初始化行為未知，FW 時序需重新驗證', detectionMethod: '低溫完整功能確認', necessity: '必驗' },
          highTempOperation:   { failureCause: '新電路設計的熱行為與功耗未知，需完整驗證散熱能力', detectionMethod: '高溫持續運作監測 IC 與板面溫度', necessity: '必驗' },
          highTempHighHumidity:{ failureCause: '新設計暴露面積與材料組合的耐溫濕能力需完整確認', detectionMethod: '高溫高濕後完整功能確認', necessity: '必驗' },
          tempCycle:           { failureCause: '新 PCB 設計中 IC 位置與周邊元件的 CTE 配合需驗證', detectionMethod: '溫度循環後目視焊點 + 功能確認', necessity: '必驗' },
        }
      },
      'layout_adj': {
        riskLevel: 'High',
        description: '位置調整可能影響高速訊號干擾或陷入板彎應力區。',
        tests: [tests.basicFunction, tests.tempCycle, tests.randomVib, tests.sineVib],
        testRationale: {
          basicFunction: { failureCause: '走線/位置調整後，高速訊號完整性與串擾需重新確認', detectionMethod: '功能測試 + SI 訊號品質量測', necessity: '必驗 (Gate Test)' },
          tempCycle:     { failureCause: '新位置板面熱應力分佈重新計算，板彎應力區焊點耐久性', detectionMethod: '溫度循環後目視焊點 + 功能確認', necessity: '必驗' },
          randomVib:     { failureCause: '新位置可能落入機殼共振節點，提高動態破壞風險', detectionMethod: '寬頻震動中監測訊號與功能', necessity: '必驗' },
          sineVib:       { failureCause: '掃描新位置的共振頻率，確認 IC 及焊點在共振點下剛性足夠', detectionMethod: '正弦掃頻找出共振點，確認安全裕度', necessity: '必驗' },
        }
      }
    }
  },

  {
    id: 'passive_rc',
    name: '被動元件 (R, C, L)',
    category: 'component',
    description: '電阻(R)、電容(C)、電感(L)等基礎電子零件。',
    failureModes: [
      { mode: 'MLCC 微裂 短路 / 電阻硫化 開路', mechanism: '受板彎應力導致陶瓷本體破裂；含硫氣體導致電阻銀鈀電極硫化。', systemEffect: '電源層燒毀、分壓異常無法點亮系統。' }
    ],
    changeImpacts: {
      'pin2pin':    { riskLevel: 'Low',    tests: [], testRationale: {} },
      'non_pin2pin': {
        riskLevel: 'Medium',
        tests: [tests.basicFunction, tests.tempCycle, tests.highLowTempStorage],
        testRationale: {
          basicFunction:      { failureCause: '電阻值/耐壓/封裝尺寸改變後，分壓與濾波電路行為需確認', detectionMethod: '電路功能驗證 + 關鍵節點電壓量測', necessity: '必驗 (Gate Test)' },
          tempCycle:          { failureCause: '不同封裝尺寸(如 0402→0603)的 CTE 失配應力不同，焊點耐久性', detectionMethod: '溫度循環後目視焊點 + 功能確認', necessity: '必驗' },
          highLowTempStorage: { failureCause: '不同介電材料(如 NPO→X7R)的溫度係數，確認儲存極限下無特性漂移', detectionMethod: '高低溫儲存後電氣特性量測', necessity: '條件必驗' },
        }
      },
      'layout_adj': {
        riskLevel: 'Medium',
        tests: [tests.randomVib, tests.sineVib, tests.tempCycle],
        testRationale: {
          randomVib: { failureCause: '新位置在寬頻振動下受更大動態應力，MLCC 最怕板彎衝擊破裂', detectionMethod: '隨機振動後目視 MLCC 本體 + 功能確認', necessity: '必驗' },
          sineVib:   { failureCause: '掃描新位置的共振頻率，確認 MLCC 沒有落入高應力共振點', detectionMethod: '正弦掃頻後確認無共振破壞', necessity: '必驗' },
          tempCycle: { failureCause: '新位置板面熱分佈不同，CTE 應力集中點需重新確認', detectionMethod: '溫度循環後目視焊點', necessity: '必驗' },
        }
      }
    }
  },

  {
    id: 'electrolytic_cap',
    name: '電解電容 (Electrolytic Capacitor)',
    category: 'component',
    description: '鋁電解電容，常用於電源濾波與去耦合電路，內含液態電解質，對氣壓變化敏感。',
    failureModes: [
      {
        mode: '電解液滲漏 / ESR 上升 / 容值衰退',
        mechanism: '低氣壓使電容外部壓力下降，內外壓差增大，安全閥在較低壓力下提前開啟，電解液揮發滲漏。',
        systemEffect: '電源漣波增大、板面污染、濾波功能劣化，嚴重時造成電源不穩定重啟。'
      }
    ],
    changeImpacts: {
      'pin2pin': {
        riskLevel: 'Medium',
        description: '不同廠牌電解電容的安全閥開啟壓力規格可能不同，需確認新料件在低氣壓環境下的壓差耐受能力。',
        tests: [tests.basicFunction, tests.altitude],
        testRationale: {
          basicFunction: { failureCause: '新廠牌電解電容特性（ESR、容值、漏電流）需確認符合電路設計需求', detectionMethod: '電源漣波量測 + 電路功能驗證', necessity: '必驗 (Gate Test)' },
          altitude:      { failureCause: '低氣壓（2000–5000m）使電容內外壓差增大，安全閥提前開啟導致電解液滲漏、ESR 上升', detectionMethod: '高空 Chamber 通電運作，測試前後量測 ESR / 容值，並目視檢查滲漏', necessity: '必驗（氣壓失效主因）' },
        }
      },
      'non_pin2pin': {
        riskLevel: 'High',
        description: '耐壓值、容量或封裝尺寸變更，電路特性與安全閥規格均需重新確認。',
        tests: [tests.basicFunction, tests.altitude, tests.highTempOperation],
        testRationale: {
          basicFunction:     { failureCause: '耐壓 / 容量規格變更後，濾波與去耦合特性需重新驗證', detectionMethod: '電源漣波量測 + 電路功能驗證', necessity: '必驗 (Gate Test)' },
          altitude:          { failureCause: '新規格電容的安全閥開啟壓力未知，低氣壓環境下壓差耐受能力需重新驗證', detectionMethod: '高空 Chamber 通電運作，測試前後量測 ESR / 容值，並目視檢查滲漏', necessity: '必驗（氣壓失效主因）' },
          highTempOperation: { failureCause: '新容量 / 耐壓規格下電容的高溫電氣特性需確認，避免過熱加速電解液揮發', detectionMethod: '高溫持續運作量測 ESR 與漣波', necessity: '必驗' },
        }
      },
      'capacity_change': {
        riskLevel: 'Low',
        description: '同廠牌同規格僅容量調整，安全閥設計相同，氣壓耐受特性不變，可豁免高空測試。',
        tests: [tests.basicFunction],
        testRationale: {
          basicFunction: { failureCause: '容量變更後濾波特性微幅改變，確認電路功能正常', detectionMethod: '電源漣波量測 + 電路功能驗證', necessity: '必驗 (Gate Test)' },
        }
      },
    }
  },

  {
    id: 'emmc',
    name: 'eMMC / UFS (嵌入式儲存)',
    category: 'component',
    description: '焊接於主機板上的高密度儲存晶片，內含 NAND Flash 與獨立控制器，形同微型 SSD。',
    failureModes: [
      { mode: '控制器熱降頻當機或 BGA 銲點疲勞', mechanism: '寫入放大效應與密集讀寫高溫導致壽命衰減；晶片面積大導致熱膨脹剪應力撕裂 PCB PAD。', systemEffect: '系統無預警凍結 (Freeze)、檔案系統損毀無法開機。' }
    ],
    changeImpacts: {
      'pin2pin': {
        riskLevel: 'High',
        description: '這類 Second Source 導入是極高風險變更，常引發神秘的相容性當機。',
        tests: [tests.basicFunction, tests.lowTempOnOff, tests.highTempOnOff, tests.highTempHighHumidity, tests.tempCycle, tests.randomVib],
        testRationale: {
          basicFunction:       { failureCause: 'Second Source 相容性是最大風險，確認系統能正確識別並讀寫', detectionMethod: '完整讀寫功能 + 容量識別確認', necessity: '必驗 (最關鍵 Gate Test)' },
          lowTempOnOff:        { failureCause: '不同廠牌 FW 在低溫下初始化時序差異，是相容性問題常見根源', detectionMethod: '低溫冷開機確認 FW 初始化穩定', necessity: '必驗' },
          highTempOnOff:       { failureCause: '熱機狀態下新廠牌控制器的熱保護邏輯可能不同，引發非預期重啟', detectionMethod: '高溫重啟循環確認穩定性', necessity: '必驗' },
          highTempHighHumidity:{ failureCause: '新廠牌 BGA 封裝耐溫濕能力與腐蝕風險未確認', detectionMethod: '高溫高濕後功能 + 目視 BGA', necessity: '必驗' },
          tempCycle:           { failureCause: 'eMMC BGA 面積大，不同廠牌 PCB 基板 CTE 差異引發焊球疲勞開裂', detectionMethod: '溫度循環後功能 + X-ray 焊點確認', necessity: '必驗' },
          randomVib:           { failureCause: 'BGA 錫球疲勞在震動環境下更容易顯現，Second Source 風險更高', detectionMethod: '隨機震動後功能確認', necessity: '必驗' },
        }
      },
      'capacity_change': {
        riskLevel: 'Medium',
        description: '同廠牌同規格僅容量不同，失效模式相同。主要驗證作業系統容量識別與基礎熱應力。',
        tests: [tests.basicFunction, tests.lowTempOnOff, tests.highTempOperation, tests.tempCycle],
        testRationale: {
          basicFunction:     { failureCause: 'OS 需正確識別新容量並正常掛載，確認容量識別無誤', detectionMethod: '開機後容量識別 + 格式化 + 讀寫測試', necessity: '必驗 (Gate Test)' },
          lowTempOnOff:      { failureCause: '更大容量 eMMC 的 FW 初始化時間更長，低溫下更敏感', detectionMethod: '低溫冷開機確認開機時間在規格內', necessity: '必驗' },
          highTempOperation: { failureCause: '更大容量在持續讀寫下功耗更高，高溫下熱降頻確認', detectionMethod: '高溫連續讀寫監測速率與溫度', necessity: '必驗' },
          tempCycle:         { failureCause: '容量差異來自顆粒疊加層數，BGA 高度微增，CTE 應力略微不同', detectionMethod: '溫度循環後功能確認', necessity: '條件必驗' },
        }
      },
      'non_pin2pin': {
        riskLevel: 'High',
        description: '需重新設計 PCB 硬體繞線。',
        tests: [tests.basicFunction, tests.lowTempOnOff, tests.highTempOnOff, tests.highTempHighHumidity, tests.tempCycle, tests.randomVib, tests.shockHalfSine],
        testRationale: {
          basicFunction:       { failureCause: 'PCB 重新繞線後，訊號完整性(SI)和阻抗需重新驗收', detectionMethod: '完整讀寫功能 + 高速訊號 SI 測試', necessity: '必驗 (設計驗收 Gate)' },
          lowTempOnOff:        { failureCause: '新繞線路徑可能改變訊號時序，低溫更敏感', detectionMethod: '低溫冷開機完整功能確認', necessity: '必驗' },
          highTempOnOff:       { failureCause: '新電路設計熱機狀態下重啟穩定性確認', detectionMethod: '高溫重啟循環', necessity: '必驗' },
          highTempHighHumidity:{ failureCause: '新 PCB 設計整體耐溫濕能力確認', detectionMethod: '高溫高濕後功能確認', necessity: '必驗' },
          tempCycle:           { failureCause: '全新焊墊(PAD)設計的 CTE 匹配與焊點耐久性', detectionMethod: '溫度循環後功能 + X-ray', necessity: '必驗' },
          randomVib:           { failureCause: '新位置與新 PAD 設計的動態耐久性確認', detectionMethod: '隨機震動後功能 + 目視', necessity: '必驗' },
          shockHalfSine:       { failureCause: '新設計對瞬間最大衝擊的抗剪切承載力確認', detectionMethod: '衝擊後功能 + 目視 BGA', necessity: '必驗' },
        }
      },
      'layout_adj': {
        riskLevel: 'Medium',
        description: '移動位置干涉板彎應力區，重測動態衝擊與高低溫變化。',
        tests: [tests.basicFunction, tests.tempCycle, tests.randomVib, tests.sineVib, tests.shockHalfSine],
        testRationale: {
          basicFunction: { failureCause: '走線調整後 SI 與功能確認，特別是高速 eMMC/UFS 訊號', detectionMethod: '功能測試 + SI 量測', necessity: '必驗 (Gate Test)' },
          tempCycle:     { failureCause: '新位置板面熱應力分佈重新確認，焊點耐久性', detectionMethod: '溫度循環後功能 + 目視', necessity: '必驗' },
          randomVib:     { failureCause: '新位置動態應力確認，避免落入共振高應力區', detectionMethod: '隨機震動後功能確認', necessity: '必驗' },
          sineVib:       { failureCause: '新位置共振頻率掃描，確認無共振破壞點', detectionMethod: '正弦掃頻確認', necessity: '必驗' },
          shockHalfSine: { failureCause: '新位置抗瞬間衝擊能力確認', detectionMethod: '衝擊後功能 + 目視', necessity: '必驗' },
        }
      }
    }
  },

  {
    id: 'connector',
    name: 'Connector (連接器/插槽)',
    category: 'component',
    description: '焊接於主板上，供外部線材、記憶體或擴充卡插拔之端子座 (如 PCIe Slot, USB Port, FPC Connector)。',
    failureModes: [
      { mode: '接觸不良 (Fretting Corrosion) 或銲點冷銲斷裂', mechanism: '環境微震動造成接觸端面純金層磨耗露出底鎳氧化；插拔應力造成 SMT 焊墊剝離或彈片疲勞。', systemEffect: '電源瞬斷、高速訊號 (如 USB3, PCIe) 阻抗變化引發降速、掉包甚至系統死機。' }
    ],
    changeImpacts: {
      'pin2pin': {
        riskLevel: 'Medium',
        description: '不同廠牌的塑膠耐溫性與彈片夾持力有差異，回流行程(Reflow)或插拔時表現可能不同。',
        tests: [tests.basicFunction, tests.highLowTempStorage, tests.tempCycle, tests.randomVib],
        testRationale: {
          basicFunction:      { failureCause: '不同廠牌彈片夾持力和接觸電阻差異，確認插入後訊號正常', detectionMethod: '插拔後訊號量測 + 功能確認', necessity: '必驗 (Gate Test)' },
          highLowTempStorage: { failureCause: '不同廠牌塑膠耐溫範圍確認，材料收縮不引發插槽變形', detectionMethod: '高低溫儲存後目視 + 插拔力量測', necessity: '必驗' },
          tempCycle:          { failureCause: '不同廠牌材料 CTE 差異，冷熱循環後焊墊剝離風險', detectionMethod: '溫度循環後目視焊點 + 接觸阻抗量測', necessity: '必驗' },
          randomVib:          { failureCause: '不同廠牌彈片夾持力在震動下的鎖固能力差異，易引發微震磨損', detectionMethod: '隨機震動後插拔 + 接觸阻抗確認', necessity: '必驗' },
        }
      },
      'plating_change': {
        riskLevel: 'High',
        description: '觸孔鍍金厚度下降或改用化金(ENIG)，將大幅削弱抗微震動磨損能力與耐硫腐蝕能力，硫化斷線。',
        tests: [tests.basicFunction, tests.saltMist, tests.randomVib, tests.sineVib, tests.tempCycle],
        testRationale: {
          basicFunction: { failureCause: '鍍層變更後接觸阻抗可能改變，需先確認基本接觸功能正常', detectionMethod: '插拔後接觸阻抗量測 + 功能確認', necessity: '必驗 (Gate Test)' },
          saltMist:      { failureCause: '鍍金厚度降低後，接觸端子在鹽霧腐蝕下的耐久性是核心風險', detectionMethod: '鹽霧後接觸阻抗量測 + 目視腐蝕等級', necessity: '必驗 (核心驗證)' },
          randomVib:     { failureCause: '鍍層減薄後微震動磨損(Fretting Corrosion)加速，震動後確認', detectionMethod: '隨機震動後接觸阻抗量測', necessity: '必驗' },
          sineVib:       { failureCause: '掃描機殼共振頻率下鍍層磨損速率最高點，確認安全裕度', detectionMethod: '正弦掃頻 + 振動後阻抗量測', necessity: '必驗' },
          tempCycle:     { failureCause: '熱脹冷縮加速鍍層疲勞剝落與底層鎳層氧化', detectionMethod: '溫度循環後接觸阻抗 + 目視', necessity: '必驗' },
        }
      },
      'non_pin2pin': {
        riskLevel: 'High',
        description: 'DIP 到 SMT 的製程改變，或是引腳數量增減，嚴重影響 PCB Layout、插拔結構承重力。',
        tests: [tests.basicFunction, tests.shockHalfSine, tests.randomVib, tests.tempCycle],
        testRationale: {
          basicFunction: { failureCause: '引腳數/封裝改變後，PCB Layout 與訊號完整性完整確認', detectionMethod: '完整功能 + 阻抗/訊號量測', necessity: '必驗 (Gate Test)' },
          shockHalfSine: { failureCause: 'DIP→SMT 製程改變後，連接器焊墊對瞬間衝擊的承載力確認', detectionMethod: '衝擊後目視焊墊 + 功能', necessity: '必驗' },
          randomVib:     { failureCause: '新焊接方式的動態耐久性確認', detectionMethod: '隨機震動後功能 + 目視', necessity: '必驗' },
          tempCycle:     { failureCause: '新封裝的 CTE 匹配確認，焊墊耐久性', detectionMethod: '溫度循環後目視 + 阻抗量測', necessity: '必驗' },
        }
      },
      'layout_adj': {
        riskLevel: 'Medium',
        description: '連接器若被移至 PCB 板邊或靠近大型鎖固件旁，極易在運輸時造成焊點撕裂，且可能改變系統共振頻率。',
        tests: [tests.basicFunction, tests.randomVib, tests.sineVib, tests.shockHalfSine],
        testRationale: {
          basicFunction: { failureCause: '移位後 SI 確認，特別是 PCIe/USB 高速訊號完整性', detectionMethod: '功能 + 訊號量測', necessity: '必驗 (Gate Test)' },
          randomVib:     { failureCause: '板邊或靠近鎖固點的新位置，震動下焊點撕裂風險更高', detectionMethod: '隨機震動後目視焊點 + 功能', necessity: '必驗' },
          sineVib:       { failureCause: '新位置共振模態確認，避免連接器落入高振幅共振點', detectionMethod: '正弦掃頻找共振點', necessity: '必驗' },
          shockHalfSine: { failureCause: '板邊位置對衝擊最敏感，焊點撕裂風險最高', detectionMethod: '衝擊後目視焊點 + 功能', necessity: '必驗' },
        }
      }
    }
  },

  {
    id: 'pcb',
    name: 'PCBA 主機板',
    category: 'component',
    description: '核心主機板與裸板，承載並串接所有內部零組件的高密度微距電路。',
    failureModes: [
      {
        mode: '製程覆蓋缺陷 — Coating 滲入連接器接觸面導致接觸不良',
        mechanism: '液態 Conformal Coating 於噴塗或刷塗時，因毛細作用滲入未被有效遮蔽的連接器插槽、測試點或彈片接觸面，固化後在金屬接觸面形成絕緣薄膜，使接觸阻抗異常升高。',
        systemEffect: '連接器插入後接觸阻抗偏高，導致 I/O 訊號異常、ICT 線上功能測試誤判不良，嚴重時造成功能完全失效。'
      }
    ],
    changeImpacts: {
      'add_pcb_coating': {
        riskLevel: 'Low',
        description: '新增 Coating 使板面防潮、抗鹽霧能力正向提升。熱應力影響約 2°C (Thermal Team 確認在元件規格內)，無需熱驗證。HTHH 亦無需執行，原因為裸板在無 Coating 時已能通過，加了防護更好的 Coating 後必然通過，測試意義不存在。唯一需要執行的是 Basic Function，以確認噴塗製程遮蔽精度，確保 Coating 未覆蓋連接器接點或測試點。',
        tests: [tests.basicFunction],
        testRationale: {
          basicFunction: { failureCause: 'Coating 毛細滲入未被有效遮蔽的連接器接點，固化後形成絕緣薄膜造成接觸不良', detectionMethod: 'ICT 功能測試 + 連接器插拔接觸阻抗量測，確認噴塗遮蔽精度', necessity: '必驗 (唯一必要測試)' },
        }
      }
    }
  },

  // ==========================================
  // 【 機構元件 (Mechanics Level) 】
  // ==========================================
  {
    id: 'thermal_pad',
    name: 'Thermal Pad (導熱墊片)',
    category: 'mechanics',
    description: '填充 IC 晶片與散熱器之間的微小空隙，降低熱阻。',
    failureModes: [
      { mode: '導熱係數衰退、溢油滲出 (Bleeding out) 或碎裂', mechanism: '長期高溫運作導致矽樹脂老化乾涸、或是壓縮量(Compression rate)設定錯誤導致受應力碎裂。', systemEffect: '熱阻急遽上升，系統觸發過熱保護降頻或重啟。' }
    ],
    changeImpacts: {
      'assembly': {
        riskLevel: 'Medium',
        description: '改變了機構組裝鎖固公差，可能導致下壓磅數改變。',
        tests: [tests.randomVib, tests.sineVib],
        testRationale: {
          randomVib: { failureCause: '鎖固公差改變導致 Thermal Pad 下壓磅數變化，震動下墊片可能位移或壓縮量改變', detectionMethod: '隨機震動後熱阻量測 + 目視墊片位移', necessity: '必驗' },
          sineVib:   { failureCause: '找出新組裝結構的共振頻率，確認 Thermal Pad 在共振點不會脫落', detectionMethod: '正弦掃頻確認共振安全裕度', necessity: '必驗' },
        }
      },
      'thermal_mech': {
        riskLevel: 'High',
        description: '後續設計驗證須嚴格確認「厚度 (Thickness)」與「材質 (Material)」。',
        tests: [tests.highLowTempStorage, tests.highTempOperation, tests.highTempHighHumidity, tests.tempCycle],
        testRationale: {
          highLowTempStorage:  { failureCause: '新材質 Thermal Pad 在高低溫儲存後可能硬化、脆化、溢油等材料劣化', detectionMethod: '高低溫儲存後外觀 + 壓縮特性量測', necessity: '必驗' },
          highTempOperation:   { failureCause: '新材質導熱係數在實際高溫連續工作下的熱阻表現未知，可能造成 IC 過熱', detectionMethod: '高溫持續運作中量測 IC 溫度，確認熱阻達標', necessity: '必驗 (核心熱驗證)' },
          highTempHighHumidity:{ failureCause: '新材質在高溫高濕環境下可能溢油、吸濕膨脹，改變壓縮特性', detectionMethod: '高溫高濕後目視 + 熱阻量測', necessity: '必驗' },
          tempCycle:           { failureCause: '新材質在冷熱交替下的壓縮率變化與老化速率確認', detectionMethod: '溫度循環後熱阻 + 壓縮量量測', necessity: '必驗' },
        }
      }
    }
  },

  {
    id: 'heatsink',
    name: 'Heatsink (金屬散熱鰭片)',
    category: 'mechanics',
    description: '透過鋁/銅材質擴展表面積進行對流散熱。',
    failureModes: [
      { mode: '震動引發元件斷腳脫落', mechanism: '重心偏高的散熱器增加力矩，在隨機震動下將 IC 的 BGA 錫球從 PCB 撕裂。', systemEffect: '主系統當機、物理損壞不可逆。' }
    ],
    changeImpacts: {
      'assembly': {
        riskLevel: 'High',
        description: '鎖固結構（螺絲轉速、背板）的影響。',
        tests: [tests.randomVib, tests.sineVib, tests.shockHalfSine],
        testRationale: {
          randomVib:     { failureCause: '新鎖固結構下，重心偏高的散熱器在寬頻震動下對 BGA 錫球施加的動態力矩', detectionMethod: '隨機震動後目視 + 功能確認 BGA 未撕裂', necessity: '必驗 (核心動態風險)' },
          sineVib:       { failureCause: '找出新組裝結構下散熱器的共振頻率，避免共振放大造成 BGA 破壞', detectionMethod: '正弦掃頻找共振點，確認安全裕度', necessity: '必驗' },
          shockHalfSine: { failureCause: '跌落瞬間衝擊下，散熱器質量×加速度產生的最大剪切力確認 BGA 承載', detectionMethod: '衝擊後目視 + 功能確認', necessity: '必驗' },
        }
      },
      'thermal_mech': {
        riskLevel: 'High',
        description: '鰭片高度與指向改變，會重新定義系統內部風道。',
        tests: [tests.tempCycle, tests.highTempOperation, tests.altitude],
        testRationale: {
          tempCycle:         { failureCause: '新散熱結構改變系統熱分佈，冷熱交替下主板熱應力需重新評估', detectionMethod: '溫度循環後目視 + 功能確認', necessity: '必驗' },
          highTempOperation: { failureCause: '新鰭片設計的實際散熱效率未知，需確認 IC 在高溫下不超過 TJ max', detectionMethod: '高溫持續運作量測 IC 溫度', necessity: '必驗 (核心熱驗證)' },
          altitude:          { failureCause: '新散熱設計在低氣壓(對流散熱能力下降)環境下的熱降級幅度確認', detectionMethod: '高空環境下持續運作，監測 IC 溫度是否超限', necessity: '必驗' },
        }
      }
    }
  },

  {
    id: 'chassis',
    name: 'Chassis (系統機殼)',
    category: 'mechanics',
    description: '容納並保護所有內部元件的第一道防線金屬與塑膠組件。',
    failureModes: [
      { mode: '結構變形破損、水氣滲入', mechanism: '板金厚度不足或骨架設計缺陷，遭遇落下或共振放大事形成永久形變；膠條密封失效。', systemEffect: 'IP 防護失效，PCB 零組件泡水短路或物理壓毀。' }
    ],
    changeImpacts: {
      'assembly': {
        riskLevel: 'High',
        tests: [tests.ipCode, tests.randomVib, tests.sineVib, tests.shockHalfSine],
        testRationale: {
          ipCode:        { failureCause: '組裝結構變更最直接影響密封性，膠條/卡榫對位差異引發 IP 等級失效', detectionMethod: 'IP 防水/防塵等級實測(IP67/IP66)', necessity: '必驗 (首要確認)' },
          randomVib:     { failureCause: '新卡榫/螺絲鎖固結構在寬頻震動下的結構完整性與密封持久性', detectionMethod: '隨機震動後目視 + IP 複測', necessity: '必驗' },
          sineVib:       { failureCause: '新機殼結構共振頻率確認，避免共振導致結構破損或密封膠條疲勞', detectionMethod: '正弦掃頻找共振點，確認安全裕度', necessity: '必驗' },
          shockHalfSine: { failureCause: '新組裝結構在瞬間最大衝擊下的完整性與 IP 持續性確認', detectionMethod: '衝擊後目視 + IP 確認', necessity: '必驗' },
        }
      },
      'thermal_mech': {
        riskLevel: 'High',
        description: '開孔率改變影響 IP 與對流；本身兼作散熱載體，更須考驗熱脹冷縮與抗壓性。',
        tests: [tests.ipCode, tests.saltMist, tests.tempCycle, tests.highTempHighHumidity],
        testRationale: {
          ipCode:          { failureCause: '散熱開孔設計變更後 IP 等級需重新確認，開孔率與密封設計平衡', detectionMethod: 'IP 防水/防塵實測', necessity: '必驗 (首要確認)' },
          saltMist:        { failureCause: '新散熱開孔可能改變外部腐蝕性氣體的進入路徑，腐蝕風險', detectionMethod: '鹽霧後目視腐蝕 + IP 複測', necessity: '必驗' },
          tempCycle:       { failureCause: '機殼兼作散熱載體時，開孔設計在冷熱交替下金屬疲勞與密封膠條耐久', detectionMethod: '溫度循環後 IP 測試 + 目視結構完整性', necessity: '必驗' },
          highTempHighHumidity:{ failureCause: '散熱孔變大後，內部元件暴露於高溫高濕環境的風險增加', detectionMethod: '高溫高濕後內部目視 + 功能確認', necessity: '必驗' },
        }
      },
      'cable_routing': {
        riskLevel: 'Low',
        tests: [tests.randomVib],
        testRationale: {
          randomVib: { failureCause: '新走線路徑確認排線不與機構干涉或在震動下磨損，是最小必要確認', detectionMethod: '隨機震動後目視排線磨損情況', necessity: '最小必要確認' },
        }
      },
      'mounting': {
        riskLevel: 'High',
        description: '壁掛 (Wall mount) 支架設計變更直接衝擊承重極限。',
        tests: [tests.shockHalfSine, tests.randomVib, tests.pkgDrop],
        testRationale: {
          shockHalfSine: { failureCause: '壁掛支架必須確認最大瞬間衝擊荷載(如地震或意外碰撞)的承載能力', detectionMethod: '衝擊測試後目視支架變形量 + 鎖點完整性', necessity: '必驗 (安全關鍵)' },
          randomVib:     { failureCause: '持續微震動下支架疲勞鬆脫風險，特別是工業環境長期安裝', detectionMethod: '隨機震動後螺絲扭力確認 + 目視', necessity: '必驗' },
          pkgDrop:       { failureCause: '模擬安裝時不慎摔落，確認支架與鎖點的抗摔能力', detectionMethod: '包裝落下後目視支架變形', necessity: '必驗' },
        }
      },
      'mech_print': {
        riskLevel: 'Low',
        description: '僅涉及機殼表層網印標籤或文字微調，對於結構保護與散熱功能無任何影響。',
        tests: [],
        testRationale: {}
      }
    }
  },

  {
    id: 'packaging',
    name: 'Packaging (包材與外箱)',
    category: 'mechanics',
    description: '保護產品在物流運輸與儲存過程中，免受物理衝擊與氣候危害的外部紙箱與緩衝組件。',
    failureModes: [
      { mode: '緩衝失效破裂導致產品受損', mechanism: '包材 G 值吸收能力不足；堆疊強度抗壓(BCT)不夠導致底層紙箱壓垮變形。', systemEffect: '產品外觀損傷、內部機構斷裂或主機板焊點撕裂等嚴重物理損毀。' }
    ],
    changeImpacts: {
      'pkg_size': {
        riskLevel: 'Medium',
        description: '紙箱尺寸的改變將直接影響棧板的堆疊排列方式 (Palletization) 效率，並可能改變掉落時的重心。',
        tests: [tests.highLowTempStorage, tests.pkgDrop, tests.pkgVib],
        testRationale: {
          highLowTempStorage: { failureCause: '新尺寸紙箱在高低溫儲存環境下紙材強度變化(濕度影響 BCT 堆疊強度)', detectionMethod: '高低溫儲存後 BCT 堆疊強度測試', necessity: '必驗' },
          pkgDrop:            { failureCause: '新尺寸改變重心位置，摔落時衝擊 G 值分佈需重新評估', detectionMethod: '各面/角摔落後內容物目視 + 功能確認', necessity: '必驗 (物流核心驗證)' },
          pkgVib:             { failureCause: '新尺寸在棧板運輸中的顛簸傳遞特性確認，確認緩衝材足夠吸震', detectionMethod: '運輸振動後內容物功能確認', necessity: '必驗' },
        }
      },
      'pkg_cushion': {
        riskLevel: 'High',
        description: '緩衝材料 (如 EPE 泡棉換成紙塑) 是包裝設計的心臟。材料的動態緩衝曲線 (G-Value) 改變，必須重新執行摔落與運輸震動以確保吸震力。',
        tests: [tests.highLowTempStorage, tests.pkgDrop, tests.pkgVib],
        testRationale: {
          highLowTempStorage: { failureCause: '新緩衝材料在高低溫環境下壓縮恢復特性變化，影響保護能力', detectionMethod: '高低溫儲存後緩衝材壓縮恢復率量測', necessity: '必驗' },
          pkgDrop:            { failureCause: '核心風險：新緩衝材的動態 G 值曲線必須重新測試，確保摔落時 G 值在產品承受範圍內', detectionMethod: '各面/角摔落實測 G 值 + 內容物目視', necessity: '必驗 (最關鍵測試)' },
          pkgVib:             { failureCause: '新材料的運輸振動吸收特性確認，排除長途運輸共振破壞', detectionMethod: '運輸振動後內容物功能確認', necessity: '必驗' },
        }
      },
      'pkg_print': {
        riskLevel: 'Low',
        description: '僅涉及外貿標示與識別，無影響物理防護能力。',
        tests: [],
        testRationale: {}
      }
    }
  },

  {
    id: 'screw',
    name: 'Screw (螺絲固定件)',
    category: 'mechanics',
    description: '負責將各機構件、主機板緊密鎖固結命之核心金屬五金件。',
    failureModes: [
      { mode: '滑牙、崩毀或受震鬆脫', mechanism: '鎖固扭力不當、牙距不配、或隨機震動導致退牙；頭部應力集中導致斷頭。', systemEffect: '零組件異音、散熱器無法貼合接觸不良、跌落破壞周邊電路。' }
    ],
    changeImpacts: {
      'mech_length': {
        riskLevel: 'Medium',
        description: '過短導致鎖固力不足易退牙；過長可能干涉底部電路(頂件短路)或頂穿塑膠外殼。',
        tests: [tests.randomVib, tests.sineVib, tests.shockHalfSine],
        testRationale: {
          randomVib:     { failureCause: '過短的螺絲在寬頻震動下退牙鬆脫；過長的螺絲震動下頂穿底部元件', detectionMethod: '隨機震動後扭力計確認鎖固力', necessity: '必驗 (鎖固力確認)' },
          sineVib:       { failureCause: '找出系統共振頻率，確認該頻率下螺絲不會鬆脫或造成結構破壞', detectionMethod: '正弦掃頻後扭力確認', necessity: '必驗' },
          shockHalfSine: { failureCause: '瞬間最大衝擊下短牙螺絲的抗剪切能力確認', detectionMethod: '衝擊後扭力 + 目視確認', necessity: '必驗' },
        }
      },
      'mech_material': {
        riskLevel: 'High',
        description: '金屬材質(如鐵改不鏽鋼)或表面處理(鍍鋅改鍍鎳)不同，改變硬度與抗拉強度，甚至在潮濕下引發雙金屬電位差腐蝕(Galvanic Corrosion)。',
        tests: [tests.saltMist, tests.tempCycle, tests.randomVib],
        testRationale: {
          saltMist:  { failureCause: '新金屬材質/電鍍層在腐蝕環境下的耐久性，以及雙金屬電位差腐蝕(Galvanic Corrosion)風險', detectionMethod: '鹽霧後目視腐蝕等級 + 扭力確認', necessity: '必驗 (材質核心驗證)' },
          tempCycle: { failureCause: '新材質 CTE 差異在冷熱循環下的應力確認，特別是與接觸金屬件的膨脹差', detectionMethod: '溫度循環後目視 + 扭力確認', necessity: '必驗' },
          randomVib: { failureCause: '新材質硬度/抗拉強度改變後的震動鎖固耐久性確認', detectionMethod: '隨機震動後扭力確認', necessity: '必驗' },
        }
      },
      'mech_screw_angle': {
        riskLevel: 'High',
        description: '螺絲頭角度(如平頭改沉頭)若與孔位倒角不配，會產生極大的垂直楔形應力，易在震動或熱脹冷縮時撐破塑膠件。',
        tests: [tests.randomVib, tests.sineVib, tests.tempCycle, tests.shockHalfSine],
        testRationale: {
          randomVib:     { failureCause: '螺絲頭角度不匹配孔位倒角產生的楔形應力，在震動下加速塑膠件開裂', detectionMethod: '隨機震動後目視螺絲孔周圍裂痕', necessity: '必驗' },
          sineVib:       { failureCause: '找出共振頻率，確認楔形應力在最大振幅下不引發破損', detectionMethod: '正弦掃頻後目視確認', necessity: '必驗' },
          tempCycle:     { failureCause: '熱脹冷縮下螺絲頭角度與孔位的配合公差是否引發累積應力破壞', detectionMethod: '溫度循環後目視螺絲孔 + 扭力確認', necessity: '必驗' },
          shockHalfSine: { failureCause: '最大瞬間衝擊下，錯誤角度螺絲的楔形剪切應力破壞確認', detectionMethod: '衝擊後目視螺絲頭與孔位破損', necessity: '必驗' },
        }
      }
    }
  },

  {
    id: 'cable',
    name: 'Cable (線材與軟排線)',
    category: 'mechanics',
    description: '負責大電流電源傳輸或高速訊號溝通之內部連接線 (Wire) 或是軟排線 (FFC/FPC)。',
    failureModes: [
      { mode: '絕緣皮破損短路 或 內部金屬芯斷線', mechanism: '走線規劃不良與干涉物或機構銳邊摩擦；過度彎折(Bending)產生金屬拉伸疲勞斷裂。', systemEffect: '電源短路燒毀零組件、訊號瞬斷或嚴重高頻干擾 (EMI/EMC)。' }
    ],
    changeImpacts: {
      'mech_length': {
        riskLevel: 'Medium',
        description: '過長易隨震動甩打周圍元件或阻礙散熱風道；過短則在拉扯應力導致接頭(Connector)脫落或撕裂。',
        tests: [tests.randomVib, tests.sineVib, tests.shockHalfSine],
        testRationale: {
          randomVib:     { failureCause: '過長的排線在震動下甩打周圍元件造成磨損或插頭脫落；過短的排線被拉斷', detectionMethod: '隨機震動後目視排線磨損 + 接頭鎖固確認', necessity: '必驗 (走線干涉確認)' },
          sineVib:       { failureCause: '找出共振頻率，確認排線在最大振幅下不會疲勞斷裂', detectionMethod: '正弦掃頻後目視排線', necessity: '必驗' },
          shockHalfSine: { failureCause: '瞬間最大衝擊下排線長度不足時的拉伸斷裂或接頭脫落確認', detectionMethod: '衝擊後目視排線 + 接頭確認', necessity: '必驗' },
        }
      },
      'mech_material': {
        riskLevel: 'High',
        description: '線材外覆材質/隔離網變更直接攸關耐溫極限(如高溫短路)、以及在寒冷氣候下的柔韌度(低溫脆化斷裂)。',
        tests: [tests.highLowTempStorage, tests.highTempOperation, tests.lowTempOnOff, tests.tempCycle],
        testRationale: {
          highLowTempStorage: { failureCause: '新外覆材質在高溫下軟化短路、低溫下脆化斷裂的儲存極限確認', detectionMethod: '高低溫儲存後外觀 + 絕緣電阻量測', necessity: '必驗' },
          highTempOperation:  { failureCause: '新材質在持續高溫運作下的軟化點確認，避免絕緣皮熔融造成電源短路', detectionMethod: '高溫持續運作後絕緣電阻 + 目視', necessity: '必驗 (安全關鍵)' },
          lowTempOnOff:       { failureCause: '新材質在低溫下柔韌度確認，確認不會脆化斷裂或影響插拔動作', detectionMethod: '低溫彎折測試 + 插拔功能確認', necessity: '必驗' },
          tempCycle:          { failureCause: '新材質在冷熱循環下的膨脹收縮疲勞，特別是金屬芯與絕緣皮的 CTE 差', detectionMethod: '溫度循環後絕緣電阻 + 目視外觀', necessity: '必驗' },
        }
      }
    }
  }
];
