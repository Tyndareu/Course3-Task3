import Nav from '../../Router/Nav'
import {
  ref,
  uploadBytesResumable,
  listAll,
  getDownloadURL
} from 'firebase/storage'
import { storage } from '../../components/firebase/api'
import { useState, useEffect, useRef } from 'react'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { useNavigate, useLocation } from 'react-router-dom'
import { v4 } from 'uuid'

const URLs = () => {
  const navigate = useNavigate()
  const [images, setImages] = useState([])
  const [progress, setProgress] = useState([])
  const aRef = useRef(null)
  const [disableButton, setDisableButton] = useState([true])
  const { state: item } = useLocation()
  const [imageList, setImageList] = useState([])
  const imagesListFolderRef = ref(storage, item.id.toString())
  const [reload, setReload] = useState(false)

  useEffect(() => {
    setImageList([])
    listAll(imagesListFolderRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          return setImageList((prev) => [...prev, url])
        })
      })
    })
  }, [reload])

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
        () => { setReload(!reload) }
      )
    }
  }

  return (
    <>
      <Nav />
      <div className="galeria mt-3">
        {imageList.map((url) => (
          <a target="blank" href={url} key={url}>
            <img src={url} alt="Photos from game"></img>
          </a>
        ))}
      </div>
      <div
        className="mt-3"
        style={{ display: 'flex', flexWrap: 'wrap', gap: 5, margin: 5 }}
      >
        <Form.Group controlId="formFile">
          <Form.Control ref={aRef} multiple onChange={handleFileChange} type="file" />
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
      <Button style={{ marginLeft: 5 }} onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </>
  )
}

export default URLs
