import React from 'react';
import TestCorrelation from './TestCorrelation';
import { riskLevelDefs } from '../data/dfmeaData';

const Node = ({ title, content, type }) => {
    const borderColors = {
        normal: 'var(--card-border)',
        warning: 'var(--accent-red)',
        highlight: 'var(--accent-cyan)',
        secondary: 'var(--accent-purple)'
    };

    const bgColors = {
        normal: 'var(--card-bg)',
        warning: 'rgba(251, 113, 133, 0.05)',
        secondary: 'rgba(192, 132, 252, 0.05)'
    }

    return (
        <div className="glass-card" style={{
            position: 'relative',
            flex: '1 1 250px',
            borderTop: `4px solid ${borderColors[type] || borderColors.normal}`,
            background: bgColors[type] || bgColors.normal
        }}>
            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', marginBottom: '12px', fontWeight: '600' }}>
                {title}
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: '400', color: 'var(--text-primary)', lineHeight: '1.6' }}>
                {content}
            </div>
        </div>
    );
}

const DFMEAView = ({ components, changeType }) => {
    // 收集所有元件針對此變更類型的試驗，並利用標準化名稱進行去重複（聯集）
    const allTestsMap = new Map();
    let hasAnyValidImpact = false;

    components.forEach(comp => {
        const impactData = comp.changeImpacts[changeType.id];
        if (impactData && impactData.tests) {
            hasAnyValidImpact = true;
            impactData.tests.forEach(test => {
                if (test && test.name && !allTestsMap.has(test.name)) {
                    allTestsMap.set(test.name, test);
                }
            });
        }
    });

    const combinedTests = Array.from(allTestsMap.values());

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {/* 1. 顯示多個勾選元件個別的失效鏈 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {components.map(component => {
                    const modeData = component.failureModes[0];
                    const impactData = component.changeImpacts[changeType.id];

                    // 決定風險等級徽章顏色
                    let riskBadgeColor = 'purple';
                    if (impactData?.riskLevel === 'High') riskBadgeColor = 'red';
                    else if (impactData?.riskLevel === 'Low') riskBadgeColor = 'cyan';
                    else riskBadgeColor = 'purple';

                    // 若此元件對應當前選取的 ChangeType 無法解析 (即無影響)，則顯示提示
                    if (!impactData) {
                        return (
                            <div key={component.id} style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                    <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }}>
                                        {component.category.toUpperCase()}
                                    </span>
                                    <h3 style={{ fontSize: '1.4rem', margin: 0, color: 'var(--text-primary)' }}>{component.name}</h3>
                                </div>
                                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>目前勾選的變更類型【{changeType.name}】不適用/無影響於此元件。</p>
                            </div>
                        );
                    }

                    return (
                        <div key={component.id} style={{
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '24px',
                            padding: '32px 40px',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', borderBottom: '1px solid var(--card-border)', paddingBottom: '24px' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                        <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }}>
                                            {component.category.toUpperCase()}
                                        </span>
                                        <h3 style={{ fontSize: '1.8rem', margin: 0, color: 'var(--text-primary)' }}>{component.name}</h3>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-secondary)' }}>{component.description}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span className={`badge ${riskBadgeColor}`} style={{ fontSize: '1rem', padding: '6px 16px' }}>
                                        單體變更風險: {impactData.riskLevel}
                                    </span>
                                </div>
                            </div>

                            {impactData.description && (
                                <div style={{ marginBottom: '24px', padding: '16px 20px', background: 'rgba(255,165,0,0.05)', borderLeft: '4px solid var(--accent-red)', borderRadius: '0 8px 8px 0' }}>
                                    <h5 style={{ margin: '0 0 8px 0', color: 'var(--text-primary)', fontSize: '1rem' }}>此變更情境之工程考量：</h5>
                                    <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{impactData.description}</p>
                                </div>
                            )}

                            {/* 渲染風險四維度評估 */}
                            {impactData.riskLevel && riskLevelDefs[impactData.riskLevel] && (
                                <div style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <h5 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: riskBadgeColor === 'red' ? 'var(--accent-red)' : riskBadgeColor === 'cyan' ? 'var(--accent-cyan)' : 'var(--accent-purple)' }}></span>
                                        終端風險評估分析 ({impactData.riskLevel} Risk)
                                    </h5>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '8px' }}>
                                        <div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>功能性影響 (Functional)</div>
                                            <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{riskLevelDefs[impactData.riskLevel].functionalImpact}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>使用者體驗 (User Impact)</div>
                                            <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{riskLevelDefs[impactData.riskLevel].userImpact}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>實驗室對策 (Lab Action)</div>
                                            <div style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)' }}>{riskLevelDefs[impactData.riskLevel].labAction}</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <h4 style={{ marginTop: 0, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.2rem' }}>
                                <span style={{ display: 'inline-block', width: '6px', height: '24px', background: 'var(--accent-red)', borderRadius: '4px' }}></span>
                                潛在核心失效鏈 (Potential Failure Chain)
                            </h4>

                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '24px',
                                alignItems: 'stretch'
                            }}>
                                <Node title="Failure Mode 失效模式" content={modeData.mode} type="warning" />
                                <Node title="Mechanism 物理/化學機制" content={modeData.mechanism} type="normal" />
                                <Node title="System Effect 系統影響" content={modeData.systemEffect} type="secondary" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 2. 顯示合併後去重複的所有建議測試 */}
            {hasAnyValidImpact && combinedTests.length > 0 ? (
                <div style={{ marginTop: '20px', padding: '40px', background: 'rgba(20, 184, 166, 0.03)', borderRadius: '24px', border: '1px solid rgba(20, 184, 166, 0.15)' }}>
                    <h3 style={{ marginTop: 0, marginBottom: '24px', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.4rem' }}>
                        整機綜合環境試驗計畫 (綜合聯集)
                        <span style={{ fontSize: '0.875rem', padding: '4px 12px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', color: 'var(--text-secondary)', fontWeight: 'normal' }}>共 {combinedTests.length} 項</span>
                    </h3>
                    <TestCorrelation tests={combinedTests} />
                </div>
            ) : hasAnyValidImpact ? (
                <div className="glass-card" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                    所有勾選的元件於此變更類型下風險均為極小，依據規範無須額外環境試驗，或僅需軟體驗證。
                </div>
            ) : null}
        </div>
    );
};

export default DFMEAView;
