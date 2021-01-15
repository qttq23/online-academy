import React from 'react'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import ImageUploader from 'react-images-upload'
import TextField from '@material-ui/core/TextField'

import './style.css'

const UploadCourse = (props) => {
  const [image, setImage] = useState(null)
  const [courseInfo, setCourseInfo] = useState('')

  const handleCourseInfoChange = (value) => {
    setCourseInfo(value)
  }

  const onDropImage = (image) => {
    setImage(image)
  }

  return (
    <div className="container">
      <ImageUploader
        withIcon={false}
        withLabel={false}
        withPreview={true}
        onChange={onDropImage}
        buttonText="ADD IMAGE"
        imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
        maxFileSize={1048576}
      />
      <div className="course-information-container">
        <TextField label="Course name" />
        <TextField label="Brief" />
        <ReactQuill
          value={courseInfo}
          onChange={handleCourseInfoChange}
        />
      </div>
    </div>
  )
}

export default UploadCourse