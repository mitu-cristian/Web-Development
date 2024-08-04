import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, {jobLoader} from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";
 
const App = () => {

  const addJob = async (newJob) => {
    const res = await fetch("/api/jobs", {
      method: 'POST',
      headers: {
        "Content-Type": "applciation/json"
      },
      body: JSON.stringify(newJob)
    })
  }

  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE"
    })
  }

  const updateJob = async (updatedJob) => {
    const res = await fetch (`/api/jobs/${updatedJob.id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedJob)
    })
  }

  const router = createBrowserRouter(createRoutesFromElements
    (<Route path="/" element = {<MainLayout/>} >
      <Route index element={<HomePage/>}/>
      <Route path="/jobs" element = {<JobsPage/>}/>
      <Route path = "/jobs/:id" element = {<JobPage deleteJob = {deleteJob}/>} loader = {jobLoader}/>
      <Route path="/add-job" element = {<AddJobPage addJobSubmit = {addJob}/>} />
      <Route path = "/edit-job/:id" element = {<EditJobPage updateJobSubmit = {updateJob}/>} loader = {jobLoader}/>
      <Route path ="*" element = {<NotFoundPage/>}/>
    </Route>));

  return <RouterProvider router = {router}/>
}

export default App