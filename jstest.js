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
let permission = Notification.permission
  const handleSubscribe = async () => {
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
            const token = await messaging.getToken(); 

           const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription: subscription,
          email: 'website',
          token: token,
          time: new Date().getTime(),
        }),
      };
      const response = await fetch('https://neotericit-dashboard-server.vercel.app/subscribe', requestOptions);
      const responseData = await response.json();
           if (response.ok) {
        console.log('Thanks for allowing notifications!');
      } else {
        console.error('Error storing subscription:', responseData);
      }
            console.log(responseData.message);
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

  const requestPermission = async () => {
    const newPermission = await Notification.requestPermission();
    permission = newPermission;
  };
 handleSubscribe()
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        console.log('Service Worker registered:', registration);
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    });
  }
