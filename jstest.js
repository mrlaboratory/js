let permission = Notification.permission
// Initialize Firebase with your configuration
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



self.addEventListener('notificationclick', function (event) {
  const clickedNotification = event.notification;
  const urlToOpen = event.notification.data.url;
  clickedNotification.close();
  if (urlToOpen) {
    const promiseChain = clients.openWindow(urlToOpen);
    event.waitUntil(promiseChain);
  }
});


const requestPermission = async () => {
  const newPermission = await Notification.requestPermission();
  permission = newPermission;
};

const handleSubscribe = async () => {
    if(permission !== 'granted'){
       await requestPermission();
    }
if (permission === 'granted') {
const hasSubscribed = localStorage.getItem('subscribed');
if (!hasSubscribed) {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'BP2yrONz-68TOGZaKQCXTgWaDOB0o1XXTzWFX-KFbLNy3lwjg09f63UQ34Kvkl851vmBJwbIfXOJIN6A_KViyW8',
    });

    try {
      const token = await messaging.getToken(); // Use the global messaging object

      const response = await axios.post(`https://neotericit-dashboard-server.vercel.app/subscribe`, {
        subscription,
        email: '',
        token,
        time: new Date().getTime()
      });

      if (response?.status === 200) {
        console.log('Thanks for allowing notifications!');
      }

      console.log(response.data.message);
      localStorage.setItem('subscribed', 'true');
    } catch (error) {
      console.error('Error storing subscription:', error);
    }
  } catch (error) {
    console.error('Error subscribing to push notifications:', error);
  }
}
} else if (permission === 'default') {
requestPermission();
}

};
handleSubscribe();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('https://enblog.neotericit.com/js/index.js')
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error);
    });
}
