import React from 'react';

const ComponentSelector = ({ components, selectedIds = [], onSelect }) => {
    return (
        <div className="selector-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '20px',
        }}>
            {components.map((comp, index) => {
                const isSelected = selectedIds.includes(comp.id);
                return (
                    <button
                        key={comp.id}
                        className={`glass-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => onSelect(comp.id)}
                        style={{
                            textAlign: 'left',
                            cursor: 'pointer',
                            border: isSelected ? '1px solid var(--accent-cyan)' : '',
                            background: isSelected ? 'rgba(34, 211, 238, 0.08)' : '',
                            transform: isSelected ? 'translateY(-4px)' : '',
                            boxShadow: isSelected ? '0 12px 32px rgba(34, 211, 238, 0.15)' : '',
                            animationDelay: `${index * 0.05}s`,
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            color: 'inherit',
                            fontFamily: 'inherit',
                            minHeight: '130px'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <h3 style={{ margin: 0, fontSize: '1.15rem', color: isSelected ? 'var(--accent-cyan)' : 'var(--text-primary)' }}>
                                {comp.name}
                            </h3>
                            {isSelected && (
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)', boxShadow: '0 0 10px var(--accent-cyan)' }}></div>
                            )}
                        </div>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                            {comp.description.length > 50 ? comp.description.substring(0, 50) + '...' : comp.description}
                        </p>
                    </button>
                );
            })}
        </div>
    );
};

export default ComponentSelector;
