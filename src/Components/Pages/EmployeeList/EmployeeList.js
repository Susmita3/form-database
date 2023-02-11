import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./EmployeeList.css";
import { Db } from "../Firebase_CRUD/firebase_crud";
import { onValue, ref, remove } from "firebase/database";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      photo: "",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      mobileNo: "1234567890",
      dob: "1999-01-01",
      country: "USA",
      state: "California",
      skills: ["Communication", "Time Management"],
    },
  ]);


  const handleDelete = (id) => {
		console.log(id);
		remove(ref(Db, "employees/" + id))
			.then(() => {
				console.log("Deleted Successfully...!");
			})
			.catch((error) => {
				console.log("Removal failed... !!" + error.message);
			});
	};
	useEffect(() => {
		const reference = ref(Db, "employees/");
		onValue(reference, (snapshot) => {
			const data = snapshot.val();
			const newEmployees = Object.keys(data).map((key) => ({
				...data[key],
			}));

			setEmployees(newEmployees);
		});
	}, []);

	return (
		<>
			<div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full h-screen absolute">
				<div className="employee-list">
					<table>
						<thead>
							<tr className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white">
								<th>Photo</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Email</th>
								<th>Mobile</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{employees.map((employee) => (
								<tr key={employee.id}>
									<td>
										<img
											src={employee.preview}
											alt={`${employee.firstName} ${employee.lastName}`}
										/>
									</td>
									<td>{employee.firstName}</td>
									<td>{employee.lastName}</td>
									<td>{employee.email}</td>
									<td>{employee.mobileNo}</td>
									<td>
										<Link to="/EditEmployee" state={{ id: employee.id }}>
											<button>Edit</button>
										</Link>
										<button onClick={() => handleDelete(employee.id)}>Delete</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<Link to="/">
						<button>Create</button>
					</Link>
				</div>
			</div>
		</>
	);
};

export default EmployeeList;


