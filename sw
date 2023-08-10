importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

//the Firebase config object 
var firebaseConfig = {
    apiKey: 'AIzaSyAKJD3mI5OTjfaM7owatzKlG-mww2SKo-k',
    authDomain: 'neotericit-dashboard.firebaseapp.com',
    projectId: 'neotericit-dashboard',
    storageBucket: 'neotericit-dashboard.appspot.com',
    messagingSenderId: '374163448136',
    appId: '1:374163448136:web:570b109aeb12cfa677d37d',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload?.notification?.body,
        data: payload?.data
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});



self.addEventListener('notificationclick', function(event) {
    const clickedNotification = event.notification;
    const urlToOpen = event.notification.data.url; 
    clickedNotification.close();
    if (urlToOpen) {
      const promiseChain = clients.openWindow(urlToOpen);
      event.waitUntil(promiseChain);
    }
  });
  
