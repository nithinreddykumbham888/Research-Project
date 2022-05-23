import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDataToDatabase, auth } from "./firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { Form, Button } from 'react-bootstrap';

function Upload() {
    const [user, loading, error] = useAuthState(auth);
    const [pdf, setPdf] = useState([]);
    const [topic, setTopic] = useState("");
    const [year, setYear] = useState("");
    const [title, setTitle] = useState("");
    const [tech, setTech] = useState("");

    const onFormSubmit = e => {
        e.preventDefault()
        const storage = getStorage();
        const pdf_url = "Papers/" + title + "_" + user?.uid;
        const storageRef = ref(storage, pdf_url)

        uploadBytes(storageRef, pdf).then((ss) => {
            console.log("Uploaded File");
            getDownloadURL(storageRef).then((url) => {
                addDataToDatabase(url, title, year, topic, tech, user?.uid).then(() => { alert("Data Uploaded!!") })
            });
        })

        // setPdf([])
        // setTech("")
        // setTopic("")
        // setYear("")
        // setTitle("")
    }



    return (
        <div className="search">
            <div className="search__container">
                <Form onSubmit={onFormSubmit}>
                    <Form.Group className="mb-3" controlId="formPaper">
                        <Form.Label>Research Paper</Form.Label>
                        <Form.Control type="file"
                            onChange={(e) => setPdf(e.target.files[0])}
                            required={true}
                        // value = {pdf}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTopic">
                        <Form.Label>Topic</Form.Label>
                        <Form.Control type="text" placeholder="Enter topic of Research Paper"
                            onChange={(e) => setTopic(e.target.value)}
                            // value={topic}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formYear">
                        <Form.Label>Year of Publishing</Form.Label>
                        <Form.Control type="number" placeholder="Enter year in which paper was published"
                            onChange={(e) => setYear(e.target.value)}
                            // value={year}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title of paper"
                            onChange={(e) => setTitle(e.target.value)}
                            required={true}
                            // value={title}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTechnique">
                        <Form.Label>Technique</Form.Label>
                        <Form.Control type="text" placeholder="Enter name of technique used in paper"
                            onChange={(e) => setTech(e.target.value)}
                            // value={tech}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

            </div>
        </div>
    );
}

export default Upload;