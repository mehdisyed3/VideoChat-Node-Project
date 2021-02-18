
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

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}

// getting user camera and microphone
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
})
.then(stream => {
  myVideoStream = stream
  addVideoStream(myVideo, stream)


peer.on('call', (call) => {
  getUserMedia({video: true, audio: true}, function(stream) {
    call.answer(stream); // Answer the call with an A/V stream.
    call.on('stream', function(remoteStream) {
      // Show stream in some video/canvas element.
      addVideoStream(video,userVideoStream)
    });
  }, function(err) {
    console.log('Failed to get local stream' ,err);
  });
});

  ////Somethis is wrong here... may be the block below should not be within a promise.
  
  socket.on('user-connected',(userId)=>{
    connectToNewUser(userId,stream)
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







