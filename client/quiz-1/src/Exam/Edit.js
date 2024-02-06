// import React, { useState } from 'react';
// import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import axios from 'axios';

// const Edit = ({ exam, onCancel, onUpdate }) => {
//   const [editedExamData, setEditedExamData] = useState({
//     start_time: exam.start_time,
//     end_time: exam.end_time,
//     quiz_id: exam.quiz_id._id,
//   });

//   const handleChange = (e) => {
//     setEditedExamData({
//       ...editedExamData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       await axios.put(`http://localhost:4000/api/exams/${exam._id}`, editedExamData);
//       onUpdate(); // Call parent onUpdate function to refresh exams
//     } catch (error) {
//       console.error('Error editing exam:', error);
//     }
//   };

//   const isExamEditable = (exam) => {
//     const currentTime = new Date();
//     const startTime = new Date(exam.start_time);
//     const endTime = new Date(exam.end_time);

//     if (currentTime >= startTime && currentTime <= endTime) {
//       return false; // Cannot change data
//     }

//     if (currentTime < startTime) {
//       return true; // Can change any data
//     }

//     if (currentTime > endTime) {
//       return false; // Cannot change data
//     }
//   };

//   return (
//     <div>
//       <Form>
//         <FormGroup>
//           <Label for="start_time">Start Time</Label>
//           <Input type="datetime-local" name="start_time" id="start_time" value={editedExamData.start_time} onChange={handleChange} disabled={!isExamEditable(exam)} />
//         </FormGroup>
//         <FormGroup>
//           <Label for="end_time">End Time</Label>
//           <Input type="datetime-local" name="end_time" id="end_time" value={editedExamData.end_time} onChange={handleChange} disabled={!isExamEditable(exam)} />
//         </FormGroup>
//         <FormGroup>
//           <Label for="quiz_id">Quiz ID</Label>
//           <Input type="text" name="quiz_id" id="quiz_id" value={editedExamData.quiz_id} onChange={handleChange} disabled={!isExamEditable(exam)} />
//         </FormGroup>
//         <Button color="success" onClick={handleSubmit}>Save</Button>{' '}
//         <Button color="secondary" onClick={onCancel}>Cancel</Button>
//       </Form>
//     </div>
//   );
// };

// export default Edit;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Edit = () => {


    // useEffect(()=>{
    //     fetchExams()

    // },[])
    let {id}=useParams()
    const [exams, setExams] = useState([]);
    console.log(exams,);
    const fetchExams = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/exams/${id}`);
            setExams(response.data);
              console.log(response.data);
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    };

   



  return (
    <div>
        <h2>              <Form >
                <FormGroup>
                    <Label for="start_time">Start Time</Label>
                    <Input type="datetime-local" name="start_time" id="start_time" value={exams.start_time}  onChange={fetchExams} required />
                </FormGroup>
                <FormGroup>
                    <Label for="end_time">End Time</Label>
                    <Input type="datetime-local" name="end_time" id="end_time" value={exams.end_time}  onChange={fetchExams}  required />
                </FormGroup>
                <FormGroup>
                    <Label for="quiz_id">Quiz Title</Label>

                    <Input type="select" name="quiz_id" id="quiz_id"   onChange={fetchExams} value={exams.quiz_id}  >
                        <option value="">Select Quiz Title</option>
                    
                        <option    onChange={fetchExams} key={exams._id} value={exams._id}>{exams.quiz_id?.title}</option>

                    </Input>
                </FormGroup>
                <Button type="submit">Add Exam</Button>
            </Form>  </h2>
    </div>
  )
}

export default Edit
