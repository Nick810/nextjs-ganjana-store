const Video = ({ videoSrcURL, videoTitle, ...props }) => (
  <div className="video iframe-container" { ...props } >
    <iframe
      src={ videoSrcURL }
      title={ videoTitle }
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
      style={{ width: '100%' }}
      className="h-screen"
    />
  </div>
)
export default Video