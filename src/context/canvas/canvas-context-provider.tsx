import React, { createContext, useState, useRef, useEffect } from 'react'

interface RefObject<T> {
    current: T | null;
}
interface DefaultContext {
    // canvasRef?: RefObject<any>,
    canvasRef?: any,
    loadImage: (imgSrc: string, coordinates?: { x: number, y: number }) => void,
    drawStack: () => void,
    downloadDesign: () => void,
    setAspect: (val: number) => void,
    setWidth: (val: number) => void,
    width: number,
    aspect: number

}

const defaultContext: DefaultContext = {
    loadImage: (imgSrc: string, coordinates?: { x: number, y: number }) => { },
    drawStack: () => { },
    downloadDesign: () => { },
    setAspect: (val: number) => { },
    setWidth: (val: number) => { },
    width: 250,
    aspect: (9 / 16)
};

export const CanvasContext: React.Context<DefaultContext> = createContext(defaultContext);


interface Props {
    children: object
}

interface Textnode {
    text: string
}
export const CanvasContextProvider: React.FC<Props> = props => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [aspect, setAspect] = useState<number>(9 / 16)
    const [width, setWidth] = useState<number>(250)
    const [ctx, setCtx] = useState<any>()


    const [canvasDataStack, setCanvasDataStack] = useState<any[]>([])


    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.width = width
            canvasRef.current.height = width / aspect
        }
    }, [aspect, width])

    
    useEffect(() => {
        if (!canvasRef.current) return
        const context = canvasRef.current.getContext('2d')
        setCtx(context)
        canvasRef.current.onmousedown = (e) => { console.log('onmousedown', e.clientX, e.clientY) }
        canvasRef.current.onmousemove = (e) => { console.log('onmousemve', e.clientX, e.clientY) }
        canvasRef.current.onmouseup = (e) => { console.log('onmouseup', e.clientX, e.clientY) }
        canvasRef.current.onmouseout = (e) => { console.log('onmouseout', e.clientX, e.clientY) }
    }, [canvasRef])

    function updateCanvasDataStack(stackElement: { name: string, draw: () => void }) {
        setCanvasDataStack(prevData => ([...prevData, { ...stackElement, time: new Date().getTime() }]))
    }

    function drawStack() {
        if (canvasRef.current && ctx) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            canvasDataStack.forEach(item => {
                item.draw()
            })
        }
    }

    useEffect(drawStack, [setCanvasDataStack])
    // useEffect(drawStack, [width, aspect])


    function loadImage(imgSrc: string, coordinates: { x: number, y: number } = { x: 10, y: 10 }) {
        if (canvasDataStack.length) {
            updateCanvasDataStack({ name: 'draw an image', draw: () => { drawImage(imgSrc, coordinates) } })
            drawImage(imgSrc, coordinates)
        } else {
            updateCanvasDataStack({ name: 'draw bg image', draw: () => { drawBgImage(imgSrc) } })
            drawBgImage(imgSrc)
        }
    }

    function drawBgImage(imgSrc: string) {
        if (canvasRef.current && ctx) {
            const canvas = canvasRef.current;
            var imageObj = new Image();
            imageObj.src = imgSrc;
            imageObj.crossOrigin = "anonymous";
            imageObj.onload = function () {
                let nw = imageObj.width;
                let nh = imageObj.height;
                let aspect = nw / nh;

                let canvasAspect = canvas.width / canvas.height;
                let w, h;
                if (canvasAspect < 1) {
                    w = canvas.width;
                    h = canvas.width / aspect;
                } else {
                    h = canvas.height;
                    w = canvas.height * aspect;
                }


                var x = (canvas.width / 2) - (w / 2);
                var y = (canvas.height / 2) - (h / 2);

                // draw vertically center
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.filter = 'blur(20px)';
                ctx.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height, 0, 0, canvas.width, canvas.height);
                ctx.filter = 'none';
                ctx.drawImage(imageObj, x, y, w, h);
            };
        }
    }
    function drawImage(imgSrc: string, coordinates: { x: number, y: number }) {
        if (canvasRef.current && ctx) {
            const canvas = canvasRef.current;
            var imageObj = new Image();
            imageObj.src = imgSrc;
            imageObj.crossOrigin = "anonymous";
            imageObj.onload = function () {
                let nw = imageObj.width;
                let nh = imageObj.height;
                let aspect = nw / nh;

                let canvasAspect = canvas.width / canvas.height;
                let w, h;
                if (canvasAspect < 1) {
                    w = (canvas.width / 2);
                    h = w / aspect;
                } else {
                    h = canvas.height / 2;
                    w = h * aspect;
                }
                const { x, y } = coordinates
                ctx.drawImage(imageObj, x, y, w, h);
            };
        }
    }

    function downloadDesign() {
        if (canvasRef.current && ctx) {
            const imgDataUrl = canvasRef.current.toDataURL("image/png");
            const anchorElem = document.createElement('a')
            anchorElem.href = imgDataUrl
            anchorElem.setAttribute('download', 'design.png')
            anchorElem.click()
        }
    }
    return (
        <CanvasContext.Provider value={{
            canvasRef, loadImage,
            drawStack, downloadDesign,
            setWidth, setAspect,
            width,
            aspect
        }}>
            {props.children}
        </CanvasContext.Provider>
    )
}
