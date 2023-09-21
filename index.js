// let c1 = new RTCPeerConnection();
// let c2 = new RTCPeerConnection();

// var start = () => navigator.mediaDevices.getUserMedia({audio : true , video : true})
// .then( stream =>
//     {
//         attachVideo(v1 , v1Info , stream);
//         c1.addStream(stream);
//     })
// let attachVideo = (videoTag , vInfo , stream) =>
// {
//     videoTag.srcObject = stream;
//     videoTag.addEventListener("loadmetadata" , e => update(vInfo , dimentions(videoTag)))
// }
// let dimentions = tag => tag.videoWidth + "x" + tag.videoHeigth;
// let update = ( div , size ) =>
// {
//     div.innderHTML = size;a
// }

// var addCandidate = (c , candidate) => c && c.addIceCandidate(candidate)
// c1.onicecandidate = e =>
// {
//     console.log('c1.onicecandidate:' , e.candidate)
//     addCandidate(c2 , e.candidate)
// }
// c2.onicecandidate = e =>
// {
//     console.log('c1.onicecandidate:' , e.candidate)
//     addCandidate(c1 , e.candidate)
// }

// c1.onnegotiationneeded = e =>
// {
//     c1.createOffer().then( d => {
//         return c1.setLocalDescription(d);
//     }).then( () => c2.setRemoteDescription(c1.localDescription))
//     .then(() => c2.createAnswer())
//     .then( d => { return c2.setLocalDescription(d)})
//     .then(() => c1.setRemoteDescription(c2.localDescription))
// }

// c2.ontrack = e =>
//     {
//         return attachVideo(v2 , v2Info , e.streams[0])
//     }

const c1 = new RTCPeerConnection();
const c2 = new RTCPeerConnection();

const start = () => navigator.mediaDevices.getUserMedia({audio : true , video : true})
.then( stream =>
    {
        attachVideo(v1 , v1Info , stream)
        c1.addStream(stream);
    })

let attachVideo = (videoTag , info , stream) =>
{
    videoTag.srcObject = stream;
    videoTag.addEventListener("loadmetadata" , e => update(info , dimentions(videoTag)) , false)
}

const dimentions = tag => { return tag.videoWidth + "x" + tag.videoHeight}; 
const update = (tag , dimention) =>
{
    tag.innerHTML = dimention;
}

var addCandidate = (c , candidate) => c && c.addIceCandidate(candidate)
c1.onicecandidate = e =>
{
    console.log('c1.onicecandidate:' , e.candidate)
    addCandidate(c2 , e.candidate)
}
c2.onicecandidate = e =>
{
    console.log('c1.onicecandidate:' , e.candidate)
    addCandidate(c1 , e.candidate)
}

// c1.onicecandidate = e =>
// {
//     if(c1 == null)
//     {
//         c1.addIceCandidate(e.candidate)
//     }
// }
// c2.onicecandidate = e =>
// {
//     if(c2 == null)
//     {
//         c2.addIceCandidate(e.candidate)
//     }
// }

// You can do this as well , just hit start two times.

c1.onnegotiationneeded = d =>
{
    c1.createOffer().then( d => {
        return c1.setLocalDescription(d)
    }).then( () => c2.setRemoteDescription(c1.localDescription))
    .then(() => c2.createAnswer())
    .then( d => {return c2.setLocalDescription(d)})
    .then( () => { c1.setRemoteDescription(c2.localDescription)})
}

c2.ontrack = e =>
{
    return attachVideo(v2 , v2Info , e.streams[0])
}