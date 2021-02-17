
const socket = io('/')
const videoGrid = document.getElementById('video_grid')
const myVideo = document.createElement('video')
myVideo.muted = true

var peer = new Peer(undefined,{
  path:'/peerjs',
  host: '/',
  port: '9000'
}); 

//1.39:33

let myVideoStream;

// getting user camera and microphone
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  myVideoStream = stream
  addVideoStream(myVideo, stream)
  
  socket.on('user-connected',(userId)=>{
    connectToNewUser(userId,strean)
  })
})

peer.on('open', id=>{

  socket.emit('join-room',ROOM_ID,id)
})

const connectToNewUser = (userId,stream) => {
  const call = peer.call(userId,stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream =>{
    addVideoStream(video, userVideoStream)
  })
}



const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}



