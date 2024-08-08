import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

const SuccessModal = ({ isOpen, onClose, message, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>สำเร็จ</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>{message}</p>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onConfirm}>
            ปิด
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;
