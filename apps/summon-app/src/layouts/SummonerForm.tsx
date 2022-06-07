import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';

import {
  Bold,
  Button,
  Divider,
  H1,
  Input,
  ParMd,
  TemporaryLink,
} from '@daohaus/ui';

import { AdvancedSegment } from '../layouts/AdvancedSegment';
import { MembersSegment } from '../layouts/MemberSegment';
import { ShamanSegment } from '../layouts/ShamanSegment';
import { StakeTokensSegment } from '../layouts/StakeTokenSegment';
import { TimingSegment } from '../layouts/TimingSegment';
import { isArray, isString } from '@daohaus/common-utilities';

const INCORRECT_FORMAT = {
  error: true,
  message: 'Incorrect formatting',
};

const parseShamans = (response: unknown) => {
  if (response === '') return '';
  if (!isString(response)) return INCORRECT_FORMAT;

  const shamanEntities = response
    .split(/[\n|,]/)
    .map((str) => str.trim())
    .filter(Boolean);

  if (!isArray(shamanEntities)) return INCORRECT_FORMAT;

  return shamanEntities.reduce(
    (acc, shaman) => {
      const splitString = shaman.trim().split(' ');
      const newShamanAddress = splitString[0];
      const newShamanPermission = splitString[1];

      return {
        shamanAddresses: [...acc.shamanAddresses, newShamanAddress],
        shamanPermissions: [...acc.shamanPermissions, newShamanPermission],
      };
    },
    {
      shamanAddresses: [] as string[],
      shamanPermissions: [] as string[],
    }
  );
};

const Main = styled.main`
  display: flex;
  justify-content: center;
  margin-top: 4rem;

  .form-column {
    width: 58rem;
    height: 2rem;
  }
  .title-section {
    margin-bottom: 16rem;
  }
  .top-divider {
    margin-top: 3rem;
    margin-bottom: 2.4rem;
  }
`;

export const SummonerForm = () => {
  const methods = useForm();
  const {
    formState: { errors },
  } = methods;
  const handleFormSubmit = async (formValues: Record<string, unknown>) => {
    const { shamans } = formValues;
    const shamanData = parseShamans(shamans);
    // const memberData = parseMembers(members);
  };

  // useEffect(() => {
  //   console.log('errors', errors);
  // }, [errors]);

  return (
    <Main>
      <FormProvider {...methods}>
        <form
          className="form-column"
          onSubmit={methods.handleSubmit(handleFormSubmit)}
        >
          <div className="title-section">
            <H1>
              <Bold>Summon a Baal.</Bold>
            </H1>
            <ParMd>
              Visit <TemporaryLink>Docs</TemporaryLink> for Help
            </ParMd>
          </div>
          <div>
            <Input id="daoName" full placeholder="Braid Guild" />
            <Divider className="top-divider" />
          </div>
          <StakeTokensSegment />
          <TimingSegment />
          <AdvancedSegment />
          <ShamanSegment />
          <MembersSegment />
          <Button fullWidth lg type="submit">
            Summon DAO
          </Button>
        </form>
      </FormProvider>
    </Main>
  );
};
