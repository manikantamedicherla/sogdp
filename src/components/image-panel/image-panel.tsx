import React, { useContext, useEffect, useRef } from 'react';
import { ImageContext, CanvasContext } from 'context'
import { useLazyLoading } from './hook'
import imgPlaceHolder from 'assets/img-placeholder.png'
import './image-panel.css'

interface Entries {
    intersectionRatio: number
}
const ImagePanel: React.FC = () => {
    const { images = [], advancePage } = useContext(ImageContext)
    const { loadImage } = useContext(CanvasContext)
    const bottomBoundaryRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleObserver = (e: Entries[]) => {
            e.forEach(item => {
                if (item.intersectionRatio > 0) {
                    advancePage()
                }
            })
        }
        if (bottomBoundaryRef.current) {
            const options = {
                root: null,
                rootMargin: "0px",
                threshold: 0.10
            };
            const scrollObserver = new IntersectionObserver((e) => handleObserver(e), options)
            scrollObserver.observe(bottomBoundaryRef.current)
        }
    }, [bottomBoundaryRef, advancePage])

    useLazyLoading('.img-tag', images)

    return (
        <div className='image-panel-wrapper'>
            {/* <div className='image-panel-menu-bar'>
                <h2>Image panel menu bar</h2>
            </div> */}
            <div className='image-grid-container'>
                {images.map((img, index) => {
                    const { width, height } = img
                    const aspect = width / height;
                    const newHeight = 100
                    const newWidth = newHeight * aspect
                    return (
                        <img
                            className='img-tag'
                            alt={img.author}
                            width={newWidth} height={newHeight}
                            key={index}
                            data-src={img.download_url}
                            draggable
                            src={imgPlaceHolder}
                            onClick={() => { loadImage(img.download_url) }}
                        />
                    )
                })}
                <div
                    id='bottom-boundary-div'
                    style={{
                        padding: 10,
                        width: '100%',
                        height: '200px',
                        color: 'white',
                        display: 'flex'
                    }}
                    ref={bottomBoundaryRef}>
                    <span style={{ margin: 'auto' }}>Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default ImagePanel



// import { useEffect, useCallback, useRef } from 'react';

// // infinite scrolling with intersection observer
// export const useInfiniteScroll = (scrollRef, dispatch) => {

//   const scrollObserver = useCallback(
//     node => {
//       new IntersectionObserver(entries => {
//         entries.forEach(en => {
//           if (en.intersectionRatio > 0) {
//             dispatch({ type: 'ADVANCE_PAGE' });
//           }
//         });
//       }).observe(node);
//     },
//     [dispatch]
//   );

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollObserver(scrollRef.current);
//     }
//   }, [scrollObserver, scrollRef]);
// }
