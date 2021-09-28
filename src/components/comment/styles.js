import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    headCmtWrap: {
        display: 'flex',
        marginTop: '20px',
    },
    cmtMain: {
        width: '100%',
        marginLeft: '5px',
        padding: '5px',
        backgroundColor: '#f0f2f5',
        borderRadius: '10px'
    },
    cmtTime: {
        marginLeft: '10px !important',
        fontSize: '13px !important'
    },
    cmtAvt: {
        width: '32px !important',
        height: '32px !important'
    },
    cmtContent: {
        whiteSpace: 'pre-wrap',
        color: 'rgba(0,0,0,0.7)',
        fontSize: '15px',
        marginTop: '5px'
    }
}));

export default useStyles;