// 常用的環境試驗對應清單 (依據 IEC 60068, EN 50155, MIL-STD 等標準)
export const tests = {
  // 基礎功能
  basicFunction: { name: 'Basic Function test', standard: 'General', purpose: '確認基礎電信號與模組是否可正常被系統辨識並初步運作。', duration: '1 天' },

  // 溫度類 (儲存與運作)
  highLowTempStorage: { name: 'High/Low Temperature Storage', standard: 'IEC 60068-2-1/2', purpose: '高低溫儲存測試，驗證非開機狀態下材料是否變形剝離。', duration: '2 天' },
  highTempOperation: { name: 'High Temperature Operation', standard: 'IEC 60068-2-2', purpose: '高溫長時間運作，驗證過熱降頻與散熱能力。', duration: '2 天' },
  highTempOnOff: { name: 'High Temperature Power ON/OFF', standard: 'IEC 60068-2-2', purpose: '高溫開關機，驗證熱機狀態下的開機突波與重啟穩定度。', duration: '1 天' },
  lowTempOnOff: { name: 'Low Temperature Power ON/OFF', standard: 'IEC 60068-2-1', purpose: '低溫環境下的冷開機與持續啟閉測試。', duration: '2.5 天' },
  tempCycle: { name: 'Temperature Cycle', standard: 'IEC 60068-2-14', purpose: '冷熱交替誘發熱膨脹係數 (CTE) 失配導致微裂紋或焊點異常。', duration: '2 天' },

  // 溫濕度類
  highTempHighHumidity: { name: 'High Temp High Humidity (HTHH)', standard: 'IEC 60068-2-78', purpose: '高溫高濕度運作，驗證內部絕緣、IC作動極限與金屬生鏽。', duration: '4 天' },

  // 機械動態類 (分開包裝與裸機)
  sineVib: { name: 'Sine Vibration (正弦振動)', standard: 'IEC 60068-2-6', purpose: '找尋機殼機構或基板的共振點(Resonance)，驗證剛性。', duration: '1 天' },
  randomVib: { name: 'Random Vibration (隨機振動 - 裸機)', standard: 'IEC 60068-2-64', purpose: '模擬產品使用環境的寬頻震動，驗證模組與接頭鎖固強度。', duration: '1 天' },
  shockHalfSine: { name: 'Shock Test (Half-sine 衝擊)', standard: 'IEC 60068-2-27', purpose: '模擬跌落或強烈撞擊對元件造成的瞬間最大應力破壞。', duration: '1 天' },
  pkgVib: { name: 'Packaging Vibration (包裝振動)', standard: 'ISTA 1A/2A', purpose: '含彩盒外箱之運輸顛簸模擬，驗證緩衝材吸震力。', duration: '1 天' },
  pkgDrop: { name: 'Packaging Drop (包裝落下)', standard: 'ISTA 1A/2A', purpose: '模擬物流搬運摔落，驗證紙箱與緩衝包材保護力。', duration: '0.5 天' },

  // 特殊環境類
  ipCode: { name: 'Ingress Protection (IP 測試)', standard: 'IEC 60529', purpose: '驗證機殼密封度、防水(水柱/浸泡)與防塵能力。', duration: '2 天' },
  saltMist: { name: 'Salt Mist Test (鹽霧測試)', standard: 'IEC 60068-2-11/52', purpose: '暴露於鹽水噴霧中，驗證金屬機殼、螺絲、連接器之抗腐蝕電鍍能力。', duration: '2-4 天' },
  altitude: { name: 'Altitude Test (高空測試)', standard: 'IEC 60068-2-13', purpose: '模擬高海拔或航空運輸時的低氣壓環境，驗證散熱降級與液體(如電容)沸點氣壓問題。', duration: '1 天' }
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
    { id: 'diff_vendor', name: '不同 Vendor (廠牌)', description: '雖然規格一致，但主控晶片、材料清單(BOM)、或生產製程不同。' },
    { id: 'diff_spec', name: '不同規格 (Spec Change)', description: '容量、傳輸速率、瓦數等關鍵特性升級或變更。' },
    { id: 'hardware_rev', name: '硬體進版 (Hardware Rev. Update) 同 Vendor', description: '原廠內部設計優化、FW/HW 版本升級。' }
  ],
  component: [
    { id: 'pin2pin', name: 'Pin-to-pin 替換', description: '同規格、同封裝尺寸、脚位完全相容之替換料 (Alternative)。' },
    { id: 'capacity_change', name: '容量變更 (同廠牌/規格)', description: '同廠牌、同規格、同封裝，僅儲存容量 (Capacity) 大小不同。' },
    { id: 'non_pin2pin', name: '非 Pin-to-pin (規格/封裝異動)', description: '電阻值、耐壓值不同，或是封裝尺寸如 0402 改為 0603。' },
    { id: 'plating_change', name: '電鍍層/接點材質變更', description: '金手指、連接器接觸端子(Pin)之鍍金厚度數值、底層打底用鎳層厚度變動。' },
    { id: 'layout_adj', name: 'Layout 位置調整', description: '元件本體不變，但 PCB 走線/打孔變更或擺放座標移動。' },
    { id: 'add_pcb_coating', name: '增加 PCB Coating (無改有)', description: '原本無防護的 PCBA，為了防潮抗腐而新增三防漆 (Conformal Coating) 或點膠塗液保護。' }
  ],
  mechanics: [
    { id: 'assembly', name: '組裝結構變更', description: '卡榫、螺絲鎖孔數量位置、外殼結合處對接設計變化。' },
    { id: 'thermal_mech', name: '散熱結構 (Thermal) 變更', description: '散熱鰭片方向/高度、導熱矽膠墊 (Thermal Pad) 材質 (Material) 或厚度 (Thickness) 更動。' },
    { id: 'cable_routing', name: 'Cable routing 走線變更', description: '內部排線、同軸線繞管與綁線固定方式調整。' },
    { id: 'mounting', name: '安裝結構 (Mounting) 變更', description: '系統鎖附至牆面/機櫃的支架、滑軌或減震墊設計變動。' },
    { id: 'pkg_size', name: '外箱尺寸變更', description: '外部包裝紙箱長寬高或紙質(如 3層改 5層)變動。' },
    { id: 'pkg_cushion', name: '緩衝材質變更', description: '內部包材由 EPE 改為紙塑，或緩衝件厚度與造型變更。' },
    { id: 'pkg_print', name: '外箱印刷變更', description: '外箱標籤位置、油墨顏色、文字排版等外觀與法規宣告變化。' },
    { id: 'mech_length', name: '長度變更', description: '五金鎖固牙長或線材/排線總長度之變動。' },
    { id: 'mech_material', name: '材質變更', description: '金屬本體材質、表面處理鍍層、或線材披覆絕緣材料替換。' },
    { id: 'mech_screw_angle', name: '螺絲角度變更', description: '平頭、沉頭、傘頭等螺絲頭部角度設計變動。' },
    { id: 'mech_print', name: '系統外觀印刷變更', description: '系統金屬或塑膠機殼表面的 Logo、文字標示網印與雷雕等外觀變動。' }
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
      'diff_vendor': { riskLevel: 'High', description: '新廠牌可能帶有未知相容性與韌體時序問題。', tests: [tests.basicFunction, tests.lowTempOnOff, tests.highTempOnOff, tests.highTempHighHumidity, tests.tempCycle, tests.highLowTempStorage, tests.altitude] },
      'diff_spec': { riskLevel: 'High', tests: [tests.basicFunction, tests.lowTempOnOff, tests.highTempOperation, tests.highTempHighHumidity] },
      'hardware_rev': { riskLevel: 'Medium', description: '需確認供應商的 PCN (產品變更通知) 幅度。', tests: [tests.basicFunction, tests.tempCycle, tests.highTempOperation] }
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
      'diff_vendor': { riskLevel: 'High', tests: [tests.basicFunction, tests.highTempHighHumidity, tests.tempCycle, tests.highTempOnOff] },
      'diff_spec': { riskLevel: 'High', tests: [tests.basicFunction, tests.tempCycle, tests.highTempOperation] },
      'hardware_rev': { riskLevel: 'Medium', tests: [tests.basicFunction, tests.lowTempOnOff, tests.tempCycle] }
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
      'diff_vendor': { riskLevel: 'High', tests: [tests.basicFunction, tests.highTempHighHumidity, tests.tempCycle, tests.highLowTempStorage] },
      'diff_spec': { riskLevel: 'High', tests: [tests.basicFunction, tests.highTempHighHumidity, tests.tempCycle, tests.highTempOperation] },
      'hardware_rev': { riskLevel: 'Low', tests: [] }
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
      'pin2pin': { riskLevel: 'Medium', description: '即便規格相容，不同製程的 IC 在極端溫度下會有不同表現。', tests: [tests.basicFunction, tests.lowTempOnOff, tests.highTempOperation, tests.highTempHighHumidity] },
      'non_pin2pin': { riskLevel: 'High', description: '需重新設計周邊電路，等同新板認證。', tests: [tests.basicFunction, tests.lowTempOnOff, tests.highTempOperation, tests.highTempHighHumidity, tests.tempCycle] },
      'layout_adj': { riskLevel: 'High', description: '位置調整可能影響高速訊號干擾或陷入板彎應力區。', tests: [tests.basicFunction, tests.tempCycle, tests.randomVib, tests.sineVib] }
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
      'pin2pin': { riskLevel: 'Low', tests: [] },
      'non_pin2pin': { riskLevel: 'Medium', tests: [tests.basicFunction, tests.tempCycle, tests.highLowTempStorage] },
      'layout_adj': { riskLevel: 'Medium', tests: [tests.randomVib, tests.sineVib, tests.tempCycle] }
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
      'pin2pin': { riskLevel: 'High', description: '這類 Second Source 導入是極高風險變更，常引發神秘的相容性當機。', tests: [tests.basicFunction, tests.lowTempOnOff, tests.highTempOnOff, tests.highTempHighHumidity, tests.tempCycle, tests.randomVib] },
      'capacity_change': { riskLevel: 'Medium', description: '同廠牌同規格僅容量不同，失效模式相同。主要驗證作業系統容量識別與基礎熱應力。', tests: [tests.basicFunction, tests.lowTempOnOff, tests.highTempOperation, tests.tempCycle] },
      'non_pin2pin': { riskLevel: 'High', description: '需重新設計 PCB 硬體繞線。', tests: [tests.basicFunction, tests.lowTempOnOff, tests.highTempOnOff, tests.highTempHighHumidity, tests.tempCycle, tests.randomVib, tests.shockHalfSine] },
      'layout_adj': { riskLevel: 'Medium', description: '移動位置干涉板彎應力區，重測動態衝擊與高低溫變化。', tests: [tests.basicFunction, tests.tempCycle, tests.randomVib, tests.sineVib, tests.shockHalfSine] }
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
      'pin2pin': { riskLevel: 'Medium', description: '不同廠牌的塑膠耐溫性與彈片夾持力有差異，回流行程(Reflow)或插拔時表現可能不同。', tests: [tests.basicFunction, tests.highLowTempStorage, tests.tempCycle, tests.randomVib] },
      'plating_change': { riskLevel: 'High', description: '觸孔鍍金厚度下降或改用化金(ENIG)，將大幅削弱抗微震動磨損能力與耐硫腐蝕能力，硫化斷線。', tests: [tests.saltMist, tests.randomVib, tests.sineVib, tests.tempCycle] },
      'non_pin2pin': { riskLevel: 'High', description: 'DIP 到 SMT 的製程改變，或是引腳數量增減，嚴重影響 PCB Layout、插拔結構承重力。', tests: [tests.basicFunction, tests.shockHalfSine, tests.randomVib, tests.tempCycle] },
      'layout_adj': { riskLevel: 'Medium', description: '連接器若被移至 PCB 板邊或靠近大型鎖固件旁，極易在運輸時造成焊點撕裂，且可能改變系統共振頻率。', tests: [tests.basicFunction, tests.randomVib, tests.sineVib, tests.shockHalfSine] }
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
        tests: []
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
      'assembly': { riskLevel: 'Medium', description: '改變了機構組裝鎖固公差，可能導致下壓磅數改變。', tests: [tests.randomVib, tests.sineVib] },
      'thermal_mech': { riskLevel: 'High', description: '後續設計驗證須嚴格確認「厚度 (Thickness)」與「材質 (Material)」。', tests: [tests.highLowTempStorage, tests.highTempOperation, tests.highTempHighHumidity, tests.tempCycle] }
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
      'assembly': { riskLevel: 'High', description: '鎖固結構（螺絲轉速、背板）的影響。', tests: [tests.randomVib, tests.sineVib, tests.shockHalfSine] },
      'thermal_mech': { riskLevel: 'High', description: '鰭片高度與指向改變，會重新定義系統內部風道。', tests: [tests.tempCycle, tests.highTempOperation, tests.altitude] }
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
      'assembly': { riskLevel: 'High', tests: [tests.ipCode, tests.randomVib, tests.sineVib, tests.shockHalfSine] },
      'thermal_mech': { riskLevel: 'High', description: '開孔率改變影響 IP 與對流；本身兼作散熱載體，更須考驗熱脹冷縮與抗壓性。', tests: [tests.ipCode, tests.saltMist, tests.tempCycle, tests.highTempHighHumidity] },
      'cable_routing': { riskLevel: 'Low', tests: [tests.randomVib] },
      'mounting': { riskLevel: 'High', description: '壁掛 (Wall mount) 支架設計變更直接衝擊承重極限。', tests: [tests.shockHalfSine, tests.randomVib, tests.pkgDrop] },
      'mech_print': { riskLevel: 'Low', description: '僅涉及機殼表層網印標籤或文字微調，對於結構保護與散熱功能無任何影響。', tests: [] }
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
      'pkg_size': { riskLevel: 'Medium', description: '紙箱尺寸的改變將直接影響棧板的堆疊排列方式 (Palletization) 效率，並可能改變掉落時的重心。', tests: [tests.highLowTempStorage, tests.pkgDrop, tests.pkgVib] },
      'pkg_cushion': { riskLevel: 'High', description: '緩衝材料 (如 EPE 泡棉換成紙塑) 是包裝設計的心臟。材料的動態緩衝曲線 (G-Value) 改變，必須重新執行摔落與運輸震動以確保吸震力。', tests: [tests.highLowTempStorage, tests.pkgDrop, tests.pkgVib] },
      'pkg_print': { riskLevel: 'Low', description: '僅涉及外貿標示與識別，無影響物理防護能力。', tests: [] }
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
      'mech_length': { riskLevel: 'Medium', description: '過短導致鎖固力不足易退牙；過長可能干涉底部電路(頂件短路)或頂穿塑膠外殼。', tests: [tests.randomVib, tests.sineVib, tests.shockHalfSine] },
      'mech_material': { riskLevel: 'High', description: '金屬材質(如鐵改不鏽鋼)或表面處理(鍍鋅改鍍鎳)不同，改變硬度與抗拉強度，甚至在潮濕下引發雙金屬電位差腐蝕(Galvanic Corrosion)。', tests: [tests.saltMist, tests.tempCycle, tests.randomVib] },
      'mech_screw_angle': { riskLevel: 'High', description: '螺絲頭角度(如平頭改沉頭)若與孔位倒角不配，會產生極大的垂直楔形應力，易在震動或熱脹冷縮時撐破塑膠件。', tests: [tests.randomVib, tests.sineVib, tests.tempCycle, tests.shockHalfSine] }
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
      'mech_length': { riskLevel: 'Medium', description: '過長易隨震動甩打周圍元件或阻礙散熱風道；過短則在拉扯應力導致接頭(Connector)脫落或撕裂。', tests: [tests.randomVib, tests.sineVib, tests.shockHalfSine] },
      'mech_material': { riskLevel: 'High', description: '線材外覆材質/隔離網變更直接攸關耐溫極限(如高溫短路)、以及在寒冷氣候下的柔韌度(低溫脆化斷裂)。', tests: [tests.highLowTempStorage, tests.highTempOperation, tests.lowTempOnOff, tests.tempCycle] }
    }
  }
];
