import React, { useState } from 'react'
import { EditorFC, ImagePanel } from 'components';
import './app-base.css'

const Base: React.FC = () => {
    const [showImgPanel, setShowImgPanel] = useState(true)
    return (
        <>
            <div className='app-menu-bar'>
                <button
                    title={showImgPanel ? 'hide image panel' : 'open image panel'}
                    onClick={() => { setShowImgPanel(!showImgPanel) }}
                >
                    {showImgPanel ? '< hide panel' : 'show panel >'}
                </button>
            </div>
            <div className='app-container'>
                <div className='img-panel-container'
                    style={showImgPanel ? { display: 'block' } : { display: 'none' }} >
                    <ImagePanel />
                </div>
                <div className='editor-container'>
                    {/* <div style={{ margin: 'auto', border: '1px solid red' }}> */}
                    <EditorFC />
                    {/* </div> */}
                </div>
            </div>
        </>
    )
}

export default Base