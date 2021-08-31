import React from 'react';
import './ChangeInfo.css';
import Topbar from '../../components/topbar/Topbar';
import {
    Button,
    makeStyles, 
    Stepper, 
    Step,
    StepLabel,
    StepContent,
    Paper,
    Typography,
    TextField,
    FormControlLabel,
    Radio,
    RadioGroup,
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import ChangeAvatar from '../../components/changeAvatar/ChangeAvatar';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
  
  function getSteps() {
    return ['Chọn ảnh đại diện', 'Thông tin cá nhân', 'Ngày sinh'];
  }

export default function ChangeInfo() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }
  const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
      setActiveStep(0);
  };
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <ChangeAvatar />
      case 1:
        return (
          <>
            <form className={classes.root} noValidate autoComplete="off">
              <p>Giới tính</p>
              <RadioGroup aria-label="gender" name="gender" value={value} onClick={handleChange} >
                <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
                <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
                <FormControlLabel value="Khác" control={<Radio />} label="Khác" />
              </RadioGroup>
            </form>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="district"
                label="Quận/Huyện"
              />
              <TextField
                id="province"
                label="Tỉnh thành"
              />
              <TextField
                id="city"
                label="Thành phố"
              />
            </form>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="jobs"
                label="Nghề nghiệp hiện tại"
              />
            </form>
          </>
        );
      case 2:
        return (
          <>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="birthday"
                label="Ngày sinh"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </>
        );
      default:
        return 'Cút';
    }
  }


  return (
  <>
    <div className="changeInfo">
      <Topbar />
      <div className="changeInfoBox">
        <h1 className="changeInfoTitle">Thông Tin cá nhân</h1>
        <div className={classes.root}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography component={'div'}>{getStepContent(index)}</Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >
                          Quay lại
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Hoàn thành' : 'Tiếp tục'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>Bạn đã nhập thông tin thành công</Typography>
            
            <Button onClick={handleReset} className={classes.button}>
                Chỉnh sửa
            </Button>
            <Button >
            <Link to="/" style={{textDecoration:"none"}} className={classes.button}>Trang chủ</Link>
                
            </Button>
            </Paper>
          )}
        </div>
      </div>
    </div>
  </>
  )
}
