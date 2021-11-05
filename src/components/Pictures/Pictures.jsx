import axios from 'axios'
import React, {useState, useEffect, useRef} from 'react'
import {Box , Card , CardMedia, Button} from '@material-ui/core'
import {useMount} from '../../hooks/useMount'
import { CSSTransition } from 'react-transition-group'

import styles from './Pictures.module.scss'

export const Pictures = () => {
  const [images, setImages] = useState([])
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1)
  const {isMounted} = useMount()
  const contRef = useRef(null);

  const loadImages = async() => {

    try {
      const {data} = await axios.get(`http://localhost:4000/api/pictures?limit=${limit}&page=${page}`);

      setImages(data.images)
      setTotal(data.total)

    } catch (error) {
      console.log(error)
    }    
  }

  useEffect(() => { loadImages() }, [page, limit])


  const showNextHandler = () => {
    if (total > limit * page + 1) {
      setPage(page + 1)
    }
  }
  const showPreviousHandler = () => {
    if (limit * page - limit  > 0) {
      setPage(page - 1)
    }
  }


  return (

    <>
        <CSSTransition
        in={isMounted}
        timeout={0}
        classNames={{
          enterDone: styles['root-enter-done'],
        }}  
        nodeRef={contRef}
      >
        <Box  className={styles.root} ref={contRef}>
      {images.map(({imageUrl, alt, desc}, id) => {
        return (
            <Card
              key={id}
              classes={{
                root: styles.card,
              
              }}
            >
                <CardMedia src={imageUrl} component="img" className={styles.image}/>
            </Card>
        )
      })}
      </Box>
      </CSSTransition>
      <Box className={styles.buttonWrapper}>
        <Button
          className={styles.button}
          onClick={showPreviousHandler}
          variant='contained'
        >
          show previous
        </Button>
        <Button
          className={styles.button}
          onClick={showNextHandler}
          variant='contained'
        >
          show next
        </Button>
      </Box>

    </>
  )

}
