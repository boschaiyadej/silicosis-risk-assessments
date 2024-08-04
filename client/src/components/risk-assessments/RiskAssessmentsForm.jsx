import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  setRiskLevel,
  calculateRiskLevel,
  resetRiskLevel,
} from "../../redux/slices/riskSlice";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  InputGroup,
  InputRightAddon,
  FormErrorMessage,
} from "@chakra-ui/react";
import {
  diseaseOptions,
  separationOptions,
  positionOptions,
} from "./RiskAssessmentsOption";

function RiskAssessmentsForm() {
  const dispatch = useDispatch();
  const formValues = useSelector((state) => state.risk);

  const [hasSubmitted, setHasSubmitted] = useState(false);

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
    console.log("Form values:", formValues);
    console.log("Risk level:", formValues.riskLevel);
  };

  const handleReset = () => {
    dispatch(resetRiskLevel());
    setHasSubmitted(false);
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
    <Box p={1} bg="white" borderRadius="lg">
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
            <FormLabel>จำนวนชั่วโมงการทำงานต่อวัน</FormLabel>
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
              <FormErrorMessage>กรุณาเลือกการมีโรคประจำตัว</FormErrorMessage>
            )}
          </FormControl>

          <FormControl
            id="residence-separation"
            isInvalid={hasSubmitted && !formValues.residenceSeparation}
          >
            <FormLabel>ที่ตั้งที่พักอาศัย</FormLabel>
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
              <FormErrorMessage>กรุณาเลือกที่ตั้งที่พักอาศัย</FormErrorMessage>
            )}
          </FormControl>

          <Button
            type="submit"
            colorScheme=""
            className="bg-secondary text-secondary-content hover:bg-secondary-light disabled:bg-gray-300 disabled:text-gray-500"
            width="full"
            isDisabled={!canSubmit()}
          >
            ประเมินความเสี่ยงโรคปอดฝุ่นหินทราย
          </Button>
          <Button
            type="button"
            onClick={handleReset}
            colorScheme=""
            className="bg-error text-error-content hover:bg-error-light focus:bg-error"
            width="full"
          >
            ล้างข้อมูล
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default RiskAssessmentsForm;
