export const PINATA_PIN_JSON = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

export const pinataIpfsPost = async ({
  creds,
  jsonString,
}: {
  creds: { pinata_api_key: string; pinata_api_secret: string };
  jsonString: string;
}): Promise<{ IpfsHash: string }> => {
  try {
    const response = await fetch(PINATA_PIN_JSON, {
      method: 'POST',
      headers: {
        pinata_api_key: creds.pinata_api_key,
        pinata_secret_api_key: creds.pinata_api_secret,
        'Content-Type': 'application/json',
      },
      body: jsonString,
    });
    const data = await response.json();
    if (typeof data?.IpfsHash === 'string') {
      return data as { IpfsHash: string };
    } else {
      console.log('response', response);
      throw new Error(`IPFS Pin failed.`);
    }
  } catch (err) {
    console.error(err);
    throw new Error(`IPFS Pin failed.`);
  }
};
