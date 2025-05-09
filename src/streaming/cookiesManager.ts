import jsCookie from 'js-cookie';

interface User {
  displayName: string;
}

interface Devices {
  webcamEnabled: boolean;
}

const USER_COOKIE = 'mediasoup-demo.user';
const DEVICES_COOKIE = 'mediasoup-demo.devices';

export function getUser(): User | undefined {
  return jsCookie.getJSON(USER_COOKIE);
}

export function setUser({ displayName }: User): void {
  jsCookie.set(USER_COOKIE, { displayName });
}

export function getDevices(): Devices | undefined {
  return jsCookie.getJSON(DEVICES_COOKIE);
}

export function setDevices({ webcamEnabled }: Devices): void {
  jsCookie.set(DEVICES_COOKIE, { webcamEnabled });
}
