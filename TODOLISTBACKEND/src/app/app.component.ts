import { environment } from './../Environment/ennvironment';
import { Component,OnInit} from '@angular/core';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'Push_Notification';
  message:any = null;
  constructor() {}
  ngOnInit(): void {
    this.requestPermission();
    this.listen();
    console.log("eeeeeeeeeeeeeeeeee",this.listen());
    
}
requestPermission() {
  const messaging = getMessaging();
  console.log("ssssssssssssssss",messaging);
  
  getToken(messaging, 
   { vapidKey: environment.firebase.vapidKey}).then(
     (currentToken) => {
       if (currentToken) {
         console.log("currentToken",currentToken);
       } else {
         console.log('No registration token available');
       }
   }).catch((err) => {
      console.log('An error occurred while retrieve token. ', err);
  });
}
listen() {
  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    this.message=payload;
  });
}
}
