import React from 'react';
import { Avatar, Typography } from '@mui/material';
import useStyles from './styles';
import { dateFormat } from '../../actions/format';

function CommentComponent({comment}) {
    const classes = useStyles();
    return (
        <div className={classes.headCmtWrap}>
            <Avatar className={classes.cmtAvt} 
            src={comment?.img}>
            </Avatar>
            <div className={classes.cmtMain}>
                <Typography variant="subtitle2" component="span">{comment.name}</Typography>
                <Typography color="textSecondary" className={classes.cmtTime} component="span">{dateFormat(comment.createdAt)}</Typography>
                <Typography className={classes.cmtContent} variant="body2" component="div">
                    {comment.message}
                </Typography>
            </div>
        </div>
    )
}

export default CommentComponent
