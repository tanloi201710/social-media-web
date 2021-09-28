import React from 'react';
import styled, { css } from "styled-components";
import Button from '@atlaskit/button';
import CheckIcon from '@atlaskit/icon/glyph/check';

const ButtonStyled = styled(Button)`
    width: 97%;
    margin-top: 5px;
    text-align: left;
    border-radius: 10px;
    margin-left: 6px;

    &, 
    &:hover {
        ${(p) => 
            p.isCompleted && 
            css `
                text-decoration: line-through;
            `
        };
    }

    &:hover {
        .check-icon {
            display: inline-block;
        }
    }

    .check-icon{
        display: none;

        &:hover{
            background-color: green;
            border-radius: 10px;
        }
    }
`;

export default function Todo({ todo, onCheckBtnClick }) {
    return (
        <ButtonStyled 
            isCompleted={todo.isCompleted}
            shouldFitContainer 
            iconAfter={
                !todo.isCompleted && (
                    <span 
                        className='check-icon' 
                        onClick={() => onCheckBtnClick(todo.id)
                        }>
                        <CheckIcon primaryColor='#4fff4f'/>
                    </span>
                )
            }>
                {todo.name}
        </ButtonStyled>
    )
};