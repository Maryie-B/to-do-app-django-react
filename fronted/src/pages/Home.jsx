import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from "./PrivateRoutes.jsx";
import LoginPage from "./LoginPage.jsx";
import AddEditToDo from "./AddEditToDo.jsx";
import ToDoList from "./ToDoList.jsx";


function Home() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<PrivateRoutes />}>
                    <Route index element={<ToDoList />} />
                    <Route path='create' element={<AddEditToDo />} />
                    <Route path='edit/:id' element={<AddEditToDo />} />
                </Route>
                <Route path='login' element={<LoginPage />}/>
            </Routes>
        </Router>
    );
}

export default Home;
