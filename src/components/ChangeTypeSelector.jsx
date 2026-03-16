import React from 'react';

const ChangeTypeSelector = ({ changeTypes, selectedTypeId, onSelect }) => {
    // 防呆保護：若未傳入清單則不渲染
    if (!changeTypes || changeTypes.length === 0) return null;

    return (
        <div className="selector-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
        }}>
            {changeTypes.map((type, index) => {
                const isSelected = type.id === selectedTypeId;
                return (
                    <button
                        key={type.id}
                        className={`glass-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => onSelect(type.id)}
                        style={{
                            textAlign: 'left',
                            cursor: 'pointer',
                            border: isSelected ? '1px solid var(--accent-purple)' : '',
                            background: isSelected ? 'rgba(192, 132, 252, 0.08)' : '',
                            transform: isSelected ? 'translateY(-4px)' : '',
                            boxShadow: isSelected ? '0 12px 32px rgba(192, 132, 252, 0.15)' : '',
                            animationDelay: `${index * 0.1}s`,
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            color: 'inherit',
                            fontFamily: 'inherit',
                            minHeight: '120px'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <h3 style={{ margin: 0, fontSize: '1.15rem', color: isSelected ? 'var(--accent-purple)' : 'var(--text-primary)' }}>
                                {type.name}
                            </h3>
                            {isSelected && (
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-purple)', boxShadow: '0 0 10px var(--accent-purple)' }}></div>
                            )}
                        </div>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                            {type.description}
                        </p>
                    </button>
                );
            })}
        </div>
    );
};

export default ChangeTypeSelector;
