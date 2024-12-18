import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    university_name: "",
    department: "",
    semester: "",
    dob: "",
    gender: "",
    mobile_no: "",
    father_no: "",
    aadhar: null,
    collegeId:null,
    domains_interested:"",
    skills_known: "",
    resume:null,
    has_laptop: false,
    acknowledgement: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked ? 1 : 0 });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] instanceof File) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post('http://localhost:8082/formdetails', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Error submitting the form. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 lg:mb-10 shadow-lg lg:shadow-slate-50 rounded-lg lg:border-2">
      <h1 className="lg:text-2xl text-[24px] font-bold mb-6 font-orbitron text-[#9DFF8E] tracking-widest">INTERN REGISTRATION FORM</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
      
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-orbitron tracking-wider text-lg">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full border-2 text-white border-gray-300 bg-[#2C2C2C] hover:bg-[#3B3B3B] px-2 rounded-lg h-8 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-white font-orbitron tracking-wider text-lg">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full border-2 text-white border-gray-300 bg-[#2C2C2C] hover:bg-[#3B3B3B] rounded-lg h-8 px-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

     
        <div>
          <label className="block text-white font-orbitron tracking-wider text-lg">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-2 text-white border-gray-300 bg-[#2C2C2C] hover:bg-[#3B3B3B] rounded-lg h-8 px-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

    
        <div>
          <label className="block text-white font-orbitron tracking-wider text-lg">University Name</label>
          <input
            type="text"
            name="university_name"
            value={formData.university_name}
            onChange={handleChange}
            className="w-full border-2 text-white border-gray-300 bg-[#2C2C2C] hover:bg-[#3B3B3B] rounded-lg h-8 px-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        

    
         <div className="grid ">
           <div>
             <label className="block text-white font-orbitron tracking-wider text-lg">department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border-2 text-white border-gray-300 bg-[#2C2C2C] hover:bg-[#3B3B3B] rounded-lg h-8 px-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
    
        </div> 

      
        <div>
          <label className="block text-white font-orbitron tracking-wider text-lg">Semester</label>
          <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="w-full border-2 text-white border-gray-300 bg-[#2C2C2C] hover:bg-[#3B3B3B] rounded-lg h-8 px-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="passed out">passed out</option>
            </select>
        </div>

        {/* DOB and Gender */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-orbitron tracking-wider text-lg">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border-2 text-white border-gray-300 bg-[#2C2C2C] hover:bg-[#3B3B3B] rounded-lg h-8 px-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-white font-orbitron tracking-wider text-lg">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border-2 text-white border-gray-300 bg-[#2C2C2C] hover:bg-[#3B3B3B] rounded-lg h-8 px-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Contact Numbers */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-orbitron tracking-wider text-lg">Mobile Number</label>
            <input
              type="text"
              name="mobile_no"
              value={formData.mobile_no}
              onChange={handleChange}
              className="w-full border-2 text-white border-gray-300 bg-[#2C2C2C] hover:bg-[#3B3B3B] rounded-lg h-8 px-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-white font-orbitron tracking-wider text-lg">Father's Number</label>
            <input
              type="text"
              name="father_no"
              value={formData.father_no}
              onChange={handleChange}
              className="w-full border-2 text-white border-gray-300 bg-[#2C2C2C] hover:bg-[#3B3B3B] rounded-lg h-8 px-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Aadhar */}
        <div>
          <label className="block text-white font-orbitron tracking-wider text-lg">Aadhar Card</label>
          <input
            type="file"
            name="aadhar"
            onChange={handleChange}
            className="w-full text-white"
            required
          />
        </div>
        <div>
          <label className="block text-white font-orbitron tracking-wider text-lg">Collage Id Card</label>
          <input
            type="file"
            name="aadhar"
            onChange={handleChange}
            className="w-full text-white"
            required
          />
        </div>

        {/* Domains Interested */}
        <div>
        <div>
            <label className="block text-white font-orbitron tracking-wider text-lg">Domains Intersted</label>
            <select
              name="domains_interested"
              value={formData.domains_interested}
              onChange={handleChange}
              className="w-full border-2 text-white border-gray-300 bg-[#2C2C2C] hover:bg-[#3B3B3B] rounded-lg h-8 px-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select</option>
              <option value="Web Development">Web Development</option>
              <option value="Ui/UX design">Ui/UX design</option>
              <option value="Salesforce">Salesforce</option>
              <option value="gaming(unity)">gaming(unity)</option>
              <option value="gaming(unreal)">gaming(unreal)</option>
              <option value="3D Modelling/Animation">3D Modelling/Animation</option>
              <option value="Digital marketing">Digital marketing</option>
              <option value="Video Editing">Video Editing</option>
            </select>
          </div>
        </div>

        {/* Skills Known */}
        <div>
          <label className="block text-white font-orbitron tracking-wider text-lg">Skills Known</label>
          <input
            type="text"
            name="skills_known"
            value={formData.skills_known}
            onChange={handleChange}
            placeholder="HTML,CSS,JS,REACT,FIGMA,WORDPRESS,SPLINE,BLENDER,ADOBE,ILLUSTRATOR,3JS"
            className="w-full border-2 text-white border-gray-300 bg-[#2C2C2C] hover:bg-[#3B3B3B] rounded-lg h-8 px-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Resume */}
        <div>
          <label className="block text-white font-orbitron tracking-wider text-lg">Resume</label>
          <input
            type="file"
            name="resume"
            onChange={handleChange}
            className="w-full text-white "
            required
          />
        </div>

        {/* Has Laptop */}
        <div>
          <label className="inline-flex items-center text-white font-orbitron tracking-wider text-lg">
            <input
              type="checkbox"
              name="has_laptop"
              checked={formData.has_laptop}
              onChange={handleChange}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="ml-2">I have a laptop</span>
          </label>
        </div>

        {/* Acknowledgement */}
        <div>
          <label className="inline-flex items-center text-white font-orbitron tracking-wider text-lg">
            <input
              type="checkbox"
              name="acknowledgement"
              checked={formData.acknowledgement}
              onChange={handleChange}
              className="form-checkbox h-4 w-4 text-blue-600"
              required
            />
            <span className="ml-2">I acknowledge that the information provided is accurate.</span>
          </label>
        </div>

        <button
          type="submit"
          className="bg-[#9DFF8E] text-black font-bold py-2 px-4 rounded-full hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;