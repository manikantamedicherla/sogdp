import React, { useContext, useEffect } from 'react'
import { CanvasContext } from 'context'
import './editor.css'

const EditorFC: React.FC = () => {

    const {
        canvasRef,
        drawStack, loadImage, downloadDesign,
        width, aspect, setAspect, setWidth
    } = useContext(CanvasContext)

    const handleAspectChnage = (e: any) => { setAspect(Number(e.target.value)) }

    const canvasStyles = { backgroundColor: 'black' }

    function handleFileDrop(event: any) {
        event.preventDefault();
        const { types = [] } = event.dataTransfer
        var imgSrc
        if (types.includes("Files")) {
            const fileObj = event.dataTransfer.files[0];
            imgSrc = (window.webkitURL ? webkitURL : URL).createObjectURL(fileObj);
        } else if (types.includes("text/uri-list")) {
            imgSrc = event.dataTransfer.getData("Text")
        }
        const x = event.clientX - canvasRef.current.offsetLeft
        const y = event.clientY - canvasRef.current.offsetTop
        loadImage(imgSrc, { x, y })
    }
    useEffect(drawStack, [width, aspect])
    const btnProps = { title: 'Feacture not available', style: { cursor: 'not-allowed' } }
    return (
        <div className='editor-wrap'>

            <div className='editor-menu-bar'>
                {/* <h6>Editor menu bar</h6> */}
                <button className='button' {...btnProps} >Crop</button>
                <button className='button' {...btnProps}>blur</button>
                <button className='button' {...btnProps}>Flip</button>
                <button className='button' onClick={downloadDesign}>Download</button>
            </div>
            <div className='canvas-container'>
                <div style={{ margin: 'auto' }}>
                    <canvas
                        ref={canvasRef}
                        onDragOver={function (e) { e.preventDefault() }}
                        onDrop={handleFileDrop}
                        key='canvas-element'
                        style={canvasStyles}
                    >
                    </canvas>
                </div>
            </div>
            <div className='canvas-aspect-controller'>
                <label>
                    &nbsp;aspect:&nbsp;
                    <select onChange={handleAspectChnage}>
                        <option value={9 / 16}>9/16</option>
                        <option value={16 / 9}>16/9</option>
                    </select>
                </label>
                <label>
                    &nbsp;zoom:&nbsp;
                    <select onChange={e => { setWidth(Number(e.target.value)) }}>
                        <option value={200}>200</option>
                        <option value={300}>300</option>
                        <option value={300}>400</option>
                        <option value={500}>500</option>
                        <option value={600}>600</option>
                        <option value={700}>700</option>
                        <option value={1000}>1000</option>
                    </select>
                    {/* <input type='range' onChange={e => { setWidth(Number(e.target.value)) }} value={width} min={200} max={1000} /> */}
                </label>
            </div>
        </div>
    )
}

export default EditorFC