import { useEffect, useCallback, useRef } from 'react';
import { ImgageObj } from 'context'


interface RefObject<T> {
    current: T | null;
 }

  // lazy load images with intersection observer
export const useLazyLoading = (imgSelector:string, items:ImgageObj[]) => {
    const imgObserver = useCallback(node => {
      const intObs = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.intersectionRatio > 0) {
            const currentImg:any = en.target
            const newImgSrc = currentImg.dataset.src;
  
            // only swap out the image source if the new url exists
            if (!newImgSrc) {
              console.error('Image source is invalid');
            } else {
              currentImg.src = newImgSrc;
            }
            intObs.unobserve(node);
          }
        });
      })
      intObs.observe(node);
    }, []);
  
    const imagesRef:RefObject<any> = useRef(null);
  
    useEffect(() => {
      imagesRef.current = document.querySelectorAll(imgSelector);
  
      if (imagesRef.current) {
        imagesRef.current.forEach((img:any) => imgObserver(img));
      }
    }, [imgObserver, imagesRef, imgSelector, items])
  }