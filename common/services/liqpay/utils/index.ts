import crypto from 'crypto';

export const stringToSignature = (str: string) => {
  const hash = crypto.createHash('sha1');
  hash.update(str);
  return hash.digest('base64');
};

export const getUtcFormatDate = (date: Date) => {
  let year = date.getUTCFullYear();
  let month = String(date.getUTCMonth() + 1).padStart(2, '0');
  let day = String(date.getUTCDate()).padStart(2, '0');
  let hours = String(date.getUTCHours()).padStart(2, '0');
  let minutes = String(date.getUTCMinutes()).padStart(2, '0');
  let seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const getEncodedBase64Data = <T>(data: T) => {
  return Buffer.from(JSON.stringify(data)).toString('base64');
};

export const getDecodedBase64Data = <T>(dataString: string) => {
  dataString = dataString.replace(/%3D/g, '=');

  return JSON.parse(Buffer.from(dataString, 'base64').toString('utf-8')) as T;
};
