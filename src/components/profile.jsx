import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components (same as before)
const ProfileContainer = styled.div`  
  display: flex;  
  flex-direction: column;  
  align-items: center;  
  justify-content: center;  
  min-height: 100vh;  
  background: linear-gradient(135deg, #e0eafc, #cfdef3);  
`;

const ProfileCard = styled.div`  
  width: 100%;  
  max-width: 800px;  
  background-color: #ffffff;  
  border-radius: 16px;  
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);  
  padding: 40px;  
  display: flex;  
  flex-direction: column;  
  transition: transform 0.3s ease;  

  &:hover {  
    transform: translateY(-5px);  
  }  
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
  border: 4px solid #4a90e2;  
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);  
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
  font-size: 32px;  
  font-weight: bold;  
  margin-bottom: 8px;  
  color: #333;  
`;

const Email = styled.p`  
  color: #666;  
  margin-bottom: 24px;  
`;

const AccountAgeBadge = styled.span`  
  background: linear-gradient(145deg, #ee950b, #e4c600);  
  color: white;  
  padding: 5px 10px;  
  border-radius: 12px;  
  font-size: 14px;  
  font-weight: bold;  
  margin-top: 8px;  
  width: 100px;  
  box-shadow: 4px 4px 8px rgba(255, 239, 128, 0.6);  
  display: flex;  
  align-items: center;  
`;

const BadgeSymbol = styled.span`
  margin-right: 5px;  
`;

const Button = styled.button`  
  background-color: #4a90e2;  
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
    background-color: #357ab8;  
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
  font-size: 24px;  
  font-weight: bold;  
  color: #4a90e2;  
  margin-bottom: 8px;  
`;

const Modal = styled.div`  
  position: fixed;  
  top: 0;  
  left: 0;  
  width: 100%;  
  height: 100%;  
  background-color: rgba(0, 0, 0, 0.6);  
  display: flex;  
  justify-content: center;  
  align-items: center;  
  z-index: 1000;  
`;

const ModalContent = styled.div`  
  background-color: #fff;  
  border-radius: 8px;  
  padding: 24px;  
  width: 400px;  
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);  
  position: relative;  
`;

const CloseButton = styled.button`  
  position: absolute;  
  top: 8px;  
  right: 8px;  
  background: none;  
  border: none;  
  font-size: 24px;  
  cursor: pointer;  
`;

const ModalTitle = styled.h3`  
  margin-bottom: 16px;  
  font-size: 24px;  
  color: #4a90e2;  
`;

const ModalForm = styled.form`  
  display: flex;  
  flex-direction: column;  
`;

const ModalInput = styled.input`  
  padding: 12px;  
  border: 1px solid #ccc;  
  border-radius: 4px;  
  font-size: 16px;  
  margin-bottom: 16px;  
  transition: border-color 0.3s ease;  

  &:focus {  
    border-color: #4a90e2;  
    outline: none;  
  }  
`;

const ModalTextarea = styled.textarea`  
  padding: 12px;  
  border: 1px solid #ccc;  
  border-radius: 4px;  
  font-size: 16px;  
  margin-bottom: 16px;  
  resize: vertical;  
  transition: border-color 0.3s ease;  

  &:focus {  
    border-color: #4a90e2;  
    outline: none;  
  }  
`;

const ModalButton = styled.button`  
  background-color: #4a90e2;  
  color: #fff;  
  border: none;  
  border-radius: 4px;  
  padding: 12px;  
  font-size: 16px;  
  cursor: pointer;  
  transition: background-color 0.3s ease, box-shadow 0.3s ease;  
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);  

  &:hover {  
    background-color: #357ab8;  
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
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ProPic, setProfile] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Retrieve customer data from local storage
debugger;
    const customerData = JSON.parse(localStorage.getItem('customerData')) || { customerName: "USER NAME", mobileNumber: "98765XXXXX", profilePic: "https://blogtimenow.com/wp-content/uploads/2014/06/hide-facebook-profile-picture-notification.jpg" }; // 
    if (customerData) {
      const { customerName, mobileNumber, profilePic } = customerData;
      setCustomerName(customerName);
      setPhone(mobileNumber);
      setProfile(profilePic);
      setEmail(''); // Set a default email or retrieve from another source if available
      setAddress(''); // Set a default address or retrieve from another source if available
    }
  }, []);

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
            <Avatar
              src={avatarFile ? URL.createObjectURL(avatarFile) : ProPic}
              alt="Profile Avatar"
            />
            <AvatarOverlay>
              <AvatarUploadInput
                type="file"
                id="avatar-upload"
                name="avatar"
                onChange={handleAvatarUpload}
              />
              <AvatarUploadIcon className="fas fa-upload"></AvatarUploadIcon>
            </AvatarOverlay>
          </AvatarContainer>
          <NameAndDetailsContainer>
            <Name>{customerName || "User Name"}</Name>
            <Email>{email || "user@example.com"}</Email>
            <Button onClick={handleEditProfile}>Edit Profile</Button>
          </NameAndDetailsContainer>
        </ProfileHeader>
        <AccountAgeBadge>
          <BadgeSymbol>★</BadgeSymbol> {/* Badge symbol */}
          Gold User
        </AccountAgeBadge>
        <Section>
          <SectionTitle>About</SectionTitle>
          <p>
            3+ years valuable member, purchased more than 50 books !!!
          </p>
        </Section>
        <Section>
          <SectionTitle>Contact</SectionTitle>
          <p>
            Phone: {phone || "+91 9876543210"}
            <br />
            Address: {address || "123 Main St, Anytown USA"}
          </p>
        </Section>
      </ProfileCard>
      {showModal && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            <ModalTitle>Edit Profile</ModalTitle>
            <ModalForm>
              <ModalInput type="text" id="name" name="name" defaultValue={customerName} />
              <ModalInput type="email" id="email" name="email" defaultValue={email} />
              <ModalTextarea
                id="about"
                name="about"
                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut risus in augue luctus venenatis."
              />
              <ModalInput type="tel" id="phone" name="phone" defaultValue={phone} />
              <ModalInput type="text" id="address" name="address" defaultValue={address} />
              <ModalButton type="submit">Save Changes</ModalButton>
            </ModalForm>
          </ModalContent>
        </Modal>
      )}
    </ProfileContainer>
  );
};

export default ProfilePage;


