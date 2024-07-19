import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./views/FirstStep/SignIn";
import SignUp from "./views/FirstStep/SignUp";
import ResetPassword from "./views/FirstStep/ResetPassword";

import UserHomePage from "./views/User/Home";
import TestBMIPage from "./views/User/TestBMIPage";
import BlogAboutLife from "./views/User/BlogAboutLife";
import BlogDetailPage from "./views/User/BlogDetailPage";
import RecipePage from "./views/User/RecipePage";
import RecipeDetailsPage from "./views/User/RecipeDetailsPage";
import IngredientList from "./views/User/BuyIngredient/IngredientList";
import IngredientDetail from "./views/User/BuyIngredient/IngredientDetails";
import Cart from "./views/User/BuyIngredient/Cart";
import ConfirmOrder from "./views/User/BuyIngredient/ConfirmOrder";
import MyPost from "./views/User/Profile/MyPost";
import MyProfile from "./views/User/Profile/MyProfile";
import EditProfile from "./views/User/Profile/EditProfile";
import ResetMyPassword from "./views/User/Profile/ResetMyPassword";
import SendEmail from "./views/FirstStep/SendEmail"

import DashboardAdmin from "./views/Admin/DashBoard";
import AdminProfile from "./views/Admin/Profile";
import AdminListUsersPage from "./views/Admin/AdminListUsers/AdminListUsersPage";
import ConfirmMenu from "./views/Admin/AdminMenu/ConfirmMenu";
import ConfirmMenuDetail from "./views/Admin/AdminMenu/ConfirmMenuDetail";

import DashboardSeller from "./views/Seller/DashBoard";
import SellerInfoOfBuyer from "./views/Seller/SellerInfoOfBuyer";
import SellerListOfIngredientPage from "./views/Seller/SellerListOfIngredientPage";
import SellerListOfPost from "./views/Seller/SellerListOfPost";
import SellerMenuPage from "./views/Seller/SellerMenu/SellerMenuPage";
import SellerDiscountCodePage from "./views/Seller/SellerDiscountCode/SellerDiscountCodePage";
import OrderList from "./views/User/Profile/OrderList";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* First Step Routes */}
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/send-email" element={<SendEmail />} />

                {/* User Routes */}
                <Route path="/user" element={<UserHomePage />} />
                <Route path="/user/testBMI" element={<TestBMIPage />} />
                <Route path="/user/blog" element={<BlogAboutLife />} />
                <Route path="/user/blog/:id" element={<BlogDetailPage />} />
                <Route path="/user/recipe" element={<RecipePage />} />
                <Route path="/user/recipe/:id" element={<RecipeDetailsPage />} />
                <Route path="/user/list-of-ingredients" element={<IngredientList />} />
                <Route path="/user/ingredient-details/:id" element={<IngredientDetail />} />
                <Route path="/user/cart" element={<Cart />} />
                <Route path="/user/confirm-order" element={<ConfirmOrder />} />
                <Route path="/user/order-list" element={<OrderList />} />
                <Route path="/user/my-post" element={<MyPost />} />
                <Route path="/user/my-profile" element={<MyProfile />} />
                <Route path="/user/edit-profile" element={<EditProfile />} />
                <Route path="/user/reset-password" element={<ResetMyPassword />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<DashboardAdmin />} />
                <Route path="/admin/profile" element={<AdminProfile />} />
                <Route path="/admin/user" element={<AdminListUsersPage />} />
                <Route path="/admin/list-of-menu" element={<ConfirmMenu />} />
                <Route path="/admin/list-of-menu/:id" element={<ConfirmMenuDetail />} />

                {/* Seller Routes */}
                <Route path="/seller" element={<DashboardSeller />} />
                <Route path="/seller/list-of-order" element={<SellerInfoOfBuyer />} />
                <Route path="/seller/list-of-ingredients" element={<SellerListOfIngredientPage />} />
                <Route path="/seller/list-of-post" element={<SellerListOfPost />} />
                <Route path="/seller/menus" element={<SellerMenuPage />} />
                <Route path="/seller/discount_code" element={<SellerDiscountCodePage />} />

                {/* Default Route */}
                <Route path="/" element={<UserHomePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
