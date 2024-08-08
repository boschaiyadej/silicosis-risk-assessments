import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NameFieldsModal = ({
  isOpen,
  onClose,
  onConfirm,
  firstName,
  lastName,
  onChange,
  isNameNotFound,
}) => {
  const canSubmit = () => {
    return firstName && lastName;
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="mx-2">
        <ModalHeader>กรอกข้อมูลชื่อและนามสกุล</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="firstName" mb={4}>
            <FormLabel>ชื่อ</FormLabel>
            <Input
              type="text"
              name="firstName"
              value={firstName}
              onChange={onChange}
              placeholder="ชื่อผู้ได้รับการประเมิน"
            />
          </FormControl>
          <FormControl id="lastName">
            <FormLabel>นามสกุล</FormLabel>
            <Input
              type="text"
              name="lastName"
              value={lastName}
              onChange={onChange}
              placeholder="นามสกุลผู้ได้รับการประเมิน"
            />
          </FormControl>
          {isNameNotFound && (
            <div className="text-error mt-3">
              ไม่พบชื่อนามสกุลในระบบ
              <br />
              กรุณาตรวจสอบชื่อนามสกุลอีกครั้ง
              <br />
              หรือลงทะเบียนผู้ประกอบอาชีแกะสลักหิน
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <div className="mt-4 flex gap-3">
            {isNameNotFound && (
              <Link to="/register-worker">
                <button
                  type="button"
                  className="bg-primary text-primary-content px-4 py-2 rounded hover:bg-primary-light"
                >
                  ลงทะเบียน
                </button>
              </Link>
            )}

            <button
              type="button"
              onClick={onConfirm}
              disabled={!canSubmit()}
              className="bg-accent text-accent-content px-4 py-2 rounded hover:bg-accent-light"
            >
              บันทึกผล
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-error text-error-content px-4 py-2 rounded hover:bg-error-light"
            >
              ยกเลิก
            </button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NameFieldsModal;
