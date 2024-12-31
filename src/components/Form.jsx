import React, { useState } from 'react';
import Education from './Education';
import Experiences from './Experiences';
import Extras from './Extras';
import PersonalDetails from './PersonalDetails';
import Project from './Project';
import axios from 'axios';
import { saveAs } from 'file-saver';

const Form = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        github: "",
        skills: "",

        exp1_org: "",
        exp1_pos: "",
        exp1_desc: "",
        exp1_dur: "",
        exp2_org: "",
        exp2_pos: "",
        exp2_desc: "",
        exp2_dur: "",

        proj1_title: "",
        proj1_link: "",
        proj1_desc: "",
        proj2_title: "",
        proj2_link: "",
        proj2_desc: "",

        edu1_school: "",
        edu1_year: "",
        edu1_qualification: "",
        edu1_desc: "",
        edu2_school: "",
        edu2_year: "",
        edu2_qualification: "",
        edu2_desc: "",

        extra_1: "",
        extra_2: "",
    });

    const [page, setPage] = useState(0);

    const FormTitle = [
        "Personal Details",
        "Education",
        "Experience",
        "Projects",
        "Extras"
    ];

    const PageDisplay = () => {
        switch (page) {
            case 0:
                return <PersonalDetails formData={formData} setFormData={setFormData} />;
            case 1:
                return <Education formData={formData} setFormData={setFormData} />;
            case 2:
                return <Experiences formData={formData} setFormData={setFormData} />;
            case 3:
                return <Project formData={formData} setFormData={setFormData} />;
            case 4:
                return <Extras formData={formData} setFormData={setFormData} />;
            default:
                return null;
        }
    };

    const handleDownloadPdf = async () => {
        try {
            // Send formData to backend to create PDF
            await axios.post('http://localhost:4000/create-pdf', formData);

            // Fetch the created PDF and download it
            const response = await axios.get('http://localhost:4000/fetch-pdf', {
                responseType: 'blob',
            });

            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            saveAs(pdfBlob, 'Resume.pdf');
        } catch (error) {
            console.error('Error generating or downloading PDF:', error);
            alert('Failed to generate or download PDF. Please try again.');
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-center">
                <h2 className="text-center text-black-50">{FormTitle[page]}</h2>
            </div>

            <div className="progressbar">
                <div
                    style={{
                        width: page === 0 ? "20%" :
                            page === 1 ? "40%" :
                            page === 2 ? "60%" :
                            page === 3 ? "80%" : "100%",
                    }}
                ></div>
            </div>

            <div>{PageDisplay()}</div>

            <div className="d-flex justify-content-center mt-4 gap-3">
                {/* Prev Button */}
                <button
                    className="btn btn-dark"
                    disabled={page === 0}
                    onClick={() => setPage((currPage) => currPage - 1)}
                >
                    Prev
                </button>

                {/* Next/Download Button */}
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        if (page === FormTitle.length - 1) {
                            handleDownloadPdf(); // Call the PDF generation function
                        } else {
                            setPage((currPage) => currPage + 1);
                        }
                    }}
                >
                    {page === FormTitle.length - 1 ? "Download PDF🎉" : "Next"}
                </button>
            </div>
        </div>
    );
};

export default Form;
