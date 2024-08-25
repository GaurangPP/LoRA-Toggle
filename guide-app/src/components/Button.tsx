import React, { ReactNode, MouseEvent } from 'react';
import './Button.css'
import { Link, To } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline']

const SIZES = ['btn--medium', 'btn--large'];

interface ButtonProps {
    children: ReactNode;               // For the content inside the button
    to?: To;                         //Route in dom
    type?: "button" | "submit" | "reset"; // For the button type attribute
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void; // For the click event handler
    buttonStyle?: string;              // Assuming buttonStyle is a string (e.g., a CSS class)
    buttonSize?: string;               // Assuming buttonSize is a string (e.g., a CSS class)
}

export const Button= ({children, to='/', type, onClick, buttonStyle = STYLES[0], buttonSize = SIZES[0]}: ButtonProps) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <Link to={to} className='btn-mobile'>
            <button 
                className={`btn ${checkButtonStyle} ${checkButtonSize}`}
                onClick={onClick}
                type={type}
            >
                {children}
            </button>
        </Link>
    )
};