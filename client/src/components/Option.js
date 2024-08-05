export const diseaseOptions = [
  { value: 0, label: "เลือกการมีโรคประจำตัว" },
  { value: 1, label: "ไม่มีโรคประจำตัว" },
  { value: 2, label: "มีโรคประจำตัว" },
];

export const separationOptions = [
  { value: 0, label: "เลือกลักษณะสถานที่ทำงาน" },
  { value: 1, label: "แยกจากที่พักอาศัย" },
  { value: 2, label: "อยู่บริเวณที่พักอาศัย" },
];

export const positionOptions = [
  { value: 0, label: "เลือกตำแหน่งงาน", silica: "" },
  { value: 1, label: "ขุดหิน (ลงบ่อหิน)", silica: 0.005 },
  { value: 2, label: "ตัดหิน", silica: 0.025 },
  { value: 3, label: "ผ่าหิน", silica: 0.035 },
  { value: 4, label: "ต๊อกหิน", silica: 0.022 },
  { value: 5, label: "แกะสลักหิน", silica: 0.039 },
  { value: 6, label: "อื่น ๆ", silica: "" },
];

export const nationOptions = [
  { value: 0, label: "เลือกสัญชาติ", nation: "" },
  { value: 1, label: "ไทย", nation: "ไทย" },
  { value: 2, label: "ลาว", nation: "ลาว" },
  { value: 3, label: "เมียนมาร์", nation: "เมียนมาร์" },
  { value: 4, label: "กัมพูชา", nation: "กัมพูชา" },
  { value: 5, label: "อื่น ๆ", nation: "อื่น ๆ" },
];
