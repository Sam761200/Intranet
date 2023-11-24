import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import NotFound from "../../pages/NotFound";
import PrivateRoutes from "./middleware/privatesRoutes";
import CollaboratorsList from '../../pages/CollaboratorList';
import ProtectedRoute from './middleware/protectedRoutes';
import AddCollaboratorPage from '../../pages/AddCollaboratorPage'

const Index = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collaborateurs" element={<CollaboratorsList />} />
        <Route path="/addcollaborateur" element={
           <ProtectedRoute>
              <AddCollaboratorPage />
           </ProtectedRoute>
        } />
        {/* <Route
          path="*"
          element={
            <PrivateRoutes>
              <NotFound />
            </PrivateRoutes>
          }
        /> */}
      </Routes>
    </div>
  );
};

export default Index;