import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditEmployee.css";
import { Db } from "../Firebase_CRUD/firebase_crud";
import { useEffect } from "react";
import { ref, set, onValue } from "firebase/database";

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
const EditEmployee = () => {
	const [employees, setEmployees] = useState({
		id: "",
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
	const [newData, setnewData] = useState({
		id: "",
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
		setnewData((prev) => {
			return { ...prev, country: event.target.value };
		});
	}

	function handleSkillChange(event) {
		const skill = event.target.value;
		if (newData.selectedSkills.includes(skill)) {
			setnewData((prev) => {
				return {
					...prev,
					selectedSkills: newData.selectedSkills.filter((s) => s !== skill),
				};
			});
		} else {
			setnewData((prev) => {
				return { ...prev, selectedSkills: skills };
			});
		}
	}

	function handlePhotoChange(event) {
    setnewData((prev) => {
			return {
				...prev,
				photo: event.target.files[0],
			};
		});

		const reader = new FileReader();
		reader.onload = (e) => {
      setnewData((prev) => {
				return {
					...prev,
					preview: e.target.result,
				};
			});
		};
		reader.readAsDataURL(event.target.files[0]);
	}

	const location = useLocation();
	const navigate = useNavigate();
	const id = location.state.id;
	const handleCreate = () => {
		set(ref(Db, "employees/" + id), newData);
		navigate("/employeeList");
	};
	useEffect(() => {
		const reference = ref(Db, "employees/" + id);
		onValue(reference, (snapshot) => {
			const data = snapshot.val();
			console.log(data);
			setEmployees(data);
			setnewData(data);
		});
	}, 
  []);

return (
  <>
    <main className="bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full h-screen">
      <h1 className="text-blue font-bold text-4xl text-center p-10">
        Edit Employee Date
      </h1>

      <form className="bg-gradient-to-r from-sky-500 to-indigo-500">
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            placeholder={employees.firstName}
            value={newData.firstName}
            onChange={(e) =>
              setnewData((prev) => {
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
            placeholder={employees.lastName}
            value={newData.lastName}
            onChange={(e) =>
              setnewData((prev) => {
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
            placeholder={employees.email}
            value={newData.email}
            onChange={(e) =>
              setnewData((prev) => {
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
            placeholder={employees.mobileNo}
            value={newData.mobileNo}
            onChange={(e) =>
              setnewData((prev) => {
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
            value={newData.dob}
            onChange={(e) =>
              setnewData((prev) => {
                return { ...prev, dob: e.target.value };
              })
            }
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            value={newData.country}
            onChange={handleCountryChange}>
            <option value="">{employees.country}</option>
            {countries.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {newData.country && (
          <div>
            <label htmlFor="state">State:</label>
            <select
              id="state"
              value={newData.state}
              onChange={(e) =>
                setnewData((prev) => {
                  return { ...prev, state: e.target.value };
                })
              }>
              <option value="">--Select a state--</option>
              {countries
                .find((c) => c.name === newData.country)
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
                onChange={handleSkillChange}
              />
              <label htmlFor={skill}>{skill}</label>
            </div>
          ))}
        </div>
        <div>
          <label htmlFor="photo">Photo:</label>
          <input type="file" id="photo" onChange={handlePhotoChange} />
          {newData.preview && (
            <img
              src={newData.preview}
              alt="Preview"
              className="preview-photo"
            />
          )}
        </div>
        <button type="submit" onClick={handleCreate}>
          Save
        </button>
      </form>
    </main>
  </>
);
};

export default EditEmployee;
