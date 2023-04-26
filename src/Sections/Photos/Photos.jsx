import Nav from '../../Router/Nav'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import {
  storage,
  getAllURLs,
  newOneURL,
  setURLs
} from '../../components/firebase/api'
import { useState, useEffect, useRef } from 'react'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { useNavigate, useLocation } from 'react-router-dom'
import { v4 } from 'uuid'
let newUrls = []

const URLs = () => {
  const navigate = useNavigate()
  const [images, setImages] = useState([])
  const [progress, setProgress] = useState([])
  const [docs, setDocs] = useState([])
  const aRef = useRef(null)
  const [disableButton, setDisableButton] = useState([true])
  const { state: item } = useLocation()
  const [img, setImg] = useState([])

  const readBD = async () => {
    const docs = []
    const querySnapshot = await getAllURLs()
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id })
    })
    const filterDocs = docs.filter((x) => x.idgame === item.id)
    setDocs(filterDocs)
    if (filterDocs.length !== 0) {
      newUrls = filterDocs[0].photos
      setImg(filterDocs[0].photos)
    }
  }
  useEffect(() => {
    readBD()
  }, [])

  const writeURLDb = async () => {
    if (docs.length === 0) {
      const newOneDoc = {
        idgame: item.id,
        photos: newUrls
      }
      await newOneURL(newOneDoc)
      readBD()
    } else {
      const photosURLDB = {
        idgame: item.id,
        photos: newUrls
      }
      await setURLs(docs[0].id, photosURLDB)
      readBD()
    }
  }
  const handleFileChange = (e) => {
    const files = e.target.files
    const newImages = []
    for (let i = 0; i < files.length; i++) {
      newImages.push(files[i])
    }
    setImages(newImages)
    setDisableButton(false)
  }

  const handleUpload = async () => {
    aRef.current.value = null
    setDisableButton(true)
    for (let i = 0; i < images.length; i++) {
      const image = images[i]
      const storageRef = ref(storage, item.id + '/' + v4())
      const uploadTask = uploadBytesResumable(storageRef, image)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100

          setProgress((prevProgress) => {
            const newProgress = [...prevProgress]
            newProgress[i] = progress.toFixed(2)
            return newProgress
          })
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            newUrls.push(downloadURL)
            writeURLDb()
          })
        }
      )
    }
  }

  return (
    <>
      <Nav />
      <div className='galeria mt-3'>
      {img.map((url) => (
         <a target="blank" href={url} key={url}><img src={url} alt='Photos from game'></img></a>

      ))}
      </div>
      <div
        className="mt-3"
        style={{ display: 'flex', flexWrap: 'wrap', gap: 5, margin: 5 }}
      >
        <Form.Group controlId="formFile">
          <Form.Control ref={aRef} onChange={handleFileChange} type="file" />
        </Form.Group>
        <Button disabled={disableButton} onClick={handleUpload}>
          Upload File
        </Button>
      </div>
      {progress.map((progress, i) => (
        <h5 style={{ color: 'white', margin: 10, maxWidth: 285 }} key={i}>
          {images[i].name}{' '}
          <ProgressBar style={{ marginTop: 5 }} variant="info" now={progress} />
        </h5>
      ))}
      <Button style={{ marginLeft: 5 }} onClick={() => navigate(-1)}>Go Back</Button>
    </>
  )
}

export default URLs
