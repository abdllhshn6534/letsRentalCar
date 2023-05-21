import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from '../components/common/scroll-to-top/scroll-to-top'
import AdminContactMessageEditPage from '../pages/admin/admin-contact-message-edit-page'
import AdminContactMessagesPage from '../pages/admin/admin-contact-messages-page'
import AdminDashboardPage from '../pages/admin/admin-dashboard-page'
import AdminReservationsEditPage from '../pages/admin/admin-reservations-edit-page'
import AdminReservationsPage from '../pages/admin/admin-reservations-page'
import AdminUsersEditPage from '../pages/admin/admin-users-edit-page'
import AdminUsersPage from '../pages/admin/admin-users-page'
import AdminVehiclesEditPage from '../pages/admin/admin-vehicles-edit-page'
import AdminVehiclesNewPage from '../pages/admin/admin-vehicles-new-page'
import AdminVehiclesPage from '../pages/admin/admin-vehicles-page'
import AuthPage from '../pages/common/auth-page'
import NotFoundPage from '../pages/common/not-found-page'
import UnauthorizedPage from '../pages/common/unauthorized-page'
import AboutPage from '../pages/user/about-page'
import ContactPage from '../pages/user/contact-page'
import HomePage from '../pages/user/home-page'
import PrivacyPolicyPage from '../pages/user/privacy-policy-page'
import ProfilePage from '../pages/user/profile-page'
import ReservationDetailsPage from '../pages/user/reservation-details-page'
import ReservationsPage from '../pages/user/reservations-page'
import VehicleDetailsPage from '../pages/user/vehicle-details-page'
import VehiclesPage from '../pages/user/vehicles-page'
import ProtectedRoute from './protected-route'
//            /user/reservations
const CustomRoutes = () => {
  return (
    <BrowserRouter>
        <ScrollToTop/>
        <Routes>
            <Route path="/">
                <Route index element={<HomePage/>}/>
                <Route path="about" element={<AboutPage/>}/>
                <Route path="contact" element={<ContactPage/>}/>
                <Route path="privacy-policy" element={<PrivacyPolicyPage/>}/>
                <Route path="auth" element={<AuthPage/>}/>
                <Route path="unauthorized" element={<UnauthorizedPage/>}/>
                <Route path="vehicles">
                    <Route index element={<VehiclesPage/>}/>
                    <Route path=":vehicleId" element={<VehicleDetailsPage/>}/>
                </Route>

                <Route path="user">
                    <Route index element={<ProtectedRoute><ProfilePage/></ProtectedRoute>} />
                    <Route path="reservations">
                        <Route index element={<ProtectedRoute><ReservationsPage/></ProtectedRoute>} />
                        <Route path=":reservationId" element={<ProtectedRoute><ReservationDetailsPage/></ProtectedRoute>}/>
                    </Route>
                </Route>

                <Route path="admin">
                    <Route index element={<ProtectedRoute admin={true}><AdminDashboardPage/></ProtectedRoute>}/>
                    <Route path="contact-messages">
                        <Route index element={<ProtectedRoute admin={true}><AdminContactMessagesPage/></ProtectedRoute>}/>
                        <Route path=":messageId" element={<ProtectedRoute admin={true}><AdminContactMessageEditPage/></ProtectedRoute>}/>
                    </Route>
                    <Route path="users">
                        <Route index element={<ProtectedRoute admin={true}><AdminUsersPage/></ProtectedRoute>}/>
                        <Route path=":userId" element={<ProtectedRoute admin={true}><AdminUsersEditPage/></ProtectedRoute>}/>
                    </Route>
                    <Route path="reservations">
                        <Route index element={<ProtectedRoute admin={true}><AdminReservationsPage/></ProtectedRoute>}/>
                        <Route path=":reservationId" element={<ProtectedRoute admin={true}><AdminReservationsEditPage/></ProtectedRoute>}/>
                    </Route>
                    <Route path="vehicles">
                        <Route index element={<ProtectedRoute admin={true}><AdminVehiclesPage/></ProtectedRoute>}/>
                        <Route path=":vehicleId" element={<ProtectedRoute admin={true}><AdminVehiclesEditPage/></ProtectedRoute>}/>
                        <Route path="new" element={<ProtectedRoute admin={true}><AdminVehiclesNewPage/></ProtectedRoute>}/>
                    </Route>

                </Route>

                <Route path="*" element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default CustomRoutes