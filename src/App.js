import React, { useState, useEffect, useRef } from 'react'
import './App.css'
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient('http://localhost:5001')

function App() {
  const [fileHashes, setFileHashes] = useState([])
  const fileInput = useRef()
  useEffect(() => {
    const ipfsInit = async () => {
      const ver = await ipfs.version()
    }
    ipfsInit()
  }, [])

  const upload = async () => {
    const source = await ipfs.add([...fileInput.current.files], {
      progress: prog => console.log(`received: ${prog}`),
    })
    for await (const file of source) {
      setFileHashes([...fileHashes, file.path])
    }
  }
  
  return (
    <div className="App">
      <div>
        <input
          type="file"
          ref={fileInput}
          accept="image/x-png,image/gif,image/jpeg"
        />
      </div>
      <div>
        <button onClick={upload}>Upload</button>
      </div>
      <div className='images'>
      {fileHashes.map(fileHash => (
        <div>
          <img
            className='image'
            src={'https://ipfs.io/ipfs/' + fileHash}
            alt={fileHash}
          />
        </div>
      ))}
      </div>
    </div>
  )
}

export default App
