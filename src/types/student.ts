export interface StudentDetail {
  id: number;
  email: string;
  status: string;
  average: string;

  profile: {
    studentId: string;
    birthDate: string;
    phone: string;
    address: string;
    firstName?: string;
    lastName?: string;
    course?: {
      name: string;
      section: string;
    };
    guardian: {
      fullName: string;
      phone: string;
      email: string;
      relationship: string;
    };
  };
}
