import React from 'react';
import { Link } from 'react-router-dom';

const BackPage = ({ paragraph, title, onClick, to }) => {
    return (
        <div>
            <p className="text-center" onClick={onClick}>
                {paragraph}
                <Link to={to}><span className="text-decoration-underline fw-bolder" style={{ fontSize: "16px", color: "#fbd560" }}> {title}</span></Link>
            </p >
        </div>
    )
}

export default BackPage;