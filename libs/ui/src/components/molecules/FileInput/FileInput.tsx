import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Buildable, Field } from '../../../types/formAndField';
import { Avatar, Bold, Button } from '../../atoms';
import { FieldWrapper } from '../FieldWrapper';
import {
  CancelParSm,
  FileInputContents,
  ImageDisplayWrapper,
} from './FileInput.styles';

// TODO how to pass off formdata to ipfs - formdata as value for now
// export const ipfsPost = async (creds, formData) => {
//   const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         pinata_api_key: creds.pinata_api_key,
//         pinata_secret_api_key: creds.pinata_api_secret,
//       },
//       body: formData,
//     });
//     return response.json();
//   } catch (err) {
//     console.error(err);
//   }
// };

// TODO: bounce

export const FileInput = ({
  id,
  buttonText,
  accept,
  displayAvatarImage = false,
  ...props
}: Buildable<Field> & {
  buttonText: string;
  accept: string;
  displayAvatarImage: boolean;
}) => {
  const upload = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { register, setValue } = useFormContext();

  const handleBrowse = () => {
    upload.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    setImageUrl(URL.createObjectURL(fileList[0]));
    const formData = new FormData();
    formData.append('image', fileList[0], fileList[0].name);
    setValue(id, formData);
  };

  const handleResetImage = () => {
    setValue(id, undefined);
    setImageUrl(null);
  };

  return (
    <FieldWrapper {...props} id={id}>
      <FileInputContents>
        <Button
          onClick={() => {
            handleBrowse();
          }}
        >
          {buttonText}
        </Button>
        <input
          {...props}
          {...register(id)}
          id={id}
          type="file"
          multiple={false}
          style={{ display: 'none' }}
          ref={upload}
          onChange={handleImageChange}
        />
        {displayAvatarImage && imageUrl && (
          <ImageDisplayWrapper>
            <Avatar src={imageUrl} size="xl" />
            <CancelParSm onClick={handleResetImage}>
              <Bold>X</Bold>
            </CancelParSm>
          </ImageDisplayWrapper>
        )}
      </FileInputContents>
    </FieldWrapper>
  );
};
