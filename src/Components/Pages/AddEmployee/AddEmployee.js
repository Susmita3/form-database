import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddEmployee.css";

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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  function handleCountryChange(event) {
    setCountry(event.target.value);
  }

  function handleSkillChange(event) {
    const skill = event.target.value;
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  }

  function handlePhotoChange(event) {
    setPhoto(event.target.files[0]);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/EmployeeList");
  };

  // Firebase Connection
  const submitData = async (e) => {
    e.preventDefault();
    const res = await fetch(
      "https://employeeform-90b97-default-rtdb.asia-southeast1.firebasedatabase.app/employee.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          mobileNo,
          dob,
          country,
          state,
          selectedSkills,
          photo,
          preview,
        }),
      }
    );
    if (res) {
      handleClick();
    }
  };

  return (
    <>
      <main className="form-container bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full h-screen">
        <h1 className="text-blue font-bold text-4xl text-center p-10">
          Create Employee Date
        </h1>

        <form
          className="bg-gradient-to-r from-sky-500 to-indigo-500"
          onSubmit={submitData}
        >
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="mobileNo">Mobile No:</label>
            <input
              type="tel"
              id="mobileNo"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="country">Country:</label>
            <select id="country" value={country} onChange={handleCountryChange}>
              <option value="">--Select a country--</option>
              {countries.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {country && (
            <div>
              <label htmlFor="state">State:</label>
              <select
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">--Select a state--</option>
                {countries
                  .find((c) => c.name === country)
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
                  checked={selectedSkills.includes(skill)}
                  onChange={handleSkillChange}
                />
                <label htmlFor={skill}>{skill}</label>
              </div>
            ))}
          </div>
          <div>
            <label htmlFor="photo">Photo:</label>
            <input type="file" id="photo" onChange={handlePhotoChange} />
            {preview && (
              <img src={preview} alt="Preview" className="preview-photo" />
            )}
          </div>
          <button type="submit"
          //  onClick={handleClick}
           >
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default AddEmployee;
