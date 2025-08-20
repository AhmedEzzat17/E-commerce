@extends('layouts.app')

@section('content')
    <style>
        .image-container {
            position: relative;
            width: 120px;
            height: 120px;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s ease-in-out;
        }

        .image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: opacity 0.2s ease-in-out;
        }

        .image-container:hover img {
            opacity: 0.4;
        }

        .image-container .delete-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.9);
            background: rgba(0, 0, 0, 0.6);
            padding: 8px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
            cursor: pointer;
        }

        .image-container:hover .delete-icon {
            opacity: 1;
            /* transform: translate(-50%, -50%) scale(1); */
        }

        .delete-icon i {
            font-size: 18px;
            color: white;
            transition: color 0.2s ease-in-out;
        }

        .delete-icon:hover i {
            color: red;
        }

        .removeValue {
            background: transparent;
            border: none;
            color: white;
            font-size: 16px;
            font-weight: bold;
            margin-left: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            transition: all 0.3s ease-in-out;
        }

        .removeValue:hover {
            background: rgba(255, 255, 255, 0.2);
            color: #ff4d4d;
        }

        .variantValuesList {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 8px;
        }

        .variantValuesList .badge {
            background-color: #007bff;
            color: #fff;
            font-size: 14px;
            padding: 6px 12px;
            display: flex;
            align-items: center;
            border-radius: 20px;
            transition: all 0.3s ease;
        }

        .variantValuesList .badge:hover {
            background-color: #0056b3;
        }

        .variantValuesList .removeValue {
            background: transparent;
            border: none;
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            margin-left: 8px;
            cursor: pointer;
            transition: color 0.3s;
        }

        .variantValuesList .removeValue:hover {
            color: #ff4d4d;
        }

        /* ✅ تصميم السويتش العصري */
        .switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 26px;
        }

        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #ddd;
            transition: 0.4s;
            border-radius: 34px;
        }

        .slider:before {
            position: absolute;
            content: "";
            height: 20px;
            width: 20px;
            left: 3px;
            bottom: 3px;
            background: white;
            transition: 0.4s;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        input:checked+.slider {
            background: linear-gradient(45deg, #6a11cb, #2575fc);
        }

        input:checked+.slider:before {
            transform: translateX(24px);
        }

        .removeValue {
            background: transparent;
            border: none;
            color: white;
            font-size: 16px;
            font-weight: bold;
            margin-left: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            transition: all 0.3s ease-in-out;
        }

        .removeValue:hover {
            background: rgba(255, 255, 255, 0.2);
            color: #ff4d4d;
        }

        .image-container {
            position: relative;
            display: inline-block;
            margin: 10px;
            height: inherit;
            width: inherit;
        }

        .image-container img {
            width: 100px;
            height: 100px;
            border-radius: 5px;
            object-fit: cover;
        }

        .delete-icon {
            position: absolute;
            top: 5px;
            right: 5px;
            background: rgba(255, 0, 0, 0.7);
            color: white;
            padding: 5px;
            border-radius: 50%;
            cursor: pointer;
        }

        .selected-image-container {
            margin-top: 5px;
        }

        .selected-image {
            width: 40px;
            height: 40px;
            object-fit: cover;
            border-radius: 5px;
            border: 1px solid #ccc;
        }

        /* تحسين تصميم المودال */
        .modal-content {
            border-radius: 15px;
            border: none;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
        }

        .modal-header {
            background: #007bff;
            color: white;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 15px;
            font-weight: bold;
        }

        .modal-body {
            padding: 20px;
            text-align: center;
        }

        /* تصميم الشبكة لعرض الصور بشكل جميل */
        .image-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 10px;
            justify-content: center;
        }

        /* تصميم الصور داخل المودال */
        .image-grid img {
            width: 100%;
            height: auto;
            border-radius: 10px;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .image-grid img:hover {
            transform: scale(1.05);
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
        }

        /* زر الإغلاق العصري */
        .btn-close {
            background: none;
            font-size: 20px;
            margin: 0;
            padding: 10px;
            color: white;
        }

        /* تحسين التجاوب للأجهزة الصغيرة */
        @media (max-width: 576px) {
            .modal-dialog {
                margin: 10px;
            }

            .modal-content {
                border-radius: 10px;
            }

            .modal-header {
                font-size: 16px;
                padding: 10px;
            }

            .image-grid {
                grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            }
        }

        /* تمييز الصورة المحددة */
        .selected-image {
            border: 3px solid #007bff;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 123, 255, 0.5);
        }

        .search-container {
            position: relative;
            display: flex;
            align-items: center;
            border: 1px solid #ddd;
            border-radius: 18px;
            padding: 3px;
            margin: 10px 0px;
            background: white;
            cursor: pointer;
        }

        .search-container input {
            border: none;
            outline: none;
            flex: 1;
            padding: 8px;
            font-size: 1rem;
            cursor: pointer;
        }

        .search-container .icon {
            padding: 8px;
            cursor: pointer;
            font-size: 1.2rem;
            color: #555;
        }

        .category-dropdown {

            position: absolute;
            right: 1px;
            top: 85%;
            width: 99%;
            background: white;
            border: 1px solid #ddd;
            display: none;
            max-height: 250px;
            overflow-y: auto;
            z-index: 1050;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            margin-top: 5px;
        }

        .category-dropdown div {
            padding: 12px;
            cursor: pointer;
            border-bottom: 1px solid #ddd;
            transition: background 0.2s ease-in-out;
        }

        .category-dropdown div:hover {
            background-color: #f1f1f1;
        }

        /* تحسين البحث في الشاشات الصغيرة */
        @media (max-width: 500px) {
            .search-container {
                flex-direction: row;
                padding: 6px;
            }

            .search-container input {
                font-size: 0.9rem;
            }

            .category-dropdown {
                width: 100%;
                max-height: 200px;
            }

        }

        .arrow {
            content: '';
            display: none;
            position: absolute;
            bottom: -10px;
            right: 10px;
            border-width: 10px;
            border-style: solid;
            border-color: transparent transparent rgb(33, 37, 41) transparent;
        }
    </style>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <div class="card border-0 shadow-lg">
                    <div class="card-header bg-primary text-white py-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <h3 class="mb-0 fw-bold border-bottom pb-2">إضافة منتج جديد</h3>
                            <a href="{{ route('products.index') }}" class="btn btn-outline-light btn-lg rounded-pill">
                                <i class="bi bi-box-seam me-2"></i> عرض المنتجات
                            </a>
                        </div>
                    </div>
                    <div class="card-body p-4 bg-light">
                        <form id="productForm" enctype="multipart/form-data" action="{{ route('products.store') }}"
                            method="POST" class="needs-validation" novalidate>
                            @csrf
                            <div class="row g-3">
                                <div class="col-md-8">
                                    <div class="card border-0 shadow-sm p-3 bg-white">
                                        <h5 class="text-primary border-bottom pb-2">معلومات المنتج</h5>
                                        <div class="mb-3">
                                            <label for="name" class="form-label text-dark">اسم المنتج</label>
                                            <input type="text" class="form-control rounded-pill" id="name"
                                                name="name" required>
                                            <div class="invalid-feedback">اسم المنتج مطلوب.</div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="description" class="form-label text-dark">الوصف</label>
                                            <textarea class="form-control rounded-3" id="description" name="description" rows="3"></textarea>
                                            <div class="invalid-feedback">
                                                يجب إدخال وصف المنتج!
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card border-0 shadow-sm p-3 bg-white">
                                        <div class="d-flex justify-content-between align-items-center border-bottom pb-2">
                                            <h5 class="text-primary">التصنيف</h5>
                                            {{-- <button type="button" class="btn btn-light btn-sm toggle-section"
                                                data-target="#categorySection">
                                                <i class="bi bi-chevron-down "></i>
                                            </button> --}}
                                        </div>
                                        <div class="search-container">
                                            <input type="text" id="categorySearch" class="form-control"
                                                placeholder="البحث عن التصنيفات" autocomplete="off">
                                        </div>
                                        <div class="arrow" id="arrow"></div>

                                        <div id="category-list" class="category-dropdown"></div> <!-- قائمة التصنيفات -->
                                        <input type="hidden" id="category_id" name="category_id" required>
                                        <div class="invalid-feedback">يرجى اختيار تصنيف المنتج.</div>

                                    </div>
                                    <div class="card border-0 shadow-sm p-3 mt-3 bg-white">
                                        <h5 class="text-primary border-bottom pb-2">المخزون</h5>
                                        <div class="mb-3">
                                            <input type="number" class="form-control rounded-pill"
                                                placeholder="الكمية المتاحة" id="quantity" name="quantity" required
                                                min="0">
                                            <div class="invalid-feedback">الكمية مطلوبة ويجب أن تكون رقمًا صحيحًا.</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <div class="card border-0 shadow-sm p-3 mt-2 bg-white">
                                        <div class="d-flex justify-content-between align-items-center border-bottom pb-2">
                                            <h5 class="text-primary">التسعير</h5>
                                            <button type="button" class="btn btn-light btn-sm toggle-section"
                                                data-target="#pricingSection">
                                                <i class="bi bi-chevron-down"></i>
                                            </button>
                                        </div>
                                        <div id="pricingSection" class="row g-2 mt-2 d-none">
                                            <div class="col-md-4">
                                                <label for="price" class="form-label text-dark">السعر الأساسي</label>
                                                <input type="number" step="0.01" class="form-control rounded-pill"
                                                    id="price" name="price" required>
                                                <div class="invalid-feedback">السعر الأساسي مطلوب ويجب أن يكون رقمًا صحيحًا
                                                    أكبر من 0.</div>
                                            </div>
                                            <div class="col-md-4">
                                                <label for="compare_price" class="form-label text-dark">
                                                    سعر المقارنه</label>
                                                <input type="number" step="0.01" class="form-control rounded-pill"
                                                    id="compare_price" name="compare_price">
                                                <div class="invalid-feedback">يجب أن يكون السعر قبل الخصم أكبر من السعر
                                                    الأساسي.</div>
                                            </div>
                                            <div class="col-md-4">
                                                <label for="cost_price" class="form-label text-dark">سعر التكلفه </label>
                                                <input type="number" step="0.01" class="form-control rounded-pill"
                                                    id="cost_price" name="cost_price">
                                                <div class="invalid-feedback">يجب أن تكون تكلفة المنتج أقل من السعر
                                                    الأساسي.
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="card border-0 shadow-sm p-3 mt-4 bg-white">
                                        <div class="d-flex justify-content-between align-items-center border-bottom pb-2">
                                            <h5 class="text-primary">الصور</h5>
                                            <div class="d-flex gap-2">
                                                <button type="button" class="btn btn-success btn" id="uploadImages">
                                                    <i class="bi bi-upload"></i> رفع الصور
                                                </button>
                                                <button type="button" class="btn btn-light btn-sm toggle-section"
                                                    data-target="#imageSection">
                                                    <i class="bi bi-chevron-down"></i>
                                                </button>
                                            </div>
                                        </div>

                                        <div id="imageSection" class="row g-2 mt-2 d-none">
                                            <div class="alert alert-info mt-2" role="alert">
                                                <i class="bi bi-info-circle me-2"></i> لحصول على أفضل جودة، استخدم صور بحجم
                                                800x800 بكسل.
                                            </div>
                                            <div class="col-12">
                                                <div class="d-flex flex-wrap" id="imagePreview" style="gap: 10px;"></div>
                                            </div>
                                        </div>
                                        <input type="file" id="imageInput" name="images[]" multiple class="d-none"
                                            accept="image/*">
                                    </div>



                                    <!-- 🟢 قسم المتغيرات - مظبوط وجاهز للاستعمال -->
                                    <div class="card border-0 shadow-sm p-3 mt-4 bg-white">
                                        <div class="d-flex justify-content-between align-items-center border-bottom pb-2">
                                            <h5 class="text-primary">🛠 المتغيرات</h5>
                                            <div class="d-flex gap-2">
                                                <label class="switch">
                                                    <input type="checkbox" id="variantToggle">
                                                    <span class="slider"></span>
                                                </label>
                                                <button type="button" class="btn btn-light btn-sm toggle-section"
                                                    data-target="#variantSection">
                                                    <i class="bi bi-chevron-down"></i>
                                                </button>
                                            </div>
                                        </div>

                                        <div id="variantSection" class="mt-3">
                                            <div id="variantAlert" class="alert alert-warning text-center mt-2">
                                                <p>⚠️ الفاريانت غير مفعّل، قم بتشغيله أولًا.</p>
                                            </div>

                                            <div id="variantInputs" class="d-none"></div>

                                            <button type="button" class="btn btn-outline-primary mt-3 w-100"
                                                id="addVariant" disabled>
                                                + إضافة خيار
                                            </button>
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div class="d-grid mt-4">
                                <button type="submit" id="submitBtn"
                                    class="btn btn-primary btn-lg rounded-pill fw-bold">
                                    <i class="bi bi-save me-2"></i> حفظ المنتج
                                </button>
                                <button type="button" id="testButton">اختبار البيانات</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- مودال اختيار الصور -->
    <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <!-- رأس المودال -->
                <div class="modal-header">
                    <h5 class="modal-title w-100 text-center" id="imageModalLabel">اختر صورة</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <!-- جسم المودال -->
                <div class="modal-body">
                    <div id="uploadedImagesContainer" class="image-grid">
                        <!-- سيتم إضافة الصور هنا ديناميكيًا -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
            //start Catogary

            let categories = @json($categories); // تحميل التصنيفات من السيرفر
            let categoryListElement = $("#category-list"); // حفظ العنصر في متغير لتسريع العمليات

            // عرض القائمة عند الضغط على الحقل
            $("#categorySearch").on("focus", function() {
                renderCategoryList(""); // عرض جميع التصنيفات
            });

            // عند الضغط على السهم، أظهر أو أخفِ القائمة
            $("#dropdown-arrow").on("click", function() {
                categoryListElement.toggle();
            });

            // تحديث عرض القائمة بناءً على البحث
            $("#categorySearch").on("input", function() {
                renderCategoryList($(this).val());
            });

            function renderCategoryList(query = "") {
                query = query.toLowerCase().trim();
                let filteredCategories = categories.filter(c => c.name.toLowerCase().includes(query));

                let list = `<div class="add-category" onclick="addNewCategory()">➕ إضافة تصنيف جديد</div>`;

                if (filteredCategories.length > 0) {
                    filteredCategories.forEach(c => {
                        list += `<div class="category-item" data-id="${c.id}" onclick="selectCategory(${c.id}, '${c.name}')">
                    ${c.name}
                </div>`;
                    });
                } else {
                    list += `<div class="no-results">❌ لا توجد نتائج</div>`; // ✅ إضافة رسالة بدلاً من الإخفاء
                }

                $("#category-list").html(list).show();
            }


            // عند اختيار تصنيف
            function selectCategory(id, name) {
                $("#categorySearch").val(name);
                $("#category_id").val(id);
                categoryListElement.hide();
            }

            // عند الضغط على زر "إضافة تصنيف جديد"
            function addNewCategory() {
                window.location.href = "{{ route('categories.create') }}";
            }

            // إخفاء القائمة عند الضغط خارجها
            $(document).click(function(e) {
                if (!$(e.target).closest(".search-container, #category-list").length) {
                    categoryListElement.hide();
                }
            });
            //End Catogary
            //function Error 
            function showValidationMessage(type, message) {
                let config = {
                    title: message,
                    confirmButtonText: "موافق",
                    timer: 3500, // يظهر 3.5 ثواني
                    toast: true,
                    position: "top-start",
                    showConfirmButton: false,
                    customClass: {
                        popup: "custom-alert",
                        title: "custom-title"
                    },
                    showClass: {
                        popup: "animate__animated animate__fadeInDown" // أنيميشن دخول ناعم وسريع
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutUp" // أنيميشن خروج سريع وسلس
                    }
                };

                // تخصيص التصميم حسب نوع الرسالة
                if (type === "success") {
                    config.icon = "success";
                    config.background = "#28a745"; // أخضر قوي
                    config.color = "#ffffff"; // نص أبيض واضح
                } else if (type === "error") {
                    config.icon = "error";
                    config.background = "#dc3545"; // أحمر قوي
                    config.color = "#ffffff"; // نص أبيض واضح
                } else if (type === "warning") {
                    config.icon = "warning";
                    config.background = "#ffc107"; // أصفر قوي
                    config.color = "#212529"; // نص غامق
                } else {
                    config.icon = "info";
                    config.background = "#007bff"; // أزرق قوي
                    config.color = "#ffffff"; // نص أبيض واضح
                }

                Swal.fire(config);
            }



            /* ============================================================
            Begin Script: Organized JavaScript Code
            ============================================================
            يُقسّم هذا الكود إلى أقسام مخصصة للتعامل مع المتغيرات (Variants)، رفع الصور،
            التحقق من صحة النموذج، والتحكم في أقسام الواجهة.
            ============================================================ */

            document.addEventListener("DOMContentLoaded", function() {
                /* -----------------------------
                Global Variables
                ----------------------------- */
                let selectedImageTarget = null;
                let uploadedImageSources = new Set();
                let variantValuesSet = new Set();
                let assignedImages = new Map();
                const defaultImageSrc = "{{ asset('assets/imgs/ca.png') }}"; // مسار الصورة الافتراضية

                /* ============================================================
                Variant Section: Handling Variant Toggle, Row Addition, and Value Management
                ============================================================ */

                // تفعيل أو إخفاء قسم المتغيرات
                function toggleVariantSection() {
                    let isChecked = this.checked;
                    let alertBox = document.getElementById("variantAlert");
                    let variantInputs = document.getElementById("variantInputs");
                    let addButton = document.getElementById("addVariant");

                    alertBox.classList.toggle("d-none", isChecked);
                    variantInputs.classList.toggle("d-none", !isChecked);
                    addButton.disabled = !isChecked;

                    if (!isChecked) {
                        variantInputs.innerHTML = "";
                        variantValuesSet.clear();
                        assignedImages.clear();
                    }
                }

                // إضافة صف متغير جديد
                let variantIndex = 0; // عداد الخيارات

                function addVariantRow() {
                    let variantInputs = document.getElementById("variantInputs");

                    // ✅ العثور على أعلى index حاليًا في DOM لضمان استمرارية الفهرس بشكل صحيح
                    let highestVariantIndex = -1;
                    document.querySelectorAll(".variant-row").forEach(row => {
                        let currentIndex = parseInt(row.getAttribute("data-variant-index"));
                        if (!isNaN(currentIndex) && currentIndex > highestVariantIndex) {
                            highestVariantIndex = currentIndex;
                        }
                    });

                    let newVariantIndex = highestVariantIndex + 1; // ✅ حساب index الجديد بناءً على الأعلى حاليًا

                    let variantRow = document.createElement("div");
                    variantRow.classList.add("row", "g-2", "align-items-center", "variant-row");
                    variantRow.setAttribute("data-variant-index",
                        newVariantIndex); // ✅ تعيين الـ index كسمة `data-variant-index`

                    variantRow.innerHTML = `
                                <div class="col-md-4">
                                    <input type="text" class="form-control variant-name" name="variants[${newVariantIndex}][name]" placeholder="الاسم" required>
                                </div>
                                <div class="col-md-4">
                                    <select class="form-select variant-type" name="variants[${newVariantIndex}][type]" onchange="toggleColorInput(this, ${newVariantIndex})">
                                        <option value="0">زرار لون</option>
                                        <option value="1">خانة نصية فقط</option>
                                    </select>

                                </div>
                                <div class="col-md-3">
                                    <input type="text" class="form-control variantValueInput" placeholder="القيم">
                                    <div class="variantValuesList mt-2 d-flex flex-wrap gap-2"></div>
                                </div>
                                <div class="col-md-1 text-center">
                                    <button type="button" class="btn btn-sm btn-danger removeVariant" style="display: none;">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            `;

                    setupVariantRow(variantRow, newVariantIndex);
                    variantInputs.appendChild(variantRow);
                }

                function toggleColorInput(selectElement, variantIndex) {
                    let variantRow = selectElement.closest(".variant-row");
                    let valuesList = variantRow.querySelector(".variantValuesList");

                    let isColorType = selectElement.value === "0"; // ✅ تحقق مما إذا كان "زرار لون" محددًا

                    // ✅ تحديث كل القيم داخل هذا المتغير
                    valuesList.querySelectorAll(".badge").forEach(valueItem => {
                        let colorInput = valueItem.querySelector("input[type='color']");
                        let hiddenColorInput = valueItem.querySelector('input[name*="[color]"]');

                        if (isColorType) {
                            colorInput.style.display = "inline-block";
                            hiddenColorInput.value = colorInput.value; // ✅ تحديث اللون المخفي
                        } else {
                            colorInput.style.display = "none";
                            hiddenColorInput.value = ""; // ❌ حذف قيمة اللون إذا لم يكن "زرار لون"
                        }
                    });
                }


                function setupVariantRow(variantRow, index) {
                    let removeVariantButton = variantRow.querySelector(".removeVariant");

                    removeVariantButton.addEventListener("click", function() {
                        variantRow.remove();
                    });

                    let allVariants = document.querySelectorAll(".variant-row");
                    if (allVariants.length > 1) {
                        document.querySelectorAll(".removeVariant").forEach(btn => btn.style.display = "inline-block");
                    }
                }

                // ربط زر الإضافة بوظيفة `addVariantRow`
                document.getElementById("addVariant").addEventListener("click", addVariantRow);


                // إعداد صف المتغيرات للتعامل مع إضافة القيم وحذف الصف
                function setupVariantRow(row) {
                    let valueInput = row.querySelector(".variantValueInput");
                    let valuesList = row.querySelector(".variantValuesList");

                    // إضافة قيمة عند الضغط على Enter
                    valueInput.addEventListener("keypress", function(event) {
                        if (event.key === "Enter" && this.value.trim() !== "") {
                            event.preventDefault();

                            let rowElement = this.closest(".variant-row"); // ✅ العثور على صف المتغير الحالي
                            let valuesList = rowElement.querySelector(
                                ".variantValuesList"); // ✅ العثور على قائمة القيم لهذا المتغير
                            let variantIndex = rowElement.getAttribute(
                                "data-variant-index"); // ✅ الحصول على `variantIndex` الصحيح
                            let valueIndex = valuesList.children
                                .length; // ✅ حساب `valueIndex` بناءً على القيم الحالية

                            addVariantValue(rowElement, this.value
                                .trim()); // ✅ تمرير الصف بدلًا من `variantIndex` يدويًا
                            this.value = ""; // ✅ مسح الإدخال بعد الإضافة
                        }
                    });


                    // عرض زر الحذف عند المرور بالفأرة
                    row.addEventListener("mouseenter", () => {
                        row.querySelector(".removeVariant").style.display = "block";
                    });
                    row.addEventListener("mouseleave", () => {
                        row.querySelector(".removeVariant").style.display = "none";
                    });
                    row.querySelector(".removeVariant").addEventListener("click", () => row.remove());
                }

                // إضافة قيمة للمتغير مع عرض صورة افتراضية وخيارات تعديلها
                function addVariantValue(rowElement, value) {
                    if (!value.trim()) return; // ✅ التأكد من عدم وجود قيم فارغة
                    let assignedColors = new Map();

                    let valuesList = rowElement.querySelector(".variantValuesList");
                    let variantIndex = rowElement.getAttribute(
                        "data-variant-index"); // ✅ الحصول على `variantIndex` من `data-variant-index`
                    let valueIndex = valuesList.children.length; // ✅ تعيين الفهرس الصحيح للقيمة الجديدة

                    // التحقق من عدم تكرار القيمة
                    if (variantValuesSet.has(value)) {
                        showValidationMessage("error", "تم إضافة هذه القيمة من قبل!");
                        return;
                    }

                    variantValuesSet.add(value);
                    assignedImages.set(value, defaultImageSrc);

                    let valueItem = document.createElement("div");
                    valueItem.classList.add("badge", "bg-primary", "p-2", "rounded-pill", "d-flex",
                        "align-items-center", "gap-2");

                    // 🖼️ إضافة معاينة الصورة
                    let imagePreview = document.createElement("img");
                    imagePreview.src = defaultImageSrc; // صورة افتراضية
                    imagePreview.style.width = "24px";
                    imagePreview.style.height = "24px";
                    imagePreview.style.borderRadius = "50%";
                    imagePreview.style.cursor = "pointer";
                    imagePreview.style.marginLeft = "8px";
                    imagePreview.addEventListener("click", function() {
                        selectedImageTarget = imagePreview;
                        loadUploadedImages(value);
                        new bootstrap.Modal(document.getElementById('imageModal')).show();
                    });

                    // ✅ استخراج اسم الصورة فقط بدل اللينك الكامل
                    let imgSrc = defaultImageSrc; // تأكد إن imgSrc دايمًا فيه قيمة
                    if (imgSrc.includes("/")) { // تأكد إنه لينك قبل محاولة استخراج الاسم
                        var imageName = imgSrc.substring(imgSrc.lastIndexOf('/') + 1);
                    } else {
                        var imageName = imgSrc; // لو مش لينك، خلي القيمة كما هي
                    }


                    // 🎨 اختيار اللون
                    // ✅ تحقق مما إذا كان نوع المتغير هو "زرار لون"
                    let variantRow = rowElement.closest(".variant-row");
                    let isColorType = variantRow.querySelector(".variant-type").value === "0";

                    let colorInput = document.createElement("input");
                    colorInput.type = "color";
                    colorInput.value = "#000000";
                    colorInput.style.width = "20px";
                    colorInput.style.height = "20px";
                    colorInput.style.borderRadius = "80%";
                    colorInput.style.border = "none";
                    colorInput.style.cursor = "pointer";
                    colorInput.style.display = isColorType ? "inline-block" : "none"; // ✅ إخفاء إذا لم يكن زرار لون
                    colorInput.addEventListener("input", function() {
                        let newColor = colorInput.value;
                        let valueText = valueItem.querySelector("span").textContent;

                        // ✅ تحديث اللون في assignedColors
                        assignedColors.set(valueText, newColor);

                        // ✅ تحديث الإدخال المخفي فورًا
                        let hiddenColorInput = valueItem.querySelector('input[name*="[color]"]');
                        if (hiddenColorInput) {
                            hiddenColorInput.value = newColor;
                        }
                    });


                    //  زر حذف القيمة
                    let removeButton = document.createElement("button");
                    removeButton.classList.add("removeValue", "btn", "btn-danger", "btn-sm");
                    removeButton.style.marginLeft = "5px";

                    //  إضافة أيقونة للحذف
                    removeButton.innerHTML = `<i class="bi bi-x"></i>`;

                    // حدث الحذف عند الضغط على الزر
                    removeButton.addEventListener("click", function() {
                        valueItem.remove();
                        variantValuesSet.delete(value);
                        assignedImages.delete(value);
                        assignedColors.delete(value);
                    });


                    // 📝 نص القيمة
                    let valueText = document.createElement("span");
                    valueText.textContent = value;

                    // 🔽 إضافة البيانات المخفية للنموذج
                    let hiddenValueInput = document.createElement("input");
                    hiddenValueInput.type = "hidden";
                    hiddenValueInput.name = `variants[${variantIndex}][values][${valueIndex}][value]`;
                    hiddenValueInput.value = value;

                    // ✅ استخدام `imageName` بدلاً من `imgSrc` داخل `hiddenImageInput`
                    let hiddenImageInput = document.createElement("input");
                    hiddenImageInput.type = "hidden";
                    hiddenImageInput.name = `variants[${variantIndex}][values][${valueIndex}][image]`;
                    hiddenImageInput.value = imageName; // ✅ تخزين اسم الصورة فقط

                    let hiddenColorInput = document.createElement("input");
                    hiddenColorInput.type = "hidden";
                    hiddenColorInput.name = `variants[${variantIndex}][values][${valueIndex}][color]`;
                    hiddenColorInput.value = isColorType ? colorInput.value : ""; //  لا تخزن اللون إذا لم يكن مطلوبًا


                    // 🏗️ تجميع العناصر في `valueItem`
                    valueItem.appendChild(imagePreview);
                    valueItem.appendChild(colorInput);
                    valueItem.appendChild(valueText);
                    valueItem.appendChild(removeButton);
                    valueItem.appendChild(hiddenValueInput);
                    valueItem.appendChild(hiddenImageInput);
                    valueItem.appendChild(hiddenColorInput);

                    valuesList.appendChild(valueItem);
                }




                /* ============================================================
                Image Upload Section: Handling Image Uploads and Selection
                ============================================================ */

                document.getElementById('imageInput').addEventListener('change', function(event) {
                    let imagePreview = document.getElementById('imagePreview');
                    let uploadedImagesArray = Array.from(event.target.files); // تخزين الملفات في مصفوفة

                    uploadedImagesArray.forEach(file => {
                        let allowedFormats = ["image/jpeg", "image/png"];
                        if (!allowedFormats.includes(file.type)) {
                            showValidationMessage("error", "❌ يجب أن تكون الصورة بصيغة JPEG أو PNG.");
                            return;
                        }
                        if (file.size > 2 * 1024 * 1024) { // 2MB حد أقصى
                            showValidationMessage("error", "❌ حجم الصورة كبير جدًا (الحد الأقصى 2MB)!");
                            return;
                        }

                        // التحقق من التكرار بناءً على اسم الملف فقط
                        if (uploadedImageSources.has(file.name)) {
                            showValidationMessage("error", "❌ تم إضافة هذه الصورة من قبل!");
                            return;
                        }

                        uploadedImageSources.add(file.name);

                        let imageContainer = document.createElement('div');
                        imageContainer.classList.add('image-container');

                        let img = document.createElement('img');
                        // استخدم URL.createObjectURL للمعاينة
                        img.src = URL.createObjectURL(file);
                        // خزن اسم الملف الأصلي كـ data attribute
                        img.setAttribute("data-filename", file.name);

                        let deleteIcon = document.createElement('div');
                        deleteIcon.classList.add('delete-icon');
                        deleteIcon.innerHTML = '<i class="bi bi-trash-fill"></i>';
                        deleteIcon.addEventListener('click', function() {
                            imageContainer.remove();
                            uploadedImageSources.delete(file.name);
                        });

                        imageContainer.appendChild(img);
                        imageContainer.appendChild(deleteIcon);
                        imagePreview.appendChild(imageContainer);
                    });

                    document.getElementById('imageSection').classList.remove('d-none');
                });





                function loadUploadedImages(value) {
                    let uploadedImagesContainer = document.getElementById("uploadedImagesContainer");
                    uploadedImagesContainer.innerHTML = "";

                    console.log("🔍 تحميل الصور للقيمة:", value);

                    let imagesInPreview = document.querySelectorAll("#imagePreview .image-container img");
                    console.log("📸 عدد الصور في `imagePreview`:", imagesInPreview.length);

                    // لف على كل الصور اللي تم رفعها
                    imagesInPreview.forEach(img => {
                        // استخدم الـ data attribute للحصول على اسم الملف
                        let imageName = img.getAttribute("data-filename");
                        // لو مفيش data attribute، ممكن تستخدم img.src لكن الأفضل تبقى data attribute موجودة
                        if (!imageName) {
                            imageName = img.src.split('/').pop();
                        }

                        // هنا نضيف الصورة للمعاينة في المودال
                        let imgItem = document.createElement("img");
                        imgItem.src = img.src;
                        imgItem.classList.add("selectable-image");
                        imgItem.style.width = "80px";
                        imgItem.style.height = "80px";
                        imgItem.style.cursor = "pointer";

                        // تحقق هل الصورة محددة مسبقاً للقيمة
                        if (assignedImages.get(value) === img.src) {
                            imgItem.classList.add("selected-image");
                            console.log("✅ الصورة المحددة مسبقاً:", img.src);
                        }

                        // عند تحديد صورة معينة
                        imgItem.addEventListener("click", function() {
                            console.log("🖼️ تم اختيار الصورة:", img.src);

                            // تأكد من أن selectedImageTarget موجود
                            if (!selectedImageTarget) {
                                console.error(
                                    "❌ خطأ: `selectedImageTarget` غير معرّف! تأكد من تحديد العنصر قبل اختيار الصورة."
                                );
                                return;
                            }

                            // التحقق من عدم تكرار الصورة لنفس المتغير
                            let currentVariant = selectedImageTarget.closest(".variant-row");
                            // ابحث عن جميع صور الـ badge في المتغير الحالي
                            let currentVariantValues = currentVariant.querySelectorAll(".badge img");
                            // تحقق هل الصورة المختارة موجودة بالفعل
                            let isDuplicate = [...currentVariantValues].some(badgeImg => badgeImg
                                .src === img.src);
                            if (isDuplicate) {
                                showValidationMessage("error",
                                    "❌ تم استخدام هذه الصورة بالفعل داخل نفس المتغير!");
                                return;
                            }
                            // إزالة التحديد من كل الصور
                            document.querySelectorAll(".selectable-image").forEach(image => {
                                image.classList.remove("selected-image");
                            });

                            // تمييز الصورة المختارة
                            this.classList.add("selected-image");

                            // العثور على hiddenImageInput
                            let hiddenImageInput = selectedImageTarget.closest(".badge")?.querySelector(
                                'input[name*="[image]"]');
                            if (!hiddenImageInput) {
                                console.error(
                                    "❌ خطأ: `hiddenImageInput` غير موجود داخل `.badge`! تأكد من صحة الـ DOM."
                                );
                                return;
                            }

                            // استخراج اسم الصورة من data attribute أو من الرابط
                            let imageName = img.getAttribute("data-filename") || img.src.split('/')
                                .pop();

                            // تحديث الإدخال المخفي باسم الصورة الأصلي فقط
                            hiddenImageInput.value = imageName;
                            console.log("📌 `hiddenImageInput` الجديد:", hiddenImageInput.value);

                            // تحديث الصورة في العنصر المستهدف
                            selectedImageTarget.src = img.src;

                            // تحديث الصورة المخزنة في assignedImages
                            assignedImages.set(value, imageName);

                            // إغلاق المودال
                            let escEvent = new KeyboardEvent('keydown', {
                                key: 'Escape',
                                keyCode: 27,
                                bubbles: true
                            });
                            document.dispatchEvent(escEvent);
                            console.log("✅ المودال تم إغلاقه");
                        });


                        uploadedImagesContainer.appendChild(imgItem);
                    });
                }



                // رفع الصور من جهاز المستخدم وعرضها في قسم المعاينة
                document.getElementById('uploadImages').addEventListener('click', function() {
                    document.getElementById('imageInput').click();
                });




                /* ============================================================
                Toggle Sections: عرض وإخفاء أقسام إضافية في الواجهة
                ============================================================ */

                document.querySelectorAll('.toggle-section').forEach(button => {
                    button.addEventListener('click', function() {
                        let target = document.querySelector(this.getAttribute('data-target'));
                        let isHidden = target.classList.contains('d-none');
                        target.classList.toggle('d-none');
                        this.innerHTML = isHidden ? '<i class="bi bi-chevron-up"></i>' :
                            '<i class="bi bi-chevron-down"></i>';
                    });
                });

                /* ============================================================
                Event Listeners for Variant Section Controls
                ============================================================ */

                document.getElementById("variantToggle").addEventListener("change", toggleVariantSection);
                document.getElementById("addVariant").addEventListener("click", addVariantRow);

                /* ============================================================
                Optional: Form Edit Detection and Before-Unload Warning (معلق)
                يمكن تفعيلها إذا أردت تحذير المستخدم عند محاولة مغادرة الصفحة
                ============================================================ */

                // let isFormEdited = false;
                // document.getElementById("productForm").addEventListener("input", function() {
                //     isFormEdited = true;
                // });
                // window.addEventListener("beforeunload", function(event) {
                //     if (isFormEdited) {
                //         event.preventDefault();
                //         event.returnValue = "هل أنت متأكد أنك تريد مغادرة الصفحة؟ سيتم فقد جميع البيانات.";
                //     }
                // });
            });
        
        document.getElementById('productForm').addEventListener('submit', function(event) {
            event.preventDefault();
            let isValid = true;
            let pricingSection = document.getElementById("pricingSection");

            // ✅ التحقق من الكمية
            let quantityInput = document.getElementById("quantity");
            if (quantityInput.value.trim() === '' || quantityInput.value < 0) {
                quantityInput.classList.add("is-invalid");
                isValid = false;
            } else {
                quantityInput.classList.remove("is-invalid");
            }

            // ✅ التحقق من السعر الأساسي
            let priceInput = document.getElementById("price");
            if (priceInput.value.trim() === '' || parseFloat(priceInput.value) <= 0) {
                priceInput.classList.add("is-invalid");
                pricingSection.classList.remove("d-none"); // عرض قسم التسعير عند الخطأ
                isValid = false;
            } else {
                priceInput.classList.remove("is-invalid");
            }

            // ✅ التحقق من السعر قبل الخصم
            let comparePriceInput = document.getElementById("compare_price");
            if (comparePriceInput.value.trim() !== '') {
                if (parseFloat(comparePriceInput.value) <= parseFloat(priceInput.value)) {
                    comparePriceInput.classList.add("is-invalid");
                    pricingSection.classList.remove("d-none");
                    isValid = false;
                } else {
                    comparePriceInput.classList.remove("is-invalid");
                }
            }

            // ✅ التحقق من تكلفة المنتج
            let costPriceInput = document.getElementById("cost_price");
            if (costPriceInput.value.trim() !== '') {
                if (parseFloat(costPriceInput.value) >= parseFloat(priceInput.value)) {
                    costPriceInput.classList.add("is-invalid");
                    pricingSection.classList.remove("d-none");
                    isValid = false;
                } else {
                    costPriceInput.classList.remove("is-invalid");
                }
            } else {
                costPriceInput.classList.add("is-invalid"); // يجب إدخال التكلفة
                pricingSection.classList.remove("d-none");
                isValid = false;
            }

            // ✅ التحقق من الوصف
            let descriptionInput = document.getElementById("description");
            if (descriptionInput.value.trim() === '') {
                descriptionInput.classList.add("is-invalid");
                isValid = false;
            } else {
                descriptionInput.classList.remove("is-invalid");
            }

            // ✅ التحقق من الحقول الأخرى (اسم المنتج، التصنيف)
            ['name', 'category_id'].forEach(field => {
                const input = document.getElementById(field);
                if (input.value.trim() === '') {
                    input.classList.add('is-invalid');
                    isValid = false;
                } else {
                    input.classList.remove('is-invalid');
                }
            });

            // ✅ إذا كان كل شيء صحيحًا، يتم إرسال النموذج
            if (isValid) this.submit();
        });
    </script>
@endsection
