import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

function RegisterWorkerForm() {
  const dispatch = useDispatch();
  const riskLevel = useSelector((state) => state.risk.riskLevel);
  const riskScore = useSelector((state) => state.risk.riskScore);

  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useState(0);
  const nextTab = () => setTabIndex((prevIndex) => prevIndex + 1);
  const prevTab = () => setTabIndex((prevIndex) => prevIndex - 1);

  // tab ข้อมูลทั่วไป
  const [gender, setGender] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [nation, setNation] = useState("");

  // tab ข้อมูลการทำงาน
  const [position, setPosition] = useState(0);
  const [silicaDust, setSilicaDust] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [workingWeeks, setWorkingWeeks] = useState("");
  const [workingYears, setWorkingYears] = useState("");
  const [workAddress, setWorkAddress] = useState("");
  const [residenceSeparation, setResidenceSeparation] = useState(0);

  // tab ข้อมูลสุขภาพ
  const [bodyWeight, setBodyWeight] = useState();
  const [bodyHeight, setBodyHeight] = useState();
  const [bmi, setBmi] = useState();
  const [underlyingDiseases, setUnderlyingDiseases] = useState(0);

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

  useEffect(() => {
    if (bodyWeight && bodyHeight) {
      const weight = parseFloat(bodyWeight);
      const height = parseFloat(bodyHeight) / 100;
      if (height > 0) {
        const calculatedBmi = (weight / (height * height)).toFixed(2);
        setBmi(calculatedBmi);
      }
    } else {
      setBmi("");
    }
  }, [bodyWeight, bodyHeight]);

  const getBmiCategory = (bmi) => {
    if (!bmi) return { color: "gray", label: "Not Calculated" };
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5)
      return { color: "blue.300", label: "น้ำหนักต่ำกว่าเกณฑ์" };
    if (bmiValue < 23) return { color: "green.300", label: "สมส่วน" };
    if (bmiValue < 25) return { color: "yellow.300", label: "น้ำหนักเกิน" };
    if (bmiValue < 30) return { color: "orange.300", label: "โรคอ้วน" };
    return { color: "red.300", label: "โรคอ้วนอันตราย" };
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "age":
        setAge(value);
        break;
      case "idNumber":
        setIdNumber(value);
        break;
      case "nation":
        setNation(value);
        break;
      case "position":
        setPosition(value);
        break;
      case "silicaDust":
        setSilicaDust(value);
        break;
      case "workingHours":
        setWorkingHours(value);
        break;
      case "workingWeeks":
        setWorkingWeeks(value);
        break;
      case "workingYears":
        setWorkingYears(value);
        break;
      case "workAddress":
        setWorkAddress(value);
        break;
      case "bodyWeight":
        setBodyWeight(value);
        break;
      case "bodyHeight":
        setBodyHeight(value);
        break;
      case "underlyingDiseases":
        setUnderlyingDiseases(value);
        break;
      case "bmi":
        setBmi(value);
        break;
      case "residenceSeparation":
        setResidenceSeparation(value);
        break;

      default:
        break;
    }
  };

  const handleGenderChange = (value) => {
    setGender(value);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      gender,
      firstName,
      lastName,
      age,
      idNumber,
      nation,
      position,
      silicaDust,
      workingHours,
      workingWeeks,
      workingYears,
      workAddress,
      residenceSeparation,
      bodyWeight,
      bodyHeight,
      bmi,
      underlyingDiseases,
    };

    console.log("Form Data:", formData);
  };

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
              <FormControl as="fieldset" id="gender">
                <FormLabel as="legend">เพศ</FormLabel>
                <RadioGroup
                  name="gender"
                  value={gender}
                  onChange={handleGenderChange}
                >
                  <Stack direction="row">
                    <Radio value="male">ชาย</Radio>
                    <Radio value="female">หญิง</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl id="firstName">
                <FormLabel>ชื่อ</FormLabel>
                <Input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                  placeholder="ชื่อ"
                />
              </FormControl>

              <FormControl id="lastName">
                <FormLabel>นามสกุล</FormLabel>
                <Input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  placeholder="นามสกุล"
                />
              </FormControl>

              <FormControl id="age">
                <FormLabel>อายุ</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    name="age"
                    step="1"
                    min="1"
                    value={age}
                    onChange={handleChange}
                    placeholder="อายุ"
                  />
                  <InputRightAddon>ปี</InputRightAddon>
                </InputGroup>
              </FormControl>

              <FormControl id="idNumber">
                <FormLabel>เลขบัตรประชาชนหรือ Passport</FormLabel>
                <Input
                  type="text"
                  name="idNumber"
                  value={idNumber}
                  onChange={handleChange}
                  placeholder="เลขบัตรประชาชนหรือ Passport"
                />
              </FormControl>

              <FormControl id="residence-separation">
                <FormLabel>สัญชาติ</FormLabel>
                <Select name="nation" value={nation} onChange={handleChange}>
                  {nationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
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
              <FormControl id="position">
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
              </FormControl>

              <FormControl id="silica-dust">
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
              </FormControl>

              <FormControl id="working-hours">
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
              </FormControl>
              <FormControl id="working-weeks">
                <FormLabel>วันทำงานต่อสัปดาห์</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    name="workingWeeks"
                    step={1}
                    min={1}
                    max={7}
                    value={workingWeeks}
                    onChange={handleChange}
                    placeholder="วันทำงานต่อสัปดาห์"
                  />
                  <InputRightAddon>วัน</InputRightAddon>
                </InputGroup>
              </FormControl>

              <FormControl id="working-years">
                <FormLabel>ประสบการณ์ทำอาชีพแกะสลักหิน</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    name="workingYears"
                    step={1}
                    min={1}
                    max={100}
                    value={workingYears}
                    onChange={handleChange}
                    placeholder="ประสบการณ์ทำงาน"
                  />
                  <InputRightAddon>ปี</InputRightAddon>
                </InputGroup>
              </FormControl>

              <FormControl id="workAddress">
                <FormLabel>ที่อยู่สถานที่ทำงาน</FormLabel>
                <Input
                  type="text"
                  name="workAddress"
                  value={workAddress}
                  onChange={handleChange}
                  placeholder="กรอกที่อยู่สถานที่ทำงาน"
                />
              </FormControl>

              <FormControl id="residence-separation">
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
              <FormControl id="body-weight">
                <FormLabel>น้ำหนัก</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    name="bodyWeight"
                    step="1"
                    min="1"
                    value={bodyWeight}
                    onChange={handleChange}
                    placeholder="น้ำหนัก"
                  />
                  <InputRightAddon>กิโลกรัม</InputRightAddon>
                </InputGroup>
              </FormControl>

              <FormControl id="body-height">
                <FormLabel>ส่วนสูง</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    name="bodyHeight"
                    step="1"
                    min="1"
                    value={bodyHeight}
                    onChange={handleChange}
                    placeholder="ส่วนสูง"
                  />
                  <InputRightAddon>เซนติเมตร</InputRightAddon>
                </InputGroup>
              </FormControl>

              <FormControl id="bmi">
                <FormLabel>ดัชนีมวลกาย</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    name="bmi"
                    step="1"
                    min="1"
                    value={bmi}
                    onChange={handleChange}
                    placeholder="ดัชนีมวลกาย"
                  />
                  <InputRightAddon
                    bg={getBmiCategory(bmi).color}
                    className="text-black"
                  >
                    {getBmiCategory(bmi).label}
                  </InputRightAddon>
                </InputGroup>
              </FormControl>

              <FormControl id="underlying-diseases">
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
              </FormControl>

              <button
                type="submit"
                className={`bg-accent text-accent-content px-4 py-2 rounded hover:bg-accent-light disabled:bg-gray-300`}
              >
                บันทึกข้อมูลและประเมินความเสี่ยง
                <br />
                โรคปอดฝุ่นหินทราย
              </button>
              <button
                type="tab"
                onClick={prevTab}
                className={`bg-accent mt-4 text-accent-content px-4 py-2 rounded hover:bg-accent-light disabled:bg-gray-300`}
              >
                ย้อนกลับ
              </button>
            </Stack>
          </TabPanel>
        </TabPanels>
      </form>
    </Tabs>
  );
}

export default RegisterWorkerForm;
