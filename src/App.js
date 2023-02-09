import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddEmployee from './Components/Pages/AddEmployee/AddEmployee';
import EditEmployee from './Components/Pages/EditEmployee/EditEmployee';
import EmployeeList from './Components/Pages/EmployeeList/EmployeeList';

const App = () => {
  const Router = createBrowserRouter ([
    {
      path: '/',
      element: <AddEmployee></AddEmployee>,
    },

    {
      path: "/EmployeeList",
      element: <EmployeeList></EmployeeList>,
    },

    {
      path: "/EditEmployee",
      element: <EditEmployee></EditEmployee>,
    },
  ])
  
  return (
    <div>
      <RouterProvider router={ Router } ></RouterProvider>
    </div>
  );
}

export default App;