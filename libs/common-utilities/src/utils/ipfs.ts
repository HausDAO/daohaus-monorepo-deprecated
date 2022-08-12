export const PINATA_PIN_FILE_API =
  'https://api.pinata.cloud/pinning/pinFileToIPFS';

export const pinataIpfsPost = async ({
  creds,
  formData,
}: {
  creds: { pinata_api_key: string; pinata_api_secret: string };
  formData: FormData;
}) => {
  try {
    const response = await fetch(PINATA_PIN_FILE_API, {
      method: 'POST',
      headers: {
        pinata_api_key: creds.pinata_api_key,
        pinata_secret_api_key: creds.pinata_api_secret,
      },
      body: formData,
    });
    return response.json();
  } catch (err) {
    console.error(err);
  }
};
