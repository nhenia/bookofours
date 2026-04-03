export function getCoordinates() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ lat: 40.7128, lng: -74.0060 }); // Fallback to NYC
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        () => {
          resolve({ lat: 40.7128, lng: -74.0060 }); // Fallback on error
        }
      );
    }
  });
}
