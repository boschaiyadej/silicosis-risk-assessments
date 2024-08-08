import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  setRiskLevel,
  calculateRiskLevel,
  resetRiskLevel,
} from "../../redux/slices/riskSlice";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  InputGroup,
  InputRightAddon,
  FormErrorMessage,
  Tabs,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { diseaseOptions, separationOptions, positionOptions } from "../Option";
import RiskResult from "./RiskResult";
import NameFieldsModal from "./NameFieldsModal";
import { useNavigate } from "react-router-dom";

const API_CREATE_RISK = "http://localhost:5000/api/risk/";

function RiskAssessmentsForm() {
  const dispatch = useDispatch();
  const [position, setPosition] = useState(0);
  const [silicaDust, setSilicaDust] = useState();
  const [workingHours, setWorkingHours] = useState();
  const [underlyingDiseases, setUnderlyingDiseases] = useState(0);
  const [residenceSeparation, setResidenceSeparation] = useState(0);
  const [invalidData, setInvalidData] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isNameFieldsModalOpen, setIsNameFieldsModalOpen] = useState(false);
  const [isNameNotFound, setIsNameNotFound] = useState(false);

  const riskLevel = useSelector((state) => state.risk.riskLevel);
  const riskScore = useSelector((state) => state.risk.riskScore);

  const navigate = useNavigate();

  useEffect(() => {
    const selectedPosition = positionOptions.find(
      (option) => option.value === position
    );
    if (selectedPosition) {
      setSilicaDust(selectedPosition.silica || "");
      dispatch(
        setRiskLevel({
          name: "silicaDust",
          value: selectedPosition.silica || 0,
        })
      );
    }
  }, [position, dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "position":
        setPosition(value);
        break;
      case "silicaDust":
        setSilicaDust(value);
        break;
      case "workingHours":
        setWorkingHours(value);
        break;
      case "underlyingDiseases":
        setUnderlyingDiseases(value);
        break;
      case "residenceSeparation":
        setResidenceSeparation(value);
        break;
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setInvalidData(true);
    if (canSubmit()) {
      dispatch(setRiskLevel({ name: "position", value: position }));
      dispatch(setRiskLevel({ name: "silicaDust", value: silicaDust }));
      dispatch(setRiskLevel({ name: "workingHours", value: workingHours }));
      dispatch(
        setRiskLevel({ name: "underlyingDiseases", value: underlyingDiseases })
      );
      dispatch(
        setRiskLevel({
          name: "residenceSeparation",
          value: residenceSeparation,
        })
      );
      dispatch(calculateRiskLevel());
      setTabIndex(1);
    }
  };

  const handleReset = () => {
    setPosition(0);
    setSilicaDust("");
    setWorkingHours("");
    setUnderlyingDiseases(0);
    setResidenceSeparation(0);
    setFirstName("");
    setLastName("");
    setInvalidData(false);
    setTabIndex(0);
    dispatch(resetRiskLevel());
  };

  const toggleNameModals = () => {
    setIsNameFieldsModalOpen(!isNameFieldsModalOpen);
  };

  const canSubmit = () => {
    return (
      position &&
      silicaDust > 0 &&
      workingHours > 0 &&
      underlyingDiseases &&
      residenceSeparation
    );
  };

  const handlePostRisk = async () => {
    const data = {
      position,
      silicaDust,
      workingHours,
      underlyingDiseases,
      residenceSeparation,
      riskScore,
      riskLevel,
      firstName,
      lastName,
    };

    try {
      const response = await axios.post(API_CREATE_RISK, data);
      setIsNameFieldsModalOpen(false);
      setIsNameNotFound(false);
      handleReset();
      navigate("/");
    } catch {
      setIsNameNotFound(true);
    }
  };

  const closeNameFieldsModal = () => {
    setIsNameFieldsModalOpen(false);
    setFirstName("");
    setLastName("");
    setIsNameNotFound(false);
  };

  return (
    <>
      <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)}>
        <TabPanels>
          <TabPanel>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="position" isInvalid={invalidData && !position}>
                  <FormLabel>ตำแหน่งงาน</FormLabel>
                  <Select
                    name="position"
                    value={position}
                    onChange={handleChange}
                  >
                    {positionOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  {invalidData && !position && (
                    <FormErrorMessage>กรุณาเลือกตำแหน่งงาน</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl
                  id="silica-dust"
                  isInvalid={invalidData && silicaDust <= 0}
                >
                  <FormLabel>ความเข้มข้นฝุ่นซิลิกา</FormLabel>
                  <InputGroup>
                    <Input
                      type="number"
                      name="silicaDust"
                      step="0.001"
                      min="0.001"
                      value={silicaDust}
                      onChange={handleChange}
                      placeholder="ความเข้มข้นฝุ่นซิลิกา"
                    />
                    <InputRightAddon>
                      mg/m<sup>3</sup>
                    </InputRightAddon>
                  </InputGroup>
                  {invalidData && silicaDust <= 0 && (
                    <FormErrorMessage>
                      ความเข้มข้นฝุ่นซิลิกาต้องมากกว่า 0
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl
                  id="working-hours"
                  isInvalid={invalidData && workingHours <= 0}
                >
                  <FormLabel>ชั่วโมงการทำงานต่อวัน</FormLabel>
                  <InputGroup>
                    <Input
                      type="number"
                      name="workingHours"
                      step={1}
                      min={1}
                      max={24}
                      value={workingHours}
                      onChange={handleChange}
                      placeholder="ชั่วโมงการทำงานต่อวัน"
                    />
                    <InputRightAddon>ชั่วโมง</InputRightAddon>
                  </InputGroup>
                  {invalidData && workingHours <= 0 && (
                    <FormErrorMessage>
                      จำนวนชั่วโมงการทำงานต้องมากกว่า 0
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl
                  id="underlying-diseases"
                  isInvalid={invalidData && !underlyingDiseases}
                >
                  <FormLabel>การมีโรคประจำตัว</FormLabel>
                  <Select
                    name="underlyingDiseases"
                    value={underlyingDiseases}
                    onChange={handleChange}
                  >
                    {diseaseOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  {invalidData && !underlyingDiseases && (
                    <FormErrorMessage>
                      กรุณาเลือกการมีโรคประจำตัว
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl
                  id="residence-separation"
                  isInvalid={invalidData && !residenceSeparation}
                >
                  <FormLabel>ลักษณะสถานที่ทำงาน</FormLabel>
                  <Select
                    name="residenceSeparation"
                    value={residenceSeparation}
                    onChange={handleChange}
                  >
                    {separationOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  {invalidData && !residenceSeparation && (
                    <FormErrorMessage>
                      กรุณาเลือกลักษณะสถานที่ทำงาน
                    </FormErrorMessage>
                  )}
                </FormControl>

                <button
                  type="submit"
                  className={`bg-accent mt-4 text-accent-content px-4 py-2 rounded hover:bg-accent-light disabled:bg-gray-300`}
                  disabled={!canSubmit()}
                >
                  ประเมินความเสี่ยงโรคปอดฝุ่นหินทราย
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-error text-error-content px-4 py-2 rounded hover:bg-error-light"
                >
                  ล้างข้อมูล
                </button>
              </Stack>
            </form>
          </TabPanel>

          <TabPanel>
            <RiskResult />
            <div className="mt-4 flex justify-between">
              <button
                type="button"
                onClick={handleReset}
                className="bg-error text-error-content px-4 py-2 rounded hover:bg-error-light"
              >
                ประเมินอีกครั้ง
              </button>
              <button
                type="button"
                onClick={toggleNameModals}
                className="bg-accent text-accent-content px-4 py-2 rounded hover:bg-accent-light"
              >
                บันทึกผลการประเมิน
              </button>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Name Fields Modal */}
      <NameFieldsModal
        isOpen={isNameFieldsModalOpen}
        onClose={closeNameFieldsModal}
        onConfirm={handlePostRisk}
        firstName={firstName}
        lastName={lastName}
        onChange={handleChange}
        isNameNotFound={isNameNotFound}
      />
    </>
  );
}

export default RiskAssessmentsForm;
