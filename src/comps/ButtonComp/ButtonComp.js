import React from 'react';
import Button from 'react-bootstrap/Button';
import './ButtonCompStyle.scss'

const ButtonComp = ({label, callback}) => {
    return <Button className='button_comp' variant="primary" onClick={callback}>{label}</Button>
};

export default ButtonComp;