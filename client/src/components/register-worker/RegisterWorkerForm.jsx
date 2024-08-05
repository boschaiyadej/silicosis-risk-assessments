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
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import {
  diseaseOptions,
  separationOptions,
  positionOptions,
  nationOptions,
} from "../Option";

function RegisterWorkerForm() {
  const dispatch = useDispatch();
  const formValues = useSelector((state) => state.risk);

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

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

    dispatch(calculateRiskLevel());
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

  const nextTab = () => setTabIndex((prevIndex) => prevIndex + 1);
  const prevTab = () => setTabIndex((prevIndex) => prevIndex - 1);

  return (
    <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)}>
      <TabList>
        <Tab>ข้อมูลส่วนบุคคล</Tab>
        <Tab>ข้อมูลการทำงาน</Tab>
        <Tab>ข้อมูลสุขภาพ</Tab>
      </TabList>
      <form onSubmit={handleSubmit}>
        <TabPanels>
          <TabPanel>
            <Stack spacing={4}>
              <FormControl
                as="fieldset"
                id="gender"
                isInvalid={hasSubmitted && !formValues.gender}
              >
                <FormLabel as="legend">เพศ</FormLabel>
                <RadioGroup
                  name="gender"
                  value={formValues.gender || ""}
                  onChange={handleChange}
                >
                  <Stack direction="row">
                    <Radio value="male">ชาย</Radio>
                    <Radio value="female">หญิง</Radio>
                  </Stack>
                </RadioGroup>
                {hasSubmitted && !formValues.gender && (
                  <FormErrorMessage>กรุณาเลือกเพศ</FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="firstName">
                <FormLabel>ชื่อ</FormLabel>
                <Input
                  type="text"
                  name="firstName"
                  value={formValues.firstName || ""}
                  onChange={handleChange}
                  placeholder="ชื่อ"
                />
                {hasSubmitted && !formValues.firstName && (
                  <FormErrorMessage>กรุณากรอกชื่อ</FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="lastName">
                <FormLabel>นามสกุล</FormLabel>
                <Input
                  type="text"
                  name="lastName"
                  value={formValues.lastName || ""}
                  onChange={handleChange}
                  placeholder="นามสกุล"
                />
                {hasSubmitted && !formValues.lastName && (
                  <FormErrorMessage>กรุณากรอกนามสกุล</FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="age">
                <FormLabel>อายุ</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    name="age"
                    step="1"
                    min="1"
                    value={formValues.age || ""}
                    onChange={handleChange}
                    placeholder="อายุ"
                  />
                  <InputRightAddon>ปี</InputRightAddon>
                </InputGroup>
                {hasSubmitted && formValues.age <= 0 && (
                  <FormErrorMessage>อายุต้องมากกว่า 0</FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="idNumber">
                <FormLabel>เลขบัตรประชาชนหรือ Passport</FormLabel>
                <Input
                  type="text"
                  name="idNumber"
                  value={formValues.idNumber || ""}
                  onChange={handleChange}
                  placeholder="เลขบัตรประชาชนหรือ Passport"
                />
              </FormControl>

              <FormControl
                id="residence-separation"
                isInvalid={hasSubmitted && !formValues.residenceSeparation}
              >
                <FormLabel>สัญชาติ</FormLabel>
                <Select
                  name="residenceSeparation"
                  value={formValues.residenceSeparation || ""}
                  onChange={handleChange}
                >
                  {nationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
                {hasSubmitted && !formValues.residenceSeparation && (
                  <FormErrorMessage>กรุณาเลือกสัญชาติ</FormErrorMessage>
                )}
              </FormControl>
              <button
                type="tab"
                onClick={nextTab}
                className={`bg-primary mt-4 text-primary-content px-4 py-2 rounded hover:bg-primary-light disabled:bg-gray-300`}
              >
                ถัดไป
              </button>
            </Stack>
          </TabPanel>

          {/* tab ข้อมูลการทำงาน */}
          <TabPanel>
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
                id="working-"
                isInvalid={hasSubmitted && formValues.workingWeeks <= 0}
              >
                <FormLabel>วันทำงานต่อสัปดาห์</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    name="workingWeeks"
                    step={1}
                    min={1}
                    max={7}
                    value={formValues.workingWeeks || ""}
                    onChange={handleChange}
                    placeholder="วันทำงานต่อสัปดาห์"
                  />
                  <InputRightAddon>วัน</InputRightAddon>
                </InputGroup>
                {hasSubmitted && formValues.workingHours <= 0 && (
                  <FormErrorMessage>
                    จำนวนชั่วโมงการทำงานต้องมากกว่า 0
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                id="working-years"
                isInvalid={hasSubmitted && formValues.workingYears <= 0}
              >
                <FormLabel>ประสบการณ์ทำอาชีพแกะสลักหิน</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    name="workingYears"
                    step={1}
                    min={1}
                    max={100}
                    value={formValues.workingYears || ""}
                    onChange={handleChange}
                    placeholder="ประสบการณ์ทำงาน"
                  />
                  <InputRightAddon>ปี</InputRightAddon>
                </InputGroup>
                {hasSubmitted && formValues.workingYears <= 0 && (
                  <FormErrorMessage>
                    ประสบการณ์การทำงานต้องมากกว่า 0
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="workAddress">
                <FormLabel>ชื่อสถานที่ทำงาน</FormLabel>
                <Input
                  type="text"
                  value={formValues.workAddress || ""}
                  onChange={handleChange}
                  placeholder="ชื่อสถานที่ทำงาน"
                />
                {hasSubmitted && !formValues.workAddress && (
                  <FormErrorMessage>กรุณากรอกชื่อสถานที่ทำงาน</FormErrorMessage>
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

              <div className="flex justify-between">
                <button
                  type="tab"
                  onClick={prevTab}
                  className={`bg-accent mt-4 text-accent-content px-4 py-2 rounded hover:bg-accent-light disabled:bg-gray-300`}
                >
                  ย้อนกลับ
                </button>
                <button
                  type="tab"
                  onClick={nextTab}
                  className={`bg-primary mt-4 text-primary-content px-4 py-2 rounded hover:bg-primary-light disabled:bg-gray-300`}
                >
                  ถัดไป
                </button>
              </div>
            </Stack>
          </TabPanel>

          {/* tab ข้อมูลสุขภาพ */}
          <TabPanel>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>น้ำหนัก</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    name="bodyWeight"
                    step="1"
                    min="1"
                    value={formValues.bodyWeight || ""}
                    onChange={handleChange}
                    placeholder="น้ำหนัก"
                  />
                  <InputRightAddon>กิโลกรัม</InputRightAddon>
                </InputGroup>
                {hasSubmitted && formValues.bodyWeight <= 0 && (
                  <FormErrorMessage>น้ำหนักต้องมากกว่า 0</FormErrorMessage>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>ส่วนสูง</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    name="bodyHeight"
                    step="1"
                    min="1"
                    value={formValues.bodyHeight || ""}
                    onChange={handleChange}
                    placeholder="ส่วนสูง"
                  />
                  <InputRightAddon>เซนติเมตร</InputRightAddon>
                </InputGroup>
                {hasSubmitted && formValues.bodyHeight <= 0 && (
                  <FormErrorMessage>
                    น้ำหนักร่างกายต้องมากกว่า 0
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

              <button
                type="tab"
                onClick={prevTab}
                className={`bg-accent mt-4 text-accent-content px-4 py-2 rounded hover:bg-accent-light disabled:bg-gray-300`}
              >
                ย้อนกลับ
              </button>
              <button
                type="submit"
                className={`bg-accent text-accent-content px-4 py-2 rounded hover:bg-accent-light disabled:bg-gray-300`}
                disabled={!canSubmit()}
              >
                บันทึกข้อมูลและประเมินความเสี่ยง
                <br />
                โรคปอดฝุ่นหินทราย
              </button>
            </Stack>
          </TabPanel>
        </TabPanels>
      </form>
    </Tabs>
  );
}

export default RegisterWorkerForm;
