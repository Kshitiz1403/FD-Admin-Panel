import React, { useState } from 'react';
import colors from '../../constants/colors';


const Button = (props) => {

    const [isMouseOver, setIsMouseOver] = useState(false)

    const container = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width:'fit-content',
        borderRadius: 8,
        cursor: isMouseOver ? "pointer" : null,
    }

    const text = {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: 500,
    }

    const filledContainer = {
        backgroundColor: isMouseOver ? "#515BA4" : colors.primary,
    }

    const filledContainerText = {
        color: colors.dark,
    }

    const emptyContainer = {
        borderColor: isMouseOver? colors.primary : "rgba(117, 130, 235, 0.5)",
        borderStyle: 'solid',
        borderWidth: 2,
    }

    const emptyContainerText = {
        color: colors.primary
    }

    return (
        <>
            {props.empty ?
                <div style={{
                    ...container,
                    ...emptyContainer,
                    ...props.containerStyles,
                }}
                    onMouseOver={() => setIsMouseOver(true)}
                    onMouseLeave={() => setIsMouseOver(false)}>
                    <div style={{ ...text, ...emptyContainerText, ...props.textStyles }}>{props.text}</div>
                </div>
                :

                <div style={{
                    ...container,
                    ...filledContainer,
                    ...props.containerStyles,
                }}
                    onMouseOver={() => setIsMouseOver(true)}
                    onMouseLeave={() => setIsMouseOver(false)}>
                    <div style={{ ...text, ...filledContainerText, ...props.textStyles }}>{props.text}</div>
                </div>
            }
        </>
    )
};

export default Button;
