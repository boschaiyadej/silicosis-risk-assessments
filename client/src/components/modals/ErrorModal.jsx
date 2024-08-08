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

const ErrorModal = ({ isOpen, onClose, message, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="mx-3">
        <ModalHeader>ข้อผิดพลาด</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>{message}</p>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={onConfirm}>
            ปิด
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ErrorModal;
