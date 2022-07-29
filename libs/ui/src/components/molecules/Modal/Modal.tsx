import {
  RiCloseFill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiCloseCircleFill,
} from 'react-icons/ri';

import { Label, Link, Input, Button } from '../../atoms';
import {
  ModalRoot,
  ModalTrigger,
  ModalClose,
  ModalPortal,
  StyledModalContent,
  StyledModalDescription,
  StyledModalOverlay,
  StyledModalTitle,
  CloseIcon,
  Fieldset,
  Flex,
} from './Modal.styles';

function Content({ children, ...props }: any) {
  return (
    <ModalPortal>
      <StyledModalOverlay />
      <StyledModalContent {...props}>{children}</StyledModalContent>
    </ModalPortal>
  );
}

export const Modal = (props: any) => {
  const {
    title,
    description,
    type,
    defaultOpen,
    open,
    onOpenChange,
    duration,
    label,
    hotkey,
    toastType = 'default',
    ariaLabelClose = 'Close',
    toastLinks,
  } = props;

  return (
    <ModalRoot>
      <ModalTrigger asChild>
        <Button>Edit profile</Button>
      </ModalTrigger>
      <Content>
        <StyledModalTitle>Edit profile</StyledModalTitle>
        <StyledModalDescription>
          Make changes to your profile here. Click save when you're done.
        </StyledModalDescription>
        <Fieldset>
          <Label id="name">Name</Label>
          <Input id="name" defaultValue="Pedro Duarte" />
        </Fieldset>
        <Fieldset>
          <Label id="username">Username</Label>
          <Input id="username" defaultValue="@peduarte" />
        </Fieldset>
        <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
          <ModalClose asChild>
            <Button>Save changes</Button>
          </ModalClose>
        </Flex>
        <ModalClose asChild>
          <CloseIcon>
            <RiCloseFill aria-hidden />
          </CloseIcon>
        </ModalClose>
      </Content>
    </ModalRoot>
  );
};
