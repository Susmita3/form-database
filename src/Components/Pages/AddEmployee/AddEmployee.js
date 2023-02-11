import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddEmployee.css";
import { Db } from "../Firebase_CRUD/firebase_crud";
import { v4 as uuidv4 } from "uuid";
import { ref, set } from "firebase/database"

const countries = [
  {
    name: "India",
    states: [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttarakhand",
      "Uttar Pradesh",
      "West Bengal",
    ],
  },

  {
    name: "United States",
    states: [
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "Florida",
      "Georgia",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming",
    ],
  },
];

const skills = [
  "Communication",
  "Ability to Work under Pressure",
  "Decision Making",
  "Time Management",
  "Self-motivation",
  "Conflict Resolution",
  "Leadership",
  "Adaptability",
];

const AddEmployee = () => {
  const [employeeData, setEmployees] = useState({
		id: uuidv4(),
		firstName: "",
		lastName: "",
		email: "",
		mobileNo: "",
		dob: "",
		country: "",
		state: "",
		selectedSkills: [],
		photo: null,
		preview: null,
	});

  function handleCountryChange(event) {
		setEmployees((prev) => {
			return { ...prev, country: event.target.value };
		});
	}

  function handleSkillChange(event) {
		const skill = event.target.value;
		if (employeeData.selectedSkills.includes(skill)) {
			setEmployees((prev) => {
				return {
					...prev,
					selectedSkills: prev.selectedSkills.filter((s) => {
						return s !== null;
					}),
				};
			});
		} else {
			setEmployees((prev) => {
				return {
					...prev,
					selectedSkills: [...prev.selectedSkills, skill],
				};
			});
		}
	}

  function handlePhotoChange(event) {
		// setPhoto(event.target.files[0]);
		setEmployees((prev) => {
			return {
				...prev,
				photo: event.target.files[0],
			};
		});

		const reader = new FileReader();
		reader.onload = (e) => {
			// setPreview(e.target.result);
			setEmployees((prev) => {
				return {
					...prev,
					preview: e.target.result,
				};
			});
		};
		reader.readAsDataURL(event.target.files[0]);
	}

	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/EmployeeList");
		console.log("Account Edit");
	};

	const submitData = async (e) => {
		e.preventDefault();
		// fireDb.child("employee").push(employeeData);
		set(ref(Db, "employees/" + employeeData.id), employeeData);

		handleClick();
	};

return (
  <>
    <main className="form-container bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full h-screen">
      <h1 className="text-blue font-bold text-4xl text-center p-10">
        Create Employee Date
      </h1>

      <form
        className="bg-gradient-to-r from-sky-500 to-indigo-500"
        onSubmit={submitData}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={employeeData.firstName}
            onChange={(e) =>
              setEmployees((prev) => {
                return { ...prev, firstName: e.target.value };
              })
            }
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={employeeData.lastName}
            onChange={(e) =>
              setEmployees((prev) => {
                return { ...prev, lastName: e.target.value };
              })
            }
          />
        </div>
        <div>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={employeeData.email}
            onChange={(e) =>
              setEmployees((prev) => {
                return { ...prev, email: e.target.value };
              })
            }
          />
        </div>
        <div>
          <label htmlFor="mobileNo">Mobile No:</label>
          <input
            type="tel"
            id="mobileNo"
            value={employeeData.mobileNo}
            onChange={(e) =>
              setEmployees((prev) => {
                return { ...prev, mobileNo: e.target.value };
              })
            }
          />
        </div>
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            value={employeeData.dob}
            onChange={(e) =>
              setEmployees((prev) => {
                return { ...prev, dob: e.target.value };
              })
            }
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            value={employeeData.country}
            onChange={handleCountryChange}>
            <option value="">--Select a country--</option>
            {countries.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {employeeData.country && (
          <div>
            <label htmlFor="state">State:</label>
            <select
              id="state"
              value={employeeData.state}
              onChange={(e) =>
                setEmployees((prev) => {
                  return { ...prev, state: e.target.value };
                })
              }>
              <option value="">--Select a state--</option>
              {countries
                .find((c) => c.name === employeeData.country)
                .states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="skills">Professional Skills:</label>
          {skills.map((skill) => (
            <div key={skill}>
              <input
                type="checkbox"
                id={skill}
                value={skill}
                checked={employeeData.selectedSkills.includes(skill)}
                onChange={handleSkillChange}
              />
              <label htmlFor={skill}>{skill}</label>
            </div>
          ))}
        </div>
        <div>
          <label htmlFor="photo">Photo:</label>
          <input type="file" id="photo" onChange={handlePhotoChange} />
          {employeeData.preview && (
            <img
              src={employeeData.preview}
              alt="Preview"
              className="preview-photo"
            />
          )}
        </div>
        <button type="submit">
          Submit
        </button>
      </form>
    </main>
  </>
);
};

export default AddEmployee;
