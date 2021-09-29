import React from 'react';
// import CheckIcon from '@atlaskit/icon/glyph/check';
import ButtonStyled from './TodoStyle';
import { 
    HighlightOff, Check
} from '@mui/icons-material';

export default function Todo({ todo, onCheckBtnClick }) {
    return (
        <ButtonStyled 
            isCompleted={todo.isCompleted}
            shouldFitContainer 
            iconAfter={
                !todo.isCompleted ? (
                    <>
                        <span 
                            className='check-icon-complete' 
                            onClick={() => onCheckBtnClick(todo.id)}>
                            <Check/>
                        </span>
                    </>
                ) : (
                    <>
                        <span 
                            className='check-icon-not-complete' 
                            onClick={() => onCheckBtnClick(todo.id)}>
                            <HighlightOff/>
                        </span>
                    </>
                )
            }>
                {todo.name}
        </ButtonStyled>
    )
};