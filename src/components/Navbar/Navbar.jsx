import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Modal, Button, Form, Tab, Nav, Dropdown } from "react-bootstrap";
import "boxicons";
import logoImg from "../../assets/images/resize_image_686fe7da13ce4.png";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import { CartWishlistContext } from "../../App";

const Navbar = () => {
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchContainerRef = useRef(null);
  const [showCart, setShowCart] = useState(false);

  const {
    cartItems,
    wishlistItems,
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
  } = useContext(CartWishlistContext);

  // بيانات الاقتراحات
  const suggestionsData = [
    "أكياس ورقية",
    "علب تغليف",
    "أكياس قماش",
    "أكياس بلاستيك",
    "ملصقات لاصقة",
    "أشرطة تغليف",
    "أكواب ورقية",
    "أدوات تعبئة",
  ];

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key === "Escape") {
        setShowSearchPopup(false);
        setShowLoginModal(false);
        setShowSuggestions(false);
      }
    };
    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  }, []);

  useEffect(() => {
    const body = document.body;
    if (showLoginModal) {
      body.classList.add("dimmed-bg");
    } else {
      body.classList.remove("dimmed-bg");
    }
  }, [showLoginModal]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = suggestionsData.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );

    setSearchSuggestions(filtered);
    setShowSuggestions(query.length > 0);
    setIsSearchExpanded(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    console.log("بحث عن:", suggestion);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    setShowSearchPopup(true);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowLoginModal(true);
  };

  const LoginRegisterModal = () => (
    <Modal
      show={showLoginModal}
      onHide={() => setShowLoginModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>تسجيل الدخول / إنشاء حساب</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container defaultActiveKey="login">
          <Nav variant="tabs" className="mb-3 justify-content-center">
            <Nav.Item>
              <Nav.Link eventKey="login">تسجيل الدخول</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="register">إنشاء حساب</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="login">
              <Login />
            </Tab.Pane>
            <Tab.Pane eventKey="register">
              <Register />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );

  const [show, setShow] = useState(false);

  const handleToggle = (isOpen) => setShow(isOpen);
  const handleClose = () => setShow(false);

  return (
    <>
      {/* Search Popup */}
      {showSearchPopup && (
        <div
          className="search-popup is-visible"
          onClick={(e) => {
            const isOutside = !e.target.closest(".search-popup-container");
            const isCloseIcon =
              e.target.classList.contains("search-popup-close") ||
              e.target.closest(".search-popup-close");

            if (isOutside || isCloseIcon) {
              setShowSearchPopup(false);
            }
          }}
        >
          <div className="search-popup-container">
            <form role="search" method="get" className="search-form" action="">
              <input
                type="search"
                id="search-popup"
                className="search-field"
                placeholder="اكتب هنا "
                name="s"
                autoFocus
              />
              <button type="submit" className="search-submit">
                <i className="bx bx-search"></i>
              </button>
            </form>

            <h5 className="cat-list-title">تصفح الفئات</h5>
            <ul className="cat-list">
              <li className="cat-list-item">
                <a href="#" title="رومانسي">
                  أكياس
                </a>
              </li>
              <li className="cat-list-item">
                <a href="#" title="إثارة">
                  تغليف
                </a>
              </li>
              <li className="cat-list-item">
                <a href="#" title="خيال علمي">
                  تعبئة
                </a>
              </li>
              <li className="cat-list-item">
                <a href="#" title="طبخ">
                  اكسسوارات
                </a>
              </li>
              <li className="cat-list-item">
                <a href="#" title="صحة">
                  علب
                </a>
              </li>
              <li className="cat-list-item">
                <a href="#" title="نمط الحياة">
                  ملصقات
                </a>
              </li>
              <li className="cat-list-item">
                <a href="#" title="خيال">
                  أكواب
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Login/Register Modal */}
      {showLoginModal && <LoginRegisterModal />}

      <header id="header" className="site-header sticky-top">
        <div className="top-info border-bottom d-none d-md-block">
          <div className="container-fluid top-nav">
            <div className="row g-0" data-aos="fade-down" data-aos-once="true">
              <div className="col-md-4">
                <p className="fs-6 my-2 text-center">
                  هل تحتاج إلى مساعدة؟ اتصل بنا <a href="#">000000</a>
                </p>
              </div>
              <div className="col-md-4 border-start border-end">
                <p className="fs-6 my-2 text-center">
                  خصم الصيف 60%!{" "}
                  <a className="text-decoration-underline" href="index.html">
                    تسوق الآن
                  </a>
                </p>
              </div>
              <div className="col-md-4">
                <p className="fs-6 my-2 text-center">
                  توصيل خلال 2-3 أيام عمل وإرجاع مجاني (تجربه)
                </p>
              </div>
            </div>
          </div>
        </div>

        <nav id="header-nav" className="navbar navbar-expand-lg">
          <div className="container">
            <a className="navbar-brand res-logo" href="/">
              <img src={logoImg} className="logo" alt="Logo" />
            </a>

            <button
              className="navbar-toggler d-flex d-lg-none order-3 p-2"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#bdNavbar"
              aria-controls="bdNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="bx bx-menu" style={{ fontSize: "24px" }}></i>
            </button>

            <div
              className="offcanvas offcanvas-end"
              tabIndex="-1"
              id="bdNavbar"
              aria-labelledby="bdNavbarOffcanvasLabel"
            >
              <div className="offcanvas-header px-4 pb-0">
                <a className="navbar-brand res-logo" href="/">
                  <img src={logoImg} className="logo" alt="Logo" />
                </a>
                <button
                  type="button"
                  className="btn-close btn-close-black"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  data-bs-target="#bdNavbar"
                ></button>
              </div>
              <div
                className="offcanvas-body"
                data-aos="fade-down"
                data-aos-once="true"
              >
                <ul
                  id="navbar"
                  className="navbar-nav text-uppercase justify-content-start justify-content-lg-start align-items-start align-items-lg-center flex-grow-1"
                >
                  <li className="nav-item">
                    <a className="nav-link me-3 active" href="#">
                      الصفحة الرئيسية
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link me-3" href="#one">
                      ما نزل مؤخرأ
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link me-3" href="#categories">
                      الأقسام
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link me-3" href="#best-selling">
                      الأكثر طلباً
                    </a>
                  </li>

                  <Dropdown as="li" className="nav-item">
                    <Dropdown.Toggle
                      as="a"
                      className="nav-link me-3"
                      href="#best-selling-items"
                    >
                      المستلزمات
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="animate slide border">
                      <Dropdown.Item href="index.html" className="fw-light">
                        مستلزمات الأكياس
                      </Dropdown.Item>
                      <Dropdown.Item href="index.html" className="fw-light">
                        مستلزمات تغليف الملابس
                      </Dropdown.Item>
                      <Dropdown.Item href="index.html" className="fw-light">
                        مستلزمات التغليف
                      </Dropdown.Item>
                      <Dropdown.Item href="index.html" className="fw-light">
                        مستلزمات الشحن
                      </Dropdown.Item>
                      <Dropdown.Item href="index.html" className="fw-light">
                        مستلزمات الاطعمه والمشروبات
                      </Dropdown.Item>
                      <Dropdown.Item href="index.html" className="fw-light">
                        مستلزمات الأعياد وحفلات الميلاد
                      </Dropdown.Item>
                      <Dropdown.Item href="index.html" className="fw-light">
                        مستلزمات العطور
                      </Dropdown.Item>
                      <Dropdown.Item href="index.html" className="fw-light">
                        مستلزمات الأكسسوارات
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <li className="nav-item">
                    <a className="nav-link me-3" href="#contact-2">
                      تواصل معنا
                    </a>
                  </li>
                </ul>

                {/* شريط البحث الرئيسي */}
                <div className="d-flex align-items-center d-none d-lg-flex">
                  <div
                    className="search-container"
                    ref={searchContainerRef}
                    style={{
                      maxWidth: isSearchExpanded ? "500px" : "500px",
                      // overflow: "hidden",
                      transition: "max-width 0.9s",
                      flexGrow: 1,
                    }}
                  >
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control search-input"
                        placeholder="ابحث عن المنتجات..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{
                          padding: "12px 12px 12px 20px",
                          borderRadius: "30px",
                          border: "2px solid #f1f0f6",
                          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                          width: "100%",
                          color: "#000",
                        }}
                      />
                      <button
                        className="btn btn-primary position-absolute"
                        style={{
                          left: "0px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                          padding: "0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                      >
                        <i
                          className="bx bx-search"
                          style={{ fontSize: "20px" }}
                        ></i>
                      </button>

                      {showSuggestions && (
                        <div
                          className="suggestions-dropdown position-absolute w-100 bg-white mt-1"
                          style={{
                            borderRadius: "10px",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                            zIndex: 1000,
                            maxHeight: "300px",
                            overflowY: "auto",
                          }}
                        >
                          {searchSuggestions.length > 0 ? (
                            searchSuggestions.map((item, index) => (
                              <div
                                key={index}
                                className="suggestion-item p-3 border-bottom"
                                style={{
                                  cursor: "pointer",
                                  transition: "all 0.2s",
                                }}
                                onClick={() => handleSuggestionClick(item)}
                              >
                                <i className="bx bx-search-alt-2 ms-2"></i>
                                {item}
                              </div>
                            ))
                          ) : (
                            <div
                              className="suggestion-item p-3  text-center"
                              style={{ cursor: "default" }}
                            >
                              <i className="me-2"></i> لا توجد نتائج
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="user-items d-flex">
                  <ul className="d-flex justify-content-end align-items-center list-unstyled mb-0 fs-5 mt-3">
                    <li className="search-item pe-2"></li>

                    {/* wishList */}
                    <Dropdown
                      as="li"
                      className="wishlist-dropdown pe-3"
                      show={show}
                      onToggle={(isOpen) => setShow(isOpen)}
                    >
                      <Dropdown.Toggle
                        as="a"
                        className="dropdown-toggle ps-3"
                        onClick={() => setShow(!show)}
                        id="wishlistDropdownToggle"
                      >
                        <i
                          className="bx bx-heart"
                          style={{ fontSize: "25px" }}
                        ></i>
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        className="animate slide dropdown-menu-end dropdown-menu-lg-end p-3 mt-5"
                        onClick={() => setShow(false)} // ✅ يغلق القائمة عند أي ضغطة داخلية
                      >
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                          <span>قائمة رغباتك</span>
                        </h4>
                        <ul
                          className="list-group mb-3 p-0 text-end"
                          style={{ maxHeight: "260px", overflowY: "auto" }}
                        >
                          {wishlistItems.length === 0 ? (
                            <li className="list-group-item text-center">
                              لا توجد منتجات في المفضلة
                            </li>
                          ) : (
                            wishlistItems.map((item) => (
                              <li
                                key={item.id}
                                className="list-group-item bg-transparent d-flex justify-content-between lh-sm"
                              >
                                <div>
                                  <h5>
                                    <a href="index.html">{item.name}</a>
                                  </h5>
                                  <small>سعر: {item.price} ر.س</small>
                                  <a
                                    href="#"
                                    className="d-block fw-medium text-capitalize mt-2"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      addToCart(item);
                                      removeFromWishlist(item);
                                    }}
                                  >
                                    إضافة إلى السلة
                                  </a>
                                </div>
                                {/* صورة المنتج في المفضلة */}
                                {(() => {
                                  let imgSrc =
                                    "https://via.placeholder.com/60x60?text=No+Image";
                                  if (item.main_image) {
                                    imgSrc = item.main_image;
                                  } else if (
                                    Array.isArray(item.images) &&
                                    item.images.length > 0
                                  ) {
                                    imgSrc = item.images[0]?.full_url || imgSrc;
                                  } else if (
                                    typeof item.images === "string" &&
                                    item.images
                                  ) {
                                    imgSrc = `https://myappapi.fikriti.com/${item.images}`;
                                  }
                                  return (
                                    <img
                                      src={imgSrc}
                                      alt={item.name}
                                      style={{ width: 30, height: 30 }}
                                    />
                                  );
                                })()}
                              </li>
                            ))
                          )}
                        </ul>
                        <div className="d-flex flex-wrap justify-content-center">
                          <Link
                            to="/WishListSection"
                            className="w-100 btn btn-dark mb-1"
                            onClick={() => setShow(false)} // أيضاً هنا
                          >
                            عرض قائمة رغباتك
                          </Link>
                          <Link
                            to="/"
                            className="w-100 btn btn-primary"
                            onClick={() => setShow(false)} // أيضاً هنا
                          >
                            الذهاب إلى الدفع
                          </Link>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>

                    {/* cart */}
                    <Dropdown
                      as="li"
                      className="cart-dropdown ms-3 p-0"
                      show={showCart}
                      onToggle={(isOpen) => setShowCart(isOpen)}
                    >
                      <Dropdown.Toggle
                        as="a"
                        className="dropdown-toggle"
                        id="cartDropdownToggle"
                        onClick={() => setShowCart(!showCart)}
                      >
                        <i
                          className="bx bx-cart"
                          style={{ fontSize: "25px" }}
                        ></i>
                        <span
                          style={{
                            position: "absolute",
                            top: "-11px",
                            left: "7px",
                            background: "var(--accent-color)",
                            color: "white",
                            borderRadius: "50%",
                            padding: "3px 5px",
                            fontSize: "10px",
                            fontWeight: "bold",
                            lineHeight: "1",
                          }}
                        >
                          {cartItems.length}
                        </span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        className="animate slide dropdown-menu-end dropdown-menu-lg-end p-3 mt-5"
                        onClick={() => setShowCart(false)} // ✅ يغلق عند الضغط على أي عنصر
                      >
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                          <span>سلة التسوق الخاصة بك</span>
                        </h4>
                        <ul
                          className="list-group mb-3 p-0 text-end"
                          style={{ maxHeight: "260px", overflowY: "auto" }}
                        >
                          {cartItems.length === 0 ? (
                            <li className="list-group-item text-center">
                              لا توجد منتجات في السلة
                            </li>
                          ) : (
                            cartItems.map((item) => (
                              <li
                                key={item.id}
                                className="list-group-item bg-transparent d-flex justify-content-between lh-sm"
                              >
                                <div>
                                  <h5>
                                    <a href="index.html">{item.name}</a>
                                  </h5>
                                  <small>سعر: {item.price} ر.س</small>
                                </div>
                                {/* صورة المنتج في السلة */}
                                {(() => {
                                  let imgSrc =
                                    "https://via.placeholder.com/60x60?text=No+Image";
                                  if (item.main_image) {
                                    imgSrc = item.main_image;
                                  } else if (
                                    Array.isArray(item.images) &&
                                    item.images.length > 0
                                  ) {
                                    imgSrc = item.images[0]?.full_url || imgSrc;
                                  } else if (
                                    typeof item.images === "string" &&
                                    item.images
                                  ) {
                                    imgSrc = `https://myappapi.fikriti.com/${item.images}`;
                                  }
                                  return (
                                    <img
                                      src={imgSrc}
                                      alt={item.name}
                                      style={{ width: 30, height: 30 }}
                                    />
                                  );
                                })()}
                              </li>
                            ))
                          )}
                        </ul>
                        <div className="d-flex flex-wrap justify-content-center">
                          <Link
                            to="/ShoppingCartSection"
                            className="w-100 btn btn-dark mb-1"
                            onClick={() => setShowCart(false)} // ✅ يغلق عند الضغط
                          >
                            عرض السلة
                          </Link>
                          <Link
                            to="/"
                            className="w-100 btn btn-primary"
                            onClick={() => setShowCart(false)} // ✅ يغلق عند الضغط
                          >
                            الذهاب إلى الدفع
                          </Link>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>

                    {/* user */}
                    <li className="pe-1 logn">
                      <a href="#" onClick={handleLoginClick}>
                        <span className="">
                          تسجيل حساب
                          <i
                            className="bx bx-user me-1"
                            style={{ fontSize: "25px" }}
                          ></i>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/* Responsive navbar for screens < 991px */}
        <div className="navbar-mobile d-flex d-lg-none w-100">
          <ul className="d-flex align-items-center justify-content-between w-100 mb-0 ">
            {/* user */}
            <li className="pe-1 logn">
              <a href="#" onClick={handleLoginClick}>
                <span>
                  <i className="bx bx-user" style={{ fontSize: "25px" }}></i>
                </span>
              </a>
            </li>

            {/* search */}
            <li className="flex-grow-1">
              <div
                className="navbar-mobile-search"
                style={{
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              >
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="ابحث هنا..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  style={{
                    padding: "12px 15px 12px 20px",
                    borderRadius: "30px",
                    border: "2px solid #f1f0f6",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                    width: "100%",
                    color: "#000",
                  }}
                />
                <button
                  className="btn btn-primary position-absolute"
                  style={{
                    left: "5px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                >
                  <i className="bx bx-search" style={{ fontSize: "20px" }}></i>
                </button>

                {showSuggestions && (
                  <div
                    className="suggestions-dropdown position-absolute w-100 bg-white mt-1"
                    style={{
                      borderRadius: "10px",
                      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                      zIndex: 1000,
                      maxHeight: "300px",
                      overflowY: "auto",
                    }}
                  >
                    {searchSuggestions.length > 0 ? (
                      searchSuggestions.map((item, index) => (
                        <div
                          key={index}
                          className="suggestion-item p-3 border-bottom"
                          style={{
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                          onClick={() => handleSuggestionClick(item)}
                        >
                          <i className="bx bx-search-alt-2 ms-2"></i>
                          {item}
                        </div>
                      ))
                    ) : (
                      <div
                        className="suggestion-item p-3  text-center"
                        style={{ cursor: "default" }}
                      >
                        <i className="me-2"></i> لا توجد نتائج
                      </div>
                    )}
                  </div>
                )}
              </div>
            </li>

            {/* wishList */}
            <li className="pe-2">
              <Dropdown
                as="span"
                className="wishlist-dropdown-alt"
                show={show}
                onToggle={(isOpen) => setShow(isOpen)}
              >
                <Dropdown.Toggle
                  as="a"
                  className="dropdown-toggle-alt ps-3"
                  onClick={() => setShow(!show)}
                  id="wishlistDropdownToggleAlt"
                >
                  <i className="bx bx-heart" style={{ fontSize: "25px" }}></i>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="animate slide dropdown-menu-end dropdown-menu-mobile p-3 mt-5"
                  onClick={() => setShow(false)}
                >
                  <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span>قائمة رغباتك</span>
                  </h4>
                  <ul
                    className="list-group mb-3"
                    style={{ maxHeight: "260px", overflowY: "auto" }}
                  >
                    {wishlistItems.length === 0 ? (
                      <li className="list-group-item text-center">
                        لا توجد منتجات في المفضلة
                      </li>
                    ) : (
                      wishlistItems.map((item) => (
                        <li
                          key={item.id}
                          className="list-group-item bg-transparent d-flex justify-content-between lh-sm"
                        >
                          <div>
                            <h5>
                              <a href="index.html">{item.name}</a>
                            </h5>
                            <small>سعر: {item.price} ر.س</small>
                            <a
                              href="#"
                              className="d-block fw-medium text-capitalize mt-2"
                              onClick={(e) => {
                                e.preventDefault();
                                addToCart(item);
                                removeFromWishlist(item);
                              }}
                            >
                              إضافة إلى السلة
                            </a>
                          </div>
                          {item.images && (
                            <img
                              src={`https://myappapi.fikriti.com/${item.images}`}
                              alt={item.name}
                              style={{ width: 30, height: 30 }}
                            />
                          )}
                        </li>
                      ))
                    )}
                  </ul>
                  <div className="d-flex flex-wrap justify-content-center">
                    <Link
                      to="/WishListSection"
                      className="w-100 btn btn-dark mb-1"
                      onClick={() => setShow(false)}
                    >
                      عرض قائمة رغباتك
                    </Link>
                    <Link
                      to="/"
                      className="w-100 btn btn-primary"
                      onClick={() => setShow(false)}
                    >
                      الذهاب إلى الدفع
                    </Link>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </li>

            {/* cart */}
            <li>
              <Dropdown
                as="span"
                className="cart-dropdown-alt"
                show={showCart}
                onToggle={(isOpen) => setShowCart(isOpen)}
              >
                <Dropdown.Toggle
                  as="a"
                  className="dropdown-toggle-alt"
                  id="cartDropdownToggleAlt"
                  onClick={() => setShowCart(!showCart)}
                >
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <i className="bx bx-cart" style={{ fontSize: "25px" }}></i>
                    <span
                      style={{
                        position: "absolute",
                        top: "-11px",
                        left: "7px",
                        background: "var(--accent-color)",
                        color: "white",
                        borderRadius: "50%",
                        padding: "3px 5px",
                        fontSize: "10px",
                        fontWeight: "bold",
                        lineHeight: "1",
                      }}
                    >
                      {cartItems.length}
                    </span>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu
                  className="animate slide dropdown-menu-end dropdown-menu-mobile p-3 mt-5"
                  onClick={() => setShowCart(false)}
                >
                  <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span>سلة التسوق الخاصة بك</span>
                  </h4>

                  <ul
                    className="list-group mb-3"
                    style={{ maxHeight: "260px", overflowY: "auto" }}
                  >
                    {cartItems.length === 0 ? (
                      <li className="list-group-item text-center">
                        لا توجد منتجات في السلة
                      </li>
                    ) : (
                      cartItems.map((item) => (
                        <li
                          key={item.id}
                          className="list-group-item bg-transparent d-flex justify-content-between lh-sm"
                        >
                          <div>
                            <h5>
                              <a href="index.html">{item.name}</a>
                            </h5>
                            <small>سعر: {item.price} ر.س</small>
                          </div>
                          {/* صورة المنتج في السلة */}
                          {(() => {
                            let imgSrc =
                              "https://via.placeholder.com/60x60?text=No+Image";
                            if (item.main_image) {
                              imgSrc = item.main_image;
                            } else if (
                              Array.isArray(item.images) &&
                              item.images.length > 0
                            ) {
                              imgSrc = item.images[0]?.full_url || imgSrc;
                            } else if (
                              typeof item.images === "string" &&
                              item.images
                            ) {
                              imgSrc = `https://myappapi.fikriti.com/${item.images}`;
                            }
                            return (
                              <img
                                src={imgSrc}
                                alt={item.name}
                                style={{ width: 30, height: 30 }}
                              />
                            );
                          })()}
                        </li>
                      ))
                    )}
                  </ul>

                  <div className="d-flex flex-wrap justify-content-center">
                    <Link
                      to="/ShoppingCartSection"
                      className="w-100 btn btn-dark mb-1"
                      onClick={() => setShowCart(false)}
                    >
                      عرض السلة
                    </Link>
                    <Link
                      to="/"
                      className="w-100 btn btn-primary"
                      onClick={() => setShowCart(false)}
                    >
                      الذهاب إلى الدفع
                    </Link>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </header>

      <style jsx>{`
        .offcanvas-backdrop.show {
          opacity: 0 !important;
        }
        .search-container {
          position: relative;
          margin: 0 0px;
        }

        .search-input {
          width: 100%;
          border-radius: 30px;
          background: #f0ffff97;
          transition: all 0.3s ease;
          font-size: 13px;
        }

        .search-input:focus {
          outline: none;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(64, 124, 124, 0.2);
        }

        .suggestions-dropdown {
          position: absolute;
          width: 100%;
          background: white;
          border-radius: 0 0 10px 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          z-index: 1000;
        }

        .suggestion-item {
          padding: 10px 15px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .suggestion-item:hover {
          background-color: #f1f0f6;
          color: #407c7c;
        }

        li::marker {
          content: none;
        }

        /* نافذة السلة والمفضلة */



        /* تعديلات للجوال */
        @media (max-width: 991px) {
          .navbar-mobile {
            display: flex !important;
            flex-direction: row;
            width: 100%;
            margin: 0;
            padding: 0 0px;
            align-items: center;
            justify-content: space-between;
            backgr
          }
            .navbar-mobile ul{
            padding: 0 20px;
            }
          .navbar-mobile-search {
            flex: 0 0 70%;
            max-width: 90%;
            margin-right: 15px;
            position: relative;
          }
          .navbar-mobile-icons {
            flex: 0 0 25%;
            max-width: 25%;
            justify-content: flex-end;
            align-items: center;
            gap: 0.5rem;
          }
          .navbar-mobile-icons ul {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-bottom: 0;
            padding-left: 0;
            gap: 0.5rem;
          }
          .navbar-mobile-icons li {
            margin: 0 2px;
          }
        }
                  /* ستايل خاص لقائمة الموبايل الجديدة */
        .dropdown-menu-mobile.p-3 {
          min-width: 60vw;
          max-width: 65vw;
          margin-left: -15px;
          padding: 10px 8px;
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 8px 32px rgba(64, 124, 124, 0.13);
        }
        .dropdown-menu-mobile.p-3 h4 {
          font-size: 1.1rem;
        }
        .dropdown-menu-mobile.p-3 .list-group-item {
          font-size: 1rem;
          padding: 10px 6px;
        }
        .dropdown-menu-mobile.p-3 .btn {
          font-size: 0.95rem;
          padding: 0.3rem 0.7rem;
          border-radius: 10px;
        }
        .dropdown-menu-mobile.p-3 .badge {
          font-size: 0.9rem;
        }
        .dropdown-menu-mobile.p-3 strong,
        .dropdown-menu-mobile.p-3 b {
          font-size: 1rem;
        }

        @media (max-width: 600px) {
          .dropdown-menu-mobile.p-3 {
            min-width: 90vw;
            max-width: 85vw;
            padding: 6px 2px;
          }
          .dropdown-menu-mobile.p-3 h4 {
            font-size: 0.95rem;
          }
          .dropdown-menu-mobile.p-3 .list-group-item {
            font-size: 0.85rem;
            padding: 6px 2px;
          }
          .dropdown-menu-mobile.p-3 .btn {
            font-size: 0.8rem;
            padding: 0.75rem 0.3rem;
            border-radius: 7px;
          }
          .dropdown-menu-mobile.p-3 .badge {
            font-size: 0.7rem;
          }
          .dropdown-menu-mobile.p-3 strong,
          .dropdown-menu-mobile.p-3 b {
            font-size: 0.85rem;
          }
        }

      `}</style>
    </>
  );
};

export default Navbar;
