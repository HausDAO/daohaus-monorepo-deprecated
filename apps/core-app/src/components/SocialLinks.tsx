import styled, { useTheme } from 'styled-components';
import {
  RiDiscordFill,
  RiExternalLinkFill,
  RiGithubFill,
  RiLinksFill,
  RiTelegramFill,
  RiTwitterFill,
} from 'react-icons/ri';

import { Link, ParMd, Theme } from '@daohaus/ui';
import { IconType } from 'react-icons';

const SocialLinkLabel = styled(ParMd)`
  color: ${({ theme }: { theme: Theme }) => theme.select.text};
`;

// TODO: color the icons
const SocialLinkContainer = styled(Link)`
  :hover {
    text-decoration: none;
  }
`;

type SocialLinkProps = {
  label: string;
  icon: IconType;
  href: string;
};
export const SocialLink = ({ label, icon, href }: SocialLinkProps) => {
  return (
    <SocialLinkContainer
      href={href}
      linkType="external"
      Icon={icon}
      className="poopin"
    >
      {icon}
      <SocialLinkLabel>{label}</SocialLinkLabel>
    </SocialLinkContainer>
  );
};

type SocialLinksProps = {
  links: { [field: string]: string };
};

const LinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1rem;
  margin: 1.3rem 0rem 2rem 0;
`;

export const SocialLinks = ({ links }: SocialLinksProps) => {
  const theme = useTheme();
  return (
    <LinksContainer>
      <>
        {links.discord && (
          <SocialLink
            label="Discord"
            icon={RiDiscordFill}
            href={links.discord}
          />
        )}
        {links.twitter && (
          <SocialLink
            label="Twitter"
            icon={RiTwitterFill}
            // icon={<RiTwitterFill color={theme.select.text} />}

            href={links.twitter}
          />
        )}
        {links.website && (
          <SocialLink label="Web" icon={RiLinksFill} href={links.website} />
        )}
        {links.github && (
          <SocialLink label="Github" icon={RiGithubFill} href={links.github} />
        )}
        {links.telegram && (
          <SocialLink
            label="Telegram"
            icon={RiTelegramFill}
            href={links.telegram}
          />
        )}
        {links.other && (
          <SocialLink
            label="Links"
            icon={RiExternalLinkFill}
            href={links.other}
          />
        )}
      </>
    </LinksContainer>
  );
};
