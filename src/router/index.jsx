import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import HomePageContent from "../components/HomePageContent";
import ProductPage from "../pages/ProductPage";
import FullRecentProductsPage from "../pages/FullRecentProductsPage";
import CategoryProductsPage from "../pages/CategoryProductsPage";
import ShoppingCartSection from "../pages/ShoppingCartSection";
import WishListSection from "../pages/WishListSection";
import UserShow from "../A-Dashboard/users/UserShow";
import UserEdit from "../A-Dashboard/users/UserEdit";
import UserCreate from "../A-Dashboard/users/UserCreate";
import CategoryShow from "../A-Dashboard/categories/CategoryShow";
import CategoryEdit from "../A-Dashboard/categories/CategoryEdit";
import CategoryCreate from "../A-Dashboard/categories/CategoryCreate";
import ProductShow from "../A-Dashboard/products/ProductCreate";
import ProductEdit from "../A-Dashboard/products/ProductEdit";
import ProductCreate from "../A-Dashboard/products/ProductShow";
// import { DashboardLoader } from '../A-Dashboard/Dashboard';
const Dashboard = lazy(() => import("../A-Dashboard/Dashboard"));

const AppRoutes = () => (
  <Routes>
    {/* ّ */}
    <Route path="/" element={<HomePageContent />} />
    <Route path="/productPage/:id" element={<ProductPage />} />
    <Route
      path="/FullRecentProductsPage"
      element={<FullRecentProductsPage />}
    />
    <Route path="/category/:id" element={<CategoryProductsPage />} />
    <Route path="/ShoppingCartSection" element={<ShoppingCartSection />} />
    <Route path="/WishListSection" element={<WishListSection />} />
    <Route
      path="/Dashboard"
      element={
        <Suspense fallback={<div>جارٍ التحميل...</div>}>
          <Dashboard />
        </Suspense>
      }
    >
      {/* Users */}
      <Route path="users" element={<UserShow />} />
      <Route path="users/create" element={<UserCreate />} />
      <Route path="users/edit/:id" element={<UserEdit />} />
      {/* Categories */}
      <Route path="categories" element={<CategoryShow />} />
      <Route path="categories/create" element={<CategoryCreate />} />
      <Route path="categories/edit/:id" element={<CategoryEdit />} />
      {/* Products */}
      <Route path="products" element={<ProductCreate />} />
      <Route path="products/create" element={<ProductShow />} />
      <Route path="products/edit/:id" element={<ProductEdit />} />
    </Route>
  </Routes>
);

export default AppRoutes;