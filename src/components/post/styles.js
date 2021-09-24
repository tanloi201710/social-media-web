import { makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: '30px 0',
        borderRadius: '10px',
    },
    name: {
        fontSize: 15,
        fontWeight: 500,
    },
    media: {
        // height: 350,
        width: '100%',
        objectFit: 'contain',
        // boxShadow: 'inset 0px 10px 8px -10px #c6c6c6, inset 0px -10px 8px -10px #c6c6c6',
        // backgroundSize: 'contain',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
        width: '55px',
        height: '55px',
    },
    postTopRight: {
        position: 'relative'
    },
    postTopRight_morevert: {
        position: 'absolute',
        width: '200px',
        right: '15px',
        top: '47px',
        backgroundColor: '#fff',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.4)',
        borderRadius: '5px',
        border: '1px solid rgba(0,0,0,0.1)',
        zIndex: 2,
        '&:before': {
            content: '""',
            position: 'absolute',
            top: '-5px',
            right: '2px',
            width: '10px',
            height: '10px',
            backgroundColor: '#fff',
            borderTop: '1px solid rgba(0,0,0,0.1)',
            borderLeft: '1px solid rgba(0,0,0,0.1)',
            transform: 'rotate(45deg)',
        }
    },
    actionText: {
        color: '#000',
    },
    favorite: {
        animation: `$scale 500ms ${theme.transitions.easing.easeInOut}`
    },
    "@keyframes scale": {
        "0%": {
            transform: "scale(1)"
        },
        "80%": {
            transform: "scale(1.5)"
        },
        "100%": {
            transform: "scale(1)"
        }
    },
    headCmtWrap: {
        display: 'flex',
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#f0f2f5',
        borderRadius: '10px'
    },
    cmtMain: {
        width: '100%',
        margin: '0 5px 0 10px'
    },
    cmtTime: {
        marginLeft: '10px',
        fontSize: '13px'
    },
    cmtAvt: {
        width: '32px',
        height: '32px'
    },
    cmtContent: {
        whiteSpace: 'pre-wrap',
        color: 'rgba(0,0,0,0.7)',
        fontSize: '15px',
        marginTop: '5px'
    }
}));

export default useStyles;