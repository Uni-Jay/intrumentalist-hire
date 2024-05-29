// import { Form } from "react-bootstrap";
// import { Field, ErrorMessage, FormikProvider, useFormik } from "formik";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import instance from "../utils/api";

// function EventSelect() {
//   const [options, setOptions] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       // Fetch data
//       const { data } = await instance.get("`/api/event/all`");
//       const results = []
//       // Store results in the results array
//       data.forEach((value) => {
//         results.push({
//           key: value.name,
//           value: value.id,
//         });
//       });
//       // Update the options state
//       setOptions([
//         {key: 'Select a company', value: ''}, 
//         ...results
//       ])
//     }

//     // Trigger the fetch
//     fetchData();
//   }, []);

//   const { label, name, getFieldProps} = useFormik("");

   

//   return (
//     <FormikProvider>
//         <Form.Group className="mb-2">
//           <Form.Label htmlFor={name}>{label}</Form.Label>
//           <input id="name" type="name" {...getFieldProps('email')}>
//             {options.map((option) => {
//               return (
//                 <option key={option.value} value={option.value}>
//                 {option.key}
//                 </option>
//               );
//             })}
//           </input>
//           <ErrorMessage className="text-danger" name={name} component={Form.Text} />
//         </Form.Group>
//     </FormikProvider>
//   );
// }

// export default EventSelect;


