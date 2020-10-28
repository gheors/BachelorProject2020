import React from "react";
import "./Button.css";

const STYLES = ["button-primary", "button-outline", "button-test"];

const SIZES = ["button-medium", "button-large", "button-full"];

export const Button = ({
                           children,
                           type,
                           onClick,
                           buttonStyle,
                           className,
                           buttonSize,
                       }) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <button
            className={`button ${checkButtonStyle} ${checkButtonSize} ${className}`}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
};

