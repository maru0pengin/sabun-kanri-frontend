import React, {useCallback} from 'react'
import { useDropzone } from 'react-dropzone';

const PSD = require('psd.js')

function DropZone() {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles)
    PSD.fromURL(acceptedFiles.path)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </div>
  );
}
export default DropZone;