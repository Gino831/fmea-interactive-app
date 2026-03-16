import React from 'react';

const TestCorrelation = ({ tests }) => {
    return (
        <div style={{
            padding: '40px',
            background: 'linear-gradient(180deg, rgba(34,211,238,0.03) 0%, rgba(0,0,0,0.2) 100%)',
            borderRadius: '24px',
            border: '1px solid rgba(34,211,238,0.15)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.4rem' }}>
                    <span style={{ display: 'inline-block', width: '6px', height: '24px', background: 'var(--accent-cyan)', borderRadius: '4px', boxShadow: '0 0 10px var(--accent-cyan)' }}></span>
                    建議執行之環境試驗清單
                </h3>
                <span className="badge" style={{ background: 'rgba(34,211,238,0.15)' }}>依據附件標準映射</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                {tests.filter(t => t && t.name).map((test, index) => (
                    <div key={index} className="glass-card" style={{
                        borderColor: 'rgba(34,211,238,0.2)',
                        background: 'rgba(34,211,238,0.03)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', gap: '12px' }}>
                                <h4 style={{ margin: 0, color: 'var(--accent-cyan)', fontSize: '1.2rem', lineHeight: '1.4' }}>{test.name}</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                                    <span className="badge purple" style={{ whiteSpace: 'nowrap' }}>{test.standard}</span>
                                    {test.duration && <span className="badge" style={{ whiteSpace: 'nowrap', opacity: 0.8, fontSize: '0.75rem' }}>耗時: {test.duration}</span>}
                                </div>
                            </div>

                            <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>試驗目的：</strong>
                                {test.purpose}
                            </p>
                        </div>

                        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px dashed rgba(255,255,255,0.1)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            此項目源自 DQA / 可靠度工程規範附件
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestCorrelation;
