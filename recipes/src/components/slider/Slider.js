import React, {useState} from 'react';
import './slider.scss';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { IconButton, MobileStepper, ButtonBase } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

export default function Slider(props) {
    const images = props.images;
    const [currentImgIdx, setCurrentImgIdx] = useState(0);

    const next = () => {
        if (currentImgIdx < images.length -1) {
            setCurrentImgIdx(currentImgIdx + 1);
        }
    };

    const previous = () => {
        if (currentImgIdx > 0) {
            setCurrentImgIdx(currentImgIdx - 1);
        }
    };

    const theme = useTheme();
    const useStyles = makeStyles({
        rounded: {
            borderRadius: theme.shape.borderRadius,
        }
    });
    const styles = useStyles();

    return(
        <div className="slider_wrapper">
            <ButtonBase onClick={next} className="slide_element" aria-label="naechstes">
                <img className={styles.rounded} src={images[currentImgIdx]} alt=""/>
            </ButtonBase>
            <MobileStepper
                variant="dots"
                className="stepper"
                steps={images.length}
                position="static"
                activeStep={currentImgIdx}
                nextButton={
                    <IconButton aria-label="naechtes" onClick={next} disabled={currentImgIdx === (images.length -1)} color="primary">
                        <NavigateNextIcon fontSize="large"/>
                    </IconButton>
                }
                backButton={
                    <IconButton aria-label="zurueck" onClick={previous} disabled={currentImgIdx === 0} color="primary">
                        <NavigateBeforeIcon fontSize="large"/>
                    </IconButton>
                }
            />
        </div>
    );
}