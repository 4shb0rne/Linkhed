import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.scss";

const JobForm = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    return (
        <div>
            <h1 className="text-center mt-4">Find a great hire, fast</h1>
            <h2 className="text-center">
                Rated #1 in delivering quality hires
            </h2>
            <div className="container-register">
                <div className="job-input">
                    <div className="input">
                        <label htmlFor="jobtitle">Job title *</label>
                        <input
                            type="text"
                            id="jobtitle"
                            placeholder="Job title"
                        ></input>
                    </div>
                    <div className="input mt-2">
                        <label htmlFor="company">Company *</label>
                        {/* <i className="fa fa-building-o icon"></i> */}
                        <input
                            type="text"
                            id="company"
                            placeholder="Company"
                        ></input>
                    </div>
                    <div className="input mt-2">
                        <label htmlFor="workplace">Workplace type *</label>
                        <select id="workplacetype">
                            <option value="On-site">On-site</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Remote">Remote</option>
                        </select>
                    </div>
                    <div className="input mt-2">
                        <label htmlFor="joblocation">Job Location *</label>
                        <input type="text" id="joblocation"></input>
                    </div>
                    <div className="input mt-2">
                        <label htmlFor="employmenttype">
                            Employment type *
                        </label>
                        <select id="employmenttype">
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Temporary">Temporary</option>
                            <option value="Volunteer">Volunteer</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>
                </div>
                {error && <div className="text-red">{error}</div>}
                <button
                    className="login-btn mt-2"
                    onClick={() => {
                        const jobtitle = (
                            document.getElementById(
                                "jobtitle"
                            ) as HTMLInputElement
                        ).value;
                        const company = (
                            document.getElementById(
                                "company"
                            ) as HTMLInputElement
                        ).value;
                        const joblocation = (
                            document.getElementById(
                                "joblocation"
                            ) as HTMLInputElement
                        ).value;
                        const employmenttype = (
                            document.getElementById(
                                "employmenttype"
                            ) as HTMLInputElement
                        ).value;
                        const workplacetype = (
                            document.getElementById(
                                "workplacetype"
                            ) as HTMLInputElement
                        ).value;
                        if (
                            jobtitle &&
                            company &&
                            joblocation &&
                            employmenttype &&
                            workplacetype
                        ) {
                            navigate("/jobdetail", {
                                state: {
                                    jobtitle: jobtitle,
                                    company: company,
                                    joblocation: joblocation,
                                    employmenttype: employmenttype,
                                    workplacetype: workplacetype,
                                },
                            });
                        } else {
                            setError("All Required Field must be filled");
                        }
                    }}
                >
                    Get started for free
                </button>
            </div>
        </div>
    );
};

export default JobForm;
