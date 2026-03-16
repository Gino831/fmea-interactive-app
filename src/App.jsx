import { useState } from 'react';
import './index.css';
import { dfmeaData, changeTypesMap } from './data/dfmeaData';
import ComponentSelector from './components/ComponentSelector';
import ChangeTypeSelector from './components/ChangeTypeSelector';
import DFMEAView from './components/DFMEAView';
import TestCorrelation from './components/TestCorrelation';
import { exportStrategyMatrixToExcel } from './utils/exportStrategyMatrix';

function App() {
  // ===== 單選模式 =====
  const [selectedComponentId, setSelectedComponentId] = useState(null);
  const [selectedChangeTypeId, setSelectedChangeTypeId] = useState(null);

  // ===== 購物車 (已記錄之變更清單) =====
  const [recordedChanges, setRecordedChanges] = useState([]);

  // 取得選中的單一元件物件
  const selectedComponent = dfmeaData.find(c => c.id === selectedComponentId) || null;

  // 動態決定當前選取元件所支援的變更類型
  const availableChangeTypes = selectedComponent
    ? (() => {
      const typesForCategory = changeTypesMap[selectedComponent.category] || [];
      const supportedTypeIds = Object.keys(selectedComponent.changeImpacts || {});
      return typesForCategory.filter(type => supportedTypeIds.includes(type.id));
    })()
    : [];

  const selectedChangeType = availableChangeTypes.find(t => t.id === selectedChangeTypeId) || null;

  // 元件選取 handler（單選：點同一個就取消）
  const handleComponentSelect = (id) => {
    if (selectedComponentId === id) {
      setSelectedComponentId(null);
    } else {
      setSelectedComponentId(id);
    }
    // 當元件改變時總是重設下層
    setSelectedChangeTypeId(null);
  };

  // 加入購物車
  const handleAddRecord = () => {
    if (!selectedComponent || !selectedChangeType) return;

    // 快照當前選取的資料到購物車
    const newRecord = {
      id: Date.now(),
      componentId: selectedComponent.id,
      componentName: selectedComponent.name,
      componentCategory: selectedComponent.category,
      changeTypeId: selectedChangeType.id,
      changeTypeName: selectedChangeType.name,
    };

    setRecordedChanges(prev => [...prev, newRecord]);

    // 清空當前選擇，讓使用者繼續選下一個
    setSelectedComponentId(null);
    setSelectedChangeTypeId(null);
  };

  const handleRemoveRecord = (idToRemove) => {
    setRecordedChanges(prev => prev.filter(r => r.id !== idToRemove));
  };

  // ===== 整機綜合去重演算法 =====
  const computeMasterPlan = () => {
    const globalTestsMap = new Map();
    const riskWeights = { 'High': 3, 'Medium': 2, 'Low': 1 };
    let highestRiskPriority = -1;
    let finalRiskLevel = 'Low';

    recordedChanges.forEach(record => {
      const fullComp = dfmeaData.find(d => d.id === record.componentId);
      if (!fullComp) return;
      const impact = fullComp.changeImpacts?.[record.changeTypeId];
      if (!impact) return;

      // 最高風險
      const weight = riskWeights[impact.riskLevel] || 0;
      if (weight > highestRiskPriority) {
        highestRiskPriority = weight;
        finalRiskLevel = impact.riskLevel;
      }

      // 測試項目聯集去重
      if (impact.tests) {
        impact.tests.forEach(test => {
          if (test && test.name && !globalTestsMap.has(test.name)) {
            globalTestsMap.set(test.name, test);
          }
        });
      }
    });

    return {
      tests: Array.from(globalTestsMap.values()),
      riskLevel: finalRiskLevel,
    };
  };

  // 分類過濾資料
  const modules = dfmeaData.filter(c => c.category === 'module');
  const components = dfmeaData.filter(c => c.category === 'component');
  const mechanics = dfmeaData.filter(c => c.category === 'mechanics');

  // 為了讓 ComponentSelector 相容，把單選 ID 包裝成陣列
  const selectedIds = selectedComponentId ? [selectedComponentId] : [];

  return (
    <div className="container" style={{ paddingBottom: '120px' }}>
      <header style={{ textAlign: 'center', marginBottom: '60px' }} className="animate-fade-in">
        <h1 className="title-gradient" style={{ fontSize: '3rem', marginBottom: '20px', letterSpacing: '-0.5px' }}>
          電子元件失效模式與環境試驗分析
        </h1>
        <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.15rem', opacity: 0.9 }}>
          涵蓋 <strong>Module、Motherboard 與 Mechanics</strong> 的三層級架構，精確探討在面臨設計生命週期中的各種硬體變更時，潛在失效風險與相應的精準驗證測試計畫。
        </p>
        <div style={{ marginTop: '24px' }}>
          <button
            onClick={exportStrategyMatrixToExcel}
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#fff',
              border: 'none',
              padding: '12px 28px',
              fontSize: '1rem',
              borderRadius: '24px',
              cursor: 'pointer',
              fontWeight: '600',
              boxShadow: '0 6px 16px rgba(16, 185, 129, 0.35)',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <span>📊</span>
            <span>匯出策略矩陣 Excel</span>
          </button>
        </div>
      </header>

      <main>
        {/* Step 1: 元件選擇（單選） */}
        <section className="animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-block', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--card-bg)', border: '1px solid var(--card-border)', textAlign: 'center', lineHeight: '22px', fontSize: '12px' }}>1</span>
            選擇欲分析之目標元件 (Component Selection)
          </h2>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '16px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', border: 'none' }}>Level 1</span>
              模組層級 (Module Level)
            </h3>
            <ComponentSelector
              components={modules}
              selectedIds={selectedIds}
              onSelect={handleComponentSelect}
            />
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '16px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge" style={{ background: 'rgba(232, 121, 249, 0.1)', color: '#e879f9', border: 'none' }}>Level 2</span>
              主板與單組件層級 (Motherboard / Component Level)
            </h3>
            <ComponentSelector
              components={components}
              selectedIds={selectedIds}
              onSelect={handleComponentSelect}
            />
          </div>

          <div>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '16px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge" style={{ background: 'rgba(251, 146, 60, 0.1)', color: '#fb923c', border: 'none' }}>Level 3</span>
              機構設計層級 (Mechanics Level)
            </h3>
            <ComponentSelector
              components={mechanics}
              selectedIds={selectedIds}
              onSelect={handleComponentSelect}
            />
          </div>
        </section>

        {/* Step 2: 變更類型選擇 */}
        {selectedComponent && (
          <section style={{ marginTop: '64px' }} className="animate-fade-in">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-purple)' }}>
              <span style={{ display: 'inline-block', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(192, 132, 252, 0.1)', border: '1px solid rgba(192, 132, 252, 0.2)', textAlign: 'center', lineHeight: '22px', fontSize: '12px', color: 'var(--accent-purple)' }}>2</span>
              選擇此元件的變更情境 (Change Type)
            </h2>
            <ChangeTypeSelector
              changeTypes={availableChangeTypes}
              selectedTypeId={selectedChangeTypeId}
              onSelect={setSelectedChangeTypeId}
            />
          </section>
        )}

        {/* Step 3: 單項分析結果 */}
        {selectedComponent && selectedChangeType && (
          <section style={{ marginTop: '64px' }} className="animate-fade-in">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)' }}>
              <span style={{ display: 'inline-block', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)', textAlign: 'center', lineHeight: '22px', fontSize: '12px', color: 'var(--accent-cyan)' }}>3</span>
              失效鏈與試驗關聯分析 (Impact Analysis)
            </h2>
            <DFMEAView components={[selectedComponent]} changeType={selectedChangeType} />

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
              <button
                onClick={handleAddRecord}
                style={{
                  background: 'linear-gradient(135deg, var(--accent-cyan) 0%, #0284c7 100%)',
                  color: '#fff',
                  border: 'none',
                  padding: '16px 32px',
                  fontSize: '1.1rem',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  boxShadow: '0 8px 20px rgba(2, 132, 199, 0.4)',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <span>將此情境加入綜合驗證計畫</span>
                <span>＋</span>
              </button>
            </div>
          </section>
        )}

        {/* Step 4: 整機綜合試驗計畫 (Master Test Plan) */}
        {recordedChanges.length > 0 && (() => {
          const masterPlan = computeMasterPlan();
          let finalRiskColor = 'cyan';
          if (masterPlan.riskLevel === 'High') finalRiskColor = 'red';
          else if (masterPlan.riskLevel === 'Medium') finalRiskColor = 'purple';

          return (
            <section id="master-plan" style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px dashed rgba(255,255,255,0.1)' }} className="animate-fade-in">
              <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', textAlign: 'center', background: '-webkit-linear-gradient(0deg, #38bdf8 0%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                整機綜合環境試驗計畫 (Master Test Plan)
              </h2>
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1.05rem' }}>
                已收集 {recordedChanges.length} 項硬體變更情境，系統已執行 Global Union 去重複演算法。
              </p>

              <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                {/* 已記錄清單 */}
                <div style={{ flex: '1 1 300px', minWidth: '300px', background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', color: 'var(--text-primary)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
                    已記錄之變更項目
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {recordedChanges.map(record => (
                      <div key={record.id} style={{ padding: '16px', background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', position: 'relative' }}>
                        <button
                          onClick={() => handleRemoveRecord(record.id)}
                          style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.2rem' }}
                          title="移除此項目"
                        >×</button>
                        <div style={{ fontSize: '0.85rem', color: 'var(--accent-purple)', marginBottom: '8px', fontWeight: 'bold' }}>
                          {record.changeTypeName}
                        </div>
                        <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', fontSize: '0.75rem' }}>
                          {record.componentName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 去重複結果 */}
                <div style={{ flex: '2 1 600px', minWidth: '300px' }}>
                  <div style={{ background: 'rgba(34, 211, 238, 0.05)', padding: '32px', borderRadius: '24px', border: '1px solid rgba(34, 211, 238, 0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                      <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--accent-cyan)' }}>最終環境試驗清單</h3>
                      <span className={`badge ${finalRiskColor}`} style={{ padding: '8px 16px', fontSize: '1rem' }}>
                        全機最高綜合風險: {masterPlan.riskLevel}
                      </span>
                    </div>

                    {masterPlan.tests.length > 0 ? (
                      <TestCorrelation tests={masterPlan.tests} />
                    ) : (
                      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.2)', borderRadius: '16px' }}>
                        依據目前清單所有項目皆屬低風險變更，綜合判定無須執行額外環境試驗，或僅需進行軟體/通電確認。
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })()}
      </main>
    </div>
  );
}

export default App;
