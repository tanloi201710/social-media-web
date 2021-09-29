import styled, { css } from "styled-components";
import Button from '@atlaskit/button';

const ButtonStyled = styled(Button)`
    width: 97%;
    margin-top: 5px;
    text-align: left;
    border-radius: 10px;
    margin-left: 6px;

    &, 
    &:hover {
        ${(p) => 
            p.isCompleted ?
            css `
                text-decoration: line-through;
            `
            : 
            css `
                text-decoration: none;
            `
        };
    }

    &:hover {
        .check-icon-complete {
            display: inline-block;
        }
    }

    .check-icon-complete{
        display: none;

        &:hover{
            background-color: green;
            border-radius: 50%;
        }
    }
    &:hover {
        .check-icon-not-complete {
            display: inline-block;
        }
    }
    .check-icon-not-complete{
        display: none;

        &:hover{
            background-color: red;
            border-radius: 50%;
        }
    }
`;

export default ButtonStyled;