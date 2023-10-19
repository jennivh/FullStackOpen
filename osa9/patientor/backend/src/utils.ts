import {
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  NewPatient,
  NewBaseEntry,
  Diagnosis,
} from "./types";

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Patient missing or not object");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: [],
    };
    return newPatient;
  }
  throw new Error("Incorrect data or something is missing");
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Patient missing or not object");
  }
  if (
    "date" in object &&
    "specialist" in object &&
    "description" in object &&
    "type" in object
  ) {
    let newEntry: NewBaseEntry = {
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      description: parseString(object.description),
    };
    if ("diagnosisCodes" in object) {
      newEntry = {
        ...newEntry,
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      };
    }
    console.log(newEntry);
    
    switch (object.type) {
      case "Hospital":
        if (object && typeof object === "object" && "discharge" in object) {
          if ( object.discharge &&
            typeof object.discharge === "object" &&
            "date" in object.discharge &&
            "criteria" in object.discharge
          ) {
            console.log(object);
            const newHospitalEntry: EntryWithoutId = {
              ...newEntry,
              type: object.type,
              discharge: {
                date: parseDate(object.discharge.date),
                criteria: parseString(object.discharge.criteria),
              },
            };
            return newHospitalEntry;
          }
        }
        throw new Error("Incorrect data or something is missing");
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          const newHealthCheckRatingEntry: EntryWithoutId = {
            ...newEntry,
            type: object.type,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
          return newHealthCheckRatingEntry;
        }
        throw new Error("Incorrect data or something is missing");

      case "OccupationalHealthcare":
        console.log('testi');
        
        if ("employerName" in object) {
            console.log(object);
          if (object && typeof object === "object" && "sickLeave" in object) {
            if (
              object.sickLeave &&
              typeof object.sickLeave === "object" &&
              "startDate" in object.sickLeave &&
              "endDate" in object.sickLeave
            )
             {
              return {
                ...newEntry,
                type: object.type,
                employerName: parseString(object.employerName),
                sickLeave: {
                  startDate: parseDate(object.sickLeave.startDate),
                  endDate: parseDate(object.sickLeave.endDate),
                },
              };
            }
          }
          return {
            ...newEntry,
            type: object.type,
            employerName: parseString(object.employerName),
          };
        }
        throw new Error("Incorrect data or something is missing");
    }
  }
  throw new Error("Incorrect data or something is missing");
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isNumber(rating) || !isHealthCheckRating(rating)) {
    throw new Error(" Missing HealthRating");
  }
  return rating;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const isNumber = (n: unknown): n is number => {
  return typeof n === "number" || n instanceof Number;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error("Missing or incorrect");
  }

  return text;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(" Missing gender");
  }
  return gender;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Date missing or incorrect" + date);
  }

  return date;
};
