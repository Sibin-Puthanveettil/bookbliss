import React, { useState } from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const ProfileCard = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
  display: flex;
  flex-direction: column;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`;

const AvatarContainer = styled.div`
  margin-right: 32px;
  position: relative;
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
`;

const AvatarOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const AvatarUploadInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const AvatarUploadIcon = styled.i`
  color: #fff;
  font-size: 24px;
`;

const NameAndDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Name = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Email = styled.p`
  color: #666;
  margin-bottom: 24px;
`;

const Button = styled.button`
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-self: flex-start;

  &:hover {
    background-color: #111;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

const Section = styled.div`
  margin-top: 32px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #333;
  }
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ModalInput = styled.input`
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const ModalTextarea = styled.textarea`
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
`;

const ModalButton = styled.button`
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-self: flex-end;

  &:hover {
    background-color: #111;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

const ProfilePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);

  const handleEditProfile = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAvatarUpload = (event) => {
    setAvatarFile(event.target.files[0]);
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileHeader>
          <AvatarContainer>
            <Avatar src={avatarFile ? URL.createObjectURL(avatarFile) : "https://img.freepik.com/premium-photo/beautiful-anime-woman-passport-size-pic_685680-483.jpg"} alt="Profile Avatar" />
            <AvatarOverlay>
              <AvatarUploadInput type="file" id="avatar-upload" name="avatar" onChange={handleAvatarUpload} />
              <AvatarUploadIcon className="fas fa-upload"></AvatarUploadIcon>
            </AvatarOverlay>
          </AvatarContainer>
          <NameAndDetailsContainer>
            <Name>PRAVEEN R</Name>
            <Email>praveen@gmail.com</Email>
            <Button onClick={handleEditProfile}>Edit Profile</Button>
          </NameAndDetailsContainer>
        </ProfileHeader>
        <Section>
          <SectionTitle>About</SectionTitle>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut risus in augue
            luctus venenatis.
          </p>
        </Section>
        <Section>
          <SectionTitle>Contact</SectionTitle>
          <p>
            Phone: 123-456-7890
            <br />
            Address: 123 Main St, Anytown USA
          </p>
        </Section>
      </ProfileCard>
      {showModal && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            <ModalTitle>Edit Profile</ModalTitle>
            <ModalForm>
              <ModalInput type="text" id="name" name="name" defaultValue="PRAVEEN R" />
              <ModalInput type="email" id="email" name="email" defaultValue="praveen@gmail.com" />
              <ModalTextarea id="about" name="about">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut risus in augue
                luctus venenatis.
              </ModalTextarea>
              <ModalInput type="tel" id="phone" name="phone" defaultValue="123-456-7890" />
              <ModalInput type="text" id="address" name="address" defaultValue="123 Main St, Anytown USA" />
              <ModalButton type="submit">Save Changes</ModalButton>
            </ModalForm>
          </ModalContent>
        </Modal>
      )}
    </ProfileContainer>
  );
};

export default ProfilePage;


