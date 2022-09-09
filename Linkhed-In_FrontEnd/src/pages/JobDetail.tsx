import axios from "axios";
import { useLocation } from "react-router-dom";
import { useAuth } from "../utils/authContext";
import Cookies from "universal-cookie";
interface LocationState {
    state: {
        jobtitle: string;
        company: string;
        joblocation: string;
        employmenttype: string;
        workplacetype: string;
    };
}
const JobDetail = () => {
    const auth = useAuth();
    const cookies = new Cookies();
    const token = cookies.get("token");
    const submit = (jobdescription: any) => {
        const data = {
            jobtitle: location.state.jobtitle,
            company: location.state.company,
            joblocation: location.state.joblocation,
            employmenttype: location.state.employmenttype,
            workplacetype: location.state.workplacetype,
            jobdescription: jobdescription,
            user_id: auth.user.id,
        };
        axios.post("http://localhost:8080/addjob", data, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    };
    const location = useLocation() as LocationState;
    if (auth.user) {
        return (
            <div>
                <div className="container-job">
                    <h1>Job Details</h1>
                    <div className="gap"></div>
                    <p>Add Job Description</p>
                    <div className="job-input">
                        <div className="input mt-2">
                            <label htmlFor="jobtitle">Job description *</label>
                            <div
                                contentEditable
                                className="input-post"
                                id="job-description"
                            ></div>
                        </div>
                    </div>
                    <button
                        className="submit-job-btn"
                        onClick={() => {
                            const jobdesc =
                                document.getElementById(
                                    "job-description"
                                )?.innerHTML;
                            submit(jobdesc);
                        }}
                    >
                        Post
                    </button>
                </div>
            </div>
        );
    } else {
        return <div>Loading</div>;
    }
};

export default JobDetail;
