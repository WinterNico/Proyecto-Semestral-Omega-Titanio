import React from 'react';
import { Link } from 'react-router-dom';

// Este componente recibe todo para que sea reutilizable
const MetricCard = ({ titulo, valor, enlace, textoEnlace, esAlerta = false }) => {
    return (
        <div className={`card bg-black shadow-sm h-100 metric-card ${esAlerta ? 'border-danger alert' : 'border-secondary'}`}>
            <div className="card-body text-center">
                <h3 className={`h6 ${esAlerta ? 'text-danger' : 'text-muted'}`}>{titulo}</h3>
                <p className={`fs-3 fw-bold metric-value ${esAlerta ? 'text-danger' : 'text-light'}`}>{valor}</p>
                
                {enlace ? (
                    <Link to={enlace} className="text-decoration-none metric-link text-success">
                        {textoEnlace} &rarr;
                    </Link>
                ) : (
                    <span className={esAlerta ? "text-danger small" : "text-success fw-bold"}>
                        {textoEnlace}
                    </span>
                )}
            </div>
        </div>
    );
};

export default MetricCard;