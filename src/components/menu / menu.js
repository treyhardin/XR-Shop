import { useCallback, useContext, useState } from 'react';
import './menu.css';

import { ControlLockContext } from '../global-context/global-context';
import { useXR } from '@react-three/xr';

function Menu(props) {

    const { isLocked, setLocked } = useContext(ControlLockContext);
    useCallback(() => {
        console.log('menu change')
    }, [isLocked])

    const {device} = useXR();

    const handleClick = () => {
        // device.requestPresent([{source: renderer.domElement}]);
        console.log(useXR)

        if (props.vr) {
            return navigator.xr.requestSession('immersive-vr').then((session) => {
                navigator.xr.onSessionStarted(session);
            })
        }

        return setLocked(true)
    }

    console.log(navigator.xr)

    return (
        <div className={`menu ${ isLocked && 'hidden'}`}>
            <div className='menu-title'>
                <img src={props.brandLogo} className='brand-logo' />
                <h1 className='title-text utility'>Spring/Summer 2022</h1>
                <button onClick={() => handleClick()}>Enter the Store</button>
            </div>
            <p>{device}</p>
            <div className='menu-info'>
                <span className='info-block'>
                    <label className='utility'>Controls:</label>
                    <span className='controls-wrapper utility'>
                        <span className='controls-item'>W</span>
                        <span className='controls-item'>A</span>
                        <span className='controls-item'>S</span>
                        <span className='controls-item'>D</span>
                    </span>
                    <span className='controls-wrapper utility'>
                        <span className='controls-item'>&#8593;</span>
                        <span className='controls-item'>&#8592;</span>
                        <span className='controls-item'>&#8595;</span>
                        <span className='controls-item'>&#8594;</span>
                    </span>
                </span>
                <span className='info-block'>
                    <label className='utility'>Device:</label>
                    <span className='devices-wrapper utility'>
                        <span className={`device-item ${props.vr ? 'active' : ''}`}>VR</span>
                        <span className={`device-item ${!props.vr ? 'active' : ''}`}>Web</span>
                    </span>
                </span>
            </div>
        </div>
    );
}

export default Menu;