import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  @ViewChild('myvideo') myVideo: any;

  peer;
  anotherId;
  myPeerId;

  consturctor(){

  }


  ngOnInit(){
    let video = this.myVideo.nativeElement;
    this.peer = new Peer({key: 'wsomd7kknmmzehfr'});
    setTimeout(()=>{
      this.myPeerId = this.peer.id;

    },3000)
    console.log(this.peer);
    this.peer.on('connection', function(conn) {
      conn.on('data', function(data){
        // Will print 'hi!'
        console.log(data);
      });
    });

    var n = <any>navigator;
    n. getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia;

    this.peer.on('call', function(call){
      n.getUserMedia({video: true, audio: true}, function(stream){
        call.answer(stream);
        call.on('stream',function(remotestream){
          video.src = URL.createObjectURL(remotestream);
          video.play();
        });
      },function(err){
        console.log('Failed to get stream', err);
      });
    });
  }

  connect(){   
    var conn = this.peer.connect(this.anotherId);
      conn.on('open', function(){
        conn.send('Message from that id');
      });
    }
    
  videoconnect(){
    let video = this.myVideo.nativeElement;
    var localvar = this.peer;
    var fname = this.anotherId;

    //var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    var n = <any>navigator;
    n. getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia;

    n.getUserMedia({video: true, audio: true}, function(stream){
      var call = localvar.call(fname, stream);
      call.on('stream',function(remotestream){
        video.src = URL.createObjectURL(remotestream);
        video.play();
      });
    },function(err){
      console.log('Failed to get stream', err);
    });
  }

}
