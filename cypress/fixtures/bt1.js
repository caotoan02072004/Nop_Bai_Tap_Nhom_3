export const testData = {
  Admission: {
    fullName: "Tom Holland",
    dateOfBirth: "2008-08-08",
    gender: "Male",
    nationalID: "123456789000",
    phone: "0972000000",
    address: "No 1, 123 Street",
    admissionReason: "Uncontrolled hypertension",
    triageLevel: "Low",
    initialDepartment: "Emergency",
  },

  labOrders: {
    priority: "ROUTINE",
  },

  publishLabResult: {
    resultStatus: "ABNORMAL",
    clinicalNote: "Không ổn định",
  },

  protocolUpdate: {
    diagnosis: "sick",
    protocolName: "Respiratory Infection Protocol",
    medication: "Paracetamol",
    dose: "500mg",
    frequency: "2 daily",
  },

  validStatic: {
    tableTitle: "SKU",
    highlightSKU: "SKU-001",
  },
};

export const testUsers = {
  reception: { username: "reception01", password: "Pass1234" },
  doctor: { username: "doctor01", password: "Pass1234" },
  labTech: { username: "labtech01", password: "Pass1234" },
  chief: { username: "chief01", password: "Pass1234" },
};
