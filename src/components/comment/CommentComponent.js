import React, { useState, useEffect } from 'react';
import { Avatar, Typography, TextField } from '@mui/material';
import { ThumbUpAlt, Reply } from '@mui/icons-material';
import useStyles from './styles';
import { dateFormat } from '../../actions/format';
import { useSelector } from 'react-redux';
import { getReplies, likeComment } from '../../api';

function CommentComponent({comment,user,upCmt,postId}) {
    const classes = useStyles();
    const { userData } = useSelector((state) => state.user);
    const [isReply, setIsReply] = useState(false);
    const [reply, setReply] = useState("");
    const [replies, setReplies] = useState([]);
    const [liked, setLiked] = useState(comment.likes.includes(userData.result._id));
    const [countLiked, setCountLiked] = useState(comment.likes.length);

    useEffect(() => {
        const getRep = async() => {
            try {
                const rep = await getReplies(comment._id);
                setReplies(rep.data);
            } catch (error) {
                console.log(error);
            }
        }
        getRep();
    }, [postId, comment._id]);

    const likeHandler = async() => {
        try {
            await likeComment(comment._id);
            setLiked(true);
            setCountLiked(countLiked+1);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = () => { 
        const replyForm = {
            postId: postId,
            img: userData.result?.profilePicture,
            name: userData.result.name,
            message: reply,
            likes: [],
            root: comment._id,
            createdAt: Date.now()
        }
        setReply('');
        setReplies([replyForm, ...replies]);
        upCmt(replyForm);

    }

    const CommentDom = ({reply}) => {
        return (
            <div style={{ display: 'flex', marginTop: '10px', marginLeft: '35px' }}>
                <Avatar className={classes.cmtAvt} 
                src={reply?.img}>
                </Avatar>
                <div className={classes.cmtRight}>
                    <div className={classes.cmtMain}>
                        <Typography variant="subtitle2" component="span">{user.result.name === reply.name ? 'Bạn' : reply.name}</Typography>
                        <Typography color="textSecondary" className={classes.cmtTime} component="span">{dateFormat(reply.createdAt)}</Typography>
                        <Typography className={classes.cmtContent} variant="body2" component="div">
                            {reply.message}
                        </Typography>
                    </div>
                    <div className={classes.cmtAction}>
                        <div className={classes.group}>
                            <ThumbUpAlt fontSize="small" sx={{ marginRight: '3px' }} />
                            <span>Thích (2)</span>
                        </div>
                        <div className={classes.group} >
                            <Reply sx={{ marginRight: '3px' }} />
                            <span>Trả lời (2)</span>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }

    return (
        <>
        <div className={classes.headCmtWrap}>
            <Avatar className={classes.cmtAvt} 
            src={comment?.img}>
            </Avatar>
            <div className={classes.cmtRight}>
                <div className={classes.cmtMain}>
                    <Typography variant="subtitle2" component="span">{user.result.name === comment.name ? 'Bạn' : comment.name}</Typography>
                    <Typography color="textSecondary" className={classes.cmtTime} component="span">{dateFormat(comment.createdAt)}</Typography>
                    <Typography className={classes.cmtContent} variant="body2" component="div">
                        {comment.message}
                    </Typography>
                </div>
                <div className={classes.cmtAction}>
                    <div className={classes.group} onClick={() => likeHandler()}>
                    { liked ? <ThumbUpAlt fontSize="small" sx={{ marginRight: '3px' }} color="primary" /> : 
                        <ThumbUpAlt fontSize="small" sx={{ marginRight: '3px' }} />
                    }
                        
                        <span>Thích {countLiked > 0 && `(${countLiked})`}</span>
                    </div>
                    <div className={classes.group} onClick={() => setIsReply(!isReply)}>
                        <Reply sx={{ marginRight: '3px' }} />
                        <span>Trả lời ({replies.length})</span>
                    </div>
                </div>
                { isReply &&
                    <div className={classes.replyInput}>
                        <TextField 
                            placeholder="Trả lời..." 
                            fullWidth size="small" 
                            variant="standard"
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            onKeyDown={(e) => { if(e.key === 'Enter') handleSubmit() }}
                        />
                    </div>
                }
            </div>
        </div>
        <div className="replyBox">
            {
                isReply &&
                replies.length > 0 && replies.map((reply, index) => (
                    <CommentDom key={index} reply={reply} />
                ))
            }
        </div>
    </>
    )
}

export default CommentComponent
