import React, { createContext, useState, useEffect } from 'react'

export interface ImgageObj {
    author: string
    download_url: string,
    height: number
    id?: string
    url?: string
    width: number
}

interface DefaultContext {
    images: ImgageObj[],
    fetching: boolean,
    page: number,
    advancePage: () => void,
    setPage: (p: number) => void,
}

const defaultContext: DefaultContext = { images: [], fetching: false, page: 0, advancePage: () => { }, setPage: (p: number) => { } };

export const ImageContext: React.Context<DefaultContext> = createContext(defaultContext);


interface Props {
    children: object
}

export const ImageContextProvider: React.FC<Props> = props => {

    const [fetching, setFetching] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [images, setImages] = useState<ImgageObj[]>([])

    function advancePage() {
        if (fetching) return
        setPage(page + 1);
    }

    const fetchImages = () => {
        if (fetching) return
        setFetching(true)
        fetch(`https://picsum.photos/v2/list?page=${page}&limit=10`)
            .then(data => data.json())
            .then(imagesArray => {
                setFetching(false)
                // setImages(prevImgaes => ([...prevImgaes, ...imagesArray]))
                setImages(prevImgaes => {
                    const updatedArray = [...prevImgaes, ...imagesArray]
                    const arrMap = new Map()
                    updatedArray.forEach(item => arrMap.set(item.id, item))
                    return [ ...arrMap.values() ]
                })
            })
            .catch(e => {
                // handle error
                setFetching(false)
                return e;
            })
    }
    useEffect(fetchImages, [page])

    return (
        <ImageContext.Provider value={{ setPage, images, fetching, page, advancePage }}>
            {props.children}
        </ImageContext.Provider>
    )
}
