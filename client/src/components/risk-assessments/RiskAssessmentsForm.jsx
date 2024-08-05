import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
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
import { Link } from "react-router-dom";

function RiskAssessmentsForm() {
  const dispatch = useDispatch();
  const formValues = useSelector((state) => state.risk);

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [showNameFields, setShowNameFields] = useState(false);

  const getSilicaConcentration = (position) => {
    const selectedOption = positionOptions.find(
      (option) => option.value === parseInt(position)
    );
    return selectedOption ? selectedOption.silica : "";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "position") {
      const silicaConcentration = getSilicaConcentration(value);
      dispatch(
        setRiskLevel({ name: "silicaDust", value: silicaConcentration })
      );
    }
    dispatch(setRiskLevel({ name, value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setHasSubmitted(true);

    if (formValues.silicaDust <= 0 || formValues.workingHours <= 0) {
      alert("Silica Dust and Working Hours must be greater than 0.");
      return;
    }

    dispatch(calculateRiskLevel());
    setTabIndex(1);
  };

  const handleReset = () => {
    dispatch(resetRiskLevel());
    setHasSubmitted(false);
    setTabIndex(0);
    setShowNameFields(false);
  };

  const toggleNameFields = () => {
    setShowNameFields(!showNameFields);
  };

  const handleFormValuesLog = () => {
    console.log({
      ...formValues,
    });
  };

  const canSubmit = () => {
    return (
      formValues.position &&
      formValues.silicaDust > 0 &&
      formValues.workingHours > 0 &&
      formValues.underlyingDiseases &&
      formValues.residenceSeparation
    );
  };

  return (
    <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)}>
      <TabPanels>
        <TabPanel>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl
                id="position"
                isInvalid={hasSubmitted && !formValues.position}
              >
                <FormLabel>ตำแหน่งงาน</FormLabel>
                <Select
                  name="position"
                  value={formValues.position || ""}
                  onChange={handleChange}
                >
                  {positionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
                {hasSubmitted && !formValues.position && (
                  <FormErrorMessage>กรุณาเลือกตำแหน่งงาน</FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                id="silica-dust"
                isInvalid={hasSubmitted && formValues.silicaDust <= 0}
              >
                <FormLabel>ความเข้มข้นฝุ่นซิลิกา</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    name="silicaDust"
                    step="0.001"
                    min="0.001"
                    value={formValues.silicaDust || ""}
                    onChange={handleChange}
                    placeholder="ความเข้มข้นฝุ่นซิลิกา"
                  />
                  <InputRightAddon>
                    mg/m<sup>3</sup>
                  </InputRightAddon>
                </InputGroup>
                {hasSubmitted && formValues.silicaDust <= 0 && (
                  <FormErrorMessage>
                    ความเข้มข้นฝุ่นซิลิกาต้องมากกว่า 0
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                id="working-hours"
                isInvalid={hasSubmitted && formValues.workingHours <= 0}
              >
                <FormLabel>ชั่วโมงการทำงานต่อวัน</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    name="workingHours"
                    step={1}
                    min={1}
                    max={24}
                    value={formValues.workingHours || ""}
                    onChange={handleChange}
                    placeholder="ชั่วโมงการทำงานต่อวัน"
                  />
                  <InputRightAddon>ชั่วโมง</InputRightAddon>
                </InputGroup>
                {hasSubmitted && formValues.workingHours <= 0 && (
                  <FormErrorMessage>
                    จำนวนชั่วโมงการทำงานต้องมากกว่า 0
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                id="underlying-diseases"
                isInvalid={hasSubmitted && !formValues.underlyingDiseases}
              >
                <FormLabel>การมีโรคประจำตัว</FormLabel>
                <Select
                  name="underlyingDiseases"
                  value={formValues.underlyingDiseases || ""}
                  onChange={handleChange}
                >
                  {diseaseOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
                {hasSubmitted && !formValues.underlyingDiseases && (
                  <FormErrorMessage>
                    กรุณาเลือกการมีโรคประจำตัว
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                id="residence-separation"
                isInvalid={hasSubmitted && !formValues.residenceSeparation}
              >
                <FormLabel>ลักษณะสถานที่ทำงาน</FormLabel>
                <Select
                  name="residenceSeparation"
                  value={formValues.residenceSeparation || ""}
                  onChange={handleChange}
                >
                  {separationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
                {hasSubmitted && !formValues.residenceSeparation && (
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
              onClick={toggleNameFields}
              className="bg-accent text-accent-content px-4 py-2 rounded hover:bg-accent-light"
            >
              {showNameFields ? "ยกเลิก" : "บันทึกผลการประเมิน"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-error text-error-content px-4 py-2 rounded hover:bg-error-light"
            >
              ประเมินอีกครั้ง
            </button>
          </div>
          {showNameFields ? (
            <Stack spacing={4} className="mt-4">
              <FormControl id="firstName">
                <FormLabel>ชื่อ</FormLabel>
                <Input
                  type="text"
                  value={formValues.firstName || ""}
                  onChange={handleChange}
                  placeholder="ชื่อผู้ได้รับการประเมิน"
                />
                {hasSubmitted && !formValues.firstName && (
                  <FormErrorMessage>กรุณากรอกชื่อ</FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="lastName">
                <FormLabel>นามสกุล</FormLabel>
                <Input
                  type="text"
                  value={formValues.lastName || ""}
                  onChange={handleChange}
                  placeholder="นามสกุลผู้ได้รับการประเมิน"
                />{" "}
                {hasSubmitted && !formValues.lastName && (
                  <FormErrorMessage>กรุณากรอกนามสกุล</FormErrorMessage>
                )}
              </FormControl>

              <button
                type="button"
                onClick={handleFormValuesLog}
                className="bg-accent text-accent-content px-4 py-2  rounded hover:bg-accent-light"
              >
                บันทึกข้อมูล
              </button>
            </Stack>
          ) : (
            <Link to="/">
              <button
                type="button"
                className="w-full my-2 bg-primary text-primary-content px-4 py-2 rounded hover:bg-primary-light"
              >
                กลับสู่หน้าหลัก
              </button>
            </Link>
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default RiskAssessmentsForm;
